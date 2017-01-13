import React, { Component } from 'react'
import SvgSaver from 'svgsaver'
import rd3 from 'react-d3'

const svgsaver = new SvgSaver()
var BarChart = rd3.BarChart;
var LineChart = rd3.LineChart;
var CandlestickChart = rd3.CandlestickChart;
var PieChart = rd3.PieChart;
var AreaChart = rd3.AreaChart;
var Treemap = rd3.Treemap;
var ScatterChart= rd3.ScatterChart;

var lineData = [{
  name: 'series1',
  values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
  strokeWidth: 3,
  strokeDashArray: "5,5",
}, {
  name: 'series2',
  values : [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ]
}, {
  name: 'series3',
  values: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
}];

var scatterData = [{
  name: "series1",
  values: [ { x: 0, y: 20 }, { x: 5, y: 7 }, { x: 8, y: 3 }, { x: 13, y: 33 }, { x: 12, y: 10 }, { x: 13, y: 15 }, { x: 24, y: 8 }, { x: 25, y: 15 }, { x: 16, y: 10 }, { x: 16, y: 10 }, { x: 19, y: 30 }, { x: 14, y: 30 }]
}, {
  name: "series2",
  values: [ { x: 40, y: 30 }, { x: 35, y: 37 }, { x: 48, y: 37 }, { x: 38, y: 33 }, { x: 52, y: 60 }, { x: 51, y: 55 }, { x: 54, y: 48 }, { x: 45, y: 45 }, { x: 46, y: 50 }, { x: 66, y: 50 }, { x: 39, y: 36 }, { x: 54, y: 30 }]
}, {
  name: "series3",
  values: [ { x: 80, y: 78 }, { x: 71, y: 58 }, { x: 78, y: 68 }, { x: 81, y: 47 },{ x: 72, y: 70 }, { x: 70, y: 88 }, { x: 81, y: 90 }, { x: 92, y: 80 }, { x: 81, y: 72 }, { x: 99, y: 95 }, { x: 67, y: 81 }, { x: 96, y: 78 }]
}];

class Visualize extends Component {
  componentDidMount() {

    this.olhcData = []
    d3.tsv("/data/AAPL_ohlc.tsv", function(error, data) {
      var series = { name: "AAPL", values: [] };

      data.map(function(d) {
        d.date = new Date(+d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        series.values.push({ x: d.date, open: d.open, high: d.high, low: d.low, close: d.close});
      });
      this.olhcData = [series]

      window.data = this.olhcData
      this.render()
    }.bind(this));

    return;

    var formatDate = d3.time.format("%a"),
    formatDay = function(d) { return formatDate(new Date(2007, 0, d)); };

    var width = 960,
    height = 500,
    outerRadius = height / 2 - 10,
    innerRadius = 120;

    var angle = d3.time.scale()
    .range([0, 2 * Math.PI]);

    var radius = d3.scale.linear()
    .range([innerRadius, outerRadius]);

    var z = d3.scale.category20c();

    var stack = d3.layout.stack()
    .offset("zero")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.time; })
    .y(function(d) { return d.value; });

    var nest = d3.nest()
    .key(function(d) { return d.key; });

    var line = d3.svg.line.radial()
    .interpolate("cardinal-closed")
    .angle(function(d) { return angle(d.time); })
    .radius(function(d) { return radius(d.y0 + d.y); });

    var area = d3.svg.area.radial()
    .interpolate("cardinal-closed")
    .angle(function(d) { return angle(d.time); })
    .innerRadius(function(d) { return 30; })
    .outerRadius(function(d) { return radius(d.y0 + d.y); });

    var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", 'd3-visualize')
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.csv("/data/radial.csv", type, function(error, data) {
      if (error) throw error;

      var layers = stack(nest.entries(data));
      angle.domain([0, d3.max(data, function(d) { return d.time + 1; })]);
      radius.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

      svg.selectAll(".layer")
      .data(layers)
      .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i); });

    }.bind(this));


    d3.select("#generate")
    .on("click", writeDownloadLink);

    function writeDownloadLink(){
      let svg = document.querySelector('#d3-visualize');
      svgsaver.asSvg(svg)
    };


    function type(d) {
      d.time = +d.time;
      d.value = +d.value;
      return d;
    }
  }

  download(){
    let svg = document.querySelector('.rd3-chart');
    svgsaver.asSvg(svg)
  };

  render() {
    return (
      <div id="visualize">
      <button id="generate" onClick={ this.download }>Save as SVG</button>
      <LineChart
      legend={true}
      data={lineData}
      width='100%'
      height={400}
      viewBoxObject={{
        x: 0,
        y: 0,
        width: 500,
        height: 400
      }}
      title="Line Chart"
      yAxisLabel="Altitude"
      xAxisLabel="Elapsed Time (sec)"
      domain={{x: [,10], y: [-10,]}}
      gridHorizontal={true}
      />      </div>
      )


    return (
      <div id="visualize">
      <button id="generate" onClick={ this.download }>Save as SVG</button>
      <ScatterChart
      id="d3-visualize"
      data={scatterData}
      width={500}
      height={400}
      title="Scatter Chart"
      />
      </div>
      )
  }

}

export default Visualize

