function myFunction(err, rows){
  function unpack(rows, key) {
      return rows.map(function (row) { return row[key]; });
  }
  
  var allDisasterNames = unpack(rows, 'IncidentType'),
        allCount = unpack(rows, 'Count'),
        currentCount = []
  
  function getDisasterData(chosenDisaster) {
        currentCount = [];
        for (var i = 0 ; i < allDisasterNames.length ; i++){
            if ( allDisasterNames[i] === chosenDisaster ) {
                currentCount.push(allCount[i]);
            }
        }
    }
  
  function setChoropleth(chosenDisaster) {
      getDisasterData(chosenDisaster);  
    
    var data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unpack(rows, 'StateAbbreviation'),
        z: currentCount,
        text: unpack(rows, 'State'),
        zmin: 0,
        zmax: 50,
        colorscale: [
            [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
            [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
            [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
        ],
        colorbar: {
            title: 'Count of Disaster',
            thickness: 0.2
        },
        marker: {
            line:{
                color: 'rgb(255,255,255)',
                width: 2
            }
        }
    }];

    var layout = {
        title: 'Count of '+ chosenDisaster + ' from 1953 - 2016',
        geo:{
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'
        }   
  };
      
        Plotly.newPlot(MyDiv, data, layout);
    } 

  setChoropleth('Drought');

  var innerContainer = document.querySelector('[data-num="0"'),
        disasterSelector = innerContainer.querySelector('.disasterdata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }
  
  function updateDisaster(){
        setChoropleth(disasterSelector.value);
    }

    disasterSelector.addEventListener('change', updateDisaster, false);
  
}

Plotly.d3.csv('https://raw.githubusercontent.com/npejoro/Team-a-FEMA/ken_/FEMA4.csv', myFunction);

  

//Nicole's stuff

var regions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

function myFunction(err, rows){  
  function unpack(rows, key) {
      return rows.map(function (row) { return row[key]; });
  }
  
  var allDisasterNames = unpack(rows, 'IncidentType'),
        allCount = unpack(rows, 'Count'),
        allYear = unpack(rows, 'Year'),
        allDuration = unpack(rows, 'Duration'),
        allRegion = unpack(rows, 'Region'),
        currentCount = [],
        currentYear = [],
        currentDuration = [],
        currentRegion = [];
  
  function getDisasterData(chosenDisaster) {
    currentRegion = [];
    currentDuration = [];
    currentYear = [];    
    currentCount = [];
        for (var i = 0 ; i < allDisasterNames.length ; i++){
            if ( allDisasterNames[i] === chosenDisaster ) {
                currentCount.push(allCount[i]);
                currentYear.push(allYear[i]);
                currentDuration.push(allDuration[i]);
                currentRegion.push(allRegion[i]);
            }
        }
    }
  
  function setChart(chosenDisaster) {
      getDisasterData(chosenDisaster);
  
  var data = regions.map(y => {
        var d = rows.filter(r => r.Region === y)
        console.log(d)
        return {
            mode: 'markers',
            marker: {
                opacity: 0.7, 
                size: currentDuration,
                sizemode: 'area',
                sizeref: .2
            },
            type: 'scatter',
            name: y,
            x: currentYear,
            y: currentCount
        }
    })

    Plotly.newPlot('graph', data)
    
    var update = {
        width: 1200,
        height:700
    }
    Plotly.relayout('graph', update)
}

  setChart('Drought');

  var innerContainer = document.querySelector('[data-num="0"'),
        disasterSelector = innerContainer.querySelector('.disasterdata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }
  
  function updateDisaster(){
        setChart(disasterSelector.value);
    }

    disasterSelector.addEventListener('change', updateDisaster, false);
}
  Plotly.d3.csv('https://raw.githubusercontent.com/npejoro/Team-a-FEMA/ken_/FEMA4.csv', myFunction);
