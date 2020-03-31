import { takeLatest, fork, put } from "redux-saga/effects";
import store, { reduxSagaFirebase } from "../../redux/store";
import firebase, { firestore } from "firebase";
import "firebase/firestore";
import { getOneEquipment } from "../../redux/editMateriel/EditMaterielAction";
// import { getEquipmentID } from "../../components/EditMateriel";
import { getListCategories } from "../../redux/editMateriel/EditMaterielAction";

//RECUPERE L'EQUIPEMENT A MODIFIER AINSI QUE LES CATEGORIES
function* getOneEquipmentSaga(value: any) {
  const db = firebase.firestore();
  const id = yield value.id;
  const docRef = db.collection("equipment").doc(id);
  docRef.get().then(function(doc) {
    let objID = { id: doc.id };
    let finalObj = Object.assign(objID, doc.data());
    return store.dispatch(getOneEquipment(finalObj))
  });
  yield db.collection("categories").onSnapshot(function(querySnapshot) {
    var cat: Array<any> = [];
    querySnapshot.forEach(function(doc) {
      let objID = { id: doc.id };
      let finalObj = Object.assign(objID, doc.data());
      cat.push(finalObj);
    })
    return store.dispatch(getListCategories(cat));
  })
}

function* editEquipmentSaga(values: any) {
  console.log(values);
  const formValues = values.values.equipment;
  let date = null;
  if(formValues.buyingDate._d === undefined){
    date = formValues.buyingDate;
  }else{
    date = formValues.buyingDate.format("YYYY");
  }
  yield fork(reduxSagaFirebase.firestore.updateDocument, "equipment/"+formValues.id, {
    name: formValues.name,
    status: formValues.status,
    description: formValues.description,
    buyingDate: date,
    category: formValues.category,
    brand: formValues.marque,
    modele: formValues.modele
  });
}

function* unSetCategories() {
  const data: Array<any> = [];
  yield put(getListCategories(data))
}

export function* watchEditEquipment() {
  yield takeLatest("GET_THAT_EQUIPMENT", getOneEquipmentSaga);
  yield takeLatest("EDIT_THAT_EQUIPMENT", editEquipmentSaga);
  yield takeLatest("UNSET_CATEGORIES", unSetCategories);
}
