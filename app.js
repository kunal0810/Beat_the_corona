let GAME_STATE = ['gamemenu','gamelevel','gamespeed','gameweapon','gamerunning'];
let GAME_LEVEL = ['Easy','Medium','Difficult'];
let GAME_SPEED = ['1000','700','500'];
let GAME_SPEED_print = ['Slow','Medium','Fast'];
let GAME_WEAPON_print = ['Soap','Sanitizer','Face Mask'];
let GAME_WEAPON = ['soap','dettol','mask'];
let GAME_BLOCK = [9,16,25];


var current_game_state = GAME_STATE[0];
var current_game_level  = 0;
var current_game_speed = 0;
var current_game_weapon = 0;


document.addEventListener('DOMContentLoaded',() =>{
  
  const grid = document.querySelector('.grid');

  function createboard(){
    if(current_game_state==GAME_STATE[0])
    {
      document.querySelector('#level').textContent = 'None';
      document.querySelector('#speed').textContent = 'None';
      document.querySelector('#weapon').textContent = 'None';
      document.querySelector('#Penality').textContent = 'None';
      document.querySelector('#result').textContent = 0;
      document.querySelector('#time').textContent = 60;
      if(grid.children.length!=0)
      document.getElementById('body').classList.remove(GAME_WEAPON[current_game_weapon]);
      for(let i=grid.children.length-1;i>=0;i--)
      {grid.removeChild(grid.children[i]);}
      var card = document.createElement('img')
      card.setAttribute('src', 'begin.jpeg')
      card.setAttribute('height',700);
      card.setAttribute('width',700);
      grid.appendChild(card)
      return ;
    }  
    if(current_game_state==GAME_STATE[1])
    {
      grid.removeChild(grid.children[0]);
      var card = document.createElement('img')
      card.setAttribute('src', 'level.jpeg')
      card.setAttribute('height',700);
      card.setAttribute('width',700);
      grid.appendChild(card);
      return ;
    }
    if(current_game_state==GAME_STATE[2])
    {
      document.querySelector('#level').textContent = GAME_LEVEL[current_game_level];
      grid.removeChild(grid.children[0]);
      var card = document.createElement('img')
      card.setAttribute('src', 'speed.jpeg')
      card.setAttribute('height',700);
      card.setAttribute('width',700);
      grid.appendChild(card);
      return ;
    }
    if(current_game_state==GAME_STATE[3])
    {
      document.querySelector('#speed').textContent = GAME_SPEED_print[current_game_speed];
      grid.removeChild(grid.children[0]);
      var card = document.createElement('img')
      card.setAttribute('src', 'weapon.jpeg')
      card.setAttribute('height',700);
      card.setAttribute('width',700);
      grid.appendChild(card);
      return ;
    }
    if(current_game_state==GAME_STATE[4])
    {
      document.querySelector('#weapon').textContent = GAME_WEAPON_print[current_game_weapon];
      document.getElementById('body').classList.add(GAME_WEAPON[current_game_weapon]);
      //alert(current_game_level)
      grid.removeChild(grid.children[0]);
      for(let i=1;i<=GAME_BLOCK[current_game_level];i++){
        var box = document.createElement('div');
        box.setAttribute('id',i);
        box.classList.add('square');
        if(current_game_level==0)
        box.classList.add('ssquare');
        else if(current_game_level==1)
        box.classList.add('msquare');
        else if (current_game_level==2)
        box.classList.add('lsquare');
        grid.appendChild(box);
      }
      startgame();
    } 
  }
  
createboard();
function startgame(){
const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeleft = document.querySelector('#time');
let score = document.querySelector('#result');
let penality =  document.querySelector('#Penality');
let result = 0;
let hitposition;
let currenttime = 60;
let correctpress = 0;
let wrongpress  = 0;

square.forEach(id => {
  id.addEventListener('mouseup',()=> {
    if(id.id==hitposition)
    {result = result+1;
      correctpress++;
    score.textContent = result;}
    else
    {
      wrongpress++;
      penality.textContent = wrongpress;
    }
  })
})

function randomsquare()
  { square.forEach(className => {
      className.classList.remove('mole');
    })
   
    let randomposition = square[Math.floor(Math.random() * GAME_BLOCK[current_game_level])];
    randomposition.classList.add('mole');
    hitposition = randomposition.id;
    if(currenttime==0)
    clearInterval(timerid);
  }

  function movedown()
  {
  currenttime--;
  timeleft.textContent = currenttime;
  if(currenttime==0)
  {
    var finalres = correctpress-wrongpress;
    clearInterval(timerid);
    alert("Game over!! \n"+ "Penality:"+" "+wrongpress+" "+"\n Final Score: " + finalres);
    current_game_state = GAME_STATE[0];
    createboard();
  }
  }

  function movemol()
  {
    let timerid = null
    timerid =  setInterval(randomsquare,GAME_SPEED[current_game_speed]);
  }

movemol();
let timerid = setInterval(movedown,1000);
}

document.addEventListener('keydown',event =>{

  if(current_game_state==GAME_STATE[0])
  {
    if(event.keyCode==13)
    {current_game_state = GAME_STATE[1];
      createboard();}
    else
    alert('wrong key pressed!! press Enter to start the Game');
  }
  else if(current_game_state==GAME_STATE[1])
  {
    if(event.keyCode>=49&&event.keyCode<=51)
    {current_game_state = GAME_STATE[2];
      current_game_level = event.keyCode-49;
      createboard();
    }
    else if(event.keyCode>=97&&event.keyCode<=99)
    { current_game_state = GAME_STATE[2];
      current_game_level = event.keyCode-97;
      createboard();
    }
    else
    alert('wrong key pressed!! press key to select the level the Game');
  }
  else if(current_game_state==GAME_STATE[2])
  {
    if(event.keyCode>=49&&event.keyCode<=51)
    {current_game_state = GAME_STATE[3];
      current_game_speed = event.keyCode-49;
      createboard();
    }
    else if(event.keyCode>=97&&event.keyCode<=99)
    { current_game_state = GAME_STATE[3];
      current_game_speed = event.keyCode-97;
      createboard();
    }
    else
    alert('wrong key pressed!! press key to select the speed the Game');
  }
  else if(current_game_state==GAME_STATE[3])
  {
    if(event.keyCode>=49&&event.keyCode<=51)
    {current_game_state = GAME_STATE[4];
      current_game_weapon = event.keyCode-49;
      createboard();
    }
    else if(event.keyCode>=97&&event.keyCode<=99)
    { current_game_state = GAME_STATE[4];
      current_game_weapon = event.keyCode-97;
      createboard();
    }
    else
    alert('wrong key pressed!! press key to select the speed the Game');
  }
  })
})


