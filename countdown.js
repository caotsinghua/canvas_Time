var WINDOW_WIDTH=window.screen.width;
var WINDOW_HEIGHT=600;
var RADIOS=8;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;
// const endTime=new Date(2016,2,28,22,22,22);
var showTimeSeconds=0;
var balls=[];
const colors=["#33b5e5","#0099cc","#cccccc","#aa66cc","#99cc00","ffbb33","ff4444","#cc0000","#9933cc","blue"]
window.onload=function(){
    MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
    RADIOS=Math.round(WINDOW_WIDTH*4/5/108)-1;
    MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
	var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");
    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;
    
    showTimeSeconds=get_showTimeSeconds();
    setInterval(function(){
    	render(context);
    	update();
    },30); 
    
}

function update(){
	var nextshowTimeSeconds=get_showTimeSeconds();

	var nexthours=parseInt(nextshowTimeSeconds/3600);
	var nextminutes=parseInt((nextshowTimeSeconds-nexthours*3600)/60);
	var nextseconds=nextshowTimeSeconds%60;

	var curhours=parseInt(showTimeSeconds/3600);
	var curminutes=parseInt((showTimeSeconds-nexthours*3600)/60);
	var curseconds=showTimeSeconds%60;

	if(nextseconds!=curseconds)
	{
		showTimeSeconds=nextshowTimeSeconds;//改变时间
		if(parseInt(curhours/10)!=parseInt(nexthours/10))//改变小球颜色
		{
			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curhours/10));
		}
		if(parseInt(curhours%10)!=parseInt(nexthours%10))
		{
			addBalls(MARGIN_LEFT+15*(RADIOS+1),MARGIN_TOP,parseInt(curhours%10));
		}

		
		if(parseInt(curminutes/10)!=parseInt(nextminutes/10))
		{
			addBalls(MARGIN_LEFT+39*(RADIOS+1),MARGIN_TOP,parseInt(curminutes/10));
		}
		if(parseInt(curminutes%10)!=parseInt(nextminutes%10))
		{
			addBalls(MARGIN_LEFT+54*(RADIOS+1),MARGIN_TOP,parseInt(curminutes%10));
		}

		if(parseInt(curseconds/10)!=parseInt(nextseconds/10))
		{
			addBalls(MARGIN_LEFT+78*(RADIOS+1),MARGIN_TOP,parseInt(curseconds/10));
		}
		if(parseInt(curseconds%10)!=parseInt(nextseconds%10))
		{
			addBalls(MARGIN_LEFT+93*(RADIOS+1),MARGIN_TOP,parseInt(curseconds%10));
		}
		
	}
	updateBalls();
}

function updateBalls()
	{
		for (var i = 0; i < balls.length; i++) {
			balls[i].x+=balls[i].vx;
			balls[i].y+=balls[i].vy;
			balls[i].vy+=balls[i].g;

			if(balls[i].y>=WINDOW_HEIGHT-RADIOS)
			{
				balls[i].y=WINDOW_HEIGHT-RADIOS;
				balls[i].vy=-balls[i].vy*0.75;
			}
		}
        var cnt=0;
		for (var i = 0; i < balls.length; i++) {
			if (balls[i].x+RADIOS>0&&balls[i].x-RADIOS<WINDOW_WIDTH) {
               balls[cnt++]=balls[i];
			}
		}
		while(balls.length>cnt)
			balls.pop();
	}
function addBalls(x,y,num)
{
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j]==1)
			{
			var aBall={
				x:x+RADIOS+1+j*2*(RADIOS+1),
				y:y+RADIOS+1+i*2*(RADIOS+1),
				g:3+Math.random(),
				vx:Math.pow(-1,Math.ceil(Math.random()*1000))*10,
				vy:-5,
				color:colors[Math.floor(Math.random()*colors.length)]
			}
			balls.push(aBall);
		}
		
		}
	}
}
function get_showTimeSeconds()
{
	var curTime=new Date();
	var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	return ret;
}

function render(cxt)
{
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours=parseInt(showTimeSeconds/3600);
	var minutes=parseInt((showTimeSeconds-hours*3600)/60);
	var seconds=showTimeSeconds%60;
    
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIOS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+30*(RADIOS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+39*(RADIOS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIOS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+69*(RADIOS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+78*(RADIOS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIOS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

    for (var i = 0; i < balls.length; i++) {
    	cxt.fillStyle=balls[i].color;
    	cxt.beginPath();
    	cxt.arc(balls[i].x,balls[i].y,RADIOS,0,2*Math.PI,true);
    	cxt.closePath();
    	cxt.fill();
    }
}

function renderDigit(x,y,num,cxt)
{
	cxt.fillStyle="rgb(0,102,153)";

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j< digit[num][i].length; j++) {
			if(digit[num][i][j]==1)
			{
				cxt.beginPath();
				cxt.arc(x+RADIOS+1+j*2*(RADIOS+1),y+RADIOS+1+i*2*(RADIOS+1),RADIOS,0,2*Math.PI);
				cxt.closePath;
				cxt.fill();
			}
		}
	}
}