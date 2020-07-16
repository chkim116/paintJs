'use strict'

const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');



canvas.width = 700;
canvas.height = 700;

ctx.fillStyle="white";
ctx.fillRect (0, 0, 700, 700);
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
    painting = false;
}

function onMouseDown() {
    painting = true;
}

function onMouseMove (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", fillCanvas);
    canvas.addEventListener("contextmenu", noMouseSave);
}

// 클릭하면 색깔 바꾸기
// 누른 색이 뭔지 화면에 띄워주기

const colors = document.querySelectorAll(".jsColor");
const viewColor = document.querySelector(".viewcolor")

function changeColor (event) {
    const strokeColors = event.target.style.backgroundColor;
    ctx.strokeStyle = strokeColors;
    viewColor.style.backgroundColor = strokeColors;
    ctx.fillStyle = strokeColors;
}


Array.from(colors).forEach (colors => colors.addEventListener("click", changeColor));

// 
// NodeList 객체는 일반적으로 element.childNodes와 같은 속성(property)과 document.querySelectorAll 와 같은 메서드에 의해 반환되는  노드의 콜렉션입니다.
// NodeList 가 Array 는 아니지만, forEach() 를 사용하여 반복할 수 있습니다. 또한 Array.from() 을 사용하여 Array 로 변환 할 수도 있습니다.
// 그러나 일부 오래된 브라우저는 아직NodeList.forEach() 또는 Array.from() 를 구현하지 않았습니다. 이것은 Array.prototype.forEach() 를 사용하여 회피할 수 있습니다. — 이 문서의 예제를 참조하세요. - https://developer.mozilla.org/ko/docs/Web/API/NodeList
// 노드리스트의 경우 for문, foreach문, entries, values, key문까지 지원한다. for..in/for each..in은 쓰면 안된다. 다만 익스플로어의 호환문제로 Array.prototype.forEach() 배열로 사용한다.


// input 바 조절

const range = document.querySelector("#jsRange");

function handleRange() {
    const strokeSize = range.value;
    ctx.lineWidth = strokeSize;
}

range.addEventListener("input", handleRange);

// 

// fill누르면 채워지게 하기.

const fillBtn = document.querySelector("#jsMode");
let fill = false;

function fillOn() {
    if (fill !== true) {
        fill = true;
        fillBtn.innerHTML = "PAINT"
    } else {
        fill = false;
        fillBtn.innerHTML = "FILL"
    }
}

function fillCanvas() {
    if (fill) {
        ctx.fillRect (0, 0, 700, 700);
    }
}

fillBtn.addEventListener("click", fillOn)

// 오른쪽 마우스 클릭 금지  event명 "contextmenu"
function noMouseSave (event) {
    event.preventDefault ();
}


// save누르면 이미지 저장

const save = document.querySelector("#jsSave");

function saveImg() {
    const imgURL = canvas.toDataURL("image/png");
    const link = document.createElement("a")
    link.href = imgURL;
    link.download = "Paint!";
    link.click();
}

save.addEventListener("click", saveImg);