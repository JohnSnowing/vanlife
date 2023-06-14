import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore/lite";
//lite for not realtime features

const firebaseConfig = {
  apiKey: "AIzaSyDVvMOJx254hl9ohglPz24WbnXEGKEpavA",
  authDomain: "vanlife-5c1a3.firebaseapp.com",
  projectId: "vanlife-5c1a3",
  storageBucket: "vanlife-5c1a3.appspot.com",
  messagingSenderId: "89993607428",
  appId: "1:89993607428:web:6b7c2f744f652db104b851"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans");

// firebase
export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr;
}

export async function getVan(id) {
    const docRef = doc(db, "vans",id);
    const vanSnapshot = await getDoc(docRef);

    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

//mirage js
// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

//firebase
// export async function getHostVans() {
//     const q = query(vansCollectionRef, where("hostId", "==", "123"))
//     const querySnapshot = await getDocs(q)
//     const dataArr = querySnapshot.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id
//     }))
//     return dataArr
// }

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}