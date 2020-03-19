import React, {useState} from "react";
import * as firebase from "firebase";
import "firebase/auth"
import firebaseConfig from "../config/config";

firebase.initializeApp(firebaseConfig)

const Login = () => {



    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')


    const signInGithub = () => {

    }

    const signInGoogle = () => {
        firebase.auth().languageCode = 'fr';
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {

                let token = result.credential;
                let user = result.user
                user?.getIdToken()
                    .then((token) => {
                        console.log(token);
                    });

            }).catch((err) => {
            setError(err)
        });
    }

    const signIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                let user = result.user
                user?.getIdToken()
                    .then((token) => {
                        console.log(token);
                    });

            }).catch((err) => {
                if (err.code === 'auth/wrong-password')
                {
                    setError('Mauvais MDP')
                }
                console.log(err)
            })

    }


    return (
        <div>
            <p>Formulaire de connexion</p>
            <button onClick={signInGoogle}>Se connecter avec Google</button>
            <button onClick={signInGithub}>Se connecter avec GitHub</button>
            <div>
                <form onSubmit={(e) => signIn(e)}>
                    <label htmlFor={'email'}>E-MAIL</label>
                    <input id={'email'} type={'email'}  onChange={(e) => setEmail(e.currentTarget.value)} value={email}/>
                    <label htmlFor={'password'}>PASSWORD</label>
                    <input id={'password'} type={'password'} onChange={(e) => setPassword(e.currentTarget.value)} value={password}/>
                    <input type={'submit'} value={'Se connecter'}/>
                </form>
            </div>
            {error ? <h2>{error}</h2> : null}
        </div>
    )
};

export default Login;
