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


class Lobby{
    // ** DOM container **
    playerContainer
    lobbyContainer

    // ** value data **
    playerList = []
    currentPlayerData //data player yang bermain untuk client ini, nanti akan diberi flag khusus

    constructor(){
        this.playerContainer = document.querySelector('.player-container');
        this.lobbyContainer = document.querySelector('#lobby');
    }

    start(){
        this.setVisibility(true);
    }

    updadatePlayerList(refreshPlayerList){
        // if(this.playerList){
        //     this.playerList.forEach((player,i)=>{
        //         player.setVisibility(false, i * 10);
        //     })
        // }
        this.playerContainer.innerHTML = "";
        this.playerList = [];
        let param;
        setTimeout(()=>{
            refreshPlayerList.forEach((player,i) => {
                param = {
                    username:  player.username, 
                    id : player.id,
                    timeStamp : player.time_stamp,
                    barPercent : player.bar_percent,
                    score : player.score
                }
                this.playerList[i] = new Player(param);
                console.log(this.playerList[i])
                this.playerContainer.append(this.playerList[i].getNode());
                this.playerList[i].setElement();
                this.playerList[i].setVisibility(true, i * 10);
        
            });
        },100)
    }

    setVisibility(is){
        if(is){
            this.lobbyContainer.classList.remove('hidden');
            this.lobbyContainer.classList.add('opacity-0');
            setTimeout(()=>{
                this.lobbyContainer.classList.remove('opacity-0')
            },10);
            return;
        }
        this.lobbyContainer.classList.add('opacity-0');
        setTimeout(()=>{
            this.lobbyContainer.classList.add('hidden')
            this.lobbyContainer.classList.remove('opacity-0');
        },150);
    }

}

class Signup{
    // ** DOM element **
    signupContainer
    inputUsername
    submitUsernameBtn

    constructor(){
        this.signupContainer = document.querySelector('#signup');
        this.inputUsername = this.signupContainer.querySelector('#user-name-input');
        this.submitUsernameBtn = this.signupContainer.querySelector('button');
    }

    start(socket){
        this.setVisibility(true);
        this.submitUsernameBtn.addEventListener('click',(e)=>{
            socket.send(
                JSON.stringify({
                    'type' : 'add_current_player',
                    'expect' : 'get permission for this player to enter lobby | make local storage in client side for this player',
                    'username' : this.inputUsername.value
                })
            )
            this.setVisibility(false);
        })
    }

    setVisibility(is){
        if(is){
            this.signupContainer.classList.remove('hidden');
            this.signupContainer.classList.add('opacity-0');
            setTimeout(()=>{
                this.signupContainer.classList.remove('opacity-0')
            },10);
            return;
        }
        this.signupContainer.classList.add('opacity-0');
        setTimeout(()=>{
            this.signupContainer.classList.add('hidden')
            this.signupContainer.classList.remove('opacity-0');
        },150);
    }
}

class GameStart{
    // ** DOM element **
    questionContainer
    currentPlayerBarContainer
    answerOptionsContainer
    answerOptionsListDOM = []

    // ** data value **
    currentPlayer
    question
    answer
    trueAnswer;

    constructor(){
        this.questionContainer = document.querySelector('#question-container');
        this.answerOptionsContainer = document.querySelector('#answer-option');
        this.answerOptionsListDOM = document.querySelectorAll('.question-option');
        this.currentPlayerBarContainer = document.querySelector('#curren-player-bar');
    }


    //event disini hanya event dummy, jadi skor akan bertambah bila yg dipilih tombol true.
    //kali ini tombol index '1' yg merupakan tombol true
    addEvent(){
        this.answerOptionsListDOM.forEach((answer,i) => {
            if(i == 1){
                this.handleTrueSelect();
            }
        })
    }

    handleTrueSelect(){

    }
}


class Main{
    // ** game object **
    socketGame
    currentPlayer;
    signup;
    lobby;

    // ** data value **
    playerList = []

    constructor(socket){
        this.socketGame = socket;
        this.signup = new Signup();
        this.lobby = new Lobby();

        console.log("socket : ",this.socketGame)
        this.connect(); //buat event listener untuk socket
        
    }

    async start(){
        //cek apakah user ini sudah memiliki cookie / local storage ?
        this.currentPlayer = localStorage.getItem('userData');
        if(!this.currentPlayer){
            this.signup.start(this.socketGame);
            return
        }
        this.handleSocket();
        this.handleUpdateCurrentPlayer({
            time_stamp : new Date().toJSON().replace("T",",").replace('Z',"")
        })
        this.lobby.start();
    }

    connect(){
        //cek konektivitas
        this.socketGame.addEventListener('open', ()=>{
            
            //mulai game
            this.start(this.socketGame);
        })
        //handle bila socket error
        this.socketGame.addEventListener('error',function(e){
            this.handleErrorSocket();
        })
    }

    receiveMessage(){
        this.socketGame.onmessage = (e) => {
            console.log(e)
            let sendData = JSON.parse(e.data)
            console.log("isi pesan socket ::");
            console.log(sendData)
            switch(sendData.type){
                case "update":
                    this.lobby.updadatePlayerList(sendData.refresh_data);
                    break;

                case "start_game":
                    // isi disini
                    window.location = "in-game-quiz.html"
                    break;

                case "get_id" :
                    this.handleNewId({
                        id : sendData.client_id,
                        username : sendData.client_username
                    })
                    this.handleSocket();
                    this.lobby.start();
                    break;

            }
        }
    }

    handleSocket(){
        let currentPlayer = JSON.parse(localStorage.getItem('userData'));
        this.socketGame.send(
            JSON.stringify({
                type : "socket",
                expect : "connect this player to server | update player list every client",
                user_data : currentPlayer
            })
        )
    }

    handleNewId({id, username}){
        localStorage.setItem(
            "userData",
            JSON.stringify({
                "id" : id,
                'username' : username,
                'timeStamp' : new Date().toJSON().replace("T",",").replace('Z',""),
                "barPercent" : 0,
                "score" : 0
            })
        )
    }

    handleUpdateCurrentPlayer({id = 0, username = "", timeStamp = "", barPercent = 0, score = 0}){
        let playerData = JSON.parse(localStorage.getItem("userData"));
        console.log(playerData)
        playerData.id = id || playerData.id;
        playerData.username = username || playerData.username;
        playerData.timeStamp = timeStamp || playerData.timeStamp;
        playerData.barPercent = barPercent || playerData.barPercent;
        playerData.score = score || playerData.score;
        
        console.log(playerData)
        //set local storage
        localStorage.setItem('userData', JSON.stringify(playerData));

        //kirim ke server updatenya
        this.socketGame.send(
            JSON.stringify({
                type : "update_current_player",
                expect : "change this player data in server | refresh all player data in every clients",
                user_data : playerData
            })
        )
    }

    handleErrorSocket(){}

}



const gameSocket = new WebSocket('ws://localhost:3000/');
const game = new Main(gameSocket);
game.receiveMessage()





