import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKCIEXCXC4AdgLV-Ky4_s7LnjNWgUlIqI",
  authDomain: "olx-project-8ec58.firebaseapp.com",
  projectId: "olx-project-8ec58",
  storageBucket: "olx-project-8ec58.appspot.com",
  messagingSenderId: "985434156829",
  appId: "1:985434156829:web:9cb307edfb13576a457bf4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export async function userCardItem(itemInfo) {
  try {
    const { image } = itemInfo;
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const imgUrl = await getDownloadURL(storageRef);
    await addDoc(collection(db, "userItem"), {
      image: imgUrl,
    });
    return imgUrl;
  } catch (e) {
    alert(e.message);
  }
}

export async function updateCard(cardImg) {
  try {
    const { image } = cardImg;

    const storageRef = ref(storage, `udateImages/${image.name}`);
    await uploadBytes(storageRef, image);
    const imgUrl = await getDownloadURL(storageRef);
    return imgUrl;
  } catch (e) {
    alert(e.message);
  }
}
