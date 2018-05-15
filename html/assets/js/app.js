// Page 3: Impact and future analysis FEMA Data

var width = parseInt(d3.select("#scatter").style("width"));
var height = width - width / 3.9;

var margin = 20;
var labelArea = 110;

var tPadBot = 40;
var tPadLeft = 40;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");

var circRadius;
function crGet() {
    if(width <=530) {
        circRadius = 5;

    }
    else {
        circRadius = 10;
    }
}
crGet()
svg.append("g").attr("class", "xText");
var xText = d3.select(".xText");

function xTextRefresh() {
    xText.attr(
        "transform",
        "translate(" +
        ((width - labelArea) / 2 + labelArea) +
        "," +
        (height - margin - tPadBot) +
        ")"
    );
}
xTextRefresh();

xText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "Year")
    .attr("data-axis", "x")
    .attr("class", "aText active x")
    .text("Year Disaster Started");

var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) /2 - labelArea;
svg.append("g").attr("class", "yText");
var yText = d3.select(".yText");

function yTextRefresh() {
    yText.attr(
        "transform",
        "translate(" + leftTextX + ", " +leftTextY + ")rotate(-90)"
    );
}
yTextRefresh();
yText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "Total CPI-Adjusted Cost (Millions of Dollars)")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("Total Cost (in Millions USD");

yText
    .append("text")
    .attr("x", 0)
    .attr("data-name", "Deaths")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Smokes (%)");

d3.csv("assets/data/NOAA.csv", function(data){
    visualize(data);
});

function visualize(theData){
    var curX = "Year";
    var curY = "Total CPI-Adjusted Cost (Millions of Dollars)";

    var xMin;
    var xMax;
    var yMin;
    var yMax;

    var toolTip =d3
        .tip()
        .attr("class", "d3-tip")
        .offset([40, -60])
        .html(function(d){
            var theX;
            var theName = "<div>" + d.Name + "</div>";
            var theDisaster = "<div>" +d.Disaster + "</div>";
            var theY = "<div>" +curY +": " +d[curY] + "</div>";
            if (curX === "Year") {
                theX = "<div>" + curX + ": " + d[curX] + "%</div>";
            }
            else {
                theX = "<div>" +
                  curX +
                  ": " +
                  parseFloat(d[curX]).toLocaleString("en") +
                  "</div>";
            }   
            return theName + theDisaster + theX + theY;    
         });
    svg.call(toolTip);
        }