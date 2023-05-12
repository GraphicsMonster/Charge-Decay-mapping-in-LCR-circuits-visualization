//My attempt at plotting the function for Voltage across the capacitor in an LCR circuit as taught in class.
//Have already imported D3.js library in the html file so we don't have to do that here.
// Defining the potential function
function potential(V0, I, R, L, C, t) {
    return V0 * Math.exp(-R*t/(2*L)) * Math.cos(Math.sqrt(1/(L*C)-(R/(2*L))**2)*t) + I*R;
  }
  
  // Defining the parameters for the function
  const V0 = 50;
  const I = 1;
  const R = 1;
  const L = 3;
  const C = 0.1;
  
  // Defining the range of t values to plot
  const tMin = 0;
  const tMax = 10;
  const tStep = 0.1;
  
  // Calculating the data points for the potential function
  let data = [];
  for (let t = tMin; t <= tMax; t += tStep) {
    data.push({t: t, V: potential(V0, I, R, L, C, t)});
  }
  
  // Setting up the canvas boundaries
  const margin = {top: 20, right: 20, bottom: 50, left: 50};
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  // Setting up the scales for the x and y axes
  const xScale = d3.scaleLinear()
    .domain([tMin, tMax])
    .range([0, width]);
  
  const yScale = d3.scaleLinear()
    .domain([I*R - V0, I*R + V0])
    .range([height, 0]);
  
  // Create the SVG element and plot the data points
  const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xScale(d.t); })
    .attr("cy", function(d) { return yScale(d.V); })
    .attr("r", 3);
  
  // Add the x and y axes
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));
  
  svg.append("g")
    .call(d3.axisLeft(yScale));
  
  // Add a title and axis labels to the plot
  svg.append("text")
    .attr("x", width/2)
    .attr("y", 0 - margin.top/2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("Plot of V(t)");
  
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - height/2)
    .attr("y", 0 - margin.left)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("V(t)");
  
  svg.append("text")
    .attr("x", width/2)
    .attr("y", height + margin.bottom/2)
    .attr("text-anchor", "middle")
    .text("t");
  