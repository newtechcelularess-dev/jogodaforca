const botao = document.querySelector('.botao');
const display = document.querySelector('.display');
const forca = document.querySelector('.forca');
const traco7 = document.querySelector('.traco7');
const traco8 = document.querySelector('.traco8');
const l1 = document.querySelector('.l1');
const l2 = document.querySelector('.l2');
const l3 = document.querySelector('.l3');
const l4 = document.querySelector('.l4');
const l5 = document.querySelector('.l5');
const l6 = document.querySelector('.l6');
const l7 = document.querySelector('.l7');
const l8 = document.querySelector('.l8');


const slots = [l1, l2, l3, l4, l5, l6, l7, l8];

const palavras = [
    "ABAFADO", "ABERTAS", "ABISMO", "ABRIGAR", "ABRUPTO", "ABSURDO", "ACORDAR", "ADITIVO",
    "ADOTADO", "ADULTO", "AFASTAR", "AFERIDO", "AGENCIA", "AGITAR", "AGRADAR", "AGRESTE",
    "AJUDANTE", "ALECRIM", "ALFACE", "ALUGUEL", "ALVORADA", "AMARELA", "AMIZADES", "AMOSTRA",
    "ANDARES", "ANOTADO", "ANUNCIO", "APELIDO", "APERTAR", "APOSTA", "AQUÁRIO",
    "ARMÁRIO", "ARQUIVO", "ARTISTA", "ASFALTO", "ASSUNTO", "ATITUDE", "ATLETA", "ATROPELO",
    "AUSENTE", "AVENIDA", "AZEITONA", "BACALHAU", "BAGAGEM", "BAIXADA", "BALADA",
    "BANDEIRA", "BARALHO", "BARRIGA", "BARULHO", "BATIDA", "BATIZADO", "BATUQUE", "BEBIDA",
    "BELICHE", "BESOURO", "BEZERRO", "BIBLIA", "BICICLETA", "BISCOITO", "BOCEJO", "BOLACHA",
    "BOLOLÔ", "BONECO", "BORDADO", "BOTECO", "BRINDES", "BROCHE", "BUEIRO",
    "BUZINA", "CAATINGA", "CABRITO", "CAÇADOR", "CACHORRO", "CADERNO", "CAJUEIRO", "CAMADA",
    "CANUDO", "CAPITULO", "CAPSULA", "CARACOL", "CARAMELO", "CARDÁPIO", "CARRETA", "CARTILHA",
    "CASTELO", "CATRACA", "CEBOLA", "CENOURA", "CERTEZA", "CERVEJA", "CHICOTE", "CHINELO",
    "CHUPETA", "CHUVEIRO", "CILADA", "CINZEIRO", "CLAREZA", "CLIENTE", "COITADO",
    "COLAGEM", "COLHEITA", "COLUNA", "COMETA", "COMIDA", "CONVERSA", "COPINHO", "CORAGEM",
    "COSTELA", "COSTUME", "COZINHA", "CUIDADO", "CURIOSO", "DEFEITO", "DEPÓSITO", "DESERTO"
];

let jogoAtivo = false;
let palavra = '';
let numeErr = 0;
let letrasUsadas = [];

botao.addEventListener('click', function (e) {
    e.preventDefault();
    reinicia();
    selPalavra();
    infoDisplay(palavra.length);
    jogoAtivo = true;
});


function selPalavra() {
    palavra = palavras[Math.floor(Math.random() * palavras.length)];

}

function infoDisplay(qnt) {

    display.innerText = `${qnt} Letras`;
    display.animate([
        { fontSize: '60px' },
        { fontSize: '120px' }
    ], {
        duration: 1600,
        delay: 200,
        fill: 'forwards'
    });

    traco7.style.backgroundColor = 'rgb(255,255,255)';
    traco8.style.backgroundColor = 'rgb(255,255,255)';

    if (qnt === 6) {
        traco7.style.backgroundColor = 'rgb(0,255,255)';
        traco8.style.backgroundColor = 'rgb(0,255,255)';
    }
    if (qnt === 7) {
        traco8.style.backgroundColor = 'rgb(0,255,255)';
    }
}
window.addEventListener('keydown', function (event) {
    if (!jogoAtivo) return;
    const tecla = event.key.toUpperCase();
    if (tecla.length === 1 && tecla.match(/[a-z]/i)) {
        verificarLetra(tecla);
    }
});

function verificarLetra(dig) {
    if (!jogoAtivo) return;
    if (letrasUsadas.includes(dig)) {
        return;
    }
    letrasUsadas.push(dig);
    let encontrou = false;

    for (let i = 0; i < palavra.length; i++) {

        if (palavra[i] === dig) {
            slots[i].innerText = dig;
            encontrou = true;
        }
    }
    if (encontrou) {
        acertou();
        verificarVitoria();
    } else {
        contarErros();
        errou();

    }
};
function reinicia() {
    jogoAtivo = false;
    letrasUsadas = [];
    slots.forEach(slot => {
        slot.innerText = '';

    });
    const partes = document.querySelectorAll('.boneco');
    partes.forEach(parte => parte.remove());
    numeErr = 0;
    display.innerText = '';
    // display.getAnimations().forEach(anim => anim.cancel());
}
const sons = {
    acertou: new Audio('acertou.mp3'),
    errou: new Audio('errou.mp3'),
    venceu: new Audio('venceu.mp3'),
    perdeu: new Audio('perdeu.mp3')
};

function tocarSom(tipo) {
    const som = sons[tipo];
    som.currentTime = 0;
    som.play();

}
function contarErros() {
    numeErr++;
    if (numeErr === 1) erro1();
    else if (numeErr === 2) erro2();
    else if (numeErr === 3) erro3();
    else if (numeErr === 4) erro4();
    else if (numeErr === 5) erro5();
    else if (numeErr === 6) {
        erro6();
        perdeu();
    }

}

function acertou() {
    
    tocarSom('acertou')
    display.innerHTML = `
    <div class="sucesso">
    <div class="v-neon"></div>
    </div>
`;
}


function errou() {

    tocarSom('errou');
    if (numeErr < 6) {
        display.innerHTML = `
    <div class="erro">
    <div class="x-neon"></div>
    </div>
`;
    }
}
function verificarVitoria() {

    let palavraAtual = '';

    for (let i = 0; i < palavra.length; i++) {
        palavraAtual += slots[i].innerText;
    }
    if (palavraAtual === palavra) {
        venceu();
    }
}

function venceu() {

    tocarSom('venceu');
    display.innerHTML = `<span class="mensagem-final vitoria">VC VENCEU</span>`;
    jogoAtivo = false;
}

function perdeu() {
    tocarSom('perdeu');
    display.innerHTML = `<span class="mensagem-final derrota">VC PERDEU</span>`;
    jogoAtivo = false;
}


function erro1() {
    forca.insertAdjacentHTML('beforeend', `
      <img class="cabeca boneco" src="cabeca.png" alt="">
    `);
}
function erro2() {
    forca.insertAdjacentHTML('beforeend', `
    <div class="corpo boneco"></div>
    `);
}
function erro3() {
    forca.insertAdjacentHTML('beforeend', `
    <div class="bracoDir boneco"></div>
    `);
}
function erro4() {
    forca.insertAdjacentHTML('beforeend', `
    <div class="bracoEsq boneco"></div>
    `);
}
function erro5() {
    forca.insertAdjacentHTML('beforeend', `
    <div class="pernaDir boneco"></div>
    `);
}
function erro6() {
    forca.insertAdjacentHTML('beforeend', `
    <div class="pernaEsq boneco"></div>
    `);
}

