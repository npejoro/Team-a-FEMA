var regions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

Plotly.d3.csv('https://raw.githubusercontent.com/npejoro/Team-a-FEMA/nl_branch/FEMA4.csv', (err, rows) => {
    var data = regions.map(y => {
        var d = rows.filter(r => r.Region === y)
        console.log(d)
        return {
            mode: 'markers',
            marker: {
                opacity: 0.7, 
                size: d.map(r => r.Duration),
                sizemode: 'area',
                sizeref: .2
            },
            type: 'scatter',
            name: y,
            x: d.map(r => r.Year),
            y: d.map(r => r.Count)
        }
    })
//    var layout = {
//        autosize: false,
//        width: 500,
//        height: 1000,
//        margin: {
//            l: 50,
//            r: 50,
//            b: 100,
//            t: 100,
//            pad: 4
//        },
//        paper_bgcolor: '#7f7f7f',
//        plot_bgcolor: '#c7c7c7'
//    };
    Plotly.newPlot('graph', data)
    
    var update = {
        width: 1200,
        height:700
    }
    Plotly.relayout('graph', update)
})
