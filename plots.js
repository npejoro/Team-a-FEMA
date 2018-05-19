function init() {
  data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }];
  var LINE = document.getElementById("plot");
  Plotly.plot(LINE, data);
}

function updatePlotly(newx, newy) {
  var LINE = document.getElementById("plot");

  // Note the extra brackets around 'newx' and 'newy'
  Plotly.restyle(LINE, "x", [newx]);
  Plotly.restyle(LINE, "y", [newy]);
}

function getData(dataset) {

  // Initialize empty arrays to contain our axes
  var x = [];
  var y = [];

  // Fill the x and y arrays as a function of the selected dataset
  switch (dataset) {
      case "dataset1":
          x = [1, 2, 3, 4, 5];
          y = [0.1, 0.2, 0.3, 0.4, 0.5];
          break;
      case "dataset2":
          x = [10, 20, 30, 40, 50];
          y = [1, 10, 100, 1000, 10000];
          break;
      case "dataset3":
          x = [100, 200, 300, 400, 500];
          y = [10, 100, 50, 10, 0];
          break;
      default:
          x = [1, 2, 3, 4, 5];
          y = [1, 2, 3, 4, 5];
          break;
      }

  updatePlotly(x, y);
}

init();
