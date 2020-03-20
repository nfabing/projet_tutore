// Actions creators
import {LOGIN_SUCCESS} from "./loginTypes";

export const loginSuccess = (data: any) => {
    return {
        type: LOGIN_SUCCESS,
        token: data.idToken,
    }
}
