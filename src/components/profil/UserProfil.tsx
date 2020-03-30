import React, {useEffect, useState} from "react"
import {connect} from "react-redux";
import {Avatar, Button, Col, Row, Upload} from "antd";
import {UploadOutlined, EditOutlined} from "@ant-design/icons";
import "../../css/profil.css"
// components
import FormEditProfil from "./FormEditProfil";
import SupplierForm from "../Login/SupplierForm";
import ChangePassword from "../Password/ChangePassword";

interface Iprops {
    userData: any;
    loading: boolean;
    updateProfilPicture: any;
    updateProfilInfos: any;
    changeToSupplier: any;
}

const UserProfil = ({userData, loading, updateProfilPicture, updateProfilInfos, changeToSupplier}: Iprops) => {

    const [visible, setVisible] = useState(false)
    const [supplierFormVisible, setSupplierFormVisible] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [edit, setEdit] = useState('')

    useEffect(() => {
        if ('useruid' in userData) {
            setVisible(true)
            console.log('USER DATA', userData)
        }
    }, [userData])

    const formSubmitHandler = (values: any) => {
        console.log(values)

        if (values[edit] !== userData[edit]) {
            updateProfilInfos(values)
        }

        setEdit('')
    }

    const beforeUpload = (file: any) => {
        // TODO: A AMELIORER

        console.log(file)
        const isValid = file.type === 'image/jpeg' || file.type === 'image/png';
        return isValid
    }

    const uploadImage = (info: any) => {
        console.log(info.file.originFileObj)
        updateProfilPicture(info.file.originFileObj)
    }

    const showEditForm = (edit: string) => {
        console.log('EDIT', edit)
        setEdit(edit)
    }

    const supplierFormHandler = (values: any) => {
        console.log(values)
        changeToSupplier(values)
    }

    const handleChangePasswordCancel = () => {
        setEditPassword(false)
    }


    if (visible) {
        return (
            <>
                <Row>
                    <Col>
                        <h1>Mon profil</h1>
                    </Col>
                </Row>

                <Row className={'row-profil-banner'} justify={'center'} align={'middle'}>
                    <Col className={'col-banner-avatar'} span={3}>
                        <Avatar size={98} src={userData.photoURL}/>
                        <div>
                            <Upload beforeUpload={beforeUpload} showUploadList={false} onChange={uploadImage}>
                                <Button loading={loading} disabled={loading}
                                        icon={<UploadOutlined/>}/></Upload>
                        </div>
                    </Col>

                    <Col className={'col-banner-infos'} span={12}>
                        <h2>Nom d'utilisateur : {edit === 'displayName' ?
                            <FormEditProfil fieldName={edit} fieldValue={userData[edit]}
                                            onSubmit={formSubmitHandler} isRequired={true}/> :
                            <span>{userData.displayName} <EditOutlined onClick={() => showEditForm('displayName')}/>
                        </span>} </h2>

                        <h3>Email : {edit === 'email' ?
                            <FormEditProfil fieldName={'email'} fieldValue={userData[edit]}
                                            onSubmit={formSubmitHandler} isRequired={true}/> :
                            <span>{userData.email} <EditOutlined onClick={() => showEditForm('email')}/>
                            </span>} </h3>
                    </Col>
                </Row>

                <Row justify={'center'}>
                    <Col>
                        <h3>Vos informations</h3>
                        <div>Téléphone : {edit === 'phoneNumber' ?
                            <FormEditProfil fieldName={edit} fieldValue={userData[edit]}
                                            onSubmit={formSubmitHandler}/> :
                            <span>{userData.phoneNumber} <EditOutlined onClick={() => showEditForm('phoneNumber')}/>
                        </span>} </div>
                    </Col>

                    {userData.userType === 'supplier' ?
                        <Col>
                            <h3>Informations fournisseur</h3>
                            <div>Adresse : {edit === 'adress' ?
                                <FormEditProfil fieldName={'adress'} fieldValue={userData[edit]}
                                                onSubmit={formSubmitHandler}/> :
                                <span>{userData.adress} <EditOutlined onClick={() => showEditForm('adress')}/>
                            </span>} </div>

                            <div>Ville : {edit === 'city' ?
                                <FormEditProfil fieldName={edit} fieldValue={userData[edit]}
                                                onSubmit={formSubmitHandler}/> :
                                <span>{userData.city} <EditOutlined onClick={() => showEditForm('city')}/>
                        </span>} </div>

                            <div>Code postal : {edit === 'postalCode' ?
                                <FormEditProfil fieldName={edit} fieldValue={userData[edit]}
                                                onSubmit={formSubmitHandler}/> :
                                <span>{userData.postalCode} <EditOutlined onClick={() => showEditForm('postalCode')}/>
                        </span>} </div>

                            <div>Nom boutique : {edit === 'storeName' ?
                                <FormEditProfil fieldName={edit} fieldValue={userData[edit]}
                                                onSubmit={formSubmitHandler}/> :
                                <span>{userData.storeName} <EditOutlined onClick={() => showEditForm('storeName')}/>
                        </span>} </div>
                        </Col>
                        : <Col>
                            {!supplierFormVisible ? <>
                                <h3>Vous n'étes pas encore un fournisseur</h3>
                                <Button onClick={() => setSupplierFormVisible(true)}>Devenir fournisseur</Button>
                            </> : <SupplierForm type={'form'} formHandler={supplierFormHandler}/>}
                        </Col>}
                </Row>
                <Row>
                    <Col>

                        {editPassword ?  <ChangePassword onCancel={handleChangePasswordCancel}/> :  <Button onClick={() => setEditPassword(true)}>Modifier mot de passe</Button> }

                    </Col>
                </Row>
            </>
        )
    }


    return (
        <div>
            <h2>Chargement du profil...</h2>
        </div>
    )
}


const mapStateToProps = (state: any) => {
    return {
        userData: state.user.profil,
        loading: state.user.loading,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateProfilPicture: (img: File) => dispatch({type: 'CHANGE_PROFIL_PICTURE', img: img}),
        updateProfilInfos: (values: any) => dispatch({type: 'CHANGE_PROFIL_INFOS', data: values}),
        changeToSupplier: (values: any) => dispatch({type: 'CHANGE_USER_TO_SUPPLIER', data: values})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfil)
