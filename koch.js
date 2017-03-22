document.getElementById('btnAnimate').onclick = function(){
	koch(70);
};
document.getElementById('btnRotate').onclick = function(){
	var t=0;
	if (window.Worker)
	{
		console.log('window.Worker is implemented');
	}
  var itvl = setInterval(function(){
  	rotate_triangle(t);
    t+=5;
    if (t>360)
    {
    	clearInterval(itvl);
    }
  }, 50);
  
};

function rotate_triangle(angle)
{
  var A = {x:100,y:360};
  var B = {x:500,y:360};
  var R = rotate({x:B.x-A.x,y:B.y-A.y}, -60);
  var C = {
  					x:A.x + R.x,
            y:A.y + R.y
           };
  
  var triangle = [];
  triangle.push(A);
  triangle.push(B);
  triangle.push(C);
	Rtriangle = rotate_polygon({x:300,y:250}, triangle, angle);
  var canvas = document.getElementById('koch');
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'red';
  ctx.clearRect(1,1,599,499);
  ctx.beginPath();
	for(var i=0; i<Rtriangle.length; i++)
  {
  	if (i===0)
    {
    	ctx.moveTo(Rtriangle[i].x, Rtriangle[i].y);
    }
    else
   	{
    	ctx.lineTo(Rtriangle[i].x, Rtriangle[i].y);
    }
  }
  ctx.lineTo(Rtriangle[0].x, Rtriangle[0].y);
  ctx.stroke();
  ctx.closePath();
}
function rotate_polygon(center, polygon, angle)
{
	var Rpolygon = [];
	for(var i=0; i<polygon.length; i++)
  {
    Rpolygon.push(rotate2(center,polygon[i],angle));
  }
  return Rpolygon;
}
function koch(angle)
{
	var bStart = true;
	console.log('click on btnAnimate');
  var A = {x:100,y:360};
  var B = {x:500,y:360};
  var R = rotate({x:B.x-A.x,y:B.y-A.y}, -60);
  var C = {
  					x:A.x + R.x,
            y:A.y + R.y
           };
  var triangle = [];
  triangle.push(A);
  triangle.push(B);
  triangle.push(C);
  var Rtriangle = [];
  Rtriangle = rotate_polygon({x:300,y:250}, triangle, angle);
  console.log(Rtriangle);
  A = {x:Rtriangle[0].x, y:Rtriangle[0].y};
  B = {x:Rtriangle[1].x, y:Rtriangle[1].y};
  C = {x:Rtriangle[2].x, y:Rtriangle[2].y};
  var canvas = document.getElementById('koch');
  var ctx = canvas.getContext('2d');
  var level = 0;
  var maxlevel = 6;
  var intv = setInterval(function(){
  	ctx.beginPath();
    ctx.clearRect(1,1,599,499);
    ctx.strokeStyle = 'red';
    recurse(ctx, A, B, level);
    recurse(ctx, B, C, level);
    recurse(ctx, C, A, level);
    ctx.stroke();
    ctx.closePath();
    
    level++;
    if (level> maxlevel)
    {
    	clearInterval(intv);
    }
	}, 1000);
 	//recurse({x:100,y:300},{x:400,y:300});
  //recurse(200,10,160,160);
}
function rotate_demo(){
  var vect = {x:50, y:50};
  var vect_rot = rotate(vect, 60);
  console.log('vect:', vect);
  console.log('vect_rot:', vect_rot);
}
function draw(ctx,A,B)
{
    ctx.moveTo(A.x,A.y);
    ctx.lineTo(B.x,B.y);
}
function rotate(v, angle)
{
	var w = {x:0, y:0};
  var rd = (2 * Math.PI * angle) / 360.0; 
  w.x = v.x * Math.cos(rd) - v.y * Math.sin(rd);
  w.y = v.x * Math.sin(rd) + v.y * Math.cos(rd);
  return w;
}
// rotation of A 
function rotate2(O, A, angle)
{
	var v = {x:A.x-O.x, y:A.y-O.y};
  return {x:O.x + rotate(v, angle).x, y:O.y + rotate(v, angle).y};
}
function recurse(ctx, A, B, level)
{
	if (level===0)
  {
  	draw(ctx, A, B);
  }
  else
  {
    ctx.clearRect(1,1,599,499);
		ctx.stroke();    
    var l = Math.sqrt(Math.pow(B.y-A.y,2) + Math.pow(B.x-A.x,2));
    var C = {x:A.x + (B.x-A.x)/3.0, y:A.y + (B.y-A.y)/3.0};
    var D = {
              x:C.x + rotate({x:(B.x-A.x)/3.0, y:(B.y-A.y)/3.0}, 60).x, 
              y:C.y + rotate({x:(B.x-A.x)/3.0, y:(B.y-A.y)/3.0}, 60).y
            };
    var E = {x:A.x + 2*(B.x-A.x)/3, y:A.y + 2*(B.y-A.y)/3};
    recurse(ctx, A, C, level-1);
    recurse(ctx, C, D, level-1);
    recurse(ctx, D, E, level-1);
    recurse(ctx, E, B, level-1);
  }
}
