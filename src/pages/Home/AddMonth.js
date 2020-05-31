import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';

//da pra usar o controlled form ou o useRef para pegar o valor selecionado do select

const minYear = 2019;
const maxYear = 2025;

const AddMonth = () => {
  const refYear = useRef();
  const refMonth = useRef();
  const [redirect, setRedirect] = useState('');

  const years = [];
  const months = [];

  for (let i=minYear; i<=maxYear; i++){
    years.push(i);
  }
  for (let i=1; i<=12; i++){
    months.push(i);
  }

  const zeroPad = num => {
    if(num < 10)
      return '0'+num;
    else
      return num;
  }

  const seeMonth = () => {
    setRedirect(refYear.current.value + '-' + refMonth.current.value);
  }

  if (redirect !== ''){
    return <Redirect to={'/movimentacoes/' + redirect} />
  }

  return (
    <React.Fragment>  
      <h3>Adicionar Mês</h3>
      <select ref={refYear}>
      {
        years.map(year =>  <option key={year} value={year}>{year}</option> )
      }
      </select>
      <select ref={refMonth}>
      {
        months.map(zeroPad).map(month =>  <option key={month} value={month}>{month}</option> )
      }
      </select>

      <button onClick={seeMonth} >Adicionar mês</button>
    </React.Fragment>
  )
}

export default AddMonth;