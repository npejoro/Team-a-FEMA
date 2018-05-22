/* data route */
var url = "/future";

function buildPlot() {
    Plotly.d3.json(url, function(error, impactData){
    
    console.log(impactData)
        var trace1 = [{
            type: "scatter",
            mode: "markers",
            name: "Cost",
            text: impactData[0]['Name'],
            x: impactData[0]['Year'],
            y: impactData[0]['Cost'],
            marker: {
                size: impactData[0]['impactScale'],
                color: impactData[0]['disasterType'],
                colorscale: "Viridis"
            }

        }];

        var trace2 =[{
          x: impactData[0]['Year'],
          y: impactData[0]['Deaths'],
          type: 'scatter',
          mode: 'markers',
          name: 'Deaths',
          yaxis: 'y2',
          marker: {
                size: impactData[0]['impactScale'],
                color: impactData[0]['disasterType'],
                colorscale: "Viridis"
          }
        }];

        var layout = {
            title: "Impact of Billion Dollar Disasters",
            height: 600,
            width: 1200,
            margin: { t:0},
            autosize:true,
            xaxis: {
                autorange: true,
                type: "linear",
                hovermode: 'closest',
                title: 'Deaths'
            },
            yaxis: {
                autorange:true,
                type: "linear",
                title: 'Cost in Billions',
                hovermode: 'closest'
            },
            yaxis2: {
              autorange:true,
              type:"linear",
              title: 'Deaths',
              hovermode:'closest',
              side: 'right',
              overlaying: "y"
            },
        };

        var scatterdata = [trace1, trace2];
        var doublescatter = document.getElementById('doublescatter');
        Plotly.newPlot("doublescatter", scatterdata, layout);
    });
    

}

buildPlot();
