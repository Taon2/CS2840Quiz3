// SE284 - Winter 2020/2021
// Quiz - JavaScript Drawing
// Name(s):  Christian Doughty, Anthony Lohmiller

// Tell the code inspection tool that we're writing ES6 compliant code:
// jshint esversion: 6
// Tell the code inspection tool that we're using "developer" classes (console, alert, etc)
// jshint devel:true
// See https://jshint.com/docs/ for more JSHint directives
// jshint unused:false
const default_color = "blue";
let selected_size = "small";

class Drawing {
    constructor() {
        const rows = 100;
        const columns = 100;

        const colors = [
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "purple",
        ];

        const sizes = [
            "small",
            "medium",
            "large",
        ];

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

            sizes.forEach((size) => {
                const button = document.createElement("button");
                button.innerText = size;
                button.onclick = () => {
                    selected_size = size;
                };
                row.appendChild(button);
            });

            const r = document.createElement("input")
            const g = document.createElement("input")
            const b = document.createElement("input")
            r.id = "r"
            g.id = "g"
            b.id = "b"
            row.appendChild(r);
            row.appendChild(g);
            row.appendChild(b);

            const button = document.createElement("button");
            button.innerText = "load rgb value";
            button.onclick = () => {
                loadHex(drawing,
                    document.getElementById("r").value,
                    document.getElementById("g").value,
                    document.getElementById("b").value);
            };
            row.appendChild(button);

            const rainbowButton = document.createElement("button");
            rainbowButton.textContent = "Rainbow";
            rainbowButton.onclick = () => {
                rainbowClick();
            }
            row.appendChild(rainbowButton);

            drawing.appendChild(row);
        };

        const loadHex = (drawing, r, g, b) => {
            if (r === "" || r < 0 || r > 255 ||
                g === "" || g < 0 || g > 255 ||
                b === "" || b < 0 || b > 255) {
                alert("Input invalid. Only accepts values from 0-255.")
                return
            }

            drawing.selectedColor = 'rgb(' + r + ',' + g + ',' + b + ')'
        }

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
        const initRow = (id) => {
            const row = document.createElement("div");
            row.classList.add("row");
            row.id = "row" + id;
            return row;
        };

        /**
         * This is the rainbow button
         */
        const rainbowClick = async () => {
            let rows = document.getElementsByClassName("row");
            const timer = ms => new Promise(res => setTimeout(res, ms)); //this is used create a delay
            for (let j = 1; j < rows.length; j++) { //starts at 1 to skip the control panel of buttons
                let backgroundColor = colors[j % 6]; //this just cycles through the preset colors
                // let backgroundColor = "red";
                let cells = rows[j].children; // this gets all the cells in the row
                await timer(200); //this is where the delay takes place
                for (let i = 0; i < 100; i++) {
                    cells[i].style.backgroundColor = backgroundColor;
                }
            }
        }



        window.onload = () => {
            const drawings = document.getElementsByClassName("drawing");
            let cells = new Cell();
            // Loop through all drawings on the page
            Array.from(drawings).forEach((drawing) => {
                initDrawing(drawing);

                // Add rows
                for (let i = 0; i < rows; i++) {
                    const row = initRow(i);
                    drawing.appendChild(row);

                    // Create the cells and add them to the row
                    for (let j = 0; j < columns; j++) {
                        row.appendChild(cells.initCell(drawing, j));
                    }
                }
            })
        };
    }
}

class Cell {
    constructor() {
// Initializes creates and initializes a new cell
//   Param - drawing: the drawing that contains the cells
        this.initCell = (drawing, id) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = "cell" + id;
            cell.style.backgroundColor = default_color;

            // Remove onclick since onmousedown handles color flip
            // cell.onclick = () => { doDraw(drawing, cell); };

            cell.onmouseenter = () => {
                if (drawing.ismousedown) {
                    this.doDraw(drawing, cell);
                }
            };
            cell.onmousedown = () => {
                this.doDraw(drawing, cell);
            };
            return cell;
        };

        // Draws the color on the cell
//   Param - drawing: the drawing element
//           cell: the cell to draw the color on
        this.doDraw = (drawing, cell) => {
            let rowId = cell.parentNode.id.substring(cell.parentNode.id.lastIndexOf("w") + 1) // gets the final "w" in row
            let colId = cell.id.substring(cell.id.lastIndexOf("l") + 1) // gets the final "l" in cell

            switch (selected_size) {
                case "small":
                    cell.style.backgroundColor = drawing.selectedColor;
                    break
                case "medium":
                    for (let r = -1; r <= 1; r++) {
                        let row = document.getElementById("row" + (rowId - r));
                        for (let c = -1; c <= 1; c++) {
                            for (let child of row.children) {
                                if (child.id === "cell" + (colId - c)) {
                                    child.style.backgroundColor = drawing.selectedColor;
                                    break
                                }
                            }
                        }
                    }
                    break
                case "large":
                    for (let r = -2; r <= 2; r++) {
                        let row = document.getElementById("row" + (rowId - r));
                        for (let c = -2; c <= 2; c++) {
                            for (let child of row.children) {
                                if (child.id === "cell" + (colId - c)) {
                                    child.style.backgroundColor = drawing.selectedColor;
                                    break
                                }
                            }
                        }
                    }
                    break
            }
        };
    }
}