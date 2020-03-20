import React from "react";
import {connect} from "react-redux";
import {login} from "../redux/login/LoginActions";


interface Iprops {
    loading: boolean;
    login: any;
}

const Login = ({loading, login}: Iprops) => {

    return(
        <div>
            <h2>{ loading.toString()}</h2>
            <button onClick={login}>TRUE FALSE</button>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.login.loading,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: () => dispatch({type: 'LOGIN_GOOGLE'}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
