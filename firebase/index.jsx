// firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your Firebase configuration (provided)
const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE,
    authDomain: "sabocon-162e6.firebaseapp.com",
    projectId: "sabocon-162e6",
    storageBucket: "sabocon-162e6.firebasestorage.app",
    messagingSenderId: "466534393999",
    appId: "1:466534393999:web:c34a1189feb6323ae428fa",
    measurementId: "G-7JYD67V9FK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

/**
 * Uploads a file to Firebase Storage.
 * @param {File} file - The file to upload.
 * @param {string} folderPath - (Optional) The folder path in storage (default: "uploads").
 * @returns {Promise<string>} - The download URL of the uploaded file.
 */
export const uploadFileToStorage = async (file, uploaderId = "anonymous", folderPath = "drJohn_uploads") => {
    // Organize files under a folder for each uploader.
    const fileRef = ref(storage, `${folderPath}/${uploaderId}/${file.name}-${Date.now()}`);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    console.log("Uploaded file URL:", downloadURL);
    return downloadURL;
};

/**
 * Saves data to a Firestore collection.
 * @param {object} data - The data object to save.
 * @param {string} collectionName - (Optional) The name of the Firestore collection (default: "applications").
 * @returns {Promise<string>} - The ID of the created document.
 */
export const saveDataToFirestore = async (data, collectionName = "drJohn_applications") => {
    // Clean your data (make sure it's serializable) and add createdAt.
    const cleanData = JSON.parse(JSON.stringify(data));
    cleanData.createdAt = serverTimestamp();
    try {
        const docRef = await addDoc(collection(db, collectionName), cleanData);
        return docRef.id;
    } catch (error) {
        console.error("Error saving document: ", error);
        throw error;
    }
};

export { db, storage };
