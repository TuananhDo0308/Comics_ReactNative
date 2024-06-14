import { db, storage } from '../../firebaseConfig';
import { auth } from '../../firebaseConfig';
import firebase from 'firebase/compat/app';

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

const fetchChapterPdfUrls = async (comicId, chapterId) => {
  try {
    const chapterDoc = await db.collection('comics').doc(comicId).collection('Chapters').doc(chapterId).get();
    if (chapterDoc.exists) {
      const contents = chapterDoc.data().Content; // Mảng URL của các tệp PDF dạng `gs://`
      const urls = await Promise.all(contents.map(async (content) => {
        const storageRef = storage.refFromURL(content); // Tạo tham chiếu từ URL
        return await storageRef.getDownloadURL(); // Lấy URL tải xuống
      }));
      console.log('Number of URLs:', urls.length);
      return urls; // Trả về mảng URL tải xuống
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching chapter pages from Firestore:', error);
    return [];
  }
};

// Hàm để toggle favorite comic
const toggleFavoriteComic = async (comicId) => {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection('users').doc(user.uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    if (userData.favorites && userData.favorites.includes(comicId)) {
      // Nếu truyện đã có trong danh sách yêu thích, xóa nó đi
      await userRef.update({
        favorites: firebase.firestore.FieldValue.arrayRemove(comicId)
      });
    } else {
      // Nếu truyện chưa có trong danh sách yêu thích, thêm nó vào
      await userRef.update({
        favorites: firebase.firestore.FieldValue.arrayUnion(comicId)
      });
    }
  }
};

// Hàm để lấy danh sách truyện yêu thích
const fetchFavoriteComics = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = await db.collection('users').doc(user.uid).get();
    const userData = userDoc.data();
    const favoriteComics = [];

    if (userData.favorites && userData.favorites.length > 0) {
      const comicsSnapshot = await db.collection('comics').where(firebase.firestore.FieldPath.documentId(), 'in', userData.favorites).get();
      comicsSnapshot.forEach(doc => {
        favoriteComics.push({ id: doc.id, ...doc.data() });
      });
    }

    return favoriteComics;
  }
  return [];
};

const addToCurrentReading = async (comicId) => {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection('users').doc(user.uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    const updatedCurrentReading = userData.currentReading || [];
    const readingExists = updatedCurrentReading.some((reading) => reading.comicId === comicId);

    if (!readingExists) {
      updatedCurrentReading.push({ comicId });
      await userRef.update({ currentReading: updatedCurrentReading });
    }
  }
};

// Hàm lấy danh sách truyện đang đọc
const fetchCurrentReading = async () => {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection('users').doc(user.uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    const currentReading = userData.currentReading || [];

    // Lấy thông tin chi tiết của từng truyện
    const detailedReadingList = await Promise.all(
      currentReading.map(async (reading) => {
        const comicDoc = await db.collection('comics').doc(reading.comicId).get();
        return { ...comicDoc.data(), comicId: reading.comicId };
      })
    );

    return detailedReadingList;
  }
  return [];
};
export { fetchComicsList, fetchGenresList, fetchChapters, fetchFavoriteComics, toggleFavoriteComic, 
  fetchChapterPdfUrls, addToCurrentReading, fetchCurrentReading };