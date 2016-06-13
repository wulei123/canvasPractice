/**
 * Created by Administrator on 2016/6/9.
 */
var WINDOW_HEIGHT = 768;
var WINDOW_WIDTH = 1024;
var RADIUS = 10;
var MARGIN_TOP = 400;
var MARGIN_LEFT = 30;

const endTime = new Date(2014,0,12,18,47,25);

var curShowTimeSeconds = 0;

var balls = [];

const colors = [
    "rgb(208, 101, 3)","rgb(208, 101, 3)","rgb(233, 147, 26)","rgb(22, 145, 190)",
    "rgb(22, 107, 162)","gray"
]

window.onload = function () {
    WINDOW_HEIGHT = document.body.clientHeight;
    WINDOW_WIDTH = document.body.clientWidth;
    MARGIN_LEFT = Math.round(document.body.clientWidth/10);
    MARGIN_TOP = Math.round(document.body.clientHeight/2);
    RADIUS = Math.round(document.body.clientHeight*4/3/108-1);
    var canvas = document.getElementById("clock");
    var context = canvas.getContext("2d");
    canvas.height=WINDOW_HEIGHT;
    canvas.width = WINDOW_WIDTH;
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(
        function () {
            render(context);
            update();
            console.log(balls.length);
        },
        50
    )
}
function update() {
    var nextShowTimeSenconds = getCurrentShowTimeSeconds();
    var nextSeconds = parseInt(getCurrentShowTimeSeconds()%10);
    if(nextSeconds!=curShowTimeSeconds){

        if(parseInt(curShowTimeSeconds%10)!=parseInt(nextSeconds%10))
            addBalls(MARGIN_TOP,MARGIN_LEFT,parseInt(curShowTimeSeconds%10));

        curShowTimeSeconds = nextSeconds;



    }
    updateBalls();

}


function updateBalls() {
    for(var i=0;i<balls.length;i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
            balls[i].y=WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy*0.75;
        }
    }
    var cnt = 0;
    for(var i=0;i<balls.length;i++){
        if(balls[i].x+RADIUS>0&&balls[i].x<WINDOW_WIDTH){
            balls[cnt++]=balls[i];
        }
    }
    while(balls.length>cnt){
        balls.pop();
    }
}

function addBalls(x, y, num) {
    for(var i=0;i<digit[num].length;i++){

        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,//ceil取整
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)],//下取整
                }
                balls.push(aBall);
            }
        }
    }
}
function render(context) {
    context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);//清空矩形空间刷新

    var num = parseInt(curShowTimeSeconds%10);

    for(var i=0;i<digit[num].length;i++){

        for(var j=0;j<digit[num][i].length;j++){

            renderDigit(MARGIN_LEFT+i*(2*(RADIUS+1))+RADIUS+1,MARGIN_TOP+j*(2*(RADIUS+1))+RADIUS+1,digit[num][i][j],context);
        }
    }

    for(var i=0;i<balls.length;i++){
        context.fillStyle = balls[i].color;
        context.beginPath();
        context.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
        context.closePath();
        context.fill();
    }
    
}
function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = curTime.getTime()-endTime.getTime();
    ret = Math.round(ret/1000);
    return ret>=0?ret:0;
}
function renderDigit(x, y, dg, context) {
    if(dg==1){
        context.beginPath();
        context.fillStyle = "gray";
        context.strokeStyle = "red";
        context.arc(y,x,RADIUS,0,2*Math.PI);
        context.closePath();
        context.fill();
    }

}
/*
setInterval(
function(){
render();
update();
},
50 帧数20 1000/50
 */