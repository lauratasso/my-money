import React, {useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';

const Header = () => {
  const [logado, setLogado] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem('token')){
      setLogado(true);
    }
    else{
      setLogado(false);
    }
  })

  const logout = () => {
    localStorage.removeItem('token');
    setLogado(false);
    window.location.reload();
  }

  return(
    <nav className='navbar navbar-light bg-light'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>MyMoney</Link>
        { logado &&
        <button type='button' className='btn btn-md btn-warning' onClick={logout}>Sair</button>
        }
      </div>
    </nav>
  )
}

export default Header;