// javascript for play the game. 

      // const score = {
      //   wins : 0,
      //   loses : 0,
      //   ties : 0
      // }
      let score = JSON.parse(localStorage.getItem('score')) || {
        wins : 0,
        loses : 0,
        ties : 0
      };

    /*
    if(!score){  // score === nul
      score = {
        wins : 0,
        loses : 0,
        ties : 0
      }
    } */


    updateScoreElement();     
    
    let isAutoPlaying = false;
    let intervalId;

    function autoPlay() {
      if(!isAutoPlaying){
        intervalId = setInterval(function(){
          const playerMove = pickComputerMove();
          playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
      } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
      }      
    }

    document.querySelector('.js-rock-button').addEventListener('click', () => {
      playGame('Rock');
    })
    
    document.querySelector('.js-paper-button').addEventListener('click', () => {
      playGame('Paper');
    })

    document.querySelector('.js-scissors-button').addEventListener('click', () => {
      playGame('Scissors');
    })
  
    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playGame('Rock');
      } else if (event.key === 'p') {
          playGame('Paper');
        } else if (event.key === 's') {
          playGame('Scissors');
        }
      }
    )

    function playGame(playerMove){
      
      computerMove = pickComputerMove();

      let result = '';
      //compare the move with player move
      if(playerMove === 'Scissors'){
      
        //compare the move with random computer move

        if(computerMove === 'Paper'){
          result = 'You Win.';
        } else if(computerMove === 'Rock'){
          result = 'You Lose.';
        } else if(computerMove === 'Scissors'){
          result = 'Tie.';
        }

      } else if(playerMove === 'Paper'){

      computerMove = pickComputerMove();

      result = '';
      
      if(computerMove === 'Paper'){
        result = 'Tie.';
      } else if(computerMove === 'Rock'){
        result = 'You Win.';
      } else if(computerMove === 'Scissors'){
        result = 'You Lose.';
      }
     
    } else if(playerMove === 'Rock'){
       computerMove = pickComputerMove();

      result = '';

      if(computerMove === 'Rock'){
        result = 'Tie.';
      } else if(computerMove === 'Paper'){
        result = 'You Lose.';
      } else if(computerMove === 'Scissors'){
        result = 'You Win.';
      }

    } //end of comarision between two move

    //score updation 
    if(result === 'You Win.'){
      score.wins += 1;
    } else if(result === 'You Lose.'){
      score.loses += 1;
    } else if(result === 'Tie.'){
      score.ties += 1;
    }

    // set the score to the local storage

    localStorage.setItem ('score', JSON.stringify(score));

    updateScoreElement();
    
          document.querySelector('.js-result').innerHTML = result;

    // display the output with updated score 

    document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" alt="${playerMove}-emoji" class="move-icon"> 
    <img src="images/${computerMove}-emoji.png" alt="${computerMove}-emoji" class="move-icon"> Computer`;

      
  }


  function updateScoreElement(){
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`
  }

    // random pick generate by computer

    function pickComputerMove(){
      randomNumber = Math.random();
      computerMove = '';

      if(randomNumber > 0 && randomNumber < 1/3) {
        computerMove = 'Rock';
      } else if(randomNumber > 1/3 && randomNumber < 2/3) {
        computerMove = 'Paper';
      } else if(randomNumber > 2/3 && randomNumber < 1){
        computerMove = 'Scissors';
      }
      return computerMove;
    }