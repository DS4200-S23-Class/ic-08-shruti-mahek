const WIDTH = 400;
const HEIGHT = 600;
const MARGINS = {left : 50, right : 50, top : 50, bottom : 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left -MARGINS.right;


const FRAME = d3.select("#vis")
                    .append("svg")
                        .attr("height", HEIGHT)
                        .attr("width", WIDTH)
                        .attr("class", "frame");

function plot(){
    d3.csv("data/data.csv").then((data) => { 

        const Y_MAX = d3.max(data, (d) => { return parseInt(d.amount); });
        
        const X_SCALE = d3.scaleBand()
            .range([0, VIS_WIDTH])
            .domain(data.map(function(d) {return d.category;}));
            
        const Y_SCALE = d3.scaleLinear() 
            .domain([0, Y_MAX])
            .range([VIS_HEIGHT, MARGINS.top]);
      
      
      FRAME.selectAll('bars')
            .data(data)
            .enter()
            .append('rect')
            .attr("x", (d) => { return X_SCALE(d.category) + MARGINS.left; })
            .attr("y", (d) => { return Y_SCALE(d.amount) + MARGINS.bottom; })
              .attr('width', X_SCALE.bandwidth())
              .attr('height', (d) => VIS_HEIGHT - Y_SCALE(d.amount))
              .attr('fill', 'powderblue')
              .attr('class', 'bar');
      
       });
};


plot()
