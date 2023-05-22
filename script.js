/** this keydown: for which key has pressed  */
// window.addEventListener('keydown',checkkey);
// function checkkey(event){
//     console.log('key code is:',event.key);
// }
score=0;
cross=true;

audio=new Audio('music.mp3');
audiogo=new Audio('gameover.wav');
setTimeout(()=>{
    audio.play(); 
},1000)
// **this keydown: tells key code when pressed 
window.addEventListener('keydown',checkkey);
function checkkey(event){
    console.log("key Code is:",event.keyCode)
    if (event.keyCode==38){
        dino=document.querySelector('.dino')
        dino.classList.add('animateDino')
        setTimeout(()=>{
            dino.classList.remove('animateDino')
        },700)
    }
    if (event.keyCode==39){
        dino=document.querySelector('.dino')
        dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'))
        dino.style.left=dinoX+112+"px";
    }
    if (event.keyCode==37){
        dino=document.querySelector('.dino')
        dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'))
        dino.style.left=(dinoX-112)+"px";
    }
}
//  setInterval to check whether they are colliding or not  
setInterval(()=>{
    dino=document.querySelector('.dino')
    gameOver=document.querySelector('.gameOver')
    obstacle=document.querySelector('.obstacle')
    // dino ki x value nikal rhe h == dono ki  x value ko match kra diya toh coliide ho pta chalega  
    dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'))
    dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'))
    // obstacle values
    ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'))
    oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'))

    offsetX=Math.abs(dx-ox);
    offsetY=Math.abs(dy-oy);
    console.log(offsetX,offsetY)
    // applying condition if they collide gameOver
    if (offsetX<93 && offsetY<109){
        gameOver.style.visibility='visible';
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(()=>{
            audiogo.pause()
            audio.pause();
        },1000);
    }
    else if(offsetX<130 && cross){   // this has been added to record the score 
        score+=1
        updateScore(score)
        cross=false;
        setTimeout(()=>{
            cross=true;
        },1000);
        setTimeout(()=>{   //  taki apan dino jhataka na khae
            animation_duration=parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'))
            newDuration=animation_duration-0.1;
            obstacle.style.animationDuration=newDuration+"s";
            console.log("New animation duration:",newDuration)
        },500);

    }
},900);

function updateScore(score){
    scoreCont.innerHTML = "Your Score"+score
}
