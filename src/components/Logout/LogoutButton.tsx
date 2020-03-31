import React from "react";
import {connect} from "react-redux";
import {Button} from "antd";

interface ILogout {
    logged: boolean;
    logout: any;
}

const LogoutButton = ({logged, logout}: ILogout) => {

    const handleLogout = () => {
        logout()
    }

    if (logged) {
        return(
            <div>
                <Button onClick={handleLogout}>Déconnexion</Button>
            </div>
        )
    } else {
        return (
            <div>
                <Button disabled={true}>Non connectée !</Button>
            </div>
        )
    }

}

const mapStateToProps = (state: any) => {
    return {
        logged: state.login.logged,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {

        logout: () => dispatch({type: 'LOGOUT_REQUEST'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)
