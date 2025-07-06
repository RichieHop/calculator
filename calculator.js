const sketchContainerDiv = document.querySelector('.sketchContainer');
const colourPicker = document.getElementById('colourPicker')
const colourButton = document.getElementById('colourButton')
const randomColourButton = document.getElementById('randomColourButton')
const eraserButton = document.getElementById('eraserButton')
const clearButton = document.getElementById('clearButton')
const toggleGridButton = document.getElementById('toggleGridButton')
const grid = document.getElementById('grid')
const spinButton = document.querySelector('.spin-button');
const input = spinButton.querySelector('input');

let currentGridSize = 16;
let currentColor = '#000000';
let currentMode = 'colour';

setCurrentMode(currentMode);

function setCurrentColor(newColor) {
  currentColor = newColor
}

function setCurrentMode(newMode) {
  activateButton(newMode)
  currentMode = newMode
}

function setCurrentSize(newSize) {
  currentGridSize = newSize
}

// Check for settings and mode button presses.
colourPicker.oninput = (e) => setCurrentColor(e.target.value)
colourButton.onclick = () => setCurrentMode('colour')
randomColourButton.onclick = () => setCurrentMode('randomcolour')
eraserButton.onclick = () => setCurrentMode('eraser')
clearButton.onclick = () => setupGrid(currentGridSize)
toggleGridButton.onclick = () => {toggleGridLines();}

// Check for change of grid size spin button.
spinButton.addEventListener('change', (event) => {
  currentGridSize = parseInt(event.target.value);
  if (currentGridSize > 100) {
    currentGridSize = 100;
    event.target.value = 100;
    }
  setupGrid(currentGridSize);
});

let mouseDown = false;

document.onmousedown = () => (mouseDown = true);
document.onmouseup = () => (mouseDown = false);

function clearGrid() {
  sketchContainerDiv.innerHTML = '';
}

// Initialise the grid; defaults to 16 x 16 on startup.
function setupGrid(size) {
  clearGrid();

  for (let i = 0; i < (size * size) + (size +1); i++) {
  const div = document.createElement('div');
  div.addEventListener('mouseover', changeColor);
  div.addEventListener('mousedown', changeColor);
  
  // Set the width and height of each element as 640 divided by the current size (so 40px for a 16 by 16 grid).
  // This helps ensure the grid dimensions are mostly consistent, although it sometimes varies slightly.
  const widthAndHeight = (640 / size) + "px"; 
  div.setAttribute("style", "width:" + widthAndHeight +"; height:" + widthAndHeight + "; background-color: white");
  sketchContainerDiv.appendChild(div);
  }

  // Need to set the value for the nth Child based on the grid size, then set the width, border and height.
  const nthChildElement = currentGridSize + 1;
  const gridElements = document.querySelectorAll(".sketchContainer>div:nth-child(" + nthChildElement + "n + 1)");
  for (x = 0; x < gridElements.length; x++) {
    gridElements[x].style.width = "100%";
    gridElements[x].style.border = "0";
    gridElements[x].style.height = "0";
  }

  colourPicker.value = currentColor;
  toggleGridLines()

}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  e.target.style.backgroundColor = "black";
  if (currentMode === 'randomcolour') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  } else if (currentMode === 'colour') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

function activateButton(newMode) {
  if (currentMode === 'randomcolour') {
    randomColourButton.classList.remove('active')
  } else if (currentMode === 'colour') {
    colourButton.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraserButton.classList.remove('active')
  }

  if (newMode === 'randomcolour') {
    randomColourButton.classList.add('active')
  } else if (newMode === 'colour') {
    colourButton.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserButton.classList.add('active')
  }
}

// Toggle grid lines.
function toggleGridLines() {
  const gridElements = document.querySelectorAll(".sketchContainer>div");
  for (i = 0; i < gridElements.length; i++) {
    gridElements[i].classList.toggle('border');
  }
}

window.onload = () => {
  // Load the grid with the default settings.
  document.getElementById('gridInputValue').value = currentGridSize;
  setupGrid(currentGridSize);
}
