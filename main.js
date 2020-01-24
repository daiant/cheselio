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
  }
}
function uptdateBoard() {
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
}
function drawQueen(c,f) {
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
    rules(c,f);
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
function rules(c,f) {
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
  uptdateBoard();
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
iniBoard();
