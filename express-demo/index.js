let score = 0;
let timeLimit = 100;
let level = 0;
let scoreLimit = 5;



const snakeboard = document.getElementById("snakeboard");
const snakeboard2d = snakeboard.getContext("2d");
let startBtn = document.getElementById('startBtn');
let endBtn = document.getElementById('endBtn');
let endScreen = document.getElementById('endScreen');  





function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}


// velocity
let dx = 10;
let dy = 0;

// move snake
window.addEventListener('keydown', (event) => {
  switch (event.key) {
      case 'ArrowRight' :
          snakeHead.lastKey = 'ArrowRight';
          if (snakeHead.lastKey = 'ArrowRight' && !(dx < 0)) {
            dx = 10;
            dy = 0;
          }
          break;
      case 'ArrowLeft' :
          snakeHead.lastKey = 'ArrowLeft';
          if (snakeHead.lastKey = 'ArrowLeft' && !(dx > 0)) {
            dx = -10;
            dy = 0;
          }
          break;
      case 'ArrowUp' :
          snakeHead.lastKey = 'ArrowUp';
          if (snakeHead.lastKey = 'ArrowUp' && !(dy > 0)) {
            dx = 0;
            dy = -10;
          }
          break; 
      case 'ArrowDown' :
          snakeHead.lastKey = 'ArrowDown';
          if (snakeHead.lastKey = 'ArrowDown' && !(dy < 0)) {
            dx = 0;
            dy = 10;
          }
          break; 
  }
});

let scale = 10
// render
class Sprite {
  constructor({position, imageSrc}) {
    this.position = position;
    this.image = new Image();
    this.snake = [{ x: this.position.x , y: this.position.y }];
    this.image.src = imageSrc;
    this.lastKey;
  }
  
  draw() {
    snakeboard2d.drawImage(this.image, this.position.x, this.position.y);
  }

  drawSnake() {
    for (let i = 0; i < snakeHead.snake.length; i++) {
      snakeboard2d.beginPath();
      snakeboard2d.fillStyle = 'black';
      snakeboard2d.arc(this.snake[i].x + 5, this.snake[i].y + 5, 5, 0, Math.PI * 2, false);
      snakeboard2d.fill();
      snakeboard2d.closePath();
    }
    // eyes
    snakeboard2d.beginPath();
        if(dy < 0) {
            snakeboard2d.arc(this.snake[0].x +(scale/5), this.snake[0].y +(scale/5), scale/8, 0, 2 * Math.PI);
            snakeboard2d.arc(this.snake[0].x +scale-(scale/5), this.snake[0].y +(scale/5), scale/8, 0, 2 * Math.PI);        }
        else if(dy > 0) {
            snakeboard2d.arc(this.snake[0].x +(scale/5), this.snake[0].y +scale-(scale/5), scale/8, 0, 2 * Math.PI);
            snakeboard2d.arc(this.snake[0].x +scale-(scale/5), this.snake[0].y +scale-(scale/5), scale/8, 0, 2 * Math.PI);
        }
        else if(dx < 0) {
            snakeboard2d.arc(this.snake[0].x +(scale/5), this.snake[0].y +(scale/5), scale/8, 0, 2 * Math.PI);
            snakeboard2d.arc(this.snake[0].x +(scale/5), this.snake[0].y +scale-(scale/5), scale/8, 0, 2 * Math.PI);
        }
        else if(dx > 0){
          snakeboard2d.arc(this.snake[0].x +scale-(scale/5), this.snake[0].y +(scale/5), scale/8, 0, 2 * Math.PI);
          snakeboard2d.arc(this.snake[0].x +scale-(scale/5), this.snake[0].y +scale-(scale/5), scale/8, 0, 2 * Math.PI);
        }
        snakeboard2d.fillStyle = "white";
        snakeboard2d.fill();
  }

  moveSnake() {
    const head = {x: this.snake[0].x + dx, y: this.snake[0].y + dy};
    this.snake.unshift(head);
    this.snake.pop();
  }
  
  drawFood() {
    snakeboard2d.drawImage(this.image, this.position.x, this.position.y, 10, 10);
  }

}

const snakeHead = new Sprite({
  position: {
    x: 100,
    y: 100
  },
  imageSrc: ''
});

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/green.jpeg'
});

const food = new Sprite({
  position: {
    x: 300,
    y: 300
  },
  imageSrc: './img/mice.png'
});

