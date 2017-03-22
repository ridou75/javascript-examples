document.getElementById('btnAnimate').onclick = function() {
  lissajous();
};

function demo() {
  var canvas = document.getElementById('tutorial');
  if (canvas.getContext) {
    //alert('getContext');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(1, 1, 499, 300);
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
    test();
    var x = setTimeout(function() {
      ctx.clearRect(30, 30, 50, 50);
    }, 2000);
    //clearTimeout(x);

    var y = setTimeout(function() {
      //document.getElementById('textpara').innerHTML = 'setTimeout y active';
      var canvas = document.getElementById('tutorial');
      var ctx = canvas.getContext('2d');
      //ctx.fillStyle = 'white';
      //ctx.fillRect(1, 1, 499, 300);
      ctx.clearRect(1, 1, 499, 299);
    }, 4000); // 2 seconds later...
    //clearTimeout(y);
  }
  /*
    var z = setTimeout(function() {
      lissajous();

    }, 8000);
		*/

};

function test() {
  //alert('test is called');
  var canvas = document.getElementById('tutorial');
  var ctx = canvas.getContext('2d');
  ctx.moveTo(0, 0);
  ctx.strokeStyle = 'red';
  ctx.lineTo(500, 300);
  ctx.stroke();
};

function lissajous() {
  var canvas00 = document.getElementById('tutorial');
  var ctx00 = canvas00.getContext('2d');
  var xOffset = 250;
  var yOffset = 150;
  var scale = 100;
  var bStart = true;
  var phi = 0;
  var a = 2;
  var b = 3;
  var aText = document.getElementById('aParam').value;
  var bText = document.getElementById('bParam').value;
  console.log('aText:', aText);
  console.log('bText:', bText);
  if (parseInt(aText) !== NaN && aText.length > 0) {
    a = aText;
  } else {
    console.log('not a number or empty');
  }

  if (parseInt(bText) !== NaN && bText.length > 0) {
    b = bText;
  } else {
    console.log('not a number or empty');
  }

  var z = setInterval(function() {
    if (canvas00.getContext) {
      ctx00.fillStyle = "white";
      ctx00.fillRect(1, 1, 499, 299);
      ctx00.fill();
      //alert('insideFunction');
      document.getElementById('phivalue').innerHTML = "phi=" + phi.toString();
      ctx00.clearRect(1, 1, 499, 299);
      //console.log('clearRect');
      //ctx00.strokeRect(1, 1, 499, 299);
      ctx00.strokeStyle = 'red';
      ctx00.beginPath();
      for (var t = 0; t < 361; t++) {
        var x = xOffset + scale * Math.cos((phi + t * a * 2) * Math.PI / 360);
        var y = yOffset + scale * Math.sin((t * b * 2) * Math.PI / 360);
        if (bStart) {
          ctx00.moveTo(x, y);
          bStart = false;
        } else {
          ctx00.lineTo(x, y);
        }
      }
      ctx00.stroke();
      ctx00.closePath();
      phi += 10;
      bStart = true;
    } else {
      document.getElementById('hello').innerHTML = "no context";
    }
    if (phi > 1000) {
      clearInterval(z);
    }
  }, 50);
};
