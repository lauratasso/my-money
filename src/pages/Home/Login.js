import React, {useEffect, useState} from 'react';
import { usePost } from '../../utils/rest';
import { Redirect } from 'react-router-dom';

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmY8epzXC4TWWx4OMW1yvD44MFaQItn9E';

const Login = () => {
  const [postData, signin] = usePost(url);
  const [logado, setLogado] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   useEffect(() => {
    if(Object.keys(postData.data).length > 0){
      localStorage.setItem('token', postData.data.idToken);
        window.location.reload();
    }
   }, [postData]);
  
   useEffect(() => {
    if (localStorage.getItem('token')){
      setLogado(true);
    }
  })

  const login = async() => {
    await signin({
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

  const onChangeEmail = evt => {
    setEmail(evt.target.value);
  }
  const onChangePassword = evt => {
    setPassword(evt.target.value);
  }

  if(logado){
    return <Redirect to='/' />
  }

  return(
    <div className='container'>
      <h1>Login</h1>  
      <hr/>
      { postData.error && postData.error.length > 0 &&
        <div class="alert alert-danger alert-dismissible" role="alert">
          E-mail e/ou senha inválido(s)
        </div>
      }
      <label>Email:</label><br/>
      <input type='email' value={email} onChange={onChangeEmail} /><br/>
      <label >Senha:</label><br/>
      <input type='password' value={password} onChange={onChangePassword} /><br/><br/>
      <button className='btn btn-md btn-success' onClick={login}>Entrar</button>
    </div>
  );

}


export default Login;