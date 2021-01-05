// SE284 - Winter 2020/2021
// Quiz - JavaScript Drawing
// Name(s):  YOUR NAME(S) HERE

// Tell the code inspection tool that we're writing ES6 compliant code:
// jshint esversion: 6
// Tell the code inspection tool that we're using "developer" classes (console, alert, etc)
// jshint devel:true
// See https://jshint.com/docs/ for more JSHint directives
// jshint unused:false

const rows = 100;
const columns = 100;
const default_color = "blue";

const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
];

// Draws the color on the cell
//   Param - drawing: the drawing element
//           cell: the cell to draw the color on
const doDraw = (drawing, cell) => {
    cell.style.backgroundColor = drawing.selectedColor;
};

// Initializes the control panel and adds it to the drawing
//   Param - drawing: the drawing element
const initControlPanel = (drawing) => {
    const row = initRow();
    drawing.appendChild(row);
    colors.forEach((color) => {
        const button = document.createElement("button");
        button.style.backgroundColor = color;
        button.innerText = color;
        button.onclick = () => {
            drawing.selectedColor = color;
        };
        row.appendChild(button);
    });
    drawing.appendChild(row);
};

// Initializes the drawing and sets mouse events
//   Param - drawing: the drawing element to init
const initDrawing = (drawing) => {
    drawing.ismousedown = false;
    drawing.selectedColor = colors[0];
    drawing.onmousedown = () => {
        drawing.ismousedown = true;
    };
    drawing.onmouseup = () => {
        drawing.ismousedown = false;
    };
    initControlPanel(drawing);
};

// Initializes creates and initializes a new row
const initRow = () => {
    const row = document.createElement("div");
    row.classList.add("row");
    return row;
};

// Initializes creates and initializes a new cell
//   Param - drawing: the drawing that contains the cells
const initCell = (drawing) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.backgroundColor = default_color;

    // Remove onclick since onmousedown handles color flip
    // cell.onclick = () => { doDraw(drawing, cell); };
    
    cell.onmouseenter = () => {
        if(drawing.ismousedown) {
            doDraw(drawing, cell);
        }
    };
    cell.onmousedown = () => {
        doDraw(drawing, cell);
    };
    return cell;
};

window.onload = () => {
    const drawings = document.getElementsByClassName("drawing");

    // Loop through all drawings on the page
    Array.from(drawings).forEach((drawing) => {
        initDrawing(drawing);

        // Add rows
        for(let i = 0; i < rows; i++) {
            const row = initRow();
            drawing.appendChild(row);

            // Create the cells and add them to the row
            for(let j = 0; j < columns; j++) {
                row.appendChild(initCell(drawing));
            }
        }
    })
};