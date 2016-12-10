function createGrid(rows, columns, attributes) {
  var gridElement = document.createElement('div');
  gridElement.className = "grid";

  // validations
  if (typeof rows !== 'number' || rows < 0){
    throw new Error("Non-negative values only.");
  }
  if (typeof columns !== 'number' || columns < 0){
    if (typeof columns === 'object'){
      attributes = columns;
    }
    columns = rows;
  }

  // loops to create rows and columns
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

// function to add attributes to the grid
function setAttr(element, attrObj){
  if (typeof attrObj === 'object'){
    keys = Object.keys(attrObj);
    for (var i = 0; i < keys.length; i++){
    element.setAttribute(keys[i], attrObj[keys[i]]);
    }
  }
}

// creating a pixel painter with color palette and grid using createGrid function
var paintContainer = document.getElementById('pixelPainter');
var canvasContainer = document.createElement('div');
canvasContainer.id = 'canvases';

var leftBar = document.createElement('div');
leftBar.className = "left-bar";

// Create grid for color palette
var colorsGrid = createGrid(6, 11, {class: 'colors'});
colorsGrid.id = "pp-colors";
leftBar.appendChild(colorsGrid);
canvasContainer.appendChild(leftBar);

// Grid to show user selected color
var selectedContainer = document.createElement('div');
selectedContainer.className = 'selected-container';
var selectedColor = document.createElement('div');
selectedColor.id = 'selected';
var gridDescrDiv = document.createElement('div');
gridDescrDiv.className = 'selected-description';
gridDescrDiv.innerHTML = 'color';
selectedContainer.appendChild(selectedColor);
selectedContainer.appendChild(gridDescrDiv);
leftBar.appendChild(selectedContainer);

//Create grid for canvas
var canvasGrid = createGrid(10, 10);
canvasGrid.id = "pp-canvas";
canvasContainer.appendChild(canvasGrid);
paintContainer.appendChild(canvasContainer);

// Colors for palette
var hexColors = [/* red */'#B20000', '#CC0000', '#E50000', '#FF0000', '#FF1919', '#FF3333', '#FF4C4C', '#FF6666', '#FF7F7F', '#FF9999', '#FFB2B2', /* orange */'#662C00', '#7F3700', '#994200', '#B24D00', '#CC5800', '#E56300', '#FF6F00', '#FF6F00', '#FF7D19', '#FF8B33', '#FF9A4C', /* yellow */'#CCC100', '#E5D900', '#FFF200', '#FFF999', /* green */ '#D2FF7F', '#DBFF99', '#E4FFB2', '#A6FF00', '#95E500', '#84CC00', '#00991E', '#00B223', '#00CC28', '#00E52D', '#00FF33', '#00FF33', '#66FF84', '#B2FFC1', /* blue */'#B2F6FF', '#99F3FF', '#7FF0FF', '#66EDFF', '#008799','#009DB2', '#00B4CC', '#00CAE5', '#00E1FF', '#4CEAFF', /* violet */'#D3B2FF', '#C599FF', '#A866FF', '#8B33FF', '#5800CC', /* grayscale */ '#000000', '#191919', '#333333', '#4C4C4C', '#666666', '#7F7F7F', '#999999', '#B2B2B2', '#CCCCCC', '#E5E5E5', '#FFFFFF'];

// Fill color palette
var indivColor = colorsGrid.querySelectorAll('.colors');
indivColor.forEach(function(cell, index){
  cell.style.backgroundColor = hexColors[index];
});

// Functions for random colors
function randomColorPalette(){
  var rgbValues = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++){
    color += rgbValues[Math.floor(Math.random() * 16)].toString(16);
  }
  return color;
}

function setRandomPalette(){
  for (var j = 0; j < indivColor.length; j++){
    indivColor[j].style.backgroundColor = randomColorPalette();
  }
}

// Variables for event listeners
var chosenColor = document.querySelectorAll('.colors');
var cells = document.querySelectorAll('.columns');
var color = '';
var width = 0;

// Eraser to delete color
var eraser = document.createElement('button');
eraser.className = 'eraser';
eraser.innerHTML = 'Erase';
leftBar.appendChild(eraser);
eraser.addEventListener('click', eraseColor);

function eraseColor(){
  cells.forEach(function(cell){
    cell.addEventListener('click', function(){
      this.style.backgroundColor = 'transparent';
    });
  });
}

// Event listener to get pixel color from color palette grid
function getColor(){
  for (var i = 0; i < chosenColor.length; i++){
    chosenColor[i].addEventListener('click', getStyle);
  }
}
getColor();

function getStyle(){
  var selectedPixelColor = document.getElementById('selected');
  color = this.style.backgroundColor;
  if (color !== undefined){
    selectedPixelColor.style.backgroundColor = color;
  }
  console.log('selected', selectedPixelColor.style.backgroundColor);
  return color;
}

// Event listener to fill the canvas pixel with the selected color
function fillColor(pixel){
  this.style.backgroundColor = color;
  return this.style.backgroundColor;
}

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



