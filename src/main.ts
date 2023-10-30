import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlr6kNz-RHxgh31t1AVOGYEnaKdjqZkhk",
  authDomain: "chevas-market.firebaseapp.com",
  projectId: "chevas-market",
  storageBucket: "chevas-market.appspot.com",
  messagingSenderId: "87493372792",
  appId: "1:87493372792:web:296588e5da913519ad768d",
};

const myapp: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(myapp);

createApp(App).use(router).mount("#app");

export { db };
