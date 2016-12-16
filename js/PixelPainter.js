function createGrid(rows, columns, attributes) {
  var gridElement = document.createElement('div');
  gridElement.className = "grid";

  // Validations
  if (typeof rows !== 'number' || rows < 0){
    throw new Error("Non-negative values only.");
  }
  if (typeof columns !== 'number' || columns < 0){
    if (typeof columns === 'object'){
      attributes = columns;
    }
    columns = rows;
  }

  // Loops to create rows and columns
  for (var i = 0; i < rows; i++){
    var rowElement = document.createElement('div');
    rowElement.className = "rows";
    setAttr(rowElement);

    for (var j = 0; j < columns; j++){
      var columnElement = document.createElement('div');
      if (attributes === undefined){
        columnElement.className = "columns";
      }
      setAttr(columnElement, attributes);
      rowElement.appendChild(columnElement);
    }
    gridElement.appendChild(rowElement);
   }

  return gridElement;
}

// Function to add attributes to the grid
function setAttr(element, attrObj){
  if (typeof attrObj === 'object'){
    keys = Object.keys(attrObj);
    for (var i = 0; i < keys.length; i++){
    element.setAttribute(keys[i], attrObj[keys[i]]);
    }
  }
}

// Creating a pixel painter with color palette and grid using createGrid function
var paintContainer = document.getElementById('pixelPainter');
var canvasContainer = document.createElement('div');
canvasContainer.id = 'canvases';

var leftBar = document.createElement('div');
leftBar.className = "left-bar";

var rightBar = document.createElement('div');
rightBar.className = 'right-bar';

// Instructions
var instructions = document.createElement('div');
instructions.className = 'instructions';
instructions.innerHTML = 'To draw: Choose a color using the color palette, or click on the single square color to use a color picker. After choosing a color, draw on the white grid :)';
rightBar.appendChild(instructions);

// Create grid for color palette
var colorsGrid = createGrid(6, 11, {class: 'colors'});
colorsGrid.id = "pp-colors";
leftBar.appendChild(colorsGrid);
canvasContainer.appendChild(leftBar);

// Grid to show user selected color
var selectedContainer = document.createElement('div');
selectedContainer.className = 'selected-container';
var selectedColor = document.createElement('input');
selectedColor.setAttribute('type', 'color');
selectedColor.id = 'selected';
selectedColor.addEventListener('input', function() {
  color = selectedColor.value;
  gridDescrDiv.innerHTML = 'hex ' + selectedColor.value;
});
var gridDescrDiv = document.createElement('div');
gridDescrDiv.className = 'selected-description';
gridDescrDiv.innerHTML = 'rgb(0, 0, 0)';
selectedContainer.appendChild(selectedColor);
selectedContainer.appendChild(gridDescrDiv);
leftBar.appendChild(selectedContainer);

// Create grid for canvas
var canvasGrid = createGrid(30, 30);
canvasGrid.id = "pp-canvas";
canvasContainer.appendChild(canvasGrid);
paintContainer.appendChild(canvasContainer);

// Container for canvas
var bigContainer = document.createElement('div');
bigContainer.className = 'big-container';
bigContainer.appendChild(canvasGrid);
canvasContainer.appendChild(bigContainer);
canvasContainer.appendChild(rightBar);


// Colors for palette
var hexColors = [/* red */'#B20000', '#CC0000', '#E50000', '#FF0000', '#FF1919', '#FF3333', '#FF4C4C', '#FF6666', '#FF7F7F', '#FF9999', '#FFB2B2', /* orange */'#662C00', '#7F3700', '#994200', '#B24D00', '#CC5800', '#E56300', '#FF6F00', '#FF6F00', '#FF7D19', '#FF8B33', '#FF9A4C', /* yellow */'#CCC100', '#E5D900', '#FFF200', '#FFF999', /* green */ '#D2FF7F', '#DBFF99', '#E4FFB2', '#A6FF00', '#95E500', '#84CC00', '#00991E', '#00B223', '#00CC28', '#00E52D', '#00FF33', '#00FF33', '#66FF84', '#B2FFC1', /* blue */'#B2F6FF', '#99F3FF', '#7FF0FF', '#66EDFF', '#008799','#009DB2', '#00B4CC', '#00CAE5', '#00E1FF', '#4CEAFF', /* violet */'#D3B2FF', '#C599FF', '#A866FF', '#8B33FF', '#5800CC', /* grayscale */ '#000000', '#191919', '#333333', '#4C4C4C', '#666666', '#7F7F7F', '#999999', '#B2B2B2', '#CCCCCC', '#E5E5E5', '#FFFFFF'];

// Fill color palette
var indivColor = colorsGrid.querySelectorAll('.colors');
function setDefaultPalette(){
  // var chosenColor = document.querySelectorAll('.colors');
  indivColor.forEach(function(cell, index){
    cell.style.backgroundColor = hexColors[index];
  });
  selectedColor.value = '#000000';
  color = selectedColor.value;
  for (var i = 0; i < indivColor.length; i++){
    indivColor[i].id = '';
  }
  gridDescrDiv.innerHTML = 'hex ' + color;
}
setDefaultPalette();

// Button for default color palette
var defaultColors = document.createElement('button');
defaultColors.className = 'buttons';
defaultColors.id = 'default-colors';
defaultColors.innerHTML = 'Default';
defaultColors.addEventListener('click', setDefaultPalette);


