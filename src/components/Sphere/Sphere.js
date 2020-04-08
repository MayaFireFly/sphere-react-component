import React from 'react';
import './Sphere.css';
import * as THREE from 'three';

class Sphere extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount() {    
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, this.props.width/this.props.height, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( this.props.width, this.props.height );
    this.mount.appendChild( renderer.domElement );
    var geometry = new THREE.SphereGeometry(3, 50, 50);
    var material = new THREE.MeshBasicMaterial( {color: 0x121211} );
    var sph = new THREE.Mesh(geometry, material);
    scene.add(sph);
    camera.position.z = 6;
    var render = function () {
      requestAnimationFrame(render);
      sph.rotation.x += 0.01;
      sph.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    render();
  }
  render(){
    return <div ref={ref => (this.mount = ref)}></div>;
  }
}

export default Sphere;