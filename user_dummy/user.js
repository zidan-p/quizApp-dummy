let formName = document.querySelector("#form-name")
let nameInput = document.querySelector("#user-name-input");
let playerContainer = document.querySelector(".player-container");
let updateBtn = document.querySelector('#update-btn');
let websocket_server = new WebSocket("ws://localhost:3000/");
let userName; //untuk username client ini
let playerList = []; //daftar player untuk lobby object
let playerNodes = document.querySelector('.player');
const tempId = makeid(10);
const id = tempId

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
   }
   return result;
}




//kirim username
formName.addEventListener("submit", (e)=>{
    e.preventDefault();
    userName = nameInput.value;
    websocket_server.send(
        JSON.stringify({
            'type' : 'socket',
            'expect' : 'get_cokies',
            'user_data' : {
                "id" : null,
                'username' : userName,
                'time_stamp' : new Date().toJSON().replace("T",",").replace('Z',""),
                "bar_percent" : 0,
                "score" : 0
            }
        })
    )
})


//dapatkan respon dari server
websocket_server.onmessage = (e)=>{
    let sendData = JSON.parse(e.data);
    console.log(sendData);
    console.log(sendData.refresh_data);

    switch(sendData.type){
        case "update":
            updateLobby(sendData.refresh_data)
            break;

        case "set_cookie":
            updateLobby(sendData.refresh_data)
            break;
    }
}

//melakukan update data tertentu
//sudah dicek, hasilnya bisa
//data dibawah hanya data dummy
updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    websocket_server.send(
        JSON.stringify({
            'type': 'update',
            'user_id': id,
            'expect' : 'update_data',
            'user_data' : {
                "id" : id,
                "username" : userName,
                "time_stamp" : new Date().toJSON().replace("T",","),
                "bar_percent" : 0,
                "score" : 0
            }
        })
    );
})


//update user lobby
//data dari web socket di ambil dan
//digunakan untuk refresh
function updateLobby(dat){
    console.log("ini adlaah console.log dari update lobby ---->")
    console.log(dat)
    if(playerNodes){
        playerNodes.forEach((el,i)=>{
            setVisibility(el, false, i*9+9)
        })
    }
    playerContainer.innerHTML = ""
    playerList = [];
    
    setTimeout(()=>{
        dat.forEach((dt,i) => {
            param = {
                username:  dt.username, 
                id : dt.id,
                timeStamp : dt.time_stamp,
                barPercent : dt.bar_percent,
                score : dt.score
            }
            playerList[i] = new UserBar(param);
            playerContainer.append(playerList[i].getNode());
            //set visibility
            setVisibility(playerList[i].getElement(), true, i * 9);
    
        });
    },100)
}


function setVisibility(element, is, diff = 1){
    if(is){
        element.classList.remove('hidden');
        element.classList.add('slide-in');
        element.classList.add('opacity-0');
        setTimeout(()=>{
            element.classList.remove('slide-in')
            element.classList.remove('opacity-0')
        },10 * diff);
        return;
    }
    element.classList.add('slide-out');
    setTimeout(()=>{
        element.classList.add('hidden')
        element.classList.remove('slide-out');
    }, 150);
}


function goToLobby(){

}


function main(){
    
}









