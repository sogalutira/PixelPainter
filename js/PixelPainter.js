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


// Colors for pallete
function randomColorPalette(){
  var rgbValues = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++){
    color += rgbValues[Math.floor(Math.random() * 16)].toString(16);
  }
  return color;
}

var hexColors =["#3B208B", "#624DA2", "#8979B9", "#B1A6D1", "#D8D2E8", "#92278F", "#A852A5", "#BE7DBC", "#D3A9D2", "#E9D4E9", "#EB208C", "#EF4DA3", "#F379BA", "#F7A6D1", "#FBD2E8", "#ED1F24", "#FF3333", "#FF6666", "#FF9999", "#FFCCCC", "#FA7513", "#FB9142", "#FCAC71", "#FDC8A1", "#FEE3D0", "#FFBF00", "#FFCC33", "#FFD966", "#FFE599", "#FFF2CC", "#FFE900", "#FFED33", "#FFF266", "#FFF699", "#FFFBCC", "#AFD136", "#BFDA5E", "#CFE386", "#DFEDAF", "#EFF6D7", "#3EB549", "#65C46D", "#8BD392", "#B2E1B6", "#D8F0DB", "#00B4C4", "#33C3D0", "#66D2DC", "#99E1E7", "#CCF0F3", "#0049DF", "#336DE5", "#6692EC", "#99B6F2", "#CCDBF9", "#000000", "#333333", "#666666", "#999999", "#FFFFFF"];

// Event listener to get pixel color from color grid
var chosenColor = document.querySelectorAll('.colors');
var color = '';

var selectedColor = createGrid(1,1, {id: 'selected'});
canvasContainer.appendChild(selectedColor);

function getColor(){
  for (var i = 0; i < chosenColor.length; i++){
    chosenColor[i].addEventListener('click', getStyle);
  }
}
getColor();

function getStyle(){
  var selectedPixelColor = document.getElementById('selected');
  console.log(this.style.backgroundColor);
  color = this.style.backgroundColor;
  if (color !== undefined){
    selectedPixelColor.style.backgroundColor = color;
  }
  console.log('selected', selectedPixelColor.style.backgroundColor);
  return color;
}


// Event listener to select color and fill the canvas pixel with the selected color
function fillColor(pixel){
  this.style.backgroundColor = color;
  return this.style.backgroundColor;
}
var cellsArr = [];
var cells = document.querySelectorAll('.columns');
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
  console.log('mouse down');
  cells.forEach(function (cell){
    cell.addEventListener('mousemove', fillColor);
  });
}

function stopFill(){
  console.log('mouse up');
  cells.forEach(function(cell){
    cell.removeEventListener('mousemove', fillColor);
  });
}

