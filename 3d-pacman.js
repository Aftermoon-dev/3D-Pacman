window.onload = function init() {
	time = 0.0;
	const canvas = document.getElementById("gl-canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const renderer = new THREE.WebGLRenderer({ canvas });
	renderer.setSize(canvas.width, canvas.height);

	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);

	const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 1.0, 1000);
	camera.position.x = -50;
	camera.position.y = 50;
	camera.position.z = -300;

	const controls = new THREE.OrbitControls(camera, renderer.domElement);

	// const loader = new THREE.GLTFLoader();
	// loader.load('./model/scene.gltf', function (gltf) {
	// 	building = gltf.scene.children[0];
	// 	building.scale.set(1.0, 1.0, 1.0);
	// 	scene.add(gltf.scene);
	// 	animate();
	// }, undefined, function (error) {
	// 	console.error(error);
	// });

	// function animate(time) {
	// 	renderer.render(scene, camera);
	// 	requestAnimationFrame(animate);
	// }
}