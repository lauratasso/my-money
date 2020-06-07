import React from 'react';
import Rest from '../utils/rest';

const baseURL = 'https://mymoney-lbt.firebaseio.com/';
const { useGet, usePost, useDelete } = Rest(baseURL);

export const useMesApi = (data) => {
  const infoMes = useGet(`meses/${data}`);
  return { infoMes }
}

export const useMovimentacaoApi = (data) => {
  const movimentacoes = useGet(`movimentacoes/${data}`);
  const [postData, salvarMovimentacao] = usePost(`movimentacoes/${data}`);
  const [removeData, removerMovimentacao] = useDelete();
  return {movimentacoes, salvarMovimentacao, removerMovimentacao}
}
