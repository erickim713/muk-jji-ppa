/**
* LOGIC
*/

var score = 0;
var playerChoice;
var playerinlead = false;
var cpuinlead = false;
var readable = {
  '0': 'Rock',
  '1': 'Paper',
  '2': 'Scissors'
};

var cpuChoice = {
  init: function() {
    this.store = Math.floor(Math.random() * 3);
    this.text = readable[this.store];
  },
  store: '',
  text: ''
};

var order = [0, 1, 2, 0];

var chooseWinner = function(player, cpu) {
  if(order[player] === order[cpu]) {
    if(playerinlead){
        playerinlead = false;
        score++;
        return "You won!";
    }
    if(cpuinlead){
        cpuinlead = false;
        score--;
        return "You Lost :(";
    }
    if(!playerinlead && !cpuinlead){
        return "continue!";
    }
  }
  if(order[player] === order[cpu + 1]) {
    playerinlead = true;
    cpuinlead = false;
    return "one more :D";
  } else {
    cpuinlead = true;
    playerinlead = false;
    return 'you are close to losing D:';
  }
}

/**
* UI
*/

var paragraph = document.querySelector('p');

var assignClick = function(tag, pos) {
  // assign a click listener
  tag.addEventListener('click', function() {
    // set the players choice
    playerChoice = pos;
    // give feedback to the cpu cpuChoice
    cpuChoice.init();
    paragraph.innerText = 'The computer chose: ' + cpuChoice.text;
    // determine a winner
    // display the winner and the current score
    paragraph.innerText += '\n' + chooseWinner(playerChoice, cpuChoice.store);
    paragraph.innerText += '\n' + 'SCORE: ' + score;
  });
}

var images = {
  tags: document.getElementsByTagName('img'),
  init: function() {
    for(var step = 0; step < this.tags.length; step++) {
      assignClick(this.tags[step], step);
    }
  }
}

images.init();
