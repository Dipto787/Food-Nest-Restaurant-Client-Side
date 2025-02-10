import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
export let auth = getAuth(app);
export let AuthProvider = createContext(null);
const AuthContext = ({ children }) => {
    let [loading, setLoading] = useState(true);
    let googleAuthProvider=new GoogleAuthProvider();
    let [user, setUser] = useState(null);
    let createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    let signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    let logout = () => {
        setLoading(true);
        return signOut(auth);
    }
    let googleLogin=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleAuthProvider);
    }
    let updateLoginUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
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
        googleLogin,
        updateLoginUserProfile
    };

    return (
        <AuthProvider.Provider value={userInfo}>
            {children}
        </AuthProvider.Provider>
    );
};

export default AuthContext;