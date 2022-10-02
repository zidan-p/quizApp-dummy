class UserBar{
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
    getElement(){
        return document.querySelector("#player-"+this.id);
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
}