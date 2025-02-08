import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
export let auth = getAuth(app);
export let AuthProvider = createContext(null);
const AuthContext = ({ children }) => {
    let [loading, setLoading] = useState(true);
    let [user, setUser] = useState(null);
    let createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    let signInUser=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    let logout=()=>{
        setLoading(true);
        return signOut(auth);
    }
    let updateLoginUserProfile=(name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
        })
    }
    useEffect(() => {
        let unsubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false);
            setUser(currentUser);
            console.log(currentUser);
        })

        return () => unsubscribe();
    })
    let userInfo = {
        loading,
        user,
        createUser,
        signInUser,
        logout,
        updateLoginUserProfile
    };

    return (
        <AuthProvider.Provider value={userInfo}>
            {children}
        </AuthProvider.Provider>
    );
};

export default AuthContext;