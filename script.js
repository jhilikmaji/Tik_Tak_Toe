const cells= document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn=document.querySelector("#restartBtn");
const winConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//set a blank array with 9 blank position for 9 block 
let options = ["","","","","","","","",""];
//set current player or starting player as x
let currentPlayer ="X";
//set running as false to check if the game is stated or not
let running = false ;
initializeGame();
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click",cellClicked))
    //when restart button is clicked restartgame is called
    restartBtn.addEventListener("click", restartGame);
    //status updated as X's turn 
    statusText.textContent =`${currentPlayer}'s turn`;
    running=true;
}
function cellClicked(){
    //to get value of an element (cellindex)
    const cellIndex= this.getAttribute("cellIndex");
    //checking that index is blank or the game is running or not
    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this,cellIndex);
    checkWinner();
}
function updateCell(cell,index){
    //updating current player position 
    options[index]=currentPlayer;
    cell.textContent=currentPlayer;
}
function changPlayer(){
    //changing the player 
    currentPlayer =(currentPlayer == 'X') ? "O" : "X";
    //after changing the player it,s updated whose turn next
    statusText.textContent = `${currentPlayer}'s turn`

}
function checkWinner(){
    let roundWon = false;
    for(let i = 0 ; i <winConditions.length ; i++){
        const condition =winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent =`${currentPlayer} wins!`;
        running=false;
    }
    else if(!options.includes("")){
        statusText.textContent =`Draw`;
        running = false;
    }
    else{
        changPlayer();
    }
}
function restartGame(){
    currentPlayer = "X" ;
    options = ["","","","","","","","",""];
    statusText.textContent=`${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running=true;
}