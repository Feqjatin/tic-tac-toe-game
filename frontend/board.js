// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the board geometry and material
const boardGeometry = new THREE.BoxGeometry(4, 2, 0.1);  // Board dimensions
const boardMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const board = new THREE.Mesh(boardGeometry, boardMaterial);
scene.add(board);

// Lighting setup
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 2).normalize();
scene.add(light);

// Camera positioning
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the board around its center axis
        // board.rotation.x += 0.01;
        // board.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
