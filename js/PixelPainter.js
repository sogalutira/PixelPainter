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
    setAttr(rowElement, attributes);
    gridElement.appendChild(rowElement);

    for (var j = 0; j < columns; j++){
      var columnElement = document.createElement('div');
      setAttr(columnElement, attributes);
      if (attributes === undefined){
        columnElement.className = "columns";
      }
      rowElement.appendChild(columnElement);
    }
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
function pixelPainter(width, height, attributes){
  var paintContainer = document.getElementById('pixelPainter');
  var colorsGrid = createGrid(6, 11, {class: 'colors'});
  colorsGrid.id = "pp-colors";
  var indivColor = colorsGrid.querySelectorAll('.colors');
  for (var i = 0; i < indivColor.length; i++){
    indivColor[i].style.backgroundColor = randomColorPalette();
  }

  paintContainer.appendChild(colorsGrid);
  var canvasGrid = createGrid(width, height);
  canvasGrid.id = "pp-canvas";
  paintContainer.appendChild(canvasGrid);
}

function randomColorPalette(colors){
  var rgbValues = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++){
    color += rgbValues[Math.floor(Math.random() * 16)].toString(16);
  }
  return color;
}

pixelPainter(10, 10);

// Event listener to get pixel color from color grid
var chosenColor = document.getElementsByClassName("colors");
var color = '';

function getColor(){
  for (var i = 0; i < chosenColor.length; i++){
    chosenColor[i].addEventListener('click', getStyle);
  }
}

function getStyle(){
  console.log(this.style.backgroundColor);
}

getColor();






