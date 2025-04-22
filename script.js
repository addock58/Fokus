const html = document.querySelector('html')
const banner = document.querySelector('.app__image')
const musica = new Audio('./assets/aud/luna-rise-part-one.mp3')
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

