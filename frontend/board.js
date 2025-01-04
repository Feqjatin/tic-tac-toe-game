const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,  1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 500);
document.body.appendChild(renderer.domElement);

 
const loader = new THREE.GLTFLoader();
var board;
loader.load('b.glb', function(gltf) {
   board = gltf.scene;
  scene.add(board);
  board.scale.set(1, 1, 1); // Adjust size as needed
     
}, undefined, function(error) {
  console.error(error); // Handle errors
});

var board2;
loader.load('b.glb', function(gltf) {
   board2 = gltf.scene;
  scene.add(board2);
  board2.position.set(20,20,20);
  board2.scale.set(2, 2, 2); // Adjust size as needed
    
}, undefined, function(error) {
  console.error(error); // Handle errors
});

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 2).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

camera.position.set(0, 200, 100);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;
document.addEventListener("keydown", (e) => {
  if(e.key.toLowerCase()=='w')
  {
  scene.rotation.x+=50;
  }
  else  if(e.key.toLowerCase()=='s')
  {
  scene.rotation.x-=50;
  }else  if(e.key.toLowerCase()=='a')
  {
  scene.rotation.y+=50;
  }else  if(e.key.toLowerCase()=='d')
  {
  scene.rotation.y-=50;
  }
  console.log(e);   
});
window.addEventListener('resize', () => {
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    renderer.setSize(500, 500);
});

function animate() {
    requestAnimationFrame(animate);
    
    controls.update();

    renderer.render(scene, camera);
}

animate();
