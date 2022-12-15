import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyD4sRXDYvfK_D79nWOIQCd6ATpWC_vTzvM",
	authDomain: "agora-592b0.firebaseapp.com",
	projectId: "agora-592b0",
	storageBucket: "agora-592b0.appspot.com",
	messagingSenderId: "71096488029",
	appId: "1:71096488029:web:e84143b6ae84045a5e7db4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
