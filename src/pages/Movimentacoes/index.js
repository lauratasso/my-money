import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMovimentacaoApi } from '../../api';
import InfoMes from './infoMes';
import AddMovimentacao from './AddMovimentacao';

//Aqui, manipula os dados 'descricao' e 'valor' cada hora que add uma nova movimentação
//utilizando o useState. Como ele está dentro de um formulário, chamamos de controlled form
//ou seja, o valor dos estados ficam salvos no componente, sincronizados, e não no DOM


const Movimentacoes = ({ match }) => {
  const { movimentacoes, salvarMovimentacao, removerMovimentacao } = useMovimentacaoApi(match.params.data);
  
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  

  const sleep = time => new Promise(resolve => setTimeout(resolve, time));

  const salvarMovimentacaoClick = async(dados) => {
    await salvarMovimentacao(dados);
    await sleep(200);
    movimentacoes.refetch();
    //   infoMes.refetch();
  }

  const removerMovimentacaoClick = async(id) => {
    await removerMovimentacao(`movimentacoes/${match.params.data}/${id}`);
    await sleep(200);
    movimentacoes.refetch();    
   // infoMes.refetch();
  } 

  if (movimentacoes.error === 'Permission denied') {
    return <Redirect to='/login' />
  }

  return (
    <div className='container'>
      <h2>Movimentações</h2>
      <InfoMes data={match.params.data} />

      <table className='table'>
        <thead className='table-dark'>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          { 
            movimentacoes.data && 
            Object
              .keys(movimentacoes.data)
              .map(movimentacao => {
                return (
                  <tr key={movimentacao}>
                    <td>{movimentacoes.data[movimentacao].descricao}</td>
                    <td>
                      {movimentacoes.data[movimentacao].valor} {'  '}
                      <button className='btn btn-danger' onClick={() => removerMovimentacaoClick(movimentacao)}>-</button>  
                    </td>
                  </tr>
                )
              })
          }
          <AddMovimentacao salvarMovimentacao={salvarMovimentacaoClick} />
        </tbody>
      </table>
    </div>
  );
}

export default Movimentacoes;