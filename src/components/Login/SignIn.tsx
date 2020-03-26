import React from "react";
import {Button, Col, Form, Input} from "antd";
import {MailOutlined, LockOutlined} from "@ant-design/icons"

interface SignInProps {
    error: any;
    goToSignup: any;
    onFinishLogin: any;
    loading: boolean
}

const SignIn = ({error, goToSignup, onFinishLogin, loading}: SignInProps) => {

    return (
        <Col span={8}>
            <h2>CONNEXION</h2>
            <Form onFinish={onFinishLogin} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                <Form.Item
                    label={'Email'}
                    name={'email'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuillez saisir votre adresse e-mail'
                        },
                        {
                            type: 'email',
                            message: 'E-mail non valide !'
                        }
                    ]}
                >
                    <Input autoFocus={true} prefix={<MailOutlined/>} placeholder={'Email'}/>
                </Form.Item>

                <Form.Item
                    label={'Mot de passe'}
                    name={'password'}
                    rules={[{required: true, message: 'Veuillez saisir votre mot de passe'}]}
                >
                    <Input.Password placeholder={'Mot de passe'} prefix={<LockOutlined/>}/>
                </Form.Item>

                <div style={{color: "red", textAlign: "center"}}>
                    {error ? <b>{error}</b> : null}
                </div>
                <div className={'confirm'}>
                    <div className={'confirm-text'}>
                        <a onClick={goToSignup}>Pas encore inscrit ? clique ici !</a>
                    </div>

                    <Form.Item wrapperCol={{span: 24}}>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Connexion
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Col>
    )

}

export default SignIn
