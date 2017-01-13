import React, { Component } from 'react'
import * as THREE from 'three'
import Scene from './Scene'

import SvgToShape from './three/SvgToShape'
import parse from 'svg-path-parser'

import svgMesh3d from 'svg-mesh-3d'
import extractPath from 'extract-svg-path'
import loadSvg from 'load-svg'
import reindex from 'mesh-reindex'
import unindex from 'unindex-mesh'

const createGeom = require('three-simplicial-complex')(THREE)


// import d3 from 'd3'

// import radialBarChart from './d3/radialBarChart'
// import circularHeatChart from './d3/circularHeatChart'

class Canvas extends Component {

  componentDidMount() {
    const canvas = document.getElementById('canvas')
    const options = {
      canvas: canvas
    }
    this.scene = new Scene(options)
    this.scene.start()

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

      this.update()
    }.bind(this));

    function type(d) {
      d.time = +d.time;
      d.value = +d.value;
      return d;
    }



  }

  update() {
    const material = new THREE.ShaderMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      // vertexShader: vertShader,
      // fragmentShader: fragShader,
      wireframe: false,
      transparent: true,
      // attributes: attributes,
      uniforms: {
        opacity: { type: 'f', value: 1 },
        scale: { type: 'f', value: 0 },
        animate: { type: 'f', value: 0 }
      }
    })

/*

    var length = 12, width = 8;
    var d = extractPath.parse($('svg')[0])
    window.d = d

    const path = parse(d)
    window.path = path

    var shape = SvgToShape.transform(d)

    var extrudeSettings = {
      steps: 2,
      amount: 16,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1
    };

    var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    var mesh = new THREE.Mesh( geometry, material ) ;
    window.mesh = mesh
    mesh.scale.set(0.01,0.01,0.01)
    this.scene.scene.add( mesh );
    */

    var svgPath = extractPath.parse($('svg')[0])
    var complex = svgMesh3d(svgPath, {
      delaunay: false,
      scale: 4
    })
    window.complex = complex
    complex = reindex(unindex(complex.positions, complex.cells))
    const geometry = new createGeom(complex)


    const mesh = new THREE.Mesh(geometry, material)
    this.scene.scene.add(mesh)
  }

  render() {

    // for (const item of this.props.data) {
    //   var geometry = new THREE.BoxGeometry(1, item.price, 1 );
    //   var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    //   var cube = new THREE.Mesh( geometry, material );
    //   this.scene.scene.add(cube)
    // }


    return (
      <canvas id="canvas"></canvas>
      )
  }

}

export default Canvas
