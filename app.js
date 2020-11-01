const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave")

const INITIAL_COLOR = "#2c2c2c";

//css로 만든 크기말고 선을 그릴 수 있는 높이와 너비를 지정해 줘야함.
canvas.width = 700;
canvas.height = 600;
ctx.fillStyle = "white"; // 기본바탕 흰색(CSS말고 canvas pixel단위로 ) 
ctx.fillRect(0, 0, canvas.width, canvas.height); //사각형 그려줌 
ctx.strokeStyle = INITIAL_COLOR // 기본 색상을 검정색으로 
ctx.fillStyle = INITIAL_COLOR; // 전체 칠하기 색상 디폴트값 
ctx.lineWidth = 2.5; // 선 굵기 디폴트값 지정

// ctx.fillStyle = "green";
// ctx.fillRect(50, 50, 50, 50);

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
    ctx.strokeStyle = color; // 선을 긋는 스타일 색상
    ctx.fillStyle = color;  // 전체 칠하기 스타일 색상
}

function handleRangeChange(event) {
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}
//fill 버튼을 클릭하면 paint로 내용을 바꿔주는 메소드.
function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
        
    }
}

function handleCanvasClick() {
    if(filling){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    // console.log(event);
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    // console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
    // console.log(link);

}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); // 마우스가 움직일 때 
    canvas.addEventListener("mousedown", startPainting);//클릭하고 있는 도중 발생하는 이벤트 
    canvas.addEventListener("mouseup", stopPainting);// 마우스를 누르고 뗀 상태
    canvas.addEventListener("mouseleave",stopPainting); // 캔버스안에서 마우스가 벗어나면 실행 
    canvas.addEventListener("click", handleCanvasClick); // 전체 칠하기 클릭 이벤트
    canvas.addEventListener("contextmenu", handleCM); // 마우스 우클릭시 나오는 메뉴창 이벤트 

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

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}