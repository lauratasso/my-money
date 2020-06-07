import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './elements/Header';
import Home from './pages/Home/';
import Movimentacoes from './pages/Movimentacoes/';
import Login from './pages/Home/Login';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path='/' exact component={Home} /> 
        <Route path='/movimentacoes/:data' exact component={Movimentacoes} />     
        <Route path='/login' exact component={Login} />
      </div>
    </Router>
  );
}

export default App;