function gen_food() {
// if the new food location is where the snake currently is, generate a new food location
  food.position.x = random_food(0, snakeboard.width - 10);
  food.position.y = random_food(0, snakeboard.height - 10);
}

//check snake's collision 
function checkCollision() {
  let tailCollision=false;
  let boundaryCollision=false;
  //with its own tail
  for (let i = 1; i < snakeHead.snake.length; i++) {
      if (snakeHead.snake[0].x == snakeHead.snake[i].x && snakeHead.snake[0].y == snakeHead.snake[i].y && snakeHead.snake.length>3) {
          tailCollision=true;
      }
  }
  //with boundaries
  if(snakeHead.snake[0].x >= snakeboard.width || snakeHead.snake[0].x < -0.5 || snakeHead.snake[0].y >= snakeboard.height || snakeHead.snake[0].y < -0.5)
  {
      boundaryCollision=true;
  }
 
  return (tailCollision || boundaryCollision);
}

function init() {
  snakeHead.snake = [{ x: snakeHead.position.x , y: snakeHead.position.y }]
  
  scoreLimit = 5;
  score = 0;
  level = 0;
  food.position.x;
  food.position.y;
  dx = 10;
  dy = 0;

  gen_food();
}

// Start the game when start button clicked
  $('#startBtn').click(function() {
    console.log('in animate')
    if ($('#playerName1').val() !== ''){
      startScreen.style.display = 'none';
      endScreen.style.display = 'none';
      document.getElementById('score').innerHTML = 0;
      document.getElementById('level').innerHTML = 0;
      timeLimit = 100;
      init();
      animate();
    }
    let name = $('#playerName1').val();
    document.getElementById('name').innerHTML = name;
  })


//start the game again when 'play again' button clicked
endBtn.addEventListener('click', () => {
  startScreen.style.display = 'block';
})

// level up
function level_up() {
  if (score == scoreLimit) {
    console.log(`you've leveled up!`);
    scoreLimit += 5;
    level += 1;
    document.getElementById('level').innerHTML = level;
    score = 0;
    document.getElementById('score').innerHTML = score;
    timeLimit -= 40;
  }
}
level_up();

function gameEnd() { 
  var playerName = $('#playerName1').val();
  var jsonString = {playerName: playerName, level: level, score: score};
  
  $.ajax({
      url: "http://localhost:1000/add-record", 
      type:"post",
      data: jsonString,
      success: function(response){
          var data = JSON.parse(response);
          if(data.msg === "SUCCESS") {
              console.log(data.msg);
          } else {
            console.log(data.msg);
          }
      },
      error: function(err){
          alert(err);
      }
  });
};

retrieveData();

function retrieveData() {
  $.ajax({
    url: 'http://localhost:1000/read-record',
    type: 'get',
    success: function(response) {
      let data = JSON.parse(response);
      if (data.msg === 'SUCCESS') {
        console.log(data.books)
        createTable(data.books);
      } else {
        console.log(data.msg)
      }
    },
    error: function(err) {
      alert(err);
    }
  });
}

function createTable(data) {
  let tableHTML = '';

  for(let i = 0; i < 5; i++) {
    tableHTML += '<tr>';
    tableHTML += '<td>' + data[i].playerName + '</td>';
    tableHTML += '<td>' + data[i].level + '</td>';
    tableHTML += '<td>' + data[i].score + '</td>';
    tableHTML += '</tr>';
  }

  $('#table-body').html(tableHTML);
}

// render game
function animate() {
  setTimeout(() => {
    background.draw();
    snakeHead.drawSnake();
    snakeHead.moveSnake();
    if (checkCollision()) {
      endScreen.style.display = 'block';
      gameEnd();
      retrieveData();
      return;
    }
      level_up();
      food.drawFood();

      // eat food
      const head = {x: snakeHead.snake[0].x - dx, y: snakeHead.snake[0].y - dy};
      if (snakeHead.snake[0].x === food.position.x && snakeHead.snake[0].y === food.position.y) {
        score ++;
        document.getElementById('score').innerHTML = score;
        snakeHead.snake.push(head)
        gen_food();
        // make sure food doesn't appear on top of snake
        for (let i = 0; i < snakeHead.snake.length; i++) {
            if (snakeHead.snake[i].x === food.position.x && snakeHead.snake[i].y === food.position.y) {
                gen_food();
            }
        }
      }
  
    animate();
  }, timeLimit)
  
}





