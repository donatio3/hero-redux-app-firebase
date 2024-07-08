import { useCallback } from "react";
import { nanoid } from 'nanoid'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore , collection, getDocs, deleteDoc, deleteField , getDoc, setDoc, addDoc, doc} from 'firebase/firestore/lite';



export const useHttp = () => {
    // const [process, setProcess] = useState('waiting');

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        // setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            // setProcess('error');
            throw e;
        }
    };

    // const clearError = useCallback(() => {
        // setProcess('loading');
    // }, []);

    return {request, 
            // clearError, 
            // process, 
            // setProcess
        }
}



const firebaseConfig = {
    apiKey: "AIzaSyAitrJEX0mNyftqyZN54U6or-sTMbNnCvs",
    authDomain: "heroes-redux-project.firebaseapp.com",
    projectId: "heroes-redux-project",
    storageBucket: "heroes-redux-project.appspot.com",
    messagingSenderId: "33596049504",
    appId: "1:33596049504:web:a75c43567c0e443793db05",
    measurementId: "G-R3GZBKN7PZ"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




export const useDatabase = (action, data) => { 
    

    async function getFilters() {
        const filtersDoc = doc(db, 'heroes', 'filters');
        const filtersSnapshot = await getDoc(filtersDoc);
        if (filtersSnapshot.exists()) {
            console.log(filtersSnapshot.data().filters, 'filters yees')
            return filtersSnapshot.data().filters;
        } else {
            console.log("No such document!");
            return {};
        }
    }
    
    async function getHeroes() {
        const heroesDoc = doc(db, 'heroes', 'heroes');
        const heroesSnapshot = await getDoc(heroesDoc);
        if (heroesSnapshot.exists()) {
            return heroesSnapshot.data();
        } else {
            console.log("No such document!");
            return {};
        }
    }
    
    async function addHeroToDatabase(data) {
        const id = nanoid();
        const heroesDoc = doc(db, 'heroes', 'heroes');
        await setDoc(heroesDoc, {
            [id]: data
        }, { merge: true });
    }
    
    async function deleteHeroFromDatabase(heroId) {
        const heroesDoc = doc(db, 'heroes', 'heroes');
        const heroesSnapshot = await getDoc(heroesDoc);
        if (heroesSnapshot.exists()) {
            const heroesData = heroesSnapshot.data();
            let heroKeyToDelete = null;
            
            for (let key in heroesData) {
                if (heroesData[key].id === heroId) {
                    heroKeyToDelete = key;
                    break;
                }
            }
            
            if (heroKeyToDelete) {
                delete heroesData[heroKeyToDelete];
                await setDoc(heroesDoc, heroesData);
                console.log('Hero successfully deleted');
            } else {
                console.log('Hero with the given ID does not exist');
            }
        } else {
            console.log('Document does not exist');
        }
    }
    

return {
    getHeroes,
    addHeroToDatabase,
    deleteHeroFromDatabase,
    getFilters
};
}