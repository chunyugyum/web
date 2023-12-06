const canvas= document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors= document.getElementsByClassName("jsColor");
const range= document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITAL_COLOR="#000000";/*그리기 색 기본값*/
const CANVAS_SIZE = 700;

ctx.strokeStyle="#2c2c2c"

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE

canvas.fillstyle="white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);/*배경 하얀색으로*/

ctx.strokeStyle = INITAL_COLOR;
ctx.fillStyle = INITAL_COLOR;
ctx.lineWidth = 2.5;/*캔버스 기본값*/



canvas.width=700;
canvas.height=700;

ctx.lineWidth= 2.5;

let painting = false;/*그리기*/
let filling =false;/*채우기*/

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        ctx.beginPath();/*경로 생성*/
        ctx.moveTo(x,y);/*좌표이동*/
    }
    else{
        ctx.lineTo(x,y);/*좌표대로 그림*/
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle= color;
    ctx.fillStyle = color;/*색버튼을 클릭하면 글씨색이 바뀐다.*/
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;/*굵기조정*/
}

function handleModeClick() {
    if (filling === true) {
      filling = false;
      mode.innerText = "Fill";
    } else {
     filling = true;
     mode.innerText = "Paint";  
    }/*버튼변경*/
   }

function handleCanvasClick() {
    if (filling) {
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }/*채우기 좌표*/
  }

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");/*그림을 data url로 변환*/
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
  }



if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);/*페인팅 시작*/
    canvas.addEventListener("mouseup", stopPainting);/*페인팅 멈춤*/
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);

}

Array.from(colors).forEach(color => {
    color.addEventListener("click", handleColorClick)});/*for each매소드를 통해 color 호출*/


if (range) {
    range.addEventListener("input", handleRangeChange);
}
if (mode) {
    mode.addEventListener("click", handleModeClick);
}
if (saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}s