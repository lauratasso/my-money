const functions = require('firebase-functions'); //'quando eu salvar, você faz alguma coisa'
const admin = require('firebase-admin'); //'da acesso ao banco realtime database'

admin.initializeApp();  //logar no firebase

exports.soma = functions.database.ref('/movimentacoes/{dia}') //quando escrever ou alterar nessa referencia, a funcao faz algo
  .onWrite(async(change, context) => {   //passa uma funcao assincrona, que tem como parametro a mudanca em si e o contexto da mudança
    const mesesRef = admin.database().ref('/meses/' + context.params.dia);
    const movimentacoesRef = change.after.ref;
    const movimentacoesSS = await movimentacoesRef.once('value');
    const movimentacoes = movimentacoesSS.val();

    let entradas = 0;
    let saidas = 0;

    Object.keys(movimentacoes).forEach( m => {
      if(movimentacoes[m].valor > 0){
        entradas += movimentacoes[m].valor;
      }
      else{
        saidas += movimentacoes[m].valor;
      }
    })

    return mesesRef.transaction(current => {
      if (current === null){
        return {
          entradas,
          saidas,
          previsao_entrada: 0,
          previsao_saida: 0
        }
      }
      return {
        ...current,
        entradas,
        saidas
      }
    })
  })


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
