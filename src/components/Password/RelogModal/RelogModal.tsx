import React from "react";
import {connect} from "react-redux";
import {Modal} from "antd";
import SignIn from "../../LoginScreen/SignIn/SignIn";


interface IrelogModal {
    error: string;
    loading: boolean;
    login: any;

}

const LoginModal = ({error, loading, login, }: IrelogModal) => {

    const reLogin = (values: { email: string, password: string }) => {
        login(values)
    }

    return (
        <Modal
            title={'Vérification du compte'}
            visible={true}
            closable={false}
            okButtonProps={{disabled: true}}
            cancelButtonProps={{disabled: true}}
            okText={' '}
            cancelText={' '}
        >
            <SignIn error={error} onFinish={reLogin} loading={loading}/>
        </Modal>
    )
}


const mapStateToProps = (state: any) => {
    return {
        loading: state.login.loading,
        error: state.login.error
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (values: any) => dispatch({type: 'LOGIN_EMAIL', data: values})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
