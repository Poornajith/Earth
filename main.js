import * as THREE from 'three';
import './style.css';
import gsap from "gsap";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

//import textures
const mSpaceTexture = new THREE.TextureLoader().load('./assets/mobBg.jpg');
const uvTexture = new THREE.TextureLoader().load('./assets/colors.jpg');
const bumpTexture = new THREE.TextureLoader().load('./assets/bump.jpg');

//scene
const scene = new THREE.Scene();

//create earth
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    map: uvTexture,
    bumpMap: bumpTexture,
    bumpScale:0.5,
});

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

//Light
const sunLight = new THREE.DirectionalLight(0xffffff, 2);
sunLight.position.set(10, 10, 20);
scene.add(sunLight);

//Add bg image
scene.background = mSpaceTexture;

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1,100);
camera.position.z = 20;
scene.add(camera);

//render
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);


//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

//resize
window.addEventListener('resize', () => {
    //update the sizes
    sizes.width =window.innerWidth;
    sizes.height =window.innerHeight;
    //update camera
    camera.updateProjectionMatrix();
    camera.aspect = sizes.width/sizes.height;
    renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
    controls.update();
    renderer.render(scene,camera);
    window.requestAnimationFrame(loop);
}
loop();

//Timeline magic
const tl = gsap.timeline({defaults:{duration:1}});
tl.fromTo(earth.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1});
tl.fromTo("nav", {y:"-100%"}, {y:"0%"});
tl.fromTo(".title", {opacity:0}, {opacity:1});

