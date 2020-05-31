import {useEffect, useReducer} from 'react';
import axios from 'axios';

const INITIAL_STATE = { 
  loading: false, 
  data: {} 
}

//REDUCER: UTILIZADO PARA ALTERAR O ESTADO INTERNO DE UM OBJETO, DE UMA FORMA MAIS FÁCIL DE ENTENDER
//funcao pura
const reducer = (state, action) => {
  //manipular meu estado
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
  return state;
}

const init = baseURL => {
  const useGet = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE) //ações disparadas pelo reducer: através do dispatch
    const carregar = async() => {
      dispatch({ type: 'REQUEST' })
      const res = await  axios.get(baseURL + resource + '.json');
      dispatch({ type: 'SUCCESS', data: res.data })
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
      const res = await axios.post(baseURL + resource + '.json', data);
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
      await axios.delete(baseURL + resource + '.json');
      dispatch({
          type: 'SUCCESS',
      })
    }
    return [data, remove];
  } 

  const usePatch = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE )

    const patch = async(resource, data) => {
      dispatch({ type: 'REQUEST' })
      await axios.patch(baseURL + resource + '.json', data);
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

export default init;

