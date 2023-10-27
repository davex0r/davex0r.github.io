var svg_tri = d3.select("#tri_param-svg")

var parameter = ['l1', 'l2', 'theta']
var llt = [100, 100, 90];
var max = [300, 100, 90];

myfun = function(x,P){return x.map(function(xi){return Math.abs(10000-xi*P[0]*Math.sin(P[1]))})}

thetafun = function(x,P){return x.map(function(xi){return Math.abs(10000-P[0]*P[1]*Math.sin(xi/360*2*3.14159265))})}

d3.selectAll('polygon')
.style('fill', 'orange')
.attr('points',"0,0,220,0,0,-120")

var gPicker = d3
.select('div#slider-tri_param')
.append('svg')
.attr('width', 700)
.attr('height',200)
.append('g')
.attr('transform', 'translate(30,30)');

llt.forEach((parameter, i) => {
  var slider = d3
  .sliderBottom()
  .min(0)
  .max(max[i])
  .step(1)
  .ticks(6)
  .width(600)
  .default(llt[i])
  .displayValue(false)
  .on('onchange', num => {

    if(d3.select("#myCheckbox").property("checked")){
        llt[i]=num;
        if (i==0){
          x = [llt[i]];
          params = fminsearch(myfun,[llt[1], llt[2]],x,x)
          console.log(params)
          llt[1]=params[0];
          llt[2]=params[1];
          d3.selectAll('polygon')
          .attr('points',"0,0,"+2.2*llt[0]+",0,"+2.2*llt[1]*Math.cos(llt[2]/360*2*3.14159265)+",-"+1.2*llt[1]*Math.sin(llt[2]/360*2*3.14159265));
        } else if (i==1) {
          x = [llt[i]];
          params = fminsearch(myfun,[llt[0], llt[2]],x,x)
          console.log(params)
          llt[0]=params[0];
          llt[2]=params[1];
          d3.selectAll('polygon')
          .attr('points',"0,0,"+2.2*llt[0]+",0,"+2.2*llt[1]*Math.cos(llt[2]/360*2*3.14159265)+",-"+1.2*llt[1]*Math.sin(llt[2]/360*2*3.14159265));
        } else {
          x = [llt[i]];
          params = fminsearch(thetafun,[llt[0], llt[1]],x,x)
          llt[0]=params[0];
          llt[1]=params[1];
          console.log(params)
          d3.selectAll('polygon')
          .attr('points',"0,0,"+2.2*llt[0]+",0,"+2.2*llt[1]*Math.cos(llt[2]/360*2*3.14159265)+",-"+1.2*llt[1]*Math.sin(llt[2]/360*2*3.14159265));
        }

      } else {
        llt[i] = num;
        d3.selectAll('polygon')
        .attr('points',"0,0,"+2.2*llt[0]+",0,"+2.2*llt[1]*Math.cos(llt[2]/360*2*3.14159265)+",-"+1.2*llt[1]*Math.sin(llt[2]/360*2*3.14159265));
      }
  });

  gPicker
  .append('g')
  .attr('transform', `translate(5,${60 * i})`)
  .call(slider);

});
