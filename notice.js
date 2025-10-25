// ========== Firebase Setup ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjoRYAXQa4J43L4oLmHmUoK7ZqMKCdrxI",
  authDomain: "programme-7eb45.firebaseapp.com",
  databaseURL: "https://programme-7eb45-default-rtdb.firebaseio.com",
  projectId: "programme-7eb45",
  storageBucket: "programme-7eb45.firebasestorage.app",
  messagingSenderId: "431090813085",
  appId: "1:431090813085:web:496fc0d8bb5e57af53ec74",
  measurementId: "G-FE49VB7F1B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ========== Load Notice Details ==========
async function loadNotice() {
  const titleEl = document.getElementById("notice-title");
  const dateEl = document.getElementById("notice-date");
  const contentEl = document.getElementById("notice-content");
  
  const params = new URLSearchParams(window.location.search);
  const noticeId = params.get("id");
  
  if (!noticeId) {
    titleEl.textContent = "নোটিশ আইডি পাওয়া যায়নি!";
    return;
  }
  
  try {
    const docRef = doc(db, "notices", noticeId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      titleEl.textContent = data.title || "শিরোনাম অনুপস্থিত";
      dateEl.textContent = new Date(data.date).toLocaleDateString("bn-BD");
      contentEl.innerHTML = data.content ?
        data.content.replace(/\n/g, "<br>") :
        "কোনো বিস্তারিত তথ্য নেই।";
    } else {
      titleEl.textContent = "নোটিশ পাওয়া যায়নি!";
    }
  } catch (err) {
    console.error("Error loading notice:", err);
    titleEl.textContent = "নোটিশ লোড করতে সমস্যা হয়েছে!";
  }
}

loadNotice();