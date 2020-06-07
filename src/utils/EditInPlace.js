import React, { useState, useEffect, useRef } from 'react';
import '../pages/styles.css';
import Rest from './rest';

const baseURL = 'https://mymoney-lbt.firebaseio.com/';
const { usePatch } = Rest(baseURL);


const EditInPlace = props => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const [dataPatch, alterarMes] = usePatch(`meses/${props.id}`);

  useEffect(() => {
    if(isEditing){
      inputRef.current.focus();
    }
  }, [isEditing])

  const edit = () => setIsEditing(true) 

  const done = () =>{
    if(inputRef.current.value === '') inputRef.current.value = 0;
    
    setIsEditing(false);
    props.onChangeValue(inputRef.current.value);
  
    if(`${props.tipo}` === 'entrada')    
      alterarMes({ previsao_entrada: `${inputRef.current.value}`});
    else
      alterarMes({ previsao_saida: `${inputRef.current.value}`});
 }

  if(isEditing){
    return <input className='input-editInplace' type='text' defaultValue={props.value} ref={inputRef} onBlur={done}/>
  }
  else{
    return <strong className='edit-in-place' onClick={edit}>{props.value}</strong>
  }

}

export default EditInPlace;