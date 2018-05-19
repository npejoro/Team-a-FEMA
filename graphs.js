var regions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

Plotly.d3.csv('https://raw.githubusercontent.com/npejoro/Team-a-FEMA/nl_branch/FEMA4.csv', (err, rows) => {
    var data = regions.map(y => {
        var d = rows.filter(r => r.Region === y)
        console.log(d)
        return {
            mode: 'markers',
//            marker: {
//                size: data.marker.size.slice(),
//                sizemode: 'area',
//                sizeref: 200000
//            },
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
    
  
    Plotly.newPlot('graph', data)
})
