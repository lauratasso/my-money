import {useEffect, useReducer} from 'react';
import axios from 'axios';
//o axios não retorna nenhum response quando gera uma exceção na requisição, ele só retorna o código
//para contornar isso, tem como falar para o axios se comportar de outra forma...
axios.defaults.validateStatus = statusCode => statusCode < 500;

const INITIAL_STATE = { 
  loading: false, 
  data: {},
  error: '' 
}

//REDUCER: UTILIZADO PARA ALTERAR O ESTADO INTERNO DE UM OBJETO, DE UMA FORMA MAIS FÁCIL DE ENTENDER
//funcao pura
const reducer = (state, action) => {
  if (action.type === 'REQUEST'){
    return {
      ...state,
      loading: true
    }
  }
  
  if (action.type === 'SUCCESS'){
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }

  if (action.type === 'FAILURE'){
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }

  return state;
}

const getAuth = () => {
  const token = localStorage.getItem('token');
  if (token !== null){
    return '?auth='+token;
  }
  else 
    return '';
}


const init = baseURL => {
  const useGet = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE) //ações disparadas pelo reducer: através do dispatch
    const carregar = async() => {
      try{
        dispatch({ type: 'REQUEST' })
        const res = await  axios.get(baseURL + resource + '.json' + getAuth());
        if (res.data.error && Object.keys(res.data.error).length > 0 ) {
          dispatch({ type: 'FAILURE', error: res.data.error });

        }
        else {
          dispatch({ type: 'SUCCESS', data: res.data });
        }
      }catch(err){
        dispatch({ type: 'FAILURE', error: 'unknow error'});
        
      }
      
    }
    useEffect(() => {
        carregar();
    }, [resource])

   return {
      ...data,
      refetch: carregar    
    }
  }

  const usePost = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
  
    const post = async(data) => {   //como é assincrona, virou uma promise
      dispatch({ type: 'REQUEST' })
      const res = await axios.post(baseURL + resource + '.json' + getAuth(), data);
      dispatch({
        type: 'SUCCESS',
        data: res.data
      })
    }
    return [data, post];
  }

  //NO USO DO DELETE, NÃO SE PASSA O DATA SEPARADO, TEM QUE CONCATENAR COM A URL E PASSAR TUDO JUNTO
  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE )

    const remove = async(resource) => {
      dispatch({ type: 'REQUEST' })
      await axios.delete(baseURL + resource + '.json' + getAuth());
      dispatch({
          type: 'SUCCESS',
      })
    }
    return [data, remove];
  } 

  const usePatch = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE )

    const patch = async(data) => {
      dispatch({ type: 'REQUEST' })
      await axios.patch(baseURL + resource + '.json' + getAuth(), data);
      dispatch({
          type: 'SUCCESS',
      })
    }
    return [data, patch];
  } 

  return {
    useGet,
    usePost,
    useDelete,
    usePatch
  };
}

export  const usePost = resource => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
  const post = async(data) => { 
    dispatch({ type: 'REQUEST' })
    try{
      const res = await axios.post(resource, data);
      if (res.data.error && Object.keys(res.data.error).length > 0 ) { //significa que existe erro
        dispatch({
          type: 'FAILURE',
          error: res.data.error.message
        })   
      }
      else {
        dispatch({
          type: 'SUCCESS',
          data: res.data
        })
        return res.data;
      }
    }catch(err){
      dispatch({
        type: 'FAILURE',
        error: 'unknow error'
      })
    }
  }
  return [data, post];
}

export default init;

