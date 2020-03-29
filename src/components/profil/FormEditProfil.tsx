import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {CheckOutlined} from "@ant-design/icons"

interface FormI {
    fieldName: string;
    fieldValue: string;
    onSubmit: any;
    isRequired?: boolean
}

const FormEditProfil = ({fieldName, fieldValue, onSubmit, isRequired}: FormI) => {

    const [field, setField] = useState({name: fieldName, value: fieldValue})

    return (

        <Form
            onFinish={onSubmit}
            fields={[field]}
            layout={'inline'}
        >
            <Form.Item
                name={field.name}
                rules={[
                    {
                        required: isRequired,
                        message: `Ce champ ne peut pas être vide !`
                    },

                ]}
            >
                <Input autoFocus={true}/>
            </Form.Item>


            <Form.Item>
                <Button size={'small'} htmlType={'submit'} shape={'circle'} icon={<CheckOutlined/>}/>

            </Form.Item>
        </Form>
    )
}

export default FormEditProfil
