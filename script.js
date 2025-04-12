let historico = [];
let terminalAlvo = null;

function corNumero(n) {
  if (n === 0) return 'verde';
  const vermelhos = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  return vermelhos.includes(n) ? 'vermelho' : 'preto';
}

function adicionarNumero() {
  const input = document.getElementById('numeroInput');
  const n = parseInt(input.value);
  if (isNaN(n) || n < 0 || n > 36) return alert("Digite um número entre 0 e 36.");

  historico.unshift(n);
  if (historico.length > 50) historico.pop();

  atualizarHistorico();
  input.value = '';
}

function atualizarHistorico() {
  const container = document.getElementById('historico');
  container.innerHTML = '';
  historico.forEach(n => {
    const div = document.createElement('div');
    div.textContent = n;
    div.className = `numero ${corNumero(n)}`;
    container.appendChild(div);
  });
}

function analisar() {
  if (historico.length < 11) return alert("Adicione ao menos 11 números.");
  const ultimo = historico[0];
  const posicoes = [];

  for (let i = 1; i < historico.length; i++) {
    if (historico[i] === ultimo && historico[i - 1] !== undefined) {
      posicoes.push(historico[i - 1] % 10);
      if (posicoes.length >= 10) break;
    }
  }

  if (posicoes.length === 0) {
    document.getElementById('resultado').innerHTML = "<p>Nenhum terminal encontrado após o número atual.</p>";
    return;
  }

  const contagem = {};
  posicoes.forEach(t => contagem[t] = (contagem[t] || 0) + 1);
  const maisFrequente = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0][0];
  terminalAlvo = parseInt(maisFrequente);

  document.getElementById('resultado').innerHTML =
    `<p>Sinal: 2 tentativas no terminal <strong>${terminalAlvo}</strong> (baseado no padrão identificado no número ${ultimo})</p>`;
}