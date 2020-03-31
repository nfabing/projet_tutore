import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Button, Form, Input} from "antd";
import {CheckOutlined} from "@ant-design/icons"
import RelogModal from "../../Password/RelogModal/RelogModal";

interface FormI {
    fieldName: string;
    fieldValue: string;
    onSubmit: any;
    needRelogin: boolean;
    isRequired?: boolean
    length?: number;
    type?: string;
    updateProfilInfos: any;

}

const FormEditProfil = ({fieldName, fieldValue, onSubmit, isRequired, needRelogin, length, type, updateProfilInfos}: FormI) => {

    const [field, setField] = useState({name: fieldName, value: fieldValue})
    const [rules, setRules] = useState([{
        required: isRequired,
        message: `Ce champ ne peut pas être vide !`
    }])

    useEffect(() => {
        console.log('NEED RELOGIN', needRelogin)
            //TODO SI BESOIN DE RELOGIN LA PAGE NE DOIT PAS FERMER DIRECTEMENT APRES SUBMIT
    }, [needRelogin])

    const formSubmitHandler = (values: any) => {
        console.log(values)
        if (fieldName !== values[fieldName]) {
            updateProfilInfos(values)

        }

    }


    return (
        <>
            {needRelogin ? <RelogModal/> : null}
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

                </Form.Item>
            </Form>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        needRelogin: state.password.needRelogin,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateProfilInfos: (values: any) => dispatch({type: 'CHANGE_PROFIL_INFOS', data: values}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEditProfil)
