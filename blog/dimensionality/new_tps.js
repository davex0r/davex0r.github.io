var svgContainer = d3.select("#new_tps")

var triangleGroup = svgContainer.append("g")
.attr("transform","translate(0,130)");

var poly = [{"x":0, "y":0},
{"x":100,"y":0},
{"x":0,"y":-50}];

triangleGroup.selectAll("polygon")
.data([poly])
.enter().append("polygon")
.attr("points",function(d) {
	return d.map(function(d) {
		return [(d.x),(d.y)].join(",");
	}).join(" ");
});

var sliderGroup = svgContainer.append("g")
.attr("transform","translate(0,200)")
.style("width","50%");

var parameter = ['l1', 'l2', 'theta']
var llt = [50, 50, Math.PI/4];
var max = [100, 100, Math.PI/2];
var stepSize = [1, 1, Math.PI/36];

areaFun = function(x){return x[0]*x[1]*Math.sin(x[2])}


updateTriangle = function(x){triangleGroup.selectAll('polygon')
.attr('points',"0,0,"+4*x[0]+",0,"+2*x[1]*Math.cos(x[2])+",-"+2*x[1]*Math.sin(x[2]))}

lfun = function(x,P){return x.map(function(xi){return Math.abs(t_area-xi*P[0]*Math.sin(P[1]))})}

thetafun = function(x,P){return x.map(function(xi){return Math.abs(t_area-P[0]*P[1]*Math.sin(xi))})}

function update(){
	t_area = areaFun(llt)
	updateTriangle(llt)
	console.log(t_area)
}
d3.select("#myCheckbox").on("change",update);
update();

var symbols = ["l1","l2","\u0398"]
var mySliders = []

llt.forEach((parameter, i) => {
var mySlider = d3
.sliderBottom()
.min(0)
.max(max[i])
.step(stepSize[i])
.width(400)
.default(llt[i])
.displayValue(false)
.on('start', num => {
 t_area = areaFun(llt)
 updatellt(i,num)
 updateTriangle(llt)
})
.on('drag', num => {
 updatellt(i,num)
 updateTriangle(llt)
})
.on('end', num=>{
	updateSliders(llt,i)
	console.log(llt)
})

  mySliders.push(mySlider)
 // for each value in llt append a g group, translate it down, give it an id and call the slider function to create a slider in it.
sliderGroup
.append("svg:text")
.attr('transform', `translate(0,${60 * i+5})`)
.text(symbols[i])

sliderGroup
.append('g')
.attr('transform', `translate(45,${60 * i})`)
.attr('id',`slider${i}`)
.call(mySlider)

});

function updatellt(i,num){
if(d3.select("#myCheckbox").property("checked")){
	 llt[i]=num;
	 if (i==0){
		x = [llt[i]];
		params = fminsearch(lfun,[llt[1], llt[2]],x,x,{maxIter:100,display:false})
		console.log(params)
		llt[1]=params[0];
		llt[2]=params[1];
		} else if (i==1) {
		x = [llt[i]];
		params = fminsearch(lfun,[llt[0], llt[2]],x,x,{maxIter:100,display:false})
		console.log(params)
		llt[0]=params[0];
		llt[2]=params[1];
		} else {
		x = [llt[i]];
		params = fminsearch(thetafun,[llt[0], llt[1]],x,x,{maxIter:100,display:false})
		console.log(params)
		llt[0]=params[0];
		llt[1]=params[1];
		}
  } else {
	 llt[i] = num;
  }
}

function updateSliders(llt){
	for (j=0; j<=2; ++j){
	mySliders[j].value(llt[j])
}}

function resetllt() {
	// llt.forEach((parameter,i)=>{
	// updateSliders(llt,i)})
	llt = [50, 50, Math.PI/4];
	updateTriangle(llt)
	updateSliders(llt)
	t_area = areaFun(llt)
  };
d3.select("#button1").on("click", resetllt )
