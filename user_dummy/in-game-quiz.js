class Player{
    // ** DOM container **
    playerDOM

    // ** data value **
    username
    id
    timeStamp
    barPercent
    nodeElement
    score

    constructor({username = "unknow", id=0, timeStamp = "00.00.00", barPercent = 0, score = 0}){
        this.username = username;
        this.id = id;
        this.timeStamp = timeStamp;
        this.barPercent = barPercent;
        this.score = score;
    }

    //untuk mendaapat elemnt dari halaman
    setElement(){
        this.playerDOM = document.querySelector("#player-"+this.id)
    }

    //untuk membuat node
    getNode(){
        let percent = 100 - Math.ceil(this.barPercent)
        let el = document.createElement("DIV");
        el.innerHTML = `
        <div id="player-${this.id}" class="player hidden relative w-full flex border rounded py-2 px-2 justify-between transition-all"
            style="background-image: linear-gradient(130deg, white ${percent}%,#0ea5e9,#0284c7,#0057a3)"
        >
            <div class="inline-flex gap-2 content-center items-center"> 
                <div class="p-2 h-full rounded-full bg-slate-500"><!--icon-->
                <svg class="h-full w-5 stroke-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                </div>
                <div class=""> 
                <p class="font-bold text-sm">${this.username}</p>
                <div class="inline-flex gap-8">
                    <p class="font-light text-sm">#${this.id}</p> <!--id pemain-->
                    <p class="font-light text-sm">
                    <svg class="inline w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    ${this.timeStamp}
                    </p>
                </div>
                </div>
            </div>
            <div class="score self-center">
                <h3 class="text-white text-4xl">${this.score}</h3>
            </div>
        </div>
        `
        return el;
    }

    setVisibility(is, diff = 0){
        if(is){
            this.playerDOM.classList.remove('hidden');
            this.playerDOM.classList.add('slide-in');
            this.playerDOM.classList.add('opacity-0');
            setTimeout(()=>{
                this.playerDOM.classList.remove('slide-in')
                this.playerDOM.classList.remove('opacity-0')
            },10 * diff);
            return;
        }
        this.playerDOM.classList.add('slide-out');
        setTimeout(()=>{
            this.playerDOM.classList.add('hidden')
            this.playerDOM.classList.remove('slide-out');
        }, 150);
    }
}

class GameStartSocket{
    socket
    currentPlayer

    constructor(socket){
        this.socket = socket;
        this.checkConectivityEvent();
        this.getCurrentPlayer();
    }

    checkConectivityEvent(){
        this.socket.onopen = (e) =>{
            console.log("-------- sudah terhubung dengan web socket ---------");
        }
        this.socket.onerror = (e) => {
            console.error("------ sokcet sedang error -------")
            this.handleError()
        }
    }

    //dapatkan player saat ini ke dalam properti
    getCurrentPlayer(){
        this.currentPlayer =JSON.parse(localStorage.getItem('userData'))
        return this.currentPlayer;

        //yg dibawah bersifat opsional
        //if(!this.player) window.location = 'homeurl.html'
    }

    //untuk send score
    sendScore(score){
        this.handleUpdateCurrentPlayer({score : score, barPercent : this.currentPlayer.barPercent + 10}, "score");
    }

    //untuk mengupdate data player, entah di local atau serve
    //karena sangat bingung jadi bisa di hilangkan saja ini
    handleUpdateCurrentPlayer({id = 0, username = "", timeStamp = "", barPercent = 0, score = 0}, change = "optional"){
        let playerData = JSON.parse(localStorage.getItem("userData"));
        playerData.id = id || playerData.id;
        playerData.username = username || playerData.username;
        playerData.timeStamp = timeStamp || playerData.timeStamp;
        playerData.barPercent = barPercent || playerData.barPercent;
        playerData.score = score || playerData.score;
        
        //set local storage
        localStorage.setItem('userData', JSON.stringify(playerData));

        //kirim ke server updatenya
        this.socket.send(
            JSON.stringify({
                type : "update_current_player",
                change : change,
                expect : "change this player data in server | refresh all player data in every clients",
                user_data : playerData
            })
        )
    }

    //isikan handle error disini....
    //atau bisa dikosongi
    handleError(){}

}



let playerBarContainer = document.querySelector('#current-player-bar');
let questionConatiner = document.querySelector('#question-container');
let answerOptionsConatiner = document.querySelector('#answer-option');
let answerListDom = document.querySelectorAll('.question-option');

// ** object object **
let socket = new WebSocket("ws://localhost:3000/");
let game = new GameStartSocket(socket);
let playerBar = new Player(game.getCurrentPlayer()); //object bar player

//ini bersifat opsional 
playerBarContainer.append(playerBar.getNode());
playerBar.setElement();
playerBar.setVisibility(true)


console.log(answerListDom);
answerListDom[1].addEventListener('click', (e) => {
    console.log('tombol true telah ditekan');

    game.sendScore(game.currentPlayer.score + 10);
    refreshPlayer();
})

function refreshPlayer(){
    playerBarContainer.innerHTML = "";
    playerBar = new Player(game.getCurrentPlayer())

    playerBarContainer.append(playerBar.getNode());
    playerBar.setElement();
    playerBar.setVisibility(true)
}

game.socket.onmessage = (e) => {
    let data = JSON.parse(e.data);
    console.log(data)
}

















