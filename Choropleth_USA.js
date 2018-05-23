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
        zmin: Math.min.currentCount,
        zmax: Math.max.currentCount,
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
console.log(data)
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

  
  
  var update = {
        width: 1250,
        height:700
  
  }  
Plotly.relayout(MyDiv, update)
  }

Plotly.d3.csv('https://raw.githubusercontent.com/npejoro/Team-a-FEMA/ken_/FEMA5.csv', myFunction);

