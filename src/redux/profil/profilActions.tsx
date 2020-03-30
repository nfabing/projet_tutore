import {CHANGE_PROFIL_PICTURE, SYNC_PROFIL} from "./profilTypes";

export const syncProfil = (profil: any) => {
    return {
        type: SYNC_PROFIL,
        profil: profil,
    }
}

export const changeProfilImage = () => {
    return {
        type: CHANGE_PROFIL_PICTURE
    }
}


