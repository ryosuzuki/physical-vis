import React, { Component } from 'react'
import * as THREE from 'three'

import OrbitControls from './three/OrbitControls'

class Hoge {
  constructor (options) {
    const width = window.innerWidth * 0.7
    const height = window.innerHeight
    const unit = 1

    this.current = null
    this.mode = null
    this.count = 0
    this.finish = false
    this.debugging = false

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(70, width / height, 0.01*unit, 1000)
    this.camera.position.set(unit*1.9, unit*1.4, unit*1.8)
    this.scene.add(this.camera)

    this.lookAt = new THREE.Object3D()
    this.lookAt.position.set(0, 0.5*unit, 0)
    this.scene.add(this.lookAt)
    this.lookAt.add(this.camera)
    this.camera.lookAt(this.lookAt.position)

    this.renderer = new THREE.WebGLRenderer(options)
    this.renderer.setClearColor('#eee')
    this.renderer.setSize(width, height)

    let grid = new THREE.GridHelper(unit*5, unit/2);
    grid.position.y = 0.01;
    grid.material.opacity = 0.25;
    grid.material.transparent = true;
    this.scene.add(grid);
    this.grid = grid

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.rotateSpeed = 0.3
    this.controls.zoomSpeed = 0.3
    this.controls.panSpeed = 0.3
    this.controls.damping = 0.2;
    this.controls.dampingFactor = 0.25
    this.controls.enableZoom = true

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    let ambientLight = new THREE.AmbientLight('#999')
    this.scene.add(ambientLight)

    let pointLight = new THREE.PointLight('#fff')
    pointLight.position.set(10*unit, 20*unit, 30*unit)
    pointLight.intensity = 0.1
    pointLight.castShadow = true
    this.scene.add(pointLight)

    let directionalLight = new THREE.DirectionalLight('#fff', 0.2)
    directionalLight.position.set(4*unit, 4*unit, 7*unit)
    this.scene.add(directionalLight);

    let directionalLight2 = new THREE.DirectionalLight('#fff', 0.2)
    directionalLight2.position.set(-7*unit, -4*unit, -4*unit);
    this.scene.add(directionalLight2);

    let spotLight = new THREE.SpotLight('#fff', 1.5);
    spotLight.position.set(unit*7, unit*7, -unit*7);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = unit*3;
    spotLight.shadow.camera.far = this.camera.far;
    spotLight.shadow.camera.fov = 70;
    spotLight.shadow.bias = -0.000222;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    // this.scene.add(spotLight);

    this.isAnimating = true
    this.isControl = true
  }

  start () {
    this.isAnimating = true
    this.listen()
    this.render()
  }

  stop () {
    this.isAnimating = false
  }

  render () {
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera)
    this.animate()
    if (this.isAnimating) {
      requestAnimationFrame(this.render.bind(this))
    }
  }

  update (event) {
    event.preventDefault()
    this.mouse.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;
    this.raycaster.setFromCamera( this.mouse, this.camera );
    // let objects = [this.mesh]
    // this.intersects = this.raycaster.intersectObjects(objects);
    // if (this.intersects.length == 0) {
    //   this.current = null
    //   return false
    // }
  }

  listen () {
    document.addEventListener('mousedown', this.update.bind(this), false)
    document.addEventListener('mousemove', this.update.bind(this), false)
    document.addEventListener('mouseup', this.update.bind(this), false)
    document.addEventListener('dblclick', this.update.bind(this), false)
    window.addEventListener('resize', this.onWindowResize, false);
  }

  onWindowResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  animate () {
  }

  setCameraFOV (fov, z) {
    this.camera.fov = fov
    this.camera.position.z = z || this.camera.position.z
    this.camera.updateProjectionMatrix()
  }

}

export default Hoge
