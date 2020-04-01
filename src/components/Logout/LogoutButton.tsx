import React from "react";
import {connect} from "react-redux";
import {Button} from "antd";
import {LogoutOutlined} from "@ant-design/icons"

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
                <Button onClick={handleLogout} icon={<LogoutOutlined />}>Déconnexion</Button>
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
