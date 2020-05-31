import { useReducer } from 'react';
import axios from 'axios';

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

//NO USO DO DELETE, NÃO SE PASSA O DATA SEPARADO, TEM QUE CONCATENAR COM A URL E PASSAR TUDO JUNTO
const useDelete = () => {
  const [data, dispatch] = useReducer(reducer, {
    loading: false,
    data: {}
  })

  const remove = url => {
    dispatch({ type: 'REQUEST' })
    axios
    .delete(url)
    .then(() => {
      dispatch({
        type: 'SUCCESS',
      })
    });
  }
  return [data, remove];
}

export default useDelete;