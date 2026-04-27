const container = document.getElementById("container");
const continueBtn = document.getElementById("continueBtn");

let wins = parseInt(localStorage.getItem('wins')) || 0;
let Losses = parseInt(localStorage.getItem('Losses')) || 0;
let attempt = parseInt(localStorage.getItem('attempt')) || 0;
let tie = parseInt(localStorage.getItem('tie')) || 0;
function saveGameData() {
    localStorage.setItem('wins', wins);
    localStorage.setItem('Losses', Losses);
    localStorage.setItem('attempt', attempt);
    localStorage.setItem('tie', tie);
}


continueBtn.addEventListener('click', gameList);
function gameList(){
    localStorage.setItem('active', 'gamelist'); 
    container.innerHTML =(`
            <div id="gamesDisplayArea"><nav id="nav1">
        <button id="game1Btn">Game1</button>  </nav>      
      <div id="playArea"></div>    </div>        `)
        const nav1 = document.getElementById("nav1");
        const playArea = document.getElementById("playArea");
        const game1Btn = document.getElementById("game1Btn");
        const game2Btn = document.getElementById("game2Btn");
        game1Btn.addEventListener('click',()=>{
            game1Btn.style.pointerEvents = 'none';
            rock();          
        });}
function rock(){
    localStorage.setItem('active', 'rock'); 
    playArea.innerHTML=(`
        <h2>Rock/Paper/Scissors</h2>
        <h2 id="games1scores"> Attempt${attempt } <br>Scores: Wins${wins} | Losses${Losses} | Tie${tie}</h2>
        <button id="rockBtn">Rock</button>
<button id="paperBtn">Paper</button>
<button id="scissorsBtn">Scissors</button>
<h2 id="game1resultsArea">Try your lack</h2>
<button id="game1resetBtn">Reset</button>
        `)
         const rockBtn = document.getElementById("rockBtn");
          const paperBtn = document.getElementById("paperBtn");
           const scissorsBtn = document.getElementById("scissorsBtn");
            const game1resultsArea = document.getElementById("game1resultsArea");
            const games1scores = document.getElementById("games1scores");
                    const game1resetBtn= document.getElementById("game1resetBtn");
        game1resetBtn.addEventListener('click',reset)
                  rockBtn.onclick =( ()=>{
                    userPlay("ROCK","SCISSORS");
                  });
                  paperBtn.onclick =( ()=>{
                    userPlay("PAPER","ROCK");
                  });
                  scissorsBtn.onclick =( ()=>{
                    userPlay("SCISSORS","PAPER");
                  });


}
function userPlay(play,win){
    localStorage.setItem('active', 'userplay'); 
    attempt++;    
     let randomNum = Math.floor(Math.random() * (3));     
     if(randomNum === 0 ){
        randomNum = "ROCK";
       

     }else
     if(randomNum === 1 ){
        randomNum = "PAPER";
    

     }
     else{
        randomNum = "SCISSORS";
      

     }
     if(play === randomNum){
        tie++;
        game1resultsArea.innerHTML= (`${randomNum} Vs ${play} A Tie <br> 
            Good luck on your next round`);

     }else if(randomNum === win){
        wins++;
        game1resultsArea.innerHTML= (`${randomNum} Vs ${play} You Win🤩🤩🤩`);
        
     }else{
        Losses++;
        game1resultsArea.innerHTML= (`${randomNum} Vs ${play}You Lost😭😭😭 <br> Good luck on your next round`);
     }
     
games1scores.innerHTML= `Attempt${attempt } <br>Scores: Wins${wins} | Losses${Losses} | Tie${tie}`;
saveGameData();


   
}
function reset(){
    localStorage.setItem('active', 'reset'); 
    const finalScore = wins/attempt*100;
    const compwin = Losses/attempt*100;
    const ratio = wins/Losses;
    if(attempt === 0){
        game1resultsArea.innerHTML=(`Try your lack`);
    }else{
        if(wins === 0 && Losses === 0){
            game1resultsArea.innerHTML = (`
                The Game session  had  ${wins} wins & ${Losses} losses
                `)
        }else{
                    if(compwin === finalScore){

            if(attempt > 1){
                game1resultsArea.innerHTML=(`A Tie<br>You Won by ${finalScore.toFixed(2)}% of the ${attempt} attempts<br>Computer Won ${compwin.toFixed(2)}% of the ${attempt} attempts <br>Your: Wins${wins} | Losses${Losses} | Tied${tie}
                <br>Computer: Wins${Losses} | Losses${wins} | Tied${tie}
                `);
            }else{
                 game1resultsArea.innerHTML=(`A Tie<br>You Won by ${finalScore.toFixed(2)}% of the ${attempt} attempts<br>Computer Won ${compwin.toFixed(2)}% of the ${attempt} attempt <br>Your: Wins${wins} | Losses${Losses} | Tied${tie}
                 <br>Computer: Wins${Losses} | Losses${wins} | Tied${tie}
                 `);
            } }else if(compwin > finalScore){
            if(attempt >1){
                 game1resultsArea.innerHTML=(`You Lost<br>Computer Won by${compwin.toFixed(2)}% of the ${attempt} attempts <br> Computer Wins${Losses} | Computer Losses${wins} |  Computer Tied${tie} <br> You had ${wins} Wins`);

            }else{
                 game1resultsArea.innerHTML=(`You Lost<br>Computer Won by ${compwin.toFixed(2)}% of the ${attempt} attempt <br> Computer Wins${Losses} | Computer Losses${wins} |  Computer Tied${tie} <br> You had ${wins} Wins`);
            }                   
        }else{
            if(attempt >1){
                game1resultsArea.innerHTML=(`You Won by ${finalScore.toFixed(2)}% of the ${attempt} attempts<br> Wins${wins} | Losses${Losses} | Tied${tie} <br> Computer had ${Losses} Wins`);

            }else{
                game1resultsArea.innerHTML=(`You Won by ${finalScore.toFixed(2)}% of the ${attempt} attempt<br> Wins${wins} | Losses${Losses} | Tied${tie} <br> Computer had ${Losses} Wins`);
            }                    
        }}  }
 wins = 0;
Losses = 0;
attempt  = 0;
tie = 0
games1scores.innerHTML= `Attempt${attempt } <br>Scores: Wins${wins} | Losses${Losses} | Tie${tie}`;
saveGameData();
}


