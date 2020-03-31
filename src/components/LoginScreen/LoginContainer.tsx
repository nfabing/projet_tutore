import React from "react";

//components
import Login from "./Login/Login";
import UserProfil from "../ProfilScreen/UserProfil/UserProfil";


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
