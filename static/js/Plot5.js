/* data route */
var url = "/future";

function buildPlot() {
    Plotly.d3.json(url, function(error, impactData){
  // Create a lookup table to sort and regroup the columns of data,
  // first by Year, then by Disaster:
  var lookup = {};
  function getData(Year, Disaster) {
    var byYear, trace;
    if (!(byYear = lookup[Year])) {;
      byYear = lookup[Year] = {};
    }
     // If a container for this Year + Disaster doesn't exist yet,
     // then create one:
    if (!(trace = byYear[Disaster])) {
      trace = byYear[Disaster] = {
        x: [],
        y: [],
        id: [],
        text: [],
        marker: {size: []}
      };
    }
    return trace;
  }

  // Go through each row, get the right trace, and append the data:
  for (var i = 0; i < data.length; i++) {
    var datum = data[i];
    var trace = getData(datum.Year, datum.Disaster);
    trace.text.push(datum.Name);
    trace.id.push(datum.Name);
    trace.x.push(datum.Deaths);
    trace.y.push(datum.Cost);
    trace.marker.size.push(datum.pop);
  }

  // Get the group names:
  var Year = Object.keys(lookup);
  // In this case, every Year includes every Disaster, so we
  // can just infer the Disaster from the *first* Year:
  var firstYear = lookup[Year[0]];
  var Disaster = Object.keys(firstYear);

  // Create the main traces, one for each Disaster:
  var traces = [];
  for (i = 0; i < Disaster.length; i++) {
    var data = firstYear[Disaster[i]];
     // One small note. We're creating a single trace here, to which
     // the frames will pass data for the different Year. It's
     // subtle, but to avoid data reference problems, we'll slice 
     // the arrays to ensure we never write any new data into our
     // lookup table:
    traces.push({
      name: Disaster[i],
      x: data.x.slice(),
      y: data.y.slice(),
      id: data.id.slice(),
      text: data.text.slice(),
      mode: 'markers',
      marker: {
        size: data.marker.size.slice(),
        sizemode: 'area',
        sizeref: 200000
      }
    });
  }


  var frames = [];
  for (i = 0; i < Year.length; i++) {
    frames.push({
      name: Year[i],
      data: Disaster.map(function (Disaster) {
        return getData(Year[i], Disaster);
      })
    })
  }
    

  var sliderSteps = [];
  for (i = 0; i < Year.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: Year[i],
      args: [[Year[i]], {
        mode: 'immediate',
        transition: {duration: 300},
        frame: {duration: 300, redraw: false},
      }]
    });
  }
  
  var layout = {
    xaxis: {
      title: 'Deaths',
      autorange: true
    },
    yaxis: {
      title: 'Cost in Millions',
      autorange: true
    },
    hovermode: 'closest',

    updatemenus: [{
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: {t: 87, r: 10},
      buttons: [{
        method: 'animate',
        args: [null, {
          mode: 'immediate',
          fromcurrent: true,
          transition: {duration: 300},
          frame: {duration: 500, redraw: false}
        }],
        label: 'Play'
      }, {
        method: 'animate',
        args: [[null], {
          mode: 'immediate',
          transition: {duration: 0},
          frame: {duration: 0, redraw: false}
        }],
        label: 'Pause'
      }]
    }],

    sliders: [{
      pad: {l: 130, t: 55},
      currentvalue: {
        visible: true,
        prefix: 'Year:',
        xanchor: 'right',
        font: {size: 20, color: '#666'}
      },
      steps: sliderSteps
    }]
  };
  
  // Create the plot:
  Plotly.plot('timeline', {
    data: traces,
    layout: layout,
    frames: frames,
  });
});
}