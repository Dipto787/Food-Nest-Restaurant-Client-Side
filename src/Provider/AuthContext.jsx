import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import UseAxiosPublic from "../Components/hooks/UseAxiosPublic";
export let auth = getAuth(app);
export let AuthProvider = createContext(null);
const AuthContext = ({ children }) => {
    let axiosPublic = UseAxiosPublic();
    let [loading, setLoading] = useState(true);
    let googleAuthProvider = new GoogleAuthProvider();
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
    let googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    }
    let updateLoginUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    useEffect(() => {
        let unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                let userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
            } else {
                localStorage.removeItem('access-token')
                setLoading(false);
            }
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