const html = document.querySelector('html')
const banner = document.querySelector('.app__image')
const btn_startPause = document.getElementById('start-pause')

const musica = new Audio('./assets/aud/luna-rise-part-one.mp3')
const audioPlay = new Audio('./assets/aud/play.wav')
const audioPause = new Audio('./assets/aud/pause.mp3')
const audioFim = new Audio('./assets/aud/beep.mp3')

let tempoEmSegundos = 5
let intervalo = null


musica.loop = true

//Adicionando o evento de clique no botão de foco, curto e longo
document.querySelectorAll('.app__card-button').forEach(btn => {
    btn.addEventListener('click', () => {
        alterContext(btn.getAttribute('data-contexto'))
        activeBtn(btn)
    })
})

//Adicionando o evento ativar musica de fundo
document.getElementById('alternar-musica').addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    }
    else {
        musica.pause()
    }
})

function alterContext (contexto) {
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./assets/img/${contexto}.png`)

    const titulo = document.querySelector('.app__title')
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
    
        default:
            break;
    }
}

function activeBtn (button) {
    document.querySelectorAll('.app__card-button').forEach(btn => {
        btn.classList.remove('active')
    })

    button.classList.add('active')
}

// Adicionando o evento de clique no botão de iniciar/pausar temporizador
btn_startPause.addEventListener('click', temporizador)

function temporizador () {
    if (intervalo) {
        zerarIntervalo()
        play_pause('pause')
        return
    } else {
        play_pause('play')
    }
    intervalo = setInterval(() => {
        if (tempoEmSegundos <= 0) {
            play_pause('stop')
            alert('O tempo acabou!')
            zerarIntervalo()
            return
        }
        tempoEmSegundos -= 1
        console.log(tempoEmSegundos)}, 1000)
}

function zerarIntervalo () {
    clearInterval(intervalo)
    intervalo = null
}

function play_pause (value) {
    const spamBtn = btn_startPause.querySelector('span')
    const imgBtn = btn_startPause.querySelector('img')

    switch (value) {
        case 'play':
            spamBtn.textContent = 'Pausar'
            imgBtn.setAttribute('src', './assets/img/pause.png')
            audioPlay.play()
            break;
        case 'pause':
            spamBtn.textContent = 'Continuar'
            imgBtn.setAttribute('src', './assets/img/play_arrow.png')
            audioPause.play()
            break;
        case 'stop':
            spamBtn.textContent = 'Começar'
            imgBtn.setAttribute('src', './assets/img/play_arrow.png')
            // audioFim.play()
            break;
    }
}