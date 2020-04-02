import React from "react";
import {Button, Form, Input, InputNumber, Tooltip} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons"
import './supplierForm.css'

interface IsupplierForm {
    type: string;
    loading?: boolean;
    formHandler?: any;
    onCancel?: any;
}

const SupplierForm: any = ({type, loading, formHandler, onCancel}: IsupplierForm) => {
    if (type === 'content') {
        return (
            <>
                <h3 className={'login-title'}>Informations Fournisseur</h3>

                <Form.Item
                    label={'Adresse'}
                    name={'adress'}
                    rules={[
                        {
                            required: true,
                        }]}
                >
                    <Input placeholder={'Adresse'}/>
                </Form.Item>

                <Form.Item
                    label={'Ville'}
                    name={'city'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuiller saisir votre ville'

                        }]}
                >
                    <Input placeholder={'Ville'}/>
                </Form.Item>

                <Form.Item
                    label={'Code postal'}
                    name={'postalCode'}
                    className={'form-postalCode'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuiller saisir votre code postal'
                        }]}
                >
                    <InputNumber maxLength={5} placeholder={'Code postal'}/>
                </Form.Item>

                <Form.Item
                    label={'Nom boutique'}
                    name={'storeName'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuiller saisir le nom de votre boutique'
                        }]}
                >
                    <Input placeholder={'Nom boutique'} suffix={
                        <Tooltip title="Le nom de votre boutique, visible par tous les utilisateurs">
                            <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                        </Tooltip>
                    }/>
                </Form.Item>
            </>
        )
    }

    if (type === 'form') {
        return (
            <Form
                onFinish={formHandler}
                hideRequiredMark={true}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
            >
                <h3 className={'login-title'}>Informations Fournisseur</h3>

                <Form.Item
                    label={'Adresse'}
                    name={'adress'}
                    rules={[
                        {
                            required: true,
                        }]}
                >
                    <Input placeholder={'Adresse'}/>
                </Form.Item>

                <Form.Item
                    label={'Ville'}
                    name={'city'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuiller saisir votre ville'

                        }]}
                >
                    <Input placeholder={'Ville'}/>
                </Form.Item>

                <Form.Item
                    label={'Code postal'}
                    name={'postalCode'}
                    className={'form-postalCode'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuiller saisir votre code postal'
                        }]}
                >
                    <InputNumber maxLength={5} placeholder={'Code postal'}/>
                </Form.Item>

                <Form.Item
                    label={'Nom boutique'}
                    name={'storeName'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuiller saisir le nom de votre boutique'
                        }]}
                >
                    <Input placeholder={'Nom boutique'} suffix={
                        <Tooltip title="Le nom de votre boutique, visible par tous les utilisateurs">
                            <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                        </Tooltip>
                    }/>
                </Form.Item>

                <Form.Item wrapperCol={{span: 24}}>
                    <Button type="primary" htmlType="submit" /*loading={loading}*/ >
                        Devenir Fournisseur
                    </Button>
                    <Button onClick={onCancel} danger>Annuler</Button>
                </Form.Item>

            </Form>
        )
    }

}

export default SupplierForm
