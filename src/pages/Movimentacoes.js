import React, { useState, useEffect } from 'react';
import Rest from '../utils/rest';
import EditInPlace from '../utils/EditInPlace';

//Aqui, manipula os dados 'descricao' e 'valor' cada hora que add uma nova movimentação
//utilizando o useState. Como ele está dentro de um formulário, chamamos de controlled form
//ou seja, o valor dos estados ficam salvos no componente, sincronizados, e não no DOM

const baseURL = 'https://mymoney-lbt.firebaseio.com/';
const { useGet, usePost, useDelete } = Rest(baseURL);

const Movimentacoes = ({ match }) => {
  const data = useGet(`movimentacoes/${match.params.data}`);
  const dataMeses = useGet(`meses/${match.params.data}`);
  
  const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`);
  const [removeData, remover] = useDelete();
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  
  const [changePrevEntrada, setChangePrevEntrada] = useState('');
  const [changePrevSaida, setChangePrevSaida] = useState('');


  useEffect(() => {
    if(dataMeses.data){
      setChangePrevEntrada(dataMeses.data.previsao_entrada);
      setChangePrevSaida(dataMeses.data.previsao_saida);
    }
  },[dataMeses.data])

  const onChangeDescricao = evt => {
    setDescricao(evt.target.value);
  }

  const onChangeValor = evt => {
    setValor(evt.target.value);
  }

  const sleep = time => new Promise(resolve => setTimeout(resolve, time));

  const salvarMovimentacao = async() => {
    if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvar({
         descricao,//: `${descricao}`,
         valor: parseFloat(valor)  
       })
       await sleep(200);
       data.refetch();
       setDescricao('');
       setValor('');
       dataMeses.refetch();
    }
  }

  const removerMovimentacao = async(id) => {
    await remover(`movimentacoes/${match.params.data}/${id}`);
    await sleep(200);
    data.refetch();    
    dataMeses.refetch();
  } 

  return (
    <div className='container'>
      <h2>Movimentações</h2>
      {
        !dataMeses.loading && dataMeses.data &&
        <div>
          Previsão Entrada: 
              <EditInPlace id={match.params.data} value={changePrevEntrada} onChangeValue={setChangePrevEntrada} tipo='entrada' />
          / Previsão Saída:   
              <EditInPlace id={match.params.data} value={changePrevSaida} onChangeValue={setChangePrevSaida} tipo='saida' />
          <br />
          Entradas: <strong>{dataMeses.data.entradas}</strong> / Saídas: <strong>{dataMeses.data.saidas}</strong>
        </div>
      }

      <table className='table'>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          { 
            data.data && 
            Object
              .keys(data.data)
              .map(movimentacao => {
                return (
                  <tr key={movimentacao}>
                    <td>{data.data[movimentacao].descricao}</td>
                    <td>
                      {data.data[movimentacao].valor} {'  '}
                      <button className='btn btn-danger' onClick={() => removerMovimentacao(movimentacao)}>-</button>  
                    </td>
                  </tr>
                )
              })
          }
          <tr>
            <td>
              <input type='text' value={descricao} onChange={onChangeDescricao} /> 
            </td>
            <td> 
              <input type='text' value={valor} onChange={onChangeValor} />{'  '}
              <button className='btn btn-success' onClick={salvarMovimentacao}>+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Movimentacoes;