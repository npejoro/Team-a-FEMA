/* data route */
var url = "/future";

function buildPlot() {
    Plotly.d3.json(url, function(error, impactData){
    
    console.log(impactData)
    
    // var ultimateColors=[
    //     ["#440154FF", "#482677FF", "#404788FF", "#39568CFF", "#2D708EFF", "#238A8DFF", "#1F968FF", "#29AF7FFF", "#55C667FF", "#95D840FF", "#FD3725FF"]
    // ]
    var pieData = [{
        values: impactData[0]['Cost'],
        labels: impactData[0]['Disaster'],
        hoverinfo: 'hovertext',
        hole: .5,
        type: 'pie',
        marker: {
            colors: ['rgb(149, 216, 64)', 'rgb(255,215,0)', 'rgb(0,128,128)', 'rgb(41,175,127)', 'rgb(0,0,128)', 'rgb(217,217,25)', 'rgb(68,1,84)', 'rgb(0,102,204)', 'rgb(0,204,204)']
    
        }        
    }];

    var pieLayout = {
        margin: { t: 0, l: 0 }
    };
    var costpie = document.getElementById('costpie');
    Plotly.plot(costpie, pieData, pieLayout);
});
}
buildPlot();
