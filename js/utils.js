/**
 * 3D Pacman - Utils
 * 2021-2 Computer Graphics Term Project
 * Dept. of Software, Gachon Univ.
 */

import * as THREE from 'https://unpkg.com/three@0.108.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.108.0/examples/jsm/loaders/GLTFLoader.js';

/* Setting */
const timeStep = 1/30;
const defaultSpeed = 50;
const loader = new GLTFLoader();

/* Object Dictonary */
export const object = {};

/**
 * Mesh Object Class
 */
export class worldObj {
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

/**
 * 신규 GLTF Object 추가
 * @param {String} objName 
 * @param {THREE.Mesh} geometry 
 * @param {CANNON.Body} body 
 */
export function createNewObject(scene, world, objName, mesh, body) {
    var newObj = new worldObj(objName, mesh, body);
    newObj.add(scene, world);
	return newObj; 
}

/**
 * 팩맨 캐릭터 생성
 * @param {THREE.Scene} scene 
 * @param {CANNON.World} world 
 * @param {X} posx 
 * @param {Y} posy 
 * @param {Z} posz 
 * @returns worldObj
 */
export function createPacman(scene, world, posx, posy, posz) {
	var pacmanMesh = new THREE.Mesh(new THREE.SphereGeometry(100, 32, 16), new THREE.MeshBasicMaterial({ color: 0xffd400 }))
	var pacmanBody = new CANNON.Body({ 
		shape: new CANNON.Sphere(100),
		collisionFilterGroup: 1,
		collisionFilterMask: 2 | 4, // 2번 바닥 4번 벽 
		mass: 3
	});
	
	var pacman = createNewObject(scene, world, 'pacman', pacmanMesh, pacmanBody);
	pacman.position(posx, posy, posz);
	return pacman;
}

/**
 * O Event Listener 등록
 * @param {worldObj} userObject 
 */
export function setUserEvent(userObject) {
	// Key를 올렸을 때
	document.addEventListener("keydown", function(event) {
		console.log(event.key);
		switch(event.key) {
			case "W":
			case "w":
				userObject.body.velocity.set(0, 0, -defaultSpeed);
				break;
			case "S":
			case "s":
				userObject.body.velocity.set(0, 0, defaultSpeed);
				break;
			case "A":
			case "a":
				userObject.body.velocity.set(-defaultSpeed, 0, 0);
				break;
			case "D":
			case "d":
				userObject.body.velocity.set(defaultSpeed, 0, 0);
				break;
		}
	});

	// Key를 뗐을 때 
	document.addEventListener("keyup", function(event) {
		switch(event.key) {
			case "W":
			case "w":
			case "S":
			case "s":
			case "A":
			case "a":
			case "D":
			case "d":
				userObject.body.velocity.set(0, 0, 0);
				break;
			default:
				break;
		}
	});

	// Collide Event
	userObject.body.addEventListener("collide", function(e) {
		console.log(e);
		// 부딪힌 Object Type 확인
		if(e.body.type == 1000) {
			console.log("Collide with Walls!");
		}
	});
}

/**
 * Global Event Listener 삭제
 */
export function removeGlobalEventListener() {
	document.onkeydown = null;
	document.onkeyup = null;
}

/**
 * Scene 초기화
 * @param {THREE.Scene} scene 
 */
export function resetScene(scene, objList) {
	scene.remove.apply(scene, scene.children);
	removeGlobalEventListener();
	for (var item in objList) delete objList[item];
}

/**
 * Update Physical Engine 
 */
export function updatePhysics(world) {
	// Step the physics world
	world.step(timeStep);

	Object.keys(object).forEach(function(key) {
		object[key].update();
	});
}
