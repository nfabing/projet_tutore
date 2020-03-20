import React from "react";
import {connect} from "react-redux";


import {Button, Col, Row} from "antd";
import {GoogleOutlined} from "@ant-design/icons"

interface Iprops {
    loading: boolean;
    token: string
    loginGoogle: any;
}

const Login = ({loading, token, loginGoogle}: Iprops) => {

    return (
        <div>
            <h2>Connecté ? : {loading.toString()}</h2>
            <Button onClick={loginGoogle} size={'large'}><GoogleOutlined style={{fontSize: '25px'}}/></Button>


            <Row  justify={'space-around'}>

                {token ? <Col span={12}><b>TOKEN :</b> {token}</Col> : null}

                <Col offset={12}/>

            </Row>


        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.login.loading,
        token: state.login.token,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loginGoogle: () => dispatch({type: 'LOGIN_GOOGLE'}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
