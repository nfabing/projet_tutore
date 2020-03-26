// Actions creators
import {GET_ONE_EQUIPMENT} from "./EditMaterielType";


export const getOneEquipment = (data: any) => {
    return {
        type: GET_ONE_EQUIPMENT,
        getOneEquipment: data.dm.proto.fields
    }
}
