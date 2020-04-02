import React from "react";
import {Button, Form, Input} from "antd";
import {MailOutlined, LockOutlined, LoginOutlined} from "@ant-design/icons"

interface SignInProps {
    error: any;
    onFinish: any;
    loading: boolean
}

const SignIn = ({error, loading, onFinish}: SignInProps) => {

    return (
        <Form onFinish={onFinish}
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              hideRequiredMark={true}
        >
            <h2 className={'login-title'}>CONNEXION</h2>
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
                <Form.Item wrapperCol={{span: 24}}>
                    <Button type="primary" htmlType="submit" loading={loading} icon={<LoginOutlined/>} block>
                        Connexion
                    </Button>
                </Form.Item>
            </div>
        </Form>
    )

}

export default SignIn