// Functions and button for random colors
var randomColors = document.createElement('button');
randomColors.className = 'buttons';
randomColors.id = 'random-colors';
randomColors.innerHTML = 'Random';
randomColors.addEventListener('click', setRandomPalette);

var paletteButtons = document.createElement('div');
paletteButtons.className = 'palette-buttons-container';
paletteButtons.innerHTML = 'Palette: ';
var lineBreak = document.createElement('br');
lineBreak.className = 'br';
paletteButtons.appendChild(lineBreak);
paletteButtons.appendChild(randomColors);
paletteButtons.appendChild(defaultColors);
leftBar.appendChild(paletteButtons);

function randomColorPalette(){
  var hexValues = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++){
    color += hexValues[Math.floor(Math.random() * 16)].toString(16);
  }
  return color;
}

function setRandomPalette(){
  for (var j = 0; j < indivColor.length; j++){
    indivColor[j].style.backgroundColor = randomColorPalette();
    indivColor[j].id = '';
  }
  selectedColor.value = randomColorPalette();
  color = selectedColor.value;
  gridDescrDiv.innerHTML = 'hex ' + color;
}

// Variables for event listeners
var chosenColor = document.querySelectorAll('.colors');
var cells = document.querySelectorAll('.columns');
var selectedPixelColor = document.getElementById('selected');
selectedPixelColor.style.backgroundColor = 'transparent';
var color = 'black';
var eraserOn = false;
var colorFill = false;
chosenColor.id = '';

// Event listener to get pixel color from color palette grid
function getColor(){
  eraserOn = false;
  colorFill = true;
  for (var i = 0; i < chosenColor.length; i++){
    chosenColor[i].addEventListener('click', getStyle);
  }
}
getColor();

function getStyle(){
  eraserOn = false;
  colorFill = true;
  color = this.style.backgroundColor;
  for (var i = 0; i < chosenColor.length; i++){
    chosenColor[i].id = '';
  }
  this.id = 'highlight';
  //show user selected color
  var selectedHex = rgbToHex(color);
  selectedColor.value = selectedHex;
  gridDescrDiv.innerHTML = color;
  return color;
}

// Function to convert rgb to hex color
function rgbToHex(rgb){
  toArr = rgb.substring(4, rgb.length-1)
          .replace(/ /g, '')
          .split(',');
  if (toArr[0].length === 1){
    toArr[0] = '0' + toArr[0];
  }
  if (toArr[0].length > 2){
    toArr[0] = (parseInt(toArr[0]).toString(16)).slice(-2);
  }
  if (toArr[1].length === 1){
    toArr[1] = '0' + toArr[2];
  }
  if (toArr[1].length > 2){
    toArr[1] = (parseInt(toArr[1]).toString(16)).slice(-2);
  }
  if (toArr[2].length === 1){
    toArr[2] = '0' + toArr[2];
  }
  if (toArr[2].length > 2){
    toArr[2] = (parseInt(toArr[2]).toString(16)).slice(-2);
  }
  return '#' + toArr.toString(16).replace(/,/g, '');
}

// Event listener to fill the canvas pixel with the selected color
function fillColor(pixel){
  if (eraserOn === true && colorFill === false){
    this.style.backgroundColor = 'transparent';
  }else{
    if (eraserOn === false && colorFill === true){
      this.style.backgroundColor = color;
    }
  }
}

// Click to fill individual pixels
cells.forEach(function(cell){
  cell.addEventListener('click', fillColor);
});

// Event listeners to drag the mouse and fill pixels
cells.forEach(function(cell){
  cell.addEventListener('mousedown', startFill);
});

cells.forEach(function(cell){
  cell.addEventListener('mouseup', stopFill);
});

function startFill(){
  cells.forEach(function (cell){
    cell.addEventListener('mousemove', fillColor);
  });
}

function stopFill(){
  cells.forEach(function(cell){
    cell.removeEventListener('mousemove', fillColor);
  });
}

// Fill canvas
var fillAll = document.createElement('button');
fillAll.className = 'edit-buttons';
fillAll.id = 'fill-all';
fillAll.innerHTML = 'Fill';
leftBar.appendChild(fillAll);
fillAll.addEventListener('click', function(){
  cells.forEach(function(cell){
    cell.style.backgroundColor = color;
  });
});

// Eraser to delete color
var eraser = document.createElement('button');
eraser.className = 'edit-buttons';
eraser.id = 'eraser';
eraser.innerHTML = 'Eraser';
leftBar.appendChild(eraser);
eraser.addEventListener('click', eraseColor);

function eraseColor(){
  eraserOn = true;
  colorFill = false;
  cells.forEach(function(cell){
    cell.addEventListener('click', function(){
      if (eraserOn === false && colorFill === true){
        this.style.backgroundColor = color;
      }else{
        if (eraserOn === true && colorFill === false){
          this.style.backgroundColor = 'transparent';
        }
      }
    });
  });
}

// Clear canvas
var clearAll = document.createElement('button');
clearAll.className = 'edit-buttons';
clearAll.id = 'clear-all';
clearAll.innerHTML = 'Clear';
leftBar.appendChild(clearAll);
clearAll.addEventListener('click', function(){
  cells.forEach(function(cell){
    cell.style.backgroundColor = 'transparent';
  });
});
