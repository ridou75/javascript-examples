document.getElementById('btnAnimate').onclick = function() {
  lissajous();
};
function lissajous() {
  var canvas = document.getElementById('tutorial');
  var ctx = canvas.getContext('2d');
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
    if (canvas.getContext) {
      ctx.fillStyle = "white";
      ctx.fillRect(1, 1, 499, 299);
      ctx.fill();
      //alert('insideFunction');
      document.getElementById('phivalue').innerHTML = "phi=" + phi.toString();
      ctx.clearRect(1, 1, 499, 299);
      //console.log('clearRect');
      //ctx.strokeRect(1, 1, 499, 299);
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      for (var t = 0; t < 361; t++) {
        var x = xOffset + scale * Math.cos((phi + t * a * 2) * Math.PI / 360);
        var y = yOffset + scale * Math.sin((t * b * 2) * Math.PI / 360);
        if (bStart) {
          ctx.moveTo(x, y);
          bStart = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.closePath();
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
