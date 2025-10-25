// ========== Firebase Setup ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Firebase Config
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

// Load Only 5 Latest Notices (Newest First)
async function loadNotices() {
  const noticeList = document.getElementById("notice-list");
  noticeList.innerHTML = "<li>লোড হচ্ছে...</li>";
  
  try {
    const q = query(collection(db, "notices"), orderBy("createdAt", "desc"), limit(5));
    const querySnapshot = await getDocs(q);
    
    noticeList.innerHTML = "";
    
    if (querySnapshot.empty) {
      noticeList.innerHTML = "<li class='text-gray-500'>কোনো নোটিশ পাওয়া যায়নি।</li>";
      return;
    }
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const li = document.createElement("li");
      li.className = "border-b pb-3 flex justify-between items-center";
      
      // সিরিয়াল নাম্বার ছাড়াই শুধু টাইটেল এবং তারিখ
      li.innerHTML = `
        <a href="notice.html?id=${doc.id}" class="text-blue-600 hover:underline">
          ${data.title}
        </a>
        <span class="text-xs text-gray-400 ml-2">
          ${data.date ? new Date(data.date).toLocaleDateString('bn-BD') : ""}
        </span>
      `;
      
      noticeList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading notices:", error);
    noticeList.innerHTML = "<li class='text-red-500'>নোটিশ লোড করতে সমস্যা হয়েছে!</li>";
  }
}

loadNotices();

