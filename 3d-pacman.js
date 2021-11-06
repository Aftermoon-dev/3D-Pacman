/**
 * 3D Pacman
 * 2021-2 Computer Graphics Term Project
 * Dept. of Software, Gachon Univ.
 */

import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/optimized/three.js';
import { OrbitControls } from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/unoptimized/examples/jsm/controls/OrbitControls.js';
import * as Utils from './js/utils.js';
import * as Maps from './js/maps.js';
import CannonDebugRenderer from './js/CannonDebugRenderer.js';


/* 필수 Variable */
var world, canvas, camera, scene, renderer;
var debug;
var controls;

/**
 * Window OnLoad Event
 */
window.onload = function() {
	initThreeJS();
	initCannon();
	initObject();
	animate();
}

/**
 * Initilaizing Three.js
 */
function initThreeJS() {
	canvas = document.getElementById("gl-canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	window.addEventListener( 'resize', onWindowResize, false );

	renderer = new THREE.WebGLRenderer({ canvas });
	renderer.setSize(canvas.width, canvas.height);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 1, 15000);
	camera.position.y = 0;
	camera.position.z = 0;
	scene.add( camera );

	controls = new OrbitControls(camera, renderer.domElement);
	controls.enablePan = false; //우클릭 이동 방지
	//y축 움직임 제한
}

/**
 * Initializing CANNON.js
 */
function initCannon() {
	world = new CANNON.World();
	world.gravity.set(0, -9.8, 0);
	world.broadphase = new CANNON.NaiveBroadphase();
	world.solver.iterations = 10;
	
	debug = new CannonDebugRenderer(scene, world);
}

/**
 * Initializing Object
 */
function initObject() {
	// 맵 생성
	Maps.initGachonMap(scene, world, controls);
	// Maps.initBasicMap(scene, world, controls);
}

/**
 * Window Resize CallBack Function
 */
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

/**
 * Animate
 */
function animate() {
	requestAnimationFrame(animate);
	Utils.updatePhysics(world, camera, controls);
	if(Utils.developerMode) debug.update();
	renderer.render(scene, camera);
}