import React from "react";
import { Form, Input, InputNumber, Tooltip} from "antd";
import { InfoCircleOutlined} from "@ant-design/icons"


const SupplierForm = () => {
    return(
            <div>
                <h3>Informations Fournisseur</h3>

                <Form.Item
                    label={'ADRESSE'}
                    name={'adress'}
                    rules={[
                        {
                            required: true,
                        }]}
                >
                    <Input placeholder={'Adresse'}/>
                </Form.Item>

                <Form.Item
                    label={'VILLE'}
                    name={'city'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuiller saisir votre ville'

                        }]}
                >
                    <Input placeholder={'Ville'} />
                </Form.Item>

                <Form.Item
                    label={'CODE POSTAL'}
                    name={'postalCode'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuiller saisir votre code postal'
                        }]}
                >
                    <InputNumber maxLength={5} placeholder={'Code postal'}/>
                </Form.Item>

                <Form.Item
                    label={'NOM BOUTIQUE'}
                    name={'storeName'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuiller saisir le nom de votre boutique'
                        }]}
                >
                    <Input placeholder={'Nom boutique'} suffix={
                        <Tooltip title="Le nom de votre boutique, visible par tous les utilisateurs">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }/>
                </Form.Item>
            </div>
    )
}

export default SupplierForm
