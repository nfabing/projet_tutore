import React from "react";
import {connect} from "react-redux"
import {LockOutlined} from "@ant-design/icons"
import {Button, Form, Input, Row, Col} from "antd";
import RelogModal from "../RelogModal/RelogModal";
import './changePassword.css'


interface IPasswordChangeForm {
    loading: boolean;
    message: string;
    passwordChange: any;
    needReloginEmail: boolean;
    onCancel: any;
}

const ChangePassword = ({loading, message, passwordChange, needReloginEmail, onCancel}: IPasswordChangeForm) => {

    const handleForm = (values: any) => {
        console.log(values)
        passwordChange(values.password)
    }

    return (
        <Row justify={'center'} className={'row-passwordChange'}>
            {needReloginEmail ? <div><RelogModal/></div> : null}
            <Col>
                <h3>Changement de mot de passe</h3>
                <Form
                    onFinish={handleForm}
                >
                    <Form.Item
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

                        <Input.Password placeholder={'Mot de passe'} prefix={<LockOutlined/>}/>
                    </Form.Item>

                    <Form.Item
                        name={'confirm'}
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
                        <Input.Password placeholder={'Confirmation'} prefix={<LockOutlined/>}/>
                    </Form.Item>

                    {message ? <div>{message}</div> : null}

                    <Form.Item>
                        <Button htmlType={'submit'} loading={loading}>Modifier le mot de passe</Button>
                        <Button onClick={onCancel} danger>Fermer</Button>
                    </Form.Item>

                </Form>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.password.loading,
        message: state.password.message,
        needReloginEmail: state.checkLogin.needReloginEmail
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        passwordChange: (newPassword: string) => dispatch({type: 'PASSWORD_CHANGE_REQUEST', newPassword: newPassword})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
