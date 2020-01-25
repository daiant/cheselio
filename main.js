/* Las posiciones en frontend son [1, 8] */
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var bool = false;
let n = 8;
let QUEENS = 0;
let board = [];
let colors = ["rebeccapurple", "lightcoral", "lightcoral"];
function colores(b) {
  return b ? "black" : "white";
}
function iniBoard() {
  QUEENS = 0;
  document.getElementById('nqueens').textContent = QUEENS+"/"+n;
  for(var i = 0; i < n; i++) {
    bool = !bool;
    for(var j=0; j< n; j++) {
      bool = !bool;
      ctx.fillStyle = colores(bool);
      ctx.fillRect(i*50, j*50, 50, 50);
      ctx.strokeRect(i*50, j*50, 50, 50);
      board[i+j*n] = 0;
    }
    if(n%2!=0) bool=!bool;
  }
}
function updateBoard(callback) {
  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = colors[2];
  for(var i = 0; i < n; i++) {
    for(var j=0; j< n; j++) {
      if(board[i+j*n] == 2) {
        ctx.fillRect(i*50, j*50, 50, 50);
        ctx.strokeRect(i*50, j*50, 50, 50);
      }
    }
  }
  ctx.restore();
  callback();
}
function drawQueen(c,f, callback) {
  img = new Image();
  c--;
  f--;
  if(board[f+c*n]==1 || board[f+c*n]==2) return;
  img.src = "white-amazon.png";
  board[f+c*n]=1;
  QUEENS++;
  document.getElementById('nqueens').textContent = QUEENS+"/"+n;
  img.onload = function() {
    ctx.drawImage(img, f*50+5, c*50+5, 40, 40);
    c++;f++;
    console.log("["+(f)+", "+c+"]");
    rules(c,f, function() {var x=1;});
    callback();
  }
}
function printBoard() {
  var res = "";
  for(var i = 0; i < n; i++){
    for(var j = 0; j<n; j++){
      res += board[i+j*n];
      if(j<n-1) res+= ", ";
    }
    res+="\n";
  }
  console.log(res);
}
function rules(c,f, callback) {
  f--;
  c--;
  // Vertical
  for(var i = 0; i < n; i++){
    if(f==i) continue;
    board[i+c*n] = 2;
  }
  // Horizontal
  for(var i = 0; i < n; i++){
    if(c==i) continue;
    board[f+i*n] = 2;
    }
  // Diagonal
  var af=f;
  var ac=c;
  while(af>0 && ac >0) {
    af--;ac--;
    board[af+ac*n]=2;
  }
  af=f;ac=c;
  while(af<n-1 && ac<n-1) {
    af++;ac++;
    board[af+ac*n]=2;
  }
  // Antidiagonal
  af=f;ac=c;
  while(af<n-1 && ac > 0) {
    af++;ac--;
    board[af+ac*n] = 2;
  }
  af=f;ac=c;
  while(af>0 && ac <n-1) {
    af--;ac++;
    board[af+ac*n] = 2;
  }
  updateBoard(function() {var x=1;});
  callback();
}
c.addEventListener('click', function(event){
  var rect = c.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  var finput = document.getElementById("cqueen");
  // console.log("eventx: "+event.pageX+", rect.left: "+rect.left);
  // console.log("x: "+x+", x/50: "+x/50);
  //finput.value = Math.ceil(x/50);
  var cinput = document.getElementById("fqueen");
  // console.log("eventy: "+event.pageY+", rect.top: "+rect.top);
  // console.log("y: " + y + ", y/50: " + y/50);
  //cinput.value = Math.ceil(y/50);
}, false);
c.addEventListener('dblclick', function(event) {
  var rect = c.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  drawQueen(Math.ceil(y/50), Math.ceil(x/50));
}, false);
function changesize() {
  n = document.getElementById('size').value;
  c.width = n*50;
  c.height = n*50;
  iniBoard();
}
function main() {
  var v = [];
  AlgoReina(1,0,v);
}
function AlgoReina(c,ini,v) {
  if(QUEENS==n) {return true;}
  ac = c-1;
  var aux = ini;
  if(c!=1) ini = 0;
  for (let i = ini; i < n; i++) {
    if(board[ac+i*n]==0) {
      v[ac]=i;
      drawQueen(i+1,c, function () {
        setTimeout(function(){
          return AlgoReina(c+1, aux,v);
        },500)
      });
      break;
    }
    if(i==n-1) {
      iniBoard();
      AlgoReina(1,aux+1,v);
      return false;
    }
}

}
iniBoard();
function restoreBoard(v) {
  // necesario que espere a que una reina se cree, con sus reglas y tal para que se bloquee la otra.
  // no es tan necesario en principio pero es una buena práctica
  iniBoard();
  for (var i = 0; i < v.length; i++) {
    drawQueen(v[i]+1,i+1,function(){var x=1;});
    setTimeout(function(){console.log("hola")},200);
  }
}
