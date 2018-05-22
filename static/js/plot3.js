/* data route */
var url = "/future";

function buildPlot() {
    Plotly.d3.json(url, function(error, impactData){
    
    console.log(impactData)
        var scatterdata = [{
            type: "scatter",
            mode: "markers",
            name: "Impact of Million Dollar Disasters",
            text: impactData[0]['Name'],
            x: impactData[0]['Deaths'],
            y: impactData[0]['Cost'],
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
        };
        var scatter = document.getElementById('scatter');
        Plotly.newPlot("scatter", scatterdata, layout);
    });
    

}

buildPlot();
