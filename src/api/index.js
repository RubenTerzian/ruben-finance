import axios from 'axios';
import store from '../store';
import { toast } from 'react-toastify';
import firebase from 'firebase/app';


const api = axios.create({
    baseURL: 'https://ruben-finance-default-rtdb.firebaseio.com/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': '',
    }
});

api.interceptors.request.use(config => {
    config.headers['Authorization'] = store.getState().user.token;
    console.log(config)
    return config
});

api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    toast.error(error.response.data,
        {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
      if(error.response.status === 401) {
          console.log(error.response)
          store.dispatch({type: 'LOGGOUT'})
      }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export const getCurrentUser = () => {
    // let user = firebase.auth().currentUser;
    // let name, email, photoUrl, uid, emailVerified;

    // if (user != null) {
    // name = user.displayName;
    // email = user.email;
    // photoUrl = user.photoURL;
    // emailVerified = user.emailVerified;
    // uid = user.uid;  
    // console.log(name, email, photoUrl, emailVerified, uid);
// }
    return //user; 
}

