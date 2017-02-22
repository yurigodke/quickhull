(function () {
  map = document.getElementById("map");

  mapContext = map.getContext("2d")

  mapWidth = map.offsetWidth;
  mapHeight = map.offsetHeight;

  points = [];

  drawLines();

  map.addEventListener("click",function(e){
    resetCanvas();
    var point = {
      x: e.offsetX,
      y: e.offsetY
    }

    points.push(point);

    drawLines();
    drawPoints();

    if(points.length > 1){
      drawConections();
    }
  })
})(document, window);

function drawPoints(){
  for(var i=0;i<points.length;i++){
    mapContext.beginPath();
    mapContext.arc(points[i].x,points[i].y,2,0,2*Math.PI);
    mapContext.fill();
  }
}


function drawLines(){
  var lines = 20;

  for(var i=1;i<lines;i++){
    var posY = (mapHeight/lines)*i;
    var posX = (mapWidth/lines)*i;

    var lineXStart = {
      x: 0,
      y: posY
    }
    var lineXEnd = {
      x: mapWidth,
      y: posY
    }
    var lineYStart = {
      x: posX,
      y: 0
    }
    var lineYEnd = {
      x: posX,
      y: mapHeight
    }

    mapContext.beginPath();
    mapContext.strokeStyle = "#888";

    mapContext.lineWidth = 1;
    mapContext.moveTo(lineXStart.x,lineXStart.y);
    mapContext.lineTo(lineXEnd.x,lineXEnd.y);
    mapContext.stroke();

    mapContext.lineWidth = 1;
    mapContext.moveTo(lineYStart.x,lineYStart.y);
    mapContext.lineTo(lineYEnd.x,lineYEnd.y);
    mapContext.stroke();
  }
}

function drawConections(){
  var polyline = new Quickhull(points);

  var pointsConection = polyline.getHullPoints(true);

  console.log(points);
  console.log(pointsConection);

  mapContext.beginPath();
  mapContext.strokeStyle = "#333333";
  for(var i=0;i<pointsConection.length;i++){
    if(i==0){
      mapContext.moveTo(pointsConection[i].x,pointsConection[i].y);
    } else if(i == pointsConection.length-1){
      mapContext.lineTo(pointsConection[i].x,pointsConection[i].y);
      mapContext.lineTo(pointsConection[0].x,pointsConection[0].y);
    } else {
      mapContext.lineTo(pointsConection[i].x,pointsConection[i].y);
    }
  }
  mapContext.stroke();
}

function resetCanvas(){
  mapContext.clearRect(0,0,mapWidth,mapHeight);
}
