import React, {useState} from "react";
import {connect} from "react-redux";
import {Button, Form, Input} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons"
import RelogModal from "../../Password/RelogModal/RelogModal";

interface FormI {
    fieldName: string;
    fieldValue: string;
    onSubmit: any;
    needRelogin: boolean;
    needReloginEmail: any;
    isRequired?: boolean
    changeProfilInfos: any;
    changeEmail: any;

}

const FormEditProfil = ({fieldName, fieldValue, onSubmit, isRequired, needRelogin, needReloginEmail, changeProfilInfos, changeEmail}: FormI) => {

    const [field, setField] = useState({name: fieldName, value: fieldValue})
    const [isSame, setIsSame] = useState(false)
    const [rules, setRules] = useState([{
        required: isRequired,
        message: `Ce champ ne peut pas être vide !`
    }])

     const formSubmitHandler = (values: any) => {
        console.log(values)
        if (fieldValue !== values[fieldName]) {
            if (fieldName != 'email') {
                changeProfilInfos(values)
                onSubmit()
            }

            if (fieldName === 'email' && needRelogin === undefined) {
               changeEmail(values.email)
            }

        } else {
            setIsSame(true)
        }

    }

    return (
        <>
            {needReloginEmail ? <RelogModal/> : null}
            <Form
                onFinish={formSubmitHandler}
                fields={[field]}
                layout={'inline'}
            >
                <Form.Item
                    name={field.name}
                    rules={rules}
                >
                    <Input autoFocus={true}/>
                </Form.Item>

                <Form.Item>
                    <Button size={'small'} htmlType={'submit'} shape={'circle'} icon={<CheckOutlined/>}/>
                    <Button size={'small'} onClick={onSubmit}  shape={'circle'} icon={<CloseOutlined />} danger/>
                    {isSame ? <div>Même valeur</div> : null}
                </Form.Item>

            </Form>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        needRelogin: state.checkLogin.needRelogin,
        needReloginEmail: state.checkLogin.needReloginEmail
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeProfilInfos: (values: any) => dispatch({type: 'CHANGE_PROFIL_INFOS', data: values}),
        changeEmail: (email: string) => dispatch({type: 'EMAIL_CHANGE_REQUEST', newEmail: email})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEditProfil)
