let level = 0;
let pattern = []
let userClicks = -1;
let gameStart = true;
let colors = [];
function GameHistory(){
    const index =Math.round(Math.random()* (colors.length -1))
    const  id = colors[index];
    pattern.push(id);
    console.log(index,pattern);
    this.animateButton(id);
    $("#level-title").text("Level "+level++);
    userClicks=-1;
}
$(".btn").on("click",(event)=>{
const id = event.target.id;
if(!gameStart && colors.filter(item => item === id)){
this.animateButton(id);
userClicks++;
let gameOver=false;
if(pattern[userClicks]!= id){
	userClicks = -1
    pattern =[];
    level = 0;
    gameOver = true;
	$("body").addClass("game-over")
    $("#level-title").text("Game Over, Refresh the page to play again");

}

if(userClicks+1 === pattern.length && !gameOver){
    setTimeout(GameHistory,1000);
}
}
} );
function playSound(id){
    const audio = new Audio()
    audio.setAttribute("src","./sounds/"+id+".mp3");
    console.log("./sounds/"+id+".mp3");
    audio.play();
    }    
function animateButton(id){
    this.playSound(id);    
    $('#'+id).toggleClass("pressed");
    setTimeout(()=>    {$('#'+id).toggleClass("pressed")},100);

}
$(document).keydown((kevent)=>{
    if ((kevent.originalEvent.key) === 'a' && gameStart){
		    $(".btn").each((index,value) => {colors.push(value.id)});
        gameStart = false;
		pattern =[];
        GameHistory();
    }
			$("body").removeClass("game-over");

});
$(document).click((kevent)=>{
    if (gameStart ){
		$(".btn").each((index,value) => {colors.push(value.id)});
        gameStart = false;
		pattern = [];
		GameHistory();
        
    }
	$("body").removeClass("game-over");

})
