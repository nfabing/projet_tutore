import React, {useEffect, useState} from "react"
import {connect} from "react-redux";
import {Avatar, Button, Col, Divider, Row, Skeleton, Upload} from "antd";
import {UploadOutlined, EditOutlined} from "@ant-design/icons";

// components
import FormEditProfil from "../FormEditProfil/FormEditProfil";
import SupplierForm from "../../LoginScreen/SupplierForm/SupplierForm";
import ChangePassword from "../../Password/ChangePassword/ChangePassword";
import "./userProfil.css"
import LogoutButton from "../../Logout/LogoutButton";

interface Iprops {
    userData: any;
    loading: boolean;
    updateProfilPicture: any;
    changeToSupplier: any;
}

const UserProfil = ({userData, loading, updateProfilPicture, changeToSupplier}: Iprops) => {

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

    const formSubmitHandler = () => {

        setEdit('')
    }

    const uploadImage = (info: any) => {

        if (info.file.originFileObj.type === 'image/png' || info.file.originFileObj.type === 'image/jpeg') {
            updateProfilPicture(info.file.originFileObj)
        }
    }

    const showEditForm = (edit: string) => {
        console.log('EDIT', edit)
        setEdit(edit)
    }

    const supplierFormHandler = (values: any) => {
        console.log(values)
        changeToSupplier(values)
    }

    const supplierFormCancelHandler = () => {
        setSupplierFormVisible(false)
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
                    <Col className={'col-banner-avatar'} span={3} >
                        {'photoURL' in userData ? <Avatar size={80} src={userData.photoURL}/> :
                            <Avatar size={80} src={' '}/> }


                    </Col>

                    <Col className={'col-banner-infos'} span={12}>
                        <h2><span>{userData.displayName}</span></h2>

                        <h3><span>{userData.email}</span></h3>
                    </Col>
                </Row>

                <Divider orientation="center" className={"divider-profil"}>
                    Vos informations
                </Divider>

                <Row justify={'center'}>
                    <Col>
                        <div className={'info-element'}><b>Nom d'utilisateur</b> : {edit === 'displayName' ?
                            <FormEditProfil fieldName={edit} fieldValue={userData[edit]}
                                            onSubmit={formSubmitHandler} isRequired={true}/> :
                            <span>{userData.displayName} <EditOutlined onClick={() => showEditForm('displayName')}/>
                        </span>} </div>

                        <div className={'info-element'}><b>Email</b> : {edit === 'email' ?
                            <FormEditProfil fieldName={'email'} fieldValue={userData[edit]}
                                            onSubmit={formSubmitHandler} isRequired={true}/> :
                            <span>{userData.email} <EditOutlined onClick={() => showEditForm('email')}/>
                            </span>} </div>

                        <div className={'info-element'}><b>Téléphone</b> : {edit === 'phoneNumber' ?
                            <FormEditProfil fieldName={edit} fieldValue={userData[edit]}
                                            onSubmit={formSubmitHandler}/> :
                            <span>{userData.phoneNumber} <EditOutlined onClick={() => showEditForm('phoneNumber')}/>
                        </span>} </div>
                    </Col>
                </Row>

                <Divider orientation="center" className={"divider-profil"}>
                    Informations fournisseur
                </Divider>

                <Row justify={'center'}>
                    {userData.userType === 'supplier' ?
                        <Col>
                            <p>Vous êtes inscrit en tant que fournisseur</p>

                            <div className={'info-element'}><b>Adresse</b> : {edit === 'adress' ?
                                <FormEditProfil fieldName={'adress'} fieldValue={userData[edit]}
                                                onSubmit={formSubmitHandler}/> :
                                <span>{userData.adress} <EditOutlined onClick={() => showEditForm('adress')}/>
                            </span>} </div>

                            <div className={'info-element'}><b>Ville</b> : {edit === 'city' ?
                                <FormEditProfil fieldName={edit} fieldValue={userData[edit]}
                                                onSubmit={formSubmitHandler}/> :
                                <span>{userData.city} <EditOutlined onClick={() => showEditForm('city')}/>
                        </span>} </div>

                            <div className={'info-element'}><b>Code postal</b> : {edit === 'postalCode' ?
                                <FormEditProfil fieldName={edit} fieldValue={userData[edit]}
                                                onSubmit={formSubmitHandler}/> :
                                <span>{userData.postalCode} <EditOutlined onClick={() => showEditForm('postalCode')}/>
                        </span>} </div>

                            <div className={'info-element'}><b>Nom boutique</b> : {edit === 'storeName' ?
                                <FormEditProfil fieldName={edit} fieldValue={userData[edit]}
                                                onSubmit={formSubmitHandler}/> :
                                <span>{userData.storeName} <EditOutlined onClick={() => showEditForm('storeName')}/>
                        </span>} </div>
                        </Col>
                        : <Col>
                            {!supplierFormVisible ? <>
                                <h3>Vous n'ètes pas encore un fournisseur</h3>
                                <Button onClick={() => setSupplierFormVisible(true)}><b>Devenir fournisseur</b></Button>
                            </> : <SupplierForm type={'form'} formHandler={supplierFormHandler}
                                                onCancel={supplierFormCancelHandler}/>}
                        </Col>}
                </Row>

                <Divider orientation="center" className={"divider-profil"}>
                    Options de profil
                </Divider>

                <Row className={'row-password'} justify={'center'}>
                    <Col>

                        <div>
                            {editPassword ? <ChangePassword onCancel={handleChangePasswordCancel}/>
                                : <Button onClick={() => setEditPassword(true)}>Modifier mot de passe</Button>}
                        </div>

                        <div style={{marginTop: '20px'}}>
                            <Upload showUploadList={false} onChange={uploadImage} accept={'image/png, image/jpeg'} >
                                <Button loading={loading} disabled={loading}
                                        icon={<UploadOutlined/>}>Changer photo de profil </Button></Upload>
                        </div>
                        <div style={{marginTop: '20px'}}>
                            <LogoutButton/>
                        </div>

                    </Col>
                </Row>
            </>
        )
    }

// Render : profil is loading
    return (
        <div>
            <Skeleton active/>
            <Skeleton active/>
            <Skeleton active/>
            <Skeleton active/>
            <Skeleton active/>
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
        changeToSupplier: (values: any) => dispatch({type: 'CHANGE_USER_TO_SUPPLIER', data: values})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfil)
