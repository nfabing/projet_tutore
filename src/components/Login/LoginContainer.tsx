import React from "react";

//components
import Login from "./Login";
import UserProfil from "../profil/UserProfil";


const LoginContainer = () => {
    return (
        <div>
            <Login>
                <UserProfil/>
            </Login>
        </div>
    )
}

export default LoginContainer
