var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
//const endTime=new Date(2016,7,30,23,45,45);//月份从0开始
const endTime=new Date("2016/9/4,23:45:45");
var curShowTimeSeconds = 0;//距离截止时间的剩余时间

var balls=[];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];


window.onload=function () {
    var canvas = document.getElementById('canvas');
    var  context = canvas.getContext('2d');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    // render(context);
    setInterval(function () {
        render(context);
        update();
    },40);


};

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime()-curTime.getTime();
    ret = Math.round(ret/1000);
    return ret>0? ret:0;
}

function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds/3600);
    var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds = nextShowTimeSeconds%60;

    var curHours = parseInt(curShowTimeSeconds/3600);
    var curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60);
    var curSeconds = curShowTimeSeconds%60;

    if(nextSeconds!=curSeconds){
        if (parseInt(curHours/10)!=parseInt(nextHours/10)) {
            addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
        }
        if (parseInt(curHours%10)!=parseInt(nextHours%10)) {
            addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
        }

        if (parseInt(curMinutes/10)!=parseInt(nextMinutes/10)) {
            addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
        }
        if (parseInt(curMinutes%10)!=parseInt(nextMinutes%10)) {
            addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
        }

        if (parseInt(curSeconds/10)!=parseInt(nextSeconds/10)) {
            addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
        }
        if (parseInt(curSeconds%10)!=parseInt(nextSeconds%10)) {
            addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updatBalls();
    console.log(balls.length);
}

function updatBalls(){
    for (var i =0;i< balls.length;  i++) {
        var g_temp = balls[i].g;
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        if (balls[i].y>=WINDOW_HEIGHT-RADIUS) {
            balls[i].y=WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy*0.65;
            if(balls[i].vy>=-2&&balls[i].vy<=2){
                g_temp = 0;
                balls[i].vy=0;
            }
        }
        balls[i].vy+=g_temp;
        if(balls[i].x+RADIUS<0||(balls[i].x-RADIUS)>WINDOW_WIDTH){//清除超出画布的数组元素
            balls.splice(i,1);
        }
    }
}

function addBalls(x,y,num){
    for (var i = 0;i< digit[num].length; i++) {
        for (var j =0; j < digit[num][i].length; j++) {
            if (digit[num][i][j]==1) {
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:2.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                };
                balls.push(aBall);
            }
        }
    }

}

function render(context) {
    context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours = parseInt(curShowTimeSeconds/3600);
    var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds = curShowTimeSeconds%60;

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),context);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),context);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,context);

    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),context);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),context);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,context);

    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),context);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),context);

    /*绘制小球*/
    for (var i = 0; i < balls.length; i++) {
        context.beginPath();
        context.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
        context.fillStyle = balls[i].color;
        context.closePath();
        context.fill();
    }

}
function renderDigit(x,y,num,context) {
    context.fillStyle="rgb(0,102,153)";
    for(var i = 0;i<digit[num].length;i++){
        for(var j = 0;j<digit[num][i].length;j++){
            if (digit[num][i][j]==1) {
                context.beginPath();
                context.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                context.closePath();
                context.fill();
            }
        }
    }
}