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

// function pixelPainter(width, height, attributes){
  var colorsGrid = createGrid(6, 11, {class: 'colors'});
  colorsGrid.id = "pp-colors";
  var indivColor = colorsGrid.querySelectorAll('.colors');
  // console.log(indivColor[1]);
  for (var i = 0; i < indivColor.length; i++){
    indivColor[i].style.backgroundColor = randomColorPalette();
  }

  canvasContainer.appendChild(colorsGrid);

  var canvasGrid = createGrid(10, 10);
  canvasGrid.id = "pp-canvas";
  canvasContainer.appendChild(canvasGrid);
  paintContainer.appendChild(canvasContainer);
// }

function randomColorPalette(){
  var rgbValues = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++){
    color += rgbValues[Math.floor(Math.random() * 16)].toString(16);
  }
  return color;
}

// pixelPainter(10, 10);

// Event listener to get pixel color from color grid
var chosenColor = document.querySelectorAll('.colors');
var color = '';

function getColor(){
  for (var i = 0; i < chosenColor.length; i++){
    chosenColor[i].addEventListener('click', getStyle);
  }
}

function getStyle(){
  console.log(this.style.backgroundColor);
  color = this.style.backgroundColor;
  return color;
}

getColor();

// Event listener to fill the canvas pixel with the selected color

function fillColor(pixel){
  this.style.backgroundColor = color;
  return this.style.backgroundColor;
}

function drag(){
  var cells = document.querySelectorAll('.columns');
    console.log('yo');
  for (var i = 0; i < cells.length; i++){
    cells[i].addEventListener('mousedown', fillColor);
  }
}

drag();
