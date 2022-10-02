// ## menu lobby ##
let startBtn = document.querySelector('#btn-start');
let lobbyMenu = document.querySelector('#lobby-menu');
let configBtn = document.querySelector('#config-btn');


// ## menu game in ##
let gameMenu = document.querySelector('#game-menu');
let currentQuestionContainer = document.querySelector('#current-question-container');
let currentQuestion = document.querySelector('#question');
let asnwerOptions = document.querySelector('.answer-option'); // ini htmlcollection


// ## menu config ##
let configMenu = document.querySelector('#config-menu');

// ## basic menu ##
let titleGame = document.querySelector('#title-game');
let contentSection = document.querySelector('.content');




/**
 * @description
 * set visibilita suatu elemnt
 * dengan efek slide
 * 
 * @param element {nodeElement} node elemn yg ingin di set
 * @param is {boolean} boolean untuk tipe visibilitas (hide / show)
 */
function setVisibility(element, is){
    if(is){
        element.classList.remove('hidden');
        element.classList.add('slide-in');
        element.classList.add('opacity-0');
        setTimeout(()=>{
            element.classList.remove('slide-in')
            element.classList.remove('opacity-0')
        },10);
        return;
    }
    element.classList.add('slide-out');
    setTimeout(()=>{
        element.classList.add('hidden')
        element.classList.remove('slide-out');
        element.classList.add('slide-in');
    },150);
}

/**
 * @description
 * set visibilita suatu elemnt flex
 * khusu project ini yaitu pertanyaan terkini
 * 
 * @param element {nodeElement} node elemn yg ingin di set
 * @param is {boolean} boolean untuk tipe visibilitas (hide / show)
 */
function setVisibilityFlex(element, is){
    if(is){
        element.classList.remove('hidden');
        element.classList.add('basis-1/12');
        element.classList.add('opacity-0');
        setTimeout(()=>{
            element.classList.remove('basis-1/12');
            element.classList.remove('opacity-0');
        },10);
        return;
    }
    element.classList.add('slide-out');
    setTimeout(()=>{
        element.classList.add('hidden')
    },150);
}

/**
 * @description
 * mengubah dari view lobby menjadi view game 
 */
function changeToGame(){
    //visibilitas elemnt menu
    setVisibility(lobbyMenu, false)
    setTimeout(()=>{
        setVisibility(gameMenu, true);
    },150);
    setVisibilityFlex(currentQuestionContainer, true)
    
    //mengubah konten teks
    titleGame.innerHTML = "Game Berlangsung!!";
    contentSection.querySelector('h3').innerHTML = "Daftar Pemain : ";

    //memberi efek tertentu untuk content section
    contentSection.style.border = "1px solid #0284c7";
}

/**
 * @brief
 * untuk menampilkan menu config
 */
function changeToConfig(){
    //perubahan visibilitas menu
    setVisibility(lobbyMenu, false);
    setTimeout(() => {
        setVisibility(configMenu, true);
    }, 150);
}

function setScoreBar(val){
    let bars = contentSection.querySelectorAll('.player');
    let arrBars =  Array.from(bars);
    console.log(arrBars)
    console.log(bars)
    let percent
    arrBars.forEach(bar => {
        percent = 100 - Math.ceil(val);
        bar.style.backgroundImage = `linear-gradient(130deg, white ${percent}%,#0ea5e9,#0284c7,#0057a3)`;
    })
}

//pindah ke menu in game
startBtn.addEventListener('click', (e) => {
    changeToGame();
})

//pindah ke menu config
configBtn.addEventListener('click', (e)=>{
    changeToConfig();
})

//untuk test
// let test = 10;
// otherBtn.addEventListener('click', (e) => {
//     setScoreBar(test);
//     test += 10 ;
//     console.log("bar telah diubah")
//     console.log("test : ", test);
// });

