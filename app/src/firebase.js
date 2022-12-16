import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { APIKEY, AUTHDOMAIN, PROJECTID, STORAGEBUCKET, MESSASINGSENDERID, APPID } from "@env";

const firebaseConfig = {
	apiKey: APIKEY,
	authDomain: AUTHDOMAIN,
	projectId: PROJECTID,
	storageBucket: STORAGEBUCKET,
	messagingSenderId: MESSASINGSENDERID,
	appId: PROJECTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
