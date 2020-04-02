import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Button, Col, Row, Modal, Form} from "antd";
import {GoogleOutlined, GithubOutlined} from "@ant-design/icons"

// css
import "./login.css"

// components
import SignIn from "../SignIn/SignIn";
import SupplierForm from "../SupplierForm/SupplierForm";
import SignUp from "../SignUp/SignUp";

interface Iprops {
    loading: boolean;
    logged: boolean;
    error: string;
    providerSignUp: boolean;
    loginEmail: any;
    signupEmail: any;
    loginGoogle: any;
    loginGithub: any;
    changeToSupplier: any;
    stayToUser: any
    children: any;
}

const Login = ({loading, logged, error, providerSignUp, changeToSupplier, stayToUser, loginEmail, signupEmail,
                   loginGoogle, loginGithub, children}: Iprops) => {

    const [mode, setMode] = useState('login')

    const [visible, setVisible] = useState(true)
    const [providerDetails, setProviderDetails] = useState(false)


    useEffect(() => {
        setVisible(providerSignUp)
    }, [providerSignUp])

    const onFinishSignup = (values: any) => {
        console.log(values)
        signupEmail(values)
    }

    const onFinishLogin = (values: any) => {
        loginEmail(values)
    }

    const goToSignup = () => {
        setMode('signup')
    }

    const goToLogin = () => {
        setMode('login')
    }

    const modalProviderLogin = () => {
        setVisible(false)
        setProviderDetails(true)
    }

    const providerAddDetails = (values: any) => {
        changeToSupplier(values)
        setProviderDetails(false)
    }

    const providerAddDetailsCancel = () => {
        setProviderDetails(false)
        stayToUser()
    }


// Render
    return (
        <div className={'container-login'}>
            <Row className={'row-login'} align={'middle'} justify={'center'}>

                {mode === 'login' && !logged ?
                    <Col lg={{span: 8}} xs={{span: 24}}>
                        <SignIn error={error} loading={loading} onFinish={onFinishLogin}/>
                        <div className={'confirm-text'}>
                            <a onClick={goToSignup}>Pas encore inscrit ? clique ici !</a>
                        </div>
                    </Col>
                    : null}

                {mode === 'signup' && !logged ?
                    <Col lg={{span: 8}} xs={{span: 24}}>
                        <SignUp error={error} loading={loading} onFinish={onFinishSignup}/>
                        <div className={'confirm-text'}>
                            <a onClick={goToLogin}>Tu as déjà un compte ? clique ici !</a>
                        </div>
                    </Col>
                    : null}

            </Row>

            {!logged ?
                <Row className={'login-provider'}
                     align={'middle'} justify={'center'}>
                    <Col lg={{span: 8}} xs={{span: 24}}>
                        <h3>Se connecter avec</h3>
                        <div>
                            <Button onClick={loginGoogle} size={'large'}><GoogleOutlined
                                style={{fontSize: '25px'}}/></Button>
                            <Button onClick={loginGithub} size={'large'}><GithubOutlined
                                style={{fontSize: '25px'}}/></Button>
                        </div>
                    </Col>
                </Row>
                : null}


            {providerSignUp && logged ?

                <Modal
                    title={'Devenir fournisseur ?'}
                    visible={visible}
                    closable={false}
                    onCancel={() => stayToUser()}
                    onOk={modalProviderLogin}
                    okText={'Oui'}
                    cancelText={'Plus tard...'}
                >
                    <p>Souhaitez vous devenir un fournisseur ?</p>
                    <p>Ceci vous permettra d'ajouter votre propre matériel pour permettre à d'autres utilisateurs de le
                        louer !</p>
                </Modal>

                : null}

            {providerDetails ?
                <Row align={'middle'} justify={'center'}>
                    <Col span={8}>
                        <Form onFinish={providerAddDetails} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                            <SupplierForm type={'content'}/>

                            <Form.Item wrapperCol={{span: 24}}>
                                <Button type="primary" htmlType="submit" loading={loading} >
                                    Devenir fournisseur
                                </Button>
                                <Button onClick={providerAddDetailsCancel} type="danger" >
                                    Annuler
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                : null}

            {logged && !providerSignUp ?
                <div>
                    {children}
                </div> : null}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.login.loading,
        logged: state.login.logged,
        providerSignUp: state.login.providerSignUp,
        error: state.login.error,

    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        signupEmail: (values: any) => dispatch({type: 'SIGNUP_EMAIL', data: values}),
        loginEmail: (values: any) => dispatch({type: 'LOGIN_EMAIL', data: values}),
        loginGoogle: () => dispatch({type: 'LOGIN_GOOGLE'}),
        loginGithub: () => dispatch({type: 'LOGIN_GITHUB'}),
        changeToSupplier: (values: any) => dispatch({type: 'CHANGE_USER_TO_SUPPLIER', data: values}),
        stayToUser: () => dispatch({type: 'LOGIN_PROVIDER_STAY_USER'}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
