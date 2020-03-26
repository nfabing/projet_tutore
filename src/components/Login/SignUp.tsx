import React, {useState} from "react";
import {Button, Col, Form, Input, InputNumber, Radio, Tooltip} from "antd";
import {MailOutlined, LockOutlined, InfoCircleOutlined} from "@ant-design/icons"

// components
import SupplierForm from "./SupplierForm";

interface SignUpProps {
    error: string;
    goToLogin: any;
    onFinishSignup: any;
    loading: boolean
}

const SignUp = ({error, onFinishSignup, goToLogin, loading}: SignUpProps) => {

    const [userType, setUserType] = useState('user')

    const onRadioChange = (e: any) => {
        const type = e.target.value
        setUserType(type)
    }

    return (
        <Col span={8}>
            <h2>INSCRIPTION</h2>
            <Form onFinish={onFinishSignup} labelCol={{span: 8}} wrapperCol={{span: 16}}>

                <Form.Item name="userType" wrapperCol={{span: 24}} style={{textAlign: "center"}}>
                    <Radio.Group value={userType} onChange={onRadioChange}>
                        <Radio value={'user'} >Utilisateur</Radio>
                        <Radio value={'supplier'}>Fournisseur</Radio>
                    </Radio.Group>
                </Form.Item>


                <Form.Item
                    label={'Email'}
                    name={'email'}
                    rules={[
                        {
                            required: true,
                            message: 'Il vous faut un email !'
                        },
                        {
                            type: 'email',
                            message: 'Email non valide !'
                        }
                    ]}
                >
                    <Input autoFocus={true} prefix={<MailOutlined/>} placeholder={'Email'}/>
                </Form.Item>

                <Form.Item
                    label={'Nom d\'utilisateur'}
                    name={'username'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuillez saisir votre prénom !'
                        }
                    ]}
                >
                    <Input placeholder={'Nom d\'utilisateur'} suffix={
                        <Tooltip title="Ce nom sera visible par tous les utilisateurs">
                            <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                        </Tooltip>
                    }/>
                </Form.Item>

                <Form.Item
                    label={'Téléphone'}
                    name={'phoneNumber'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuillez saisir votre numero de téléphone !'
                        },
                        {
                            len: 10,
                            message: 'Doit faire exactement 10 numéros'
                        }
                    ]}
                >
                    <Input placeholder={'0123456789'} addonBefore={'+33'} maxLength={10}/>
                </Form.Item>


                <Form.Item
                    label={'Mot de passe'}
                    name={'password'}
                    rules={[
                        {
                            required: true,
                            message: 'Il vous faut un mot de passe !'
                        },
                        {
                            min: 6,
                            message: 'Votre mot de passe doit être de plus de 6 caractères'
                        }

                    ]}
                >
                    <Input.Password autoComplete={'new-password'} placeholder={'Mot de passe'}
                                    prefix={<LockOutlined/>}/>
                </Form.Item>

                <Form.Item
                    name={'confirm'}
                    label={'Confirmation'}
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Confirmer votre mot de passe',
                        },
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Les mots de passe doivent correspondre !');
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder={'Mot de passe'} prefix={<LockOutlined/>}/>
                </Form.Item>


                {userType === 'supplier' ? <SupplierForm/> : null}


                <div style={{color: "red"}}>
                    {error ? <b>{error}</b> : null}
                </div>
                <div className={'confirm'}>
                    <div className={'confirm-text'}>
                        <a onClick={goToLogin}>Tu as déjà un compte ? clique ici !</a>
                    </div>
                    <Form.Item wrapperCol={{span: 24}}>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Inscription
                        </Button>
                    </Form.Item>
                </div>

            </Form>
        </Col>
    )

}


export default SignUp
