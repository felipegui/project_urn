//Seleciona os items na tela da urna (Variáveis de controle de interface)
let yourVoteFor = document.querySelector('.upside-1 span');

let position = document.querySelector('.upside-2 span');

let description = document.querySelector('.upside-4');

let notification = document.querySelector('.bottom');

let side = document.querySelector('.upside-right');

let numbers = document.querySelector('.upside-3');

//Variáveis de controle de ambiente
//Etapa atual
let currentStep = 0;
let number = '';

//"Limpa" a tela, depois preenche a tela com as respectivas etapas atuais.
function startStep() {
    let phase = phases[currentStep];

    let numberHtml = '';

    for( let i=0; i<phase.numbers; i++ ) {
        if( i==0 ) {
            numberHtml = '<div class="number blink"></div>';
        } else {
            numberHtml += '<div class="number"></div>';
        }    
    }

    yourVoteFor.style.display = 'none';

    position.innerHTML = phase.title;

    description.innerHTML = '';

    notification.style.display = 'none';

    side.innerHTML = '';

    numbers.innerHTML = numberHtml;
}

//Função para atualizar a tela
function updateInterface() {
    let phase = phases[currentStep];

    let candidate = phase.candidates.filter((item)=>{
        if( item.number == number ) {
            return true;
        } else {
            return false;
        }
    });
    if( candidate.length > 0 ) {
        candidate = candidate[0];

        yourVoteFor.style.display = 'block';

        notification.style.display = 'block';

        description.innerHTML = `Nome: ${candidate.name}</br>Partido: ${candidate.party}`;        

        let photosHtml = '';
        for( let i in candidate.photos ) {
            photosHtml += `<div class="upside-img"><img src="assets/images/${candidate.photos[i].url}" alt=""/>${candidate.photos[i].legend}</div>`; 
        }

        side.innerHTML = photosHtml;

    } else {
        yourVoteFor.style.display = 'block';

        notification.style.display = 'block';

        description.innerHTML = `<div class="notification-big blink">O NÚMERO PARA PRESIDENTE NÃO EXISTE!</div>`;
    }
}

//Ações nos botões
function clicked(n) {
    let numberBlink = document.querySelector('.number.blink');

    if( numberBlink != null ) {
        numberBlink.innerHTML = n;

        number = `${number}${n}`;

        numberBlink.classList.remove('blink');

        if( numberBlink.nextElementSibling != null ) {
            numberBlink.nextElementSibling.classList.add('blink');
        } else {
            updateInterface();
        }
    }
}

function white() {
    alert("Clicou no BRANCO");
}

function corrects() {
    alert("Clicou em CORRIGE");
}

function affirm() {
    alert("Clicou em CONFIRMAR");
}

startStep();