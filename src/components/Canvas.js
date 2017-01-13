import React, { Component } from 'react'
import * as THREE from 'three'
import Scene from './Scene'

class Canvas extends Component {

  componentDidMount() {
    const canvas = document.getElementById('canvas')
    const options = {
      canvas: canvas
    }
    this.scene = new Scene(options)
    this.scene.start()
  }

  render() {

    for (const item of this.props.data) {
      var geometry = new THREE.BoxGeometry(1, item.price, 1 );
      var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
      var cube = new THREE.Mesh( geometry, material );
      this.scene.scene.add(cube)
    }


    return (
      <canvas id="canvas"></canvas>
    )
  }

}

export default Canvas
