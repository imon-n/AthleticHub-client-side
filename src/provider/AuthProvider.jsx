import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
     

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth)
    }

    useEffect( () =>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
            // console.log('user in the auth state change', currentUser)
        })
        return () =>{
            unSubscribe();
        }
    }, [])

    const authInfo = {
        loading,
        user,
        setUser,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;