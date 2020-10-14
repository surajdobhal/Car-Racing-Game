const score=document.getElementById('score');
const start=document.getElementById('start_game');
const game_area=document.getElementById('game_area');
const player = { speed : 10, score : 0};
// check car is hit another car or not!
const intersact = (a,b) =>{
let a_rect = a.getBoundingClientRect();
let b_rect = b.getBoundingClientRect(); 
// console.log(a_rect);
// console.log(b_rect);
return  !((a_rect.bottom < b_rect.top) || (a_rect.top > b_rect.bottom) || (a_rect.right < b_rect.left) ||(a_rect.left > b_rect.right))
}
//move line in road
 function move_lines(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(item) {
       if(item.y >=700)
       {
          item.y -= 750;
          
       }
      item.y += player.speed;
      item.style.top = item.y +"px";
    });
 }
  const end_game = () =>{
     player.start = false;
     console.log('end');
     start.classList.remove('d-block');
     let score=player.score+1;
     start.innerHTML = "Game Over <br> Your final score is " +score+ "<br>Press here to restart the Game.";
  }
 //move enemy car 
 function move_enemy(car){
   let enemy = document.querySelectorAll('.enemy');
   enemy.forEach(function(item) {
      if(intersact(car, item)) // function intersact call
      {
         end_game();
      }
      if(item.y >=750)
      {
         item.y = -300;
         item.style.left = Math.floor(Math.random()*350) + 'px';
      }
     item.y += player.speed;
     item.style.top = item.y +"px";
   });
}
const gamePlay = () =>{
   //  console.log("paly");
   let car = document.querySelector('.car');
   let road = game_area.getBoundingClientRect();
  
    if(player.start){
       move_lines();
       move_enemy(car);
       if(keys.ArrowUp && player.y > road.top+70){ player.y -= 5;}
       if(keys.ArrowDown  && player.y < (road.bottom-85)) {player.y += 5;}
       if(keys.ArrowLeft && player.x>0 ){ player.x -= 5;}
       if(keys.ArrowRight && player.x < (road.width-60)) {player.x += 5;}
       car.style.top = player.y + "px";
       car.style.left = player.x + "px";

       window.requestAnimationFrame(gamePlay);
      //   console.log(player.score++);
        player.score++;
        score.innerText = 'Score : ' +player.score;
    }
}
//enemy car color
let randomColor = () =>{
   function c(){
     let hex = Math.floor(Math.random() *256).toString(16);
     return ('0' +String(hex)).substr(-2);
   }
   return '#'+c()+c()+c();
} 
start.addEventListener('click',()=>{
   //  game_area.classList.remove('d-block');
    start.classList.add('d-block');
    game_area.innerHTML = " ";
    player.start = true;
    player.score = 0 ;
   window.requestAnimationFrame(gamePlay);

   for(x=0;x<5;x++)
   {
      let road_line=document.createElement('div');
      road_line.setAttribute('class','line')
      road_line.y = (x*150);
      road_line.style.top = road_line.y +"px";
      game_area.appendChild(road_line);
   }
   
   let car = document.createElement('div');
   car.setAttribute('class', 'car ');
//    car.innerText= "this is a car";w-25 h-25 bg-danger 1
   game_area.appendChild(car);
   player.y = car.offsetTop;
   player.x = car.offsetLeft;
//generate a enemy car
for(x=0;x<3;x++)
{
   let enemy_car=document.createElement('div');
   enemy_car.setAttribute('class','enemy')
   enemy_car.y = ((x+1) *350) * -1;
   enemy_car.style.top = enemy_car.y +"px";
   enemy_car.style.backgroundColor= randomColor();
   enemy_car.style.left = Math.floor(Math.random()*350) + 'px';
   game_area.appendChild(enemy_car);
}
});
//function decelare key up and key down to check which key is press
let keyDown=(e)=>{
   e.preventDefault();
   keys[e.key] = true;
   // console.log(e.key)
}
let keyUp=(e)=>{
    e.preventDefault();
    keys[e.key] = false;
   //  console.log(e.key)
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup',keyUp);
let keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false
   };