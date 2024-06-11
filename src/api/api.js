// const fetchMangaList = async () => {
//     try {
//       const response = await fetch('https://api.mangadex.org/manga?availableTranslatedLanguage[]=vi');
//       const data = await response.json();
//       const mangaData = data.data;
  
//       const fetchCovers = mangaData.map(async (manga) => {
//         const coverId = manga.relationships.find(rel => rel.type === 'cover_art').id;
//         const coverResponse = await fetch(`https://api.mangadex.org/cover/${coverId}`);
//         const coverData = await coverResponse.json();
//         return {
//           ...manga,
//           coverFileName: coverData.data.attributes.fileName,
//         };
//       });
  
//       const mangaListWithCovers = await Promise.all(fetchCovers);
//       return mangaListWithCovers;
//     } catch (error) {
//       console.error('Error fetching manga:', error);
//       return [];
//     }
//   };
  
//   const fetchChapterPages = async (chapterId) => {
//     try {
//       const response = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
//       const data = await response.json();
//       const baseUrl = data.baseUrl;
//       const hash = data.chapter.hash;
//       const pageFiles = data.chapter.data;
//       const pageUrls = pageFiles.map(page => `${baseUrl}/data/${hash}/${page}`);
//       return pageUrls;
//     } catch (error) {
//       console.error('Error fetching chapter pages:', error);
//       return [];
//     }
//   };
//   const fetchHotMangaList = async () => {
//     try {
//       const response = await fetch('https://api.mangadex.org/manga?order[followedCount]=desc&limit=10');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       const mangaData = data.data;
  
//       const fetchCovers = mangaData.map(async (manga) => {
//         const coverId = manga.relationships.find(rel => rel.type === 'cover_art')?.id;
//         const coverResponse = await fetch(`https://api.mangadex.org/cover/${coverId}`);
//         if (!coverResponse.ok) {
//           throw new Error(`HTTP error! status: ${coverResponse.status}`);
//         }
//         const coverData = await coverResponse.json();
  
//         const authorNames = manga.relationships
//           .filter(rel => rel.type === 'author')
//           .map(rel => rel.attributes?.name || 'Unknown Author');
  
//         return {
//           ...manga,
//           coverFileName: coverData.data.attributes.fileName,
//           tags: manga.attributes.tags.map(tag => tag.attributes.name.en),
//           author: authorNames
//         };
//       });
  
//       const mangaListWithCovers = await Promise.all(fetchCovers);
//       return mangaListWithCovers;
//     } catch (error) {
//       console.error('Error fetching hot manga:', error);
//       return [];
//     }
//   };
  
  
  
//   const fetchChapters = async (mangaId) => {
//     try {
//       const response = await fetch(`https://api.mangadex.org/manga/${mangaId}/feed?order[volume]=asc&translatedLanguage[]=vi`);
//       const data = await response.json();
//       const chapters = data.data;
  
//       return chapters.map(chapter => ({
//         id: chapter.id,
//         title: chapter.attributes.title,
//         volume: chapter.attributes.volume,
//         chapter: chapter.attributes.chapter,
//         pages: chapter.attributes.pages,
//       })).sort((a, b) => a.volume - b.volume || a.chapter - b.chapter);
//     } catch (error) {
//       console.error('Error fetching chapters:', error);
//       return [];
//     }
//   };
 
  
  
    
  
//   export { fetchMangaList, fetchChapterPages, fetchHotMangaList,fetchChapters };
  

import { db } from '../../firebaseConfig';

const fetchComicsList = async () => {
  try {
    const comicsList = [];
    const querySnapshot = await db.collection('comics').get();
    querySnapshot.forEach(doc => {
      comicsList.push({ id: doc.id, ...doc.data() });
    });
    return comicsList;
  } catch (error) {
    console.error('Error fetching comics from Firestore:', error);
    return [];
  }
};

export { fetchComicsList };
