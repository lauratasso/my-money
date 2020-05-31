import React, { useState, useEffect, useRef } from 'react';
import '../pages/styles.css';
import Rest from './rest';

const baseURL = 'https://mymoney-lbt.firebaseio.com/';
const { usePatch } = Rest(baseURL);


const EditInPlace = ({ id, value, onChangeValue, tipo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const [dataPatch, patch] = usePatch();

  useEffect(() => {
    if(isEditing){
      inputRef.current.focus();
    }
  }, [isEditing])

  const edit = () => setIsEditing(true) 

  const done = () =>{
    if(inputRef.current.value === '') inputRef.current.value = 0;
    
    setIsEditing(false);
    onChangeValue(inputRef.current.value);
  
    if(`${tipo}` === 'entrada')    
      patch(`meses/${id}`, { previsao_entrada: `${inputRef.current.value}`});
    else
      patch(`meses/${id}`, { previsao_saida: `${inputRef.current.value}`});
 }

  if(isEditing){
    return <input className='input-editInplace' type='text' defaultValue={value} ref={inputRef} onBlur={done}/>
  }
  else{
    return <strong className='edit-in-place' onClick={edit}>{value}</strong>
  }

}

export default EditInPlace;