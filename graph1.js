graph1();

function graph1(){

var margin = {top: 20, right: 20, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3v3.timeParse("%Y");




// set the ranges
var x = d3v3.scaleTime().range([0, width]);
var y = d3v3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3v3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.arrest); });
// define the line
var valueline2 = d3v3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.noarrest); });
  

// appends a element to 'svg'

var svg = d3v3.select("#graph2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

function draw(data) {
  
  // format the data
  data.forEach(function(d) {
      d.year = parseTime(d.year);
      d.arrest = +d.arrest;
      d.noarrest = +d.noarrest;
  });
  
  
 
  // Scale the range of the data
  x.domain(d3v3.extent(data, function(d) { return d.year; }));
  y.domain([0, d3v3.max(data, function(d) {
	  return Math.max(d.arrest, d.noarrest); })]);
  
  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line1")
      .attr("d", valueline);
  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line2")
      .attr("d", valueline2);  
  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3v3.axisBottom(x) .ticks(16));

  // Add the Y Axis
  svg.append("g")
      .call(d3v3.axisLeft(y))
      

 

  }
// Get the data
d3.json("assault1.json", function(error, data) {
  if (error) throw error;
  
  
  draw(data);
});

}
