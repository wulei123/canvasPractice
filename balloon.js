/**
 * Created by Administrator on 2016/6/11.
 */
var WINDOW_HEIGHT = document.body.clientHeight;
var WINDOW_WIDTH = document.body.clientWidth;
var colors = ["rgb(208, 101, 3)","rgb(208, 101, 3)","rgb(233, 147, 26)","rgb(22, 145, 190)",
    "rgb(22, 107, 162)"];

var balloons=[
    {x:Math.round(WINDOW_WIDTH/3),y:WINDOW_HEIGHT,R:20,color:colors[Math.floor(Math.random()*colors.length)],
        v:Math.round(Math.random()*10)
    },
]


window.onload = function () {
    console.log(Math.round(WINDOW_WIDTH/3))
    var canvas = document.getElementById("balloon");
    canvas.height = WINDOW_HEIGHT;
    canvas.width = WINDOW_WIDTH;
    var context = canvas.getContext("2d");
    
    setInterval(
        function () {
            render(context);
            canvas.addEventListener("mouseup",detect(canvas,context));
            if(balloons[balloons.length-1].y<WINDOW_HEIGHT||balloons.length==0){
                addBalloons();
            }
            updateBalloons();
        },
        40
    )
}

function detect(canvas,cxt) {
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY -canvas.getBoundingClientRect().top;
    cxt.fillStyle = "red";
    cxt.beginPath();
    cxt.arc(x,y,10,0,2*Math.PI);
    cxt.closePath();
    cxt.fill();

}

function render(cxt) {
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    for(var i=0;i<balloons.length;i++){
        cxt.fillStyle = balloons[i].color;
        cxt.beginPath();
        cxt.arc(balloons[i].x,balloons[i].y,balloons[i].R,0,2*Math.PI);
        cxt.closePath();
        cxt.fill();
    }
}



function addBalloons() {
    var balloon = {
        x:Math.round(Math.random()*WINDOW_WIDTH),
        y:Math.round(WINDOW_HEIGHT+WINDOW_WIDTH/10),
        R:Math.round(Math.random()*100),
        color:colors[Math.floor(Math.random()*colors.length)],
        v:Math.round(Math.random()*10),
    }
    balloons.push(balloon);
}



function updateBalloons() {
    for(var i=0;i<balloons.length;i++){
        //balloons[i].y=balloons[i].y-balloons[i].v;
        if(balloons[i].v<4){
            balloons[i].y=balloons[i].y-10;
        }else{
            balloons[i].y=balloons[i].y-balloons[i].v;
        }

    }
    var cnt = 0;
    for(var i=0;i<balloons.length;i++){
        if(balloons[i].y>=0){
            balloons[cnt++] = balloons[i];
        }

    }
    while (balloons.length>cnt) {
        balloons.pop();
    }

}

