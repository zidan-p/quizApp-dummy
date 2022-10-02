let startBtn = document.querySelector('#btn-start');
let titleGame = document.querySelector('#title-game');
let lobbyMenu = document.querySelector('#lobby-menu');
let gameMenu = document.querySelector('#game-menu');
let contentSection = document.querySelector('.content');
let otherBtn = document.querySelector('#other-btn');


/**
 * 
 * @param {*} is boolean untuk menetukan visibilitas menu game
 * @returns 
 */
function showGameMenu(is){
    if(is){
        gameMenu.classList.remove('hidden');
        setTimeout(()=>gameMenu.classList.remove('slide-in'),10);
        return;
    }
    gameMenu.classList.add('slide-out');
    setTimeout(()=>{
        gameMenu.classList.add('hidden')
        gameMenu.classList.remove('slide-out');
        gameMenu.classList.add('slide-in');
    },150);
}

/**
 * 
 * @param {*} is boolean untuk memntukan visibilitas game
 * @description juga memberikan pula beberapa effect transisi perubahan
 * @returns 
 */
function showLobbyMenu(is){
    if(is){
        lobbyMenu.classList.remove('hidden');
        setTimeout(()=>lobbyMenu.classList.remove('slide-in'),10);
        return;
    }
    lobbyMenu.classList.add('slide-out');
    setTimeout(()=>{
        lobbyMenu.classList.add('hidden')
        lobbyMenu.classList.remove('slide-out');
        lobbyMenu.classList.add('slide-in');
    },150);
}

/**
 * @description
 * mengubah dari view lobby menjadi view game 
 */
function changeToGame(){
    //visibilitas menu
    showLobbyMenu(false);
    setTimeout(()=>showGameMenu(true),150);

    //mengubah konten teks
    titleGame.innerHTML = "Game Berlangsung!!";
    contentSection.querySelector('h3').innerHTML = "Daftar Pemain : ";

    //memberi efek tertentu untuk content section
    contentSection.style.border = "1px solid #0284c7";
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

startBtn.addEventListener('click', (e) => {
    changeToGame();
    
})

//untuk test
let test = 10;
otherBtn.addEventListener('click', (e) => {
    setScoreBar(test);
    test += 10 ;
    console.log("bar telah diubah")
    console.log("test : ", test);
});

