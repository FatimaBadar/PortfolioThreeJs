import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js'; //can move around scene by mouse

//need 3 things: scene, camera, renderer
//scene - container, holds objects, cameras in place
const scene = new THREE.Scene();
//need camera. multiple types. most common:
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000) 
//(view of out 360, aspect ratio based on browser window, 
//view frustum to control which objects are visible relative to the camera itself - 0.1, 1000 can pretty much see everything) 
//mimics what human ball sees

//render actual graphics:
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'), //tell which dom element to use
});

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight) //full screen canvas

//currently camera is at the middle of the scene
//so more it:
camera.position.setZ(30); //will give better perspective when we start adding shapes

renderer.render(scene, camera) //draw
//rn blank screen, so add objects:
//geometry: {x,y,z} ppints that make a shape
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } ); //like a wrapping paper
const torus = new THREE.Mesh( geometry, material ); //applies material to geometry
scene.add( torus );

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5,5)

const ambientLight = new THREE.AmbientLight(0xffffff) //like bulb light, lighst everything equally
scene.add(pointLight, ambientLight)

//helpers:
const lightHelper = new THREE.PointLightHelper(pointLight) //shows the position of pointlight
const gridHelper = new THREE.GridHelper(200, 50) 
scene.add(lightHelper, gridHelper)

//to move around the scene using mouse:
const controls = new OrbitControls(camera, renderer.domElement)

function animate() { //recursive func that calls render auto to reflect changes to UI as things/ we move
    requestAnimationFrame(animate)
    torus.rotation.x +=0.01
    torus.rotation.y +=0.005
    torus.rotation.z += 0.01 

    controls.update();
    
    renderer.render(scene, camera)
}
animate();