const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

//css로 만든 크기말고 선을 그릴 수 있는 높이와 너비를 지정해 줘야함.
canvas.width = 700;
canvas.height = 600;

ctx.strokeStyle = "#2c2c2c"; // 기본 색상을 검정색으로 
ctx.lineWidth = 2.5; // 선 굵기 디폴트값 지정

let painting = false;
let filling = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    // console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x,y);
    if(!painting) {
        ctx.beginPath(); // path(선) 생성
        ctx.moveTo(x,y); // 인자값은 위의 offset 값 마우스를 움직이는 모든 순간에 path를 만듦
    } else {
        ctx.lineTo(x,y); //path의 지금 위치에
        ctx.stroke(); // stoke 선을 그림 
    }

}

function handleColorClick(event) {
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle = color;
}

function handleRangeChange(event) {
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); // 마우스가 움직일 때 
    canvas.addEventListener("mousedown", startPainting);//클릭하고 있는 도중 발생하는 이벤트 
    canvas.addEventListener("mouseup", stopPainting);// 마우스를 누르고 뗀 상태
    canvas.addEventListener("mouseleave",stopPainting); // 캔버스안에서 마우스가 벗어나면 실행 
}

// console.log(Array.from(colors));

//여기서 color 파라미터는 patato로도 가능
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick));



if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}