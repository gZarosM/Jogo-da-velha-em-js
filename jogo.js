const tabuleiroContainer = document.getElementById('tabuleiro');
let jogador1 = prompt("Digite o nome do Jogador 1 (X):") || "Jogador 1";
let jogador2 = prompt("Digite o nome do Jogador 2 (O):") || "Jogador 2";
let jogadorAtual = 'X';
let tabuleiroEstado = ['', '', '', '', '', '', '', '', ''];
let jogoAtivo = true;

const statusElemento = document.getElementById('statusJogo');

const combinacoesVitoria = [
    // Linhas
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Colunas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonais
    [0, 4, 8],
    [2, 4, 6]
];

function atualizarStatus() {
    const nomeAtual = jogadorAtual === 'X' ? jogador1 : jogador2;
    statusElemento.innerText = `Vez do jogador: ${nomeAtual}`;
}

function criarTabuleiro() {
    tabuleiroContainer.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i; 

        cell.addEventListener('click', tratarClick);

        tabuleiroContainer.appendChild(cell);
    }
}

function tratarClick(event) {
    const celulaClicada = event.target;
    const indice = celulaClicada.dataset.index;

    if (tabuleiroEstado[indice] !== '' || !jogoAtivo) {
        return;
    }

    tabuleiroEstado[indice] = jogadorAtual;
    celulaClicada.innerText = jogadorAtual;

    verificarVencedor();

    if (jogoAtivo) {
        trocarJogador();
    }
}

function trocarJogador() {
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    atualizarStatus();
}

function verificarVencedor() {
    let venceu = false;

    for (let i = 0; i < combinacoesVitoria.length; i++) {
        const combinacao = combinacoesVitoria[i];
        
        const posA = tabuleiroEstado[combinacao[0]];
        const posB = tabuleiroEstado[combinacao[1]];
        const posC = tabuleiroEstado[combinacao[2]];

        if (posA === '' || posB === '' || posC === '') {
            continue;
        }

        if (posA === posB && posB === posC) {
            venceu = true;
            break;
        }
    }

    if (venceu) {
        const nomeVencedor = jogadorAtual === 'X' ? jogador1 : jogador2;
        statusElemento.innerText = `O jogador ${nomeVencedor} venceu! 🎉`;
        jogoAtivo = false;
        return;
    }

    if (!tabuleiroEstado.includes('')) {
        statusElemento.innerText = 'O jogo empatou (Deu Velha)! 🤝';
        jogoAtivo = false;
    }
}

function botaoReiniciar() {
    const botao = document.getElementById('reiniciarBtn');
    botao.addEventListener('click', reiniciarJogo);
}

function reiniciarJogo() {
    jogadorAtual = 'X';
    tabuleiroEstado = ['', '', '', '', '', '', '', '', ''];
    jogoAtivo = true;
    atualizarStatus();
    criarTabuleiro();
}

botaoReiniciar();
criarTabuleiro();
atualizarStatus();