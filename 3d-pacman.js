/**
 * 3D Pacman
 * 2021-2 Computer Graphics Term Project
 * Dept. of Software, Gachon Univ.
 */

import * as THREE from 'https://unpkg.com/three@0.108.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.108.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js';


/* 필수 Variable */
var world, canvas, camera, scene, renderer;
const loader = new GLTFLoader();
const object = {};

/* Setting */
const defaultSpeed = 50;
const timeStep = 1/30;

/* Class */
class worldObj {
	constructor(objName, mesh, body) {
		this.objName = objName;
		this.body = body;
		this.mesh = mesh;

		this.mesh.position.copy(body.position);
		this.mesh.quaternion.copy(body.quaternion);

		this.add = function(scene, world) {
			scene.add(this.mesh);
			world.add(this.body);
		}

		this.position = function(x, y, z) {
			this.mesh.position.set(x, y, z);
			this.body.position.set(x, y, z);
		}

		this.rotateX = function(angle) {
			var axis = new CANNON.Vec3(1, 0, 0);
			this.mesh.rotateX(angle * Math.PI / 180);
			this.body.quaternion.setFromAxisAngle(axis, angle * Math.PI / 180);
		}

		this.rotateY = function(angle) {
			var axis = new CANNON.Vec3(0, 1, 0);
			this.mesh.rotateY(angle * Math.PI / 180);
			this.body.quaternion.setFromAxisAngle(axis, angle * Math.PI / 180);
		}

		this.rotateZ = function(angle) {
			var axis = new CANNON.Vec3(0, 0, 1);
			this.mesh.rotateZ(angle * Math.PI / 180);
			this.body.quaternion.setFromAxisAngle(axis, angle * Math.PI / 180);
		}
		
		this.update = function() {
			this.mesh.position.copy(body.position);
			this.mesh.quaternion.copy(body.quaternion);
		}
	}
}

function getMeshSize(mesh) {
	var box = new THREE.Box3().setFromObject(mesh);
	console.log(box.getSize());
	return box.getSize()
}

/**
 * Window OnLoad Event
 */
window.onload = function() {
	initThreeJS();
	initCannon();
	initObject();
	animate();
	initEvent();
}

/**
 * 신규 GLTF Object 추가
 * @param {String} objName 
 * @param {THREE.Mesh} geometry 
 * @param {CANNON.Body} body 
 */
 function addNewObject(objName, mesh, body) {
	object[objName] = new worldObj(objName, mesh, body);
	object[objName].add(scene, world);
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

	camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 1, 5000 );
	camera.position.y = 30;
	camera.position.z = 300;
	scene.add( camera );

	const controls = new OrbitControls(camera, renderer.domElement);
	
	const hlight = new THREE.AmbientLight(0x404040, 30);
	scene.add(hlight);
}

/**
 * Initializing CANNON.js
 */
function initCannon() {
	world = new CANNON.World();
	world.gravity.set(0, -9.8, 0);
	world.broadphase = new CANNON.NaiveBroadphase();
	world.solver.iterations = 10;
}

/**
 * Initializing Object
 */
function initObject() {
	// Ground
	var groundShape = new CANNON.Box(new CANNON.Vec3(1000, 5, 1000));
	var groundBody = new CANNON.Body({
		shape: groundShape,
		collisionFilterGroup: 2,
		mass: 0
	});
	addNewObject('ground', new THREE.Mesh(new THREE.BoxGeometry(1000, 5, 1000), new THREE.MeshBasicMaterial({ color: 0x808080})), groundBody);
	object['ground'].position(0, -60, 0);


	var pacmanShape = new CANNON.Box(new CANNON.Vec3(50, 50, 16));
	var pacmanBody = new CANNON.Body({ 
		shape: pacmanShape,
		collisionFilterGroup: 1,
		collisionFilterMask: 2 | 4,
		mass: 3
	});
	addNewObject('pacman', new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), new THREE.MeshBasicMaterial({ color: 0xffd400 })), pacmanBody);
	object['pacman'].position(0, 60, 0);

	var wallShape = new CANNON.Box(new CANNON.Vec3(500, 300, 30));
	var wallBody = new CANNON.Body({
		shape: wallShape,
		collisionFilterGroup: 4,
		mass: 0
	});
	addNewObject('wall1', new THREE.Mesh(new THREE.BoxGeometry(500, 300, 30), new THREE.MeshBasicMaterial({ color: 0x121212 })), wallBody);
	object['wall1'].position(100, 100, 0);
	object['wall1'].rotateY(90);
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
 * Update Physical Engine 
 */
function updatePhysics() {
	// Step the physics world
	world.step(timeStep);

	Object.keys(object).forEach(function(key) {
		object[key].update();
	});
}

/**
 * Initializing Event 
 */
function initEvent() {
	document.addEventListener("keydown", function(event) {
		console.log(event.key);
		switch(event.key) {
			case "W":
			case "w":
				object['pacman'].body.velocity.set(0, 0, -defaultSpeed);
				break;
			case "S":
			case "s":
				object['pacman'].body.velocity.set(0, 0, defaultSpeed);
				break;
			case "A":
			case "a":
				object['pacman'].body.velocity.set(-defaultSpeed, 0, 0);
				break;
			case "D":
			case "d":
				object['pacman'].body.velocity.set(defaultSpeed, 0, 0);
				break;
		}
	});

	document.addEventListener("keyup", function(event) {
		object['pacman'].body.velocity.set(0, 0, 0);
	});

	object['pacman'].body.addEventListener("collide", function(e) {
		console.log(object['pacman'].body);
		console.log(e);
		var relativeVelocity = e.contact.getImpactVelocityAlongNormal();
		if(Math.abs(relativeVelocity) > 10) {
			object['pacman'].body.velocity.set(0, 0, 0);
		}
	});
}

/**
 * Animate
 */
function animate() {
	requestAnimationFrame(animate);
	updatePhysics();
	renderer.render(scene, camera);
}