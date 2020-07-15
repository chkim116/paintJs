'use strict'

const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
    painting = false;
}

function onMouseDown() {
    painting = true;
}

function onMouseUp(event) {
    painting = false;
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
    canvas.addEventListener("mouseup", onMouseUp);
    Canvas.addEventListener("mouseleave", stopPainting);
}