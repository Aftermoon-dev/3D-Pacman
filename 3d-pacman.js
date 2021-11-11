/**
 * 3D Pacman
 * 2021-2 Computer Graphics Term Project
 * Dept. of Software, Gachon Univ.
 */

import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/optimized/three.js';
import { OrbitControls } from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/unoptimized/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/unoptimized/examples/jsm/webxr/VRButton.js'
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';
import * as Utils from './js/utils.js';
import CannonDebugRenderer from './js/CannonDebugRenderer.js';
import { initNaturalMap } from './js/maps/natural.js';
import * as Loading from './js/loading.js';

/* 필수 Variable */
var world, canvas, camera, scene, renderer;
var debug;
var controls;

/* VR */
export let isVRMode = false;

/**
 * Window OnLoad Event
 */
window.onload = function() {
	Loading.initLoading();
	initThreeJS();
	initVR();
	initCannon();
	initObject();
	Utils.initcamera(controls);
	renderer.setAnimationLoop(animate);
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
	initNaturalMap(scene, world, controls, camera);
}

/**
 * Window Resize CallBack Function
 */
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function initVR() {
	document.body.appendChild(VRButton.createButton(renderer));
	const vrEnableButton = document.getElementById("VRButton");
	renderer.xr.enabled = true;

	vrEnableButton.addEventListener("click", function() {
		if(vrEnableButton.innerHTML != "VR NOT SUPPORTED") {
			if(!isVRMode) {
				isVRMode = true;
			}
			else {
				isVRMode = false;
			}
			console.log("VR Enable : " + isVRMode);
		}
		else {
			console.log("VR Not Supported");
		}
	});
}

/**
 * Animate
 */
function animate() {
	Utils.updatePhysics(scene, world, camera, controls);
	TWEEN.update();
	if(Utils.developerMode) debug.update();
	renderer.render(scene, camera);
}