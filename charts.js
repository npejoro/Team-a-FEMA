var disasters = ['Other', 'Earthquake', 'Fire', 'Flood', 'Human', 'Hurricane', 'Snow', 'Tornado', 'Drought']

Plotly.d3.csv('https://raw.githubusercontent.com/npejoro/Team-a-FEMA/master/FEMA4.csv', (err, rows) => {
    var data = disasters.map(y => {
     
        var d = rows.filter(r => r.IncidentType === y)
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
    var layout = {
      xaxis: {
          title: 'Year'
      },
      yaxis: {
        title: 'Incident Count'
       }
    }
    Plotly.newPlot('graph', data, layout)
    
    var update = {
        width: 1250,
        height:700
    }
    Plotly.relayout('graph', update)
})