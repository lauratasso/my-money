import React, { useState } from 'react';


const AddMovimentacao = ({ salvarMovimentacao }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('')

  const onChangeDescricao = evt => {
    setDescricao(evt.target.value);
  }

  const onChangeValor = evt => {
    setValor(evt.target.value);
  }

  const salvarMovimentacaoClick = async() => {
    if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvarMovimentacao({
         descricao,//: `${descricao}`,
         valor: parseFloat(valor)  
       })
       setDescricao('');
       setValor(0)     
    }
  }

  return (
    <tr>
      <td>
        <input type='text' value={descricao} onChange={onChangeDescricao} /> 
      </td>
      <td> 
        <input type='text' value={valor} onChange={onChangeValor} />{'  '}
        <button className='btn btn-success' onClick={salvarMovimentacaoClick}>+</button>
      </td>
    </tr>

  );

}


export default AddMovimentacao;