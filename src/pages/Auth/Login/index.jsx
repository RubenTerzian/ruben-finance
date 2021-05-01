import React from 'react';
import { Form, Input, Button, Checkbox} from 'antd';
import firebase from 'firebase';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../../store';


const Image = styled.img`
  width: 40px;
  height: 40px;
  transition: 0.3s;
  :hover{
    cursor: pointer;
    opacity: 0.8;
  }
`
const layout = {
    labelCol: {
        span: 16,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(store => store.user.isAuth);
 
  const onFinish = (values) => {
      console.log('Success:', values);
      firebase.auth().signInWithEmailAndPassword(values.email, values.password)
          .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              const token = userCredential.za;
              console.log(user)
              dispatch({type:'GET_CURRENT_USER', payload:{token, user}});

          })
          .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.error(errorCode, errorMessage)
          });
  };
  
  const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
  };

  const userAuthState = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    
  }

  const googleLogin = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().useDeviceLanguage();
          firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
              const credential = result.credential;

              // This gives you a Google Access Token. You can use it to access the Google API.
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              dispatch({type:'GET_CURRENT_USER', payload:{token, user}});
              console.log(token, user)
              // ...
            }).catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              const credential = error.credential;
              // ...
            });
            
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Form.Item>
        <Image src="/images/google-icon.svg" alt="google login" onClick={googleLogin}/>
        <Button onClick={() => {userAuthState(); console.log(isAuth)}}>Get user info</Button>
      </Form.Item>
    </Form>
  );
};

export default Login;