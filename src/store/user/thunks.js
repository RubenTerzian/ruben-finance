import { getCurrentUser } from "../../api"

export const currentUserThunk = () => {
    // return async dispatch => {
    //     try {
    //         const {token, user} = await getCurrentUser();
    //         user.role = 'ADMIN';
    //         await dispatch({
    //             type: 'GET_CURRENT_USER', 
    //             payload: {token, user},
    //         })
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
}