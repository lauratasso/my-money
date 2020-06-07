import React, { useState, useEffect } from 'react';
import EditInPlace from '../../utils/EditInPlace';
import { useMesApi } from '../../api';


const InfoMes = ({ data }) => {
  const { infoMes } = useMesApi(data);

  const [changePrevEntrada, setChangePrevEntrada] = useState('');
  const [changePrevSaida, setChangePrevSaida] = useState('');


  useEffect(() => {
    if(infoMes.data){
      setChangePrevEntrada(infoMes.data.previsao_entrada);
      setChangePrevSaida(infoMes.data.previsao_saida);
    }
  },[infoMes.data])


  if(infoMes.loading){
    return <p>Carregando dados...</p>
  }

  if (infoMes.data){
    return (
      <div>
        Previsão Entrada: 
            <EditInPlace id={data} value={changePrevEntrada} onChangeValue={setChangePrevEntrada} tipo='entrada' />
        / Previsão Saída:   
            <EditInPlace id={data} value={changePrevSaida} onChangeValue={setChangePrevSaida} tipo='saida' />
        <br />
        Entradas: <strong>{infoMes.data.entradas}</strong> / Saídas: <strong>{infoMes.data.saidas}</strong>
      </div>
    );
  }
  else { return null; }

}

export default InfoMes;