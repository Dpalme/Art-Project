import * as THREE from './three.module.js';
import Stats from 'https://threejs.org/examples/jsm/libs/stats.module.js';

const output = document.getElementById('output');

// FPS stats
const stats = new Stats();
output.appendChild(stats.dom);

// Setup scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202945);
scene.add(new THREE.AmbientLight(0xEAEAEA));

// Setup camera
let camera = new THREE.PerspectiveCamera(15, output.clientWidth / output.clientHeight);
camera.position.set(0, 50, 500);
camera.lookAt(0, 0, 0);
camera.updateProjectionMatrix();
const pivot = new THREE.Group();
pivot.add(camera);
scene.add(pivot);
output.addEventListener('resize', onResize, false);

// Setup renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(output.clientWidth, output.clientHeight);
output.appendChild(renderer.domElement);

// Setup Globe
const geometry = new THREE.SphereBufferGeometry(50, 50, 50);
const loader = new THREE.TextureLoader()
loader.load('./Map@4x.png', function (texture) {
  const material = new THREE.MeshBasicMaterial({
    map: texture
  })
  scene.add(new THREE.Mesh(geometry, material))
  animate()
})


function onResize() {
  camera.aspect = output.clientWidth / output.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(output.clientWidth, output.clientHeight);
}

// Kick-off renderer
function animate() {
  // Frame cycle
  pivot.rotation.y += 0.005;
  renderer.render(scene, camera);
  stats.update();
  requestAnimationFrame(animate);
};