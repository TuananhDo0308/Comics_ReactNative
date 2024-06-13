import { db, storage } from '../../firebaseConfig';

// Lấy chi tiết truyện tranh
const fetchComicDetails = async (comicId) => {
  try {
    const comicDoc = await db.collection('comics').doc(comicId).get();
    if (comicDoc.exists) {
      return { id: comicDoc.id, ...comicDoc.data() };
    } else {
      console.error('No such document!');
      return {};
    }
  } catch (error) {
    console.error('Error fetching comic details from Firestore:', error);
    return {};
  }
};

// Lấy danh sách truyện tranh
const fetchComicsList = async () => {
  try {
    const comicsList = [];
    const querySnapshot = await db.collection('comics').orderBy('Title').get();

    for (const doc of querySnapshot.docs) {
      const comicData = doc.data();
      const genreRef = comicData.Genre;

      // Lấy dữ liệu từ tài liệu genre reference
      const genreDoc = await genreRef.get();
      const genreData = genreDoc.exists ? genreDoc.data() : { Genre: 'Unknown' };

      // Đếm số lượng chương của truyện
      const chaptersSnapshot = await db.collection('comics').doc(doc.id).collection('Chapters').get();
      const chapterCount = chaptersSnapshot.size;

      comicsList.push({ id: doc.id, ...comicData, Genre: genreData.Genre, chapterCount });
    }

    return comicsList;
  } catch (error) {
    console.error('Error fetching comics from Firestore:', error);
    return [];
  }
};

// Lấy danh sách thể loại
const fetchGenresList = async () => {
  try {
    const genresList = [];
    const querySnapshot = await db.collection('genres').orderBy('Genre').get();
    for (const genreDoc of querySnapshot.docs) {
      const genreData = genreDoc.data();
      const comicsSnapshot = await db.collection('comics').where('Genre', '==', genreDoc.ref).get();
      
      const comicsList = comicsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      genresList.push({ id: genreDoc.id, Genre: genreData.Genre, comics: comicsList });
    }

    return genresList;
  } catch (error) {
    console.error('Error fetching genres from Firestore:', error);
    return [];
  }
};

// Lấy danh sách các chương của một truyện tranh cụ thể
const fetchChapters = async (comicId) => {
  try {
    const chaptersList = [];
    const querySnapshot = await db.collection('comics').doc(comicId).collection('Chapters').orderBy('Title', 'desc').get();
    querySnapshot.forEach(doc => {
      if (doc.exists) {
        chaptersList.push({ id: doc.id, ...doc.data() });
      }
    });
    return chaptersList;
  } catch (error) {
    console.error('Error fetching chapters from Firestore:', error);
    return [];
  }
};

const fetchChapterPages = async (comicId, chapterId) => {
  try {
    const chapterDoc = await db.collection('comics').doc(comicId).collection('Chapters').doc(chapterId).get();
    if (chapterDoc.exists) {
      const contents = chapterDoc.data().Content; // Mảng URL dạng `gs://`
      const urls = await Promise.all(contents.map(async (content) => {
        const storageRef = storage.refFromURL(content); // Tạo tham chiếu từ URL
        return await storageRef.getDownloadURL(); // Lấy URL tải xuống
      }));
      return urls; // Trả về mảng URL tải xuống
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching chapter pages from Firestore:', error);
    return [];
  }
};

export { fetchComicsList, fetchGenresList, fetchChapters, fetchComicDetails, fetchChapterPages };
