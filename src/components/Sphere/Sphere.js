import React from 'react';
import './Sphere.css';
import PropTypes from 'prop-types';
import {WEBGL} from '../../WebGL';
import {OrbitControls} from '../../OrbitControls';
import {
  Vector3,
  Raycaster,
  WebGLRenderer,
  Scene,
  Color,
  PerspectiveCamera,
  SphereGeometry,
  Object3D,
  MeshBasicMaterial,
  Mesh
} from 'three';

const initialState = {  
  title: 'no title',
  link: 'no link',
  filled: false
};

class Sphere extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.createPopup = this.createPopup.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  onMouseMove(e, mouseVector, containerWidth, containerHeight, camera, shperes){		
    mouseVector.x = 2 * (e.clientX/containerWidth) - 1;
    mouseVector.y = 1 - 2 * (e.clientY/containerHeight);
    
    const vector = mouseVector.clone().unproject(camera);
    const direction = new Vector3( 0, 0, -1 ).transformDirection(camera.matrixWorld);
    const raycaster = new Raycaster();
    raycaster.set(vector, direction);
    const intersects = raycaster.intersectObjects(shperes.children);

    shperes.children.forEach(function(shpere){
      shpere.material.color.setRGB(shpere.grayness, shpere.grayness, shpere.grayness);
    });

    this.setState(initialState);

    for(let i = 0; i < intersects.length; i++) {      
      const intersection = intersects[i];
      const obj = intersection.object;      
      this.setState({        
        title: obj.userData.title,
        link: obj.userData.link,
        filled: obj.userData.filled
      });
      this.removePopups();
      const popup = this.createPopup(obj.userData.title, 'http://' + obj.userData.link); 
      this.mount.after(popup);    
      obj.material.color.setRGB(1.0 - i/intersects.length, 0, 0);
    }		
  }

  removePopups(){
    const popups = document.getElementsByClassName('Sphere__popup');
    for(let i = 0; i < popups.length; i++){
      popups[i].innerHTML = '';
    }
  }

  createPopup(titleText, link){
    const popup = document.createElement('div');
    const title = document.createElement('h6');
    title.innerText = titleText;
    popup.appendChild(title);
    const href = document.createElement('a');
    href.setAttribute('href', link);
    popup.appendChild(href);
    popup.style.display = 'block';
    popup.addEventListener('click', (event)=>{ 
      event.target.style.display = 'none';     
      window.open(link, '_blank');
    });
    popup.classList.add('Sphere__popup');
    return popup;
  }

  handleReturn(){
    this.props.setPoints(0);
  }

  componentDidMount(){ 
    if(WEBGL.isWebGLAvailable()){
      const range = 50;
      const containerWidth = this.props.width;
      const containerHeight = this.props.height;
      
      const renderer = new WebGLRenderer({alpha: true});
      renderer.setSize(containerWidth, containerHeight);
      this.mount.appendChild(renderer.domElement);      

      const scene = new Scene();
      scene.background = new Color(0xdaffed);

      const camera = new PerspectiveCamera(75, containerWidth/containerHeight, 1, 1000);
      const controls = new OrbitControls(camera, renderer.domElement);
      camera.position.set(0, 0, range * 2);
      controls.update();

      const geom = new SphereGeometry(2, 20, 20);

      const shperes = new Object3D();
      scene.add(shperes);

      for(let i = 0; i < this.props.countPoints; i++ ) {
        const grayness = Math.random() * 0.5 + 0.25;
        const mat = new MeshBasicMaterial();
        const shpere = new Mesh(geom, mat);
        mat.color.setRGB(grayness, grayness, grayness);
        shpere.position.set(getRandomCoord(), getRandomCoord(), getRandomCoord());        
        shpere.grayness = grayness;
        shpere.userData = this.props.data[i];            
        shperes.add(shpere);
      } 
      
      function getRandomCoord(){
        return range * (0.5 - Math.random());        
      }
      
      const mouseVector = new Vector3();
      
      this.mount.addEventListener('mousemove', (e)=>{
        this.onMouseMove(e, mouseVector, containerWidth, containerHeight, camera, shperes);
      }, false);

      this.mount.addEventListener('touchstart', (e)=>{
        this.onMouseMove(e, mouseVector, containerWidth, containerHeight, camera, shperes);
      }, false);

      animate();      

      function animate(){
        requestAnimationFrame(animate); 
        controls.update();       
        renderer.render(scene, camera);
      }     

    }else{
      const warning = WEBGL.getWebGLErrorMessage();
      this.mount.appendChild(warning);
    }    
  }
  render(){
    return <div>
      <h5 onClick={this.handleReturn} className='Sphere__header'>Return</h5>
      <div ref={ref => (this.mount = ref)} className='Sphere_border'></div>
    </div>;    
  }
}
  
Sphere.propTypes = {
  setPoints:PropTypes.func.isRequired,
  width:PropTypes.number.isRequired,
  height:PropTypes.number.isRequired,
  countPoints:PropTypes.number.isRequired,
  data:PropTypes.array.isRequired
};
  
export default Sphere;