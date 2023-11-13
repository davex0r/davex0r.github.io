var cols = 3;
var rows = 3;
var width = 50;
var margin = 10;
var cellSize = ( width * 2 ) + margin;
var offset = 50;

var colors = [
    [ 39, 255, 255 ],
    [ 230, 2, 127 ],
    [ 255, 135, 61 ],
    [ 255, 247, 94 ],
    [ 50, 237, 97 ],
    [ 255, 0, 0]
];

var dataset = [
  [{cx: 10, cy: 10},{cx: 10, cy: 20},{cx: 10, cy: 30}],
  [{cx: 20, cy: 10},{cx: 20, cy: 20},{cx: 20, cy: 30}],
  [{cx: 30, cy: 10},{cx: 30, cy: 20},{cx: 30, cy: 30}],
];

var grid = d3.select("#grid")
.append("svg")
.attr("width", cols*cellSize )
.attr("height", rows * cellSize )
.attr("transform","translate(0,0)");


grid.selectAll("g")
.data(dataset)
.enter().append("g")
.attr("transform", function (d, i) {
  return "translate(" + i * cellSize + ")"
})
.selectAll("polygon")
.data(function(d) {return d;})
.enter().append("polygon")
.attr("points",function(d,i) {
	return [width/2,i*cellSize+offset, width/2+2*d.cx,i*cellSize+offset, width/2+d.cx,i*cellSize+offset-d.cy]})
