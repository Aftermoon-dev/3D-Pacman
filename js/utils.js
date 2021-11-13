/**
 * 3D Pacman - Utils
 * 2021-2 Computer Graphics Term Project
 * Dept. of Software, Gachon Univ.
 */

import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/optimized/three.js';
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/unoptimized/examples/jsm/loaders/GLTFLoader.js';
import * as MapSpace from './maps/space.js'
import * as MapGachon from './maps/gachon.js'
import * as Loading from './loading.js'
import * as Main from '../3d-pacman.js'

/* Setting */
const timeStep = 1 / 30;

export var userSpeed = 1500; // 유저의 속도를 결정
export var pacman_height = 80; // 팩맨의 카메라 높이 결정  -> 나중에 아이템에서 써먹을수있음
export var pacman_height2D = 7300; // 2D view height
export var ghostSpeed = 1250; // 고스트 속도

export const loadManager = new THREE.LoadingManager();
loadManager.onStart = () => {
	Loading.setLoadingValue(0);
	document.getElementById("loading").style.visibility = "visible";
	isloadingFinished = false;
}

loadManager.onProgress = (url, itemsLoaded, itemsTotal) => {
	console.log("Load " + url + "! Currently " + itemsLoaded + " Loaded, Total " + itemsTotal);
	Loading.setLoadingValue(itemsLoaded / itemsTotal * 100 | 0);
}

loadManager.onLoad = () => {
	document.getElementById("loading").style.visibility = "hidden";
	console.log("Loading Finished");
	isloadingFinished = true;

	// Set Finish Timer
	if(currentStage == 3) { // Gachon
        setFinishTimer(120000); 
	}
	else { // Other Map
		setFinishTimer(60000); 
	}
};

export const loader = new GLTFLoader(loadManager);
export const textureLoader = new THREE.TextureLoader(loadManager);
export const cubeLoader = new THREE.CubeTextureLoader(loadManager);
export let isloadingFinished = false; // 로딩 완료 여부 확인

/* Item Setting */
//  -> 방향키 반대로 (빨강) / 속도 빨라지거나 느려지게 하는 것 (주황) / 팩맨 크기 커지는 것 (연두)
//  -> 유령 먹을 수 있게 되는 것 (하늘) / 3D -> 2D 시야 변경 (분홍)
export var useitem = true; //item 적용할꺼면 true로

export var item1Flag = true;
export var item1Timer;
export var item2Timer;
export var item3Flag = 220; // 팩맨 크기 넣어주기
export var item3Timer;
export var item4Flag = false; //true면 고스트 먹을 수 있음
export var item4Timer;
export var item5Timer;
export var imageArray = [];
export var timer;
export var timerImage = document.getElementById("timerimage");

/* Score Setting */
export var score = 0;
export var totalScore = 0;
export var circleNumber = 0;
export var circlePosition = new Array();

/* camera control variable */
export var if2D = false;
export var first2DFlage = true; // 1인칭 -> 3인칭이 처음 된 건지 체크
export var nowMoveOK = true; // 이게 true일때 setCameraType에서 온전히 함수들이 작동 (false일때는 카메라가 이동중이라는 의미)
export var targetPosition; // camera 이동할 때 지정해 줄 좌표
export var isTween = false; // tween이 실행중인지

export var developerMode = false; // 개발자 모드 ON!

/* Object Dictonary */
export const object = {};

/* Pacman Transparent Body */
export let pacman_item = undefined;

/* Audio List */
export const audioList = {
	'teleport': new Audio("./audio/teleport.mp3"),
	'gameclear': new Audio("./audio/gameclear.mp3"),
	'gameover': new Audio("./audio/gameover.mp3"),
	'gachon': new Audio("./audio/sound_gachon1.mp3"),
	'pacman_eat': new Audio("./audio/pacman_eat.mp3"),
	'natural': new Audio("./audio/sound_natural1.mp3"),
	'space': new Audio("./audio/sound_space2.mp3"),
};

/* Current Stage */
export let currentStage = 0;

/* Event Callback */
let userObjectCollide = undefined;
let keyUpCallback = undefined;
let keyDownCallback = undefined;
let mouseMoveCallback = undefined;

/* Light */
let userLight = undefined;
let ambientLight = undefined;

/* All Clear Check */
export let isNeedClear = false;

/* Delete Request List */
const deleteReqList = [];

/* Game Clear Timer */
export let clearTimer = undefined;

/**
 * Mesh Object Class
 */
export class worldObj {
	constructor(objName, mesh, body) {
		this.objName = objName;
		this.body = body;
		this.mesh = mesh;
		this.y = undefined;
		this.currentDirection = 2; // ghost에서 사용
		this.pre_detect_wall = undefined; //ghost에서 사용

		this.mesh.position.copy(body.position);
		this.mesh.quaternion.copy(body.quaternion);

		this.add = function (scene, world) {
			scene.add(this.mesh);
			world.addBody(this.body);
		}

		this.position = function (x, y, z) {
			this.y = y;
			this.mesh.position.set(x, y, z);
			this.body.position.set(x, y, z);
		}

		this.rotateX = function (angle) {
			var axis = new CANNON.Vec3(1, 0, 0);
			this.mesh.rotateX(angle * Math.PI / 180);
			this.body.quaternion.setFromAxisAngle(axis, angle * Math.PI / 180);
		}

		this.rotateY = function (angle) {
			var axis = new CANNON.Vec3(0, 1, 0);
			this.mesh.rotateY(angle * Math.PI / 180);
			this.body.quaternion.setFromAxisAngle(axis, angle * Math.PI / 180);
		}

		this.rotateZ = function (angle) {
			var axis = new CANNON.Vec3(0, 0, 1);
			this.mesh.rotateZ(angle * Math.PI / 180);
			this.body.quaternion.setFromAxisAngle(axis, angle * Math.PI / 180);
		}

		this.update = function () {
			if (this.body != undefined && this.mesh != undefined) {
				this.mesh.position.copy(body.position);
				this.mesh.quaternion.copy(body.quaternion);
			}
		}
	}
	//current 방향 알려주기 => ghost용
	getDirection() {
		return this.currentDirection;
	}

	
	getWall() {
		return this.pre_detect_wall;
	}

	setWall(wall) {
		this.pre_detect_wall = wall;
	}

	// 객체의 속도를 설정
	setDirection(flag){
		this.currentDirection = flag;
	}

	//객체의 위치를 알려줌
	getPosition() {
		return this.body.position;
	}

	//객체의 회전률을 알려줌
	getRotation() {
		return this.body.rotation;
	}

	// y
	getY() {
		return this.y;
	}

	// 객체의 속도를 설정
	setVelocity(flag, speed){
		var directionVector;

		if (flag == 1) {
			console.log("w");
			directionVector = new CANNON.Vec3(0, 0, 1);
			directionVector.z -= speed;
		}
		else if (flag == 2) {
			console.log("s");

			directionVector = new CANNON.Vec3(0, 0, 1);
			directionVector.z += speed;
		}
		else if (flag == 3) {
			console.log("a");

			directionVector = new CANNON.Vec3(1, 0, 0);
			directionVector.x -= speed;
		}
		else if (flag == 4) {
			console.log("d");

			directionVector = new CANNON.Vec3(1, 0, 0);
			directionVector.x += speed;
		}
		else if (flag == 0) {
			this.body.velocity.set(0, 0, 0);
			return;
		}

		if (if2D == false) { // 팩맨의 로컬 좌표랑 매트릭스 연산 => 로컬 직진을 월드 좌표로 맴핑
			directionVector = this.body.quaternion.vmult(directionVector);
		}

		this.body.velocity.set(directionVector.x, 0, directionVector.z);
	}

	// 삭제하기
	delete(scene, world) {

		if (this.mesh != undefined) {
			scene.remove(this.mesh);
			this.mesh = undefined;
		}

		if (this.body != undefined) {
			world.removeBody(this.body);
			this.body = undefined;
		}

		delete object[this.objName];
	}

	// 삭제 요청하기
	deleteReq() {
		deleteReqList.push(this.objName)
	}
}

/**
 * 신규 Object 추가
 * @param {String} objName
 * @param {THREE.Mesh} geometry
 * @param {CANNON.Body} body
 */
export function createNewObject(scene, world, objName, mesh, body) {
	var newObj = new worldObj(objName, mesh, body);
	newObj.add(scene, world);
	object[objName] = newObj;
}

/**
 * 팩맨 캐릭터 생성
 * @param {THREE.Scene} scene 
 * @param {CANNON.World} world 
 * @param {X} posx 
 * @param {Y} posy 
 * @param {Z} posz 
 * @param {Integer} radius
 */
export function createPacman(scene, world, posx, posy, posz, radius) {
	var pacmanMesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 256, 128), new THREE.MeshPhongMaterial({
		color: 0xffd400,
		flatShading: true
	}));

	var pacmanBody = new CANNON.Body({
		shape: new CANNON.Sphere(radius),
		angularDamping: 1,
		collisionFilterGroup: 1,
		collisionFilterMask: 4 | 8,
		mass: 3,
	});

	pacman_item = new CANNON.Body({
		shape: new CANNON.Sphere(radius),
		angularDamping: 1,
		collisionFilterGroup: 2,
		collisionFilterMask: 4 | 8 | 16 | 32 | 64,
		mass: 0,
		type: 1
	});

	createNewObject(scene, world, 'pacman', pacmanMesh, pacmanBody);
	world.addBody(pacman_item);

	object['pacman'].position(posx, posy, posz);
	pacman_item.position.set(posx, posy, posz);

	console.log(object['pacman']);
}

/**
 * 벽 생성
 * @param {THREE.Scene} scene 
 * @param {CANNON.World} world 
 * @param {String} wallname 
 * @param {String (Color Hex Code, 0xFFFFFF)} wallcolor 
 * @param {X} x 
 * @param {Y} y 
 * @param {Z} z 
 */
export function createWallObject(scene, world, wallname, wallcolor, x, y, z) {
	var wallBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2)),
		collisionFilterGroup: 8,
		collisionFilterMask: 1 | 32,
		mass: 0,
		type: 1000
	});
	createNewObject(scene, world, wallname, new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshLambertMaterial({ color: wallcolor })), wallBody);
}

export function createTransparentWallObject(scene, world, wallname, wallcolor, x, y, z) {
	var wallBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2)),
		collisionFilterGroup: 8,
		collisionFilterMask: 1 | 32,
		mass: 0,
		type: 1000
	});

	createNewObject(scene, world, wallname, new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshLambertMaterial({
		color: wallcolor,
		transparent: true,
		opacity: 0.5
	})), wallBody);
}

export function createWallObjectWithTexture(scene, world, wallname, wallcolor, x, y, z, material) {
	var wallBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2)),
		collisionFilterGroup: 8,
		collisionFilterMask: 1 | 32,
		mass: 0,
		type: 1000
	});
	createNewObject(scene, world, wallname, new THREE.Mesh(new THREE.BoxGeometry(x, y, z), material), wallBody);
}

/**
 * 동글이 만들기
 * @param {THREE.Scene} scene 
 * @param {CANNON.World} world 
 * @param {X} posx 
 * @param {Y} posy 
 * @param {Z} posz 
 */
export function createCircle(scene, world, posx, posy, posz) {
	var circleMesh = new THREE.Mesh(new THREE.SphereGeometry(40, 256, 128), new THREE.MeshPhongMaterial({
		color: 0xFFFF7D,
		flatShading: true
	}));

	var circleBody = new CANNON.Body({
		shape: new CANNON.Sphere(40),
		collisionFilterGroup: 64,
		collisionFilterMask: 2 | 4,
		mass: 1,
		type: 4
	});

	createNewObject(scene, world, 'circle' + circleNumber, circleMesh, circleBody);

	var circlePositionTemp = [];
	circlePositionTemp[0] = circleNumber;
	circlePositionTemp[1] = posx;
	circlePositionTemp[2] = posy;
	circlePositionTemp[3] = posz;

	circlePosition[circleNumber] = circlePositionTemp;

	console.log(circlePosition[circleNumber]);
	object['circle' + circleNumber].position(posx, posy, posz);

	circleNumber++;
}

/**
 * Item 등록
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world
 * @param {String} itemName
 * @param {String (Color Hex Code, 0xFFFFFF)} itemColor
 * @param {Integer} itemNumber
 * @param {X} posx 
 * @param {Y} posy 
 * @param {Z} posz 
 */
export function createItemObject(scene, world, itemName, itemColor, itemNumber, posx, posy, posz) { // item 번호 붙여서 번호마다 기능 다르게 넣기
	var itemMesh = new THREE.Mesh(new THREE.SphereGeometry(80, 256, 128), new THREE.MeshPhongMaterial({
		color: itemColor,
		flatShading: true
	}));
	var itemBody = new CANNON.Body({
		shape: new CANNON.Sphere(80),
		collisionFilterGroup: 16,
		collisionFilterMask: 2 | 4,
		mass: 0,
		type: itemNumber,
	});

	createNewObject(scene, world, itemName, itemMesh, itemBody);
	object[itemName].position(posx, posy, posz);
}

/**
 * Item1 - 방향키 반대로
 */
export function applyItem1Event() {
	stopTimer(timer);
	startTimer(1);
	
	item1Flag = false;

	item1Timer = setTimeout(function () {
		item1Flag = true;
	}, 8000)
	// 8초 동안만 방향키 반대로 5초 지나면 원래대로!!
}

/**
 * Item2 - 팩맨 Speed
 */
export function applyItem2Event() {
	stopTimer(timer);
	startTimer(2);

	var speedFlag = Math.random() * 10
	// Random Integer 값을 이용해 0 ~ 4 = Speed Down / 5 ~ 9 = Speed Up

	if (speedFlag <= 4) {
		userSpeed -= 1000;
	} else {
		userSpeed += 1000;
	}

	item2Timer = setTimeout(function () {
		userSpeed = 1500;
	}, 8000)
}

/**
 * Item3 - 팩맨 Size Up
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world 
 * @param {OrbitControls} controls
 * @param {THREE.PerspectiveCamera} camera
 */
export function applyItem3Event() {
	stopTimer(timer);
	startTimer(3);

	var x = object['pacman'].body.position.x;
	var y = object['pacman'].body.position.y + 50;
	var z = object['pacman'].body.position.z;
	
	object['pacman'].position(x, y, z);
	pacman_item.position.set(x, y, z);
	object['pacman'].mesh.scale.set(item3Flag / 180, item3Flag / 180, item3Flag / 180);
	object['pacman'].body.shapes[0].radius = item3Flag;
	pacman_item.shapes[0].radius = item3Flag;
	pacman_height += 30;

	item3Timer = setTimeout(function () {
		object['pacman'].mesh.scale.set(1.0, 1.0, 1.0);
		object['pacman'].body.shapes[0].radius = 180;
		pacman_item.shapes[0].radius = 180;
		pacman_height -= 30;
	}, 8000);
}

/**
 * Item4 - Kill the Ghost
 */
export function applyItem4Event() {
	stopTimer(timer);
	startTimer(4);

	item4Flag = true;  
	console.log(item4Flag);

	//ghost 색 바꿔주기
	Object.keys(object).forEach(function (key) {
		if (key.includes("ghost")){
			changeGhostColor(key, 0xFF0000);
		}
	});

	item4Timer = setTimeout(function () {
		item4Flag = false;

		//ghost 색 원래대로 바꾸기
		//ghost 색 바꿔주기
		Object.keys(object).forEach(function (key) {
			if (key.includes("ghost")){
				if (key == "ghost1") changeGhostColor(key, 0xFF8000);
				if (key == "ghost2") changeGhostColor(key, 0x80FF00);
				if (key == "ghost3") changeGhostColor(key, 0x0080FF);
				if (key == "ghost4") changeGhostColor(key, 0xFF97FF);
			}
		});

	}, 8000);
}

/**
 * Item5 - Change 3D -> 2D
 */
export function applyItem5Event() {
	if(!if2D) {
		stopTimer(timer);
		startTimer(5);

		if2D = true;

		item5Timer = setTimeout(function () {
			if2D = false
		}, 5000);
	}
}

/**
 * Item Location Function
 * @param {Integer} stageNum 
 * @param {Integer} Item1Num 
 * @param {Integer} Item2Num 
 * @param {Integer} Item3Num 
 * @param {Integer} Item4Num 
 * @param {Integer} Item5Num 
 */
export function locateItem(scene, world, stageNum, Item1Num, Item2Num, Item3Num, Item4Num, Item5Num) {
	if (stageNum == 1) {
		// 동글이 114개
		for (var i = 0; i < Item1Num; i++) {
			var randIndex = Math.floor(Math.random() * 114);
			console.log('item1 = ' + randIndex);
			createItemObject(scene, world, 'item1' + i, 0xff5b5b, 101,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
			console.log(circlePosition[randIndex][0]);
			object['circle' + randIndex].deleteReq();
		}
		for (var i = 0; i < Item2Num; i++) {
			var randIndex = Math.floor(Math.random() * 114);
			console.log('item2 = ' + randIndex);
			createItemObject(scene, world, 'item2' + i, 0xffc000, 102,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
		for (var i = 0; i < Item3Num; i++) {
			var randIndex = Math.floor(Math.random() * 114);
			console.log('item3 = ' + randIndex);
			createItemObject(scene, world, 'item3' + i, 0x92d050, 103,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
		for (var i = 0; i < Item4Num; i++) {
			var randIndex = Math.floor(Math.random() * 114);
			console.log('item4 = ' + randIndex);
			createItemObject(scene, world, 'item4' + i, 0x00b0f0, 104,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
		for (var i = 0; i < Item5Num; i++) {
			var randIndex = Math.floor(Math.random() * 114);
			console.log('item5 = ' + randIndex);
			createItemObject(scene, world, 'item5' + i, 0xff99cc, 105,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
	} else if (stageNum == 2) {
		// 동글이 142개

		for (var i = 0; i < Item1Num; i++) {
			var randIndex = Math.floor((Math.random() * 133) + 114);
			console.log('item1 = ' + randIndex);
			createItemObject(scene, world, 'item1' + i, 0xff5b5b, 101,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
		for (var i = 0; i < Item2Num; i++) {
			var randIndex = Math.floor((Math.random() * 133) + 114);
			console.log('item2 = ' + randIndex);
			createItemObject(scene, world, 'item2' + i, 0xffc000, 102,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
		for (var i = 0; i < Item3Num; i++) {
			var randIndex = Math.floor((Math.random() * 133) + 114);
			console.log('item3 = ' + randIndex);
			createItemObject(scene, world, 'item3' + i, 0x92d050, 103,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
		for (var i = 0; i < Item4Num; i++) {
			var randIndex = Math.floor((Math.random() * 133) + 114);
			console.log('item4 = ' + randIndex);
			createItemObject(scene, world, 'item4' + i, 0x00b0f0, 104,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
		for (var i = 0; i < Item5Num; i++) {
			var randIndex = Math.floor((Math.random() * 133) + 114);
			console.log('item5 = ' + randIndex);
			createItemObject(scene, world, 'item5' + i, 0xff99cc, 105,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
	} else if (stageNum == 3) {
		// 동글이 204개

		for (var i = 0; i < Item1Num; i++) { 						
			var randIndex = Math.floor((Math.random() * 187) + 256);
			console.log('item1 = ' + randIndex);
			createItemObject(scene, world, 'item1' + i, 0xff5b5b, 101,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
		for (var i = 0; i < Item2Num; i++) {
			var randIndex = Math.floor((Math.random() * 187) + 256);
			console.log('item2 = ' + randIndex);
			createItemObject(scene, world, 'item2' + i, 0xffc000, 102,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
		for (var i = 0; i < Item3Num; i++) {
			var randIndex = Math.floor((Math.random() * 187) + 256);
			console.log('item3 = ' + randIndex);
			createItemObject(scene, world, 'item3' + i, 0x92d050, 103,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
		for (var i = 0; i < Item4Num; i++) {
			var randIndex = Math.floor((Math.random() * 187) + 256);
			console.log('item4 = ' + randIndex);
			createItemObject(scene, world, 'item4' + i, 0x00b0f0, 104,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
		for (var i = 0; i < Item5Num; i++) {
			var randIndex = Math.floor((Math.random() * 187) + 256);
			console.log('item5 = ' + randIndex);
			createItemObject(scene, world, 'item5' + i, 0xff99cc, 105,
				circlePosition[randIndex][1], circlePosition[randIndex][2], circlePosition[randIndex][3]);
				object['circle' + randIndex].deleteReq();
		}
	}
}

/**
 * User Event Listener 등록
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world 
 * @param {OrbitControls} controls
 * @param {PerspectiveCamera} camera
 */
export function setUserEvent(scene, world, controls, camera) {
	object['pacman'].body.velocity.set(0, 0, 0);
	object['pacman'].body.angularDamping = 1;

	//3인칭 뷰 일 때에는 마우스 작동이 아예 안되게! 
	if (if2D == false)
		controls.enabled = true;
	else
		controls.enabled = false;

	// Key를 눌렀을 때
	keyDownCallback = function (event) {
		object['pacman'].body.angularDamping = 1;
		if (isTween == true)
			return;

		switch (event.key) {
			case "W":
			case "w":
				if (item1Flag)
					object['pacman'].setVelocity(1, userSpeed); //w
				else
					object['pacman'].setVelocity(2, userSpeed); //s		
				break;

			case "S":
			case "s":
				if (item1Flag)
					object['pacman'].setVelocity(2, userSpeed);
				else
					object['pacman'].setVelocity(1, userSpeed);
				break;

			case "A":
			case "a":
				if (item1Flag)
					object['pacman'].setVelocity(3, userSpeed); //a
				else
					object['pacman'].setVelocity(4, userSpeed); //d
				break;

			case "D":
			case "d":
				if (item1Flag)
					object['pacman'].setVelocity(4, userSpeed);
				else
					object['pacman'].setVelocity(3, userSpeed);
				break;


			//임시로 넣어둔 부분! 누르면 1인칭 <-> 3인칭
			// case "C":
			// case "c":
			// 	changePointOfView(object['pacman'], controls);
			// 	break;

		}
	};
	document.addEventListener("keydown", keyDownCallback);

	// Key를 뗐을 때 
	keyUpCallback = function (event) {
		switch (event.key) {
			case "W":
			case "w":
			case "S":
			case "s":
			case "A":
			case "a":
			case "D":
			case "d":
				object['pacman'].setVelocity(0, userSpeed);
				break;
		}
	};
	document.addEventListener("keyup", keyUpCallback);

	// mouse로 카메라 움직일 때
	mouseMoveCallback = function (event) {
		const toangle = controls.getAzimuthalAngle() * (180 / Math.PI);
		//1인칭 시점일 때만 작동함
		if (if2D == false && object['pacman'] != undefined)
			object['pacman'].rotateY(toangle); //카메라 보는 각도가 정면이 되도록 팩맨을 돌림

	};
	document.addEventListener("mousemove", mouseMoveCallback);

	// Collide Event
	userObjectCollide = function (e) {
		let output = Object.fromEntries(Object.entries(object).filter(([k, v]) => v.body == e.body));
		console.log(output);
		const targetItem = Object.keys(output)[0];

		// 고스트랑 닿을 경우
		if (e.body.type == 3) {
			console.log("Meet the Ghost! " + item4Flag);

			// 먹는 모드가 아니라면
			if(item4Flag == false) {
				document.location.href = "./gameover.html?score=" + totalScore;
			}
			//먹는모드가 맞다면 나머지는 고스트에서 처리함 + 여기다가 else해서 고스트 먹었을때 점수 올라가는거 하면 될듯
			else {
				totalScore += 30;
				// 먹는 소리 내기
				playAudio("pacman_eat");
			}

		} else if (e.body.type == 4) { // Point
			score += 10;
			totalScore += 10;
			document.getElementById("scoreNum").innerHTML = "SCORE " + score.toString();

			object[targetItem].deleteReq();

			// 현재 스테이지에 따라 다음 동작 정의
			if (currentStage == 1) {
				if (score == 1000) {  // Stage 1 Clear 점수 넣기!
					stopTimer(timer); // 아이템 타이머 초기화!
					isNeedClear = true;
					timerImage.setAttribute("src", "./image/timerStartEnd.png");
					updateStage(2);
				}
			}
			else if (currentStage == 2) {
				if (score == 1300) {  // Stage 2 Clear 점수 넣기!
					stopTimer(timer); // 아이템 타이머 초기화!
					isNeedClear = true;
					timerImage.setAttribute("src", "./image/timerStartEnd.png");
					updateStage(3);
				}
			}
			else if (currentStage == 3) {
				if (score == 1500) {  // Stage 3 Clear 점수 넣기!
					window.location.href = 'gameclear.html?score=' + totalScore; // Clear Page
				}
			}
		} else if (e.body.type == 101) {
			applyItem1Event();
			object[targetItem].deleteReq();
		} else if (e.body.type == 102) {
			applyItem2Event();
			object[targetItem].deleteReq();
		} else if (e.body.type == 103) {
			applyItem3Event();
			object[targetItem].deleteReq();
		} else if (e.body.type == 104) {
			applyItem4Event();
			object[targetItem].deleteReq();
		} else if (e.body.type == 105) {
			applyItem5Event();
			object[targetItem].deleteReq();
		}
	};
	pacman_item.addEventListener("collide", userObjectCollide);
}


/** 처음에 2D 5초간 보여주기
 * @param {OrbitControls} controls
 */
export function initcamera(userObject, controls) {
	changePointOfView(userObject, controls);

	setTimeout(function(){
		changePointOfView(userObject, controls);
	}, 5000);
}

/** 
 * 카메라 시점 변경 
*/
function changePointOfView(userObject, controls) {
	if (if2D == false) { //1인칭 -> 2D
		if2D = true;
		//set position
		targetPosition = new THREE.Vector3(0, pacman_height2D, 200);
		controls.target.set(0, 0, 0);
	}
	else { // 2D -> 1인칭
		if2D = false;

		//set position
		var ve = userObject.getPosition(); //현재 팩맨 중심좌표
		var direct = new THREE.Vector3();
		targetPosition = new THREE.Vector3(ve.x - 10 * direct.x, pacman_height, ve.z - 10 * direct.z);
	}
}

/**
 *  카메라 선택
 */
function selectCameraType(scene, userObject, camera, controls) {
	var duration = 1500; //during 3 second

	if (nowMoveOK == false) { //c에서 조절
		tweenCamera(targetPosition, duration, controls, camera);
		nowMoveOK = true;
	}
	//1인칭 시점일 때만 작동함
	if (if2D == false) {
		if (first2DFlage == false) {
			nowMoveOK = false;
			// controls.reset()
			first2DFlage = true;
			controls.minPolarAngle = Math.PI * 0.5;
			controls.maxPolarAngle = Math.PI * 0.5;
			controls.rotateSpeed = 1;
		}
		if (nowMoveOK == true)
			moveFirstPersonCameraAll(scene, userObject, camera, controls);
	}
	else if (if2D == true) {
		if (first2DFlage == true) {
			// controls.saveState()
			nowMoveOK = false;
			first2DFlage = false;
			controls.minPolarAngle = 0;
			controls.maxPolarAngle = 0;
			controls.rotateSpeed = 0;
		}

		if (nowMoveOK == true)
			move2DCameraAll(scene, camera, controls);
	}
}

/**
 * 1인칭 <-> 3인칭 변환을 부드럽게 
 * ref : https://stackoverflow.com/questions/45252751/how-to-use-tween-to-animate-the-cameras-position
 * https://stackoverflow.com/questions/28091876/tween-camera-position-while-rotation-with-slerp-three-js 
*/
function tweenCamera(targetPosition, duration, controls, camera) {
	controls.enabled = false;
	isTween = true;

	//camera position
	var position = new THREE.Vector3().copy(camera.position);

	//position
	var tween = new TWEEN.Tween(position)
		.to(targetPosition, duration)
		.easing(TWEEN.Easing.Linear.None)
		.onUpdate(function () {
			camera.position.copy(position);
			camera.lookAt(controls.target);
		})
		.onComplete(function () {
			camera.position.copy(targetPosition);
			controls.enabled = true;
			isTween = false;
		}).start();
}


/**
 * orbitcontrol을 first person 시점으로 사용
 */
export function moveFirstPersonCameraAll(scene, userObject, camera, controls) {
	userObject.body.angularDamping = 1; //계속 회전 방지

	var ve = userObject.getPosition(); //현재 팩맨 중심좌표
	var direct = new THREE.Vector3();
	camera.getWorldDirection(direct); // 카메라가 바라보는 방향 받아오기

	camera.position.set(ve.x - 10 * direct.x, pacman_height, ve.z - 10 * direct.z); //카메라 셋팅
	controls.target.set(ve.x, pacman_height, ve.z); //타겟 설정 - 얘를 중심으로 공전

	userObject.body.angularDamping = 1; //계속 회전 방지
	controls.update();
	// AmbientLight 있었으면 없애기
	if (isTween == false && ambientLight != undefined) {
		removeAmbientLight(scene);
	}

	// 기존에 사용자 Light 없으면
	if (userLight == undefined) {
		// 좌표에 따른 새 광원 생성
		addPointLight(scene, 0xFFFFFF, 1, 0, ve.x + 10 * direct.x, pacman_height + 30, ve.z + 10 * direct.z);
	}
	// 있으면 좌표 변경
	else {
		userLight.position.set(ve.x + 10 * direct.x, pacman_height, ve.z + 10 * direct.z);
	}

}

/**
 * orbitcontrol을 3인칭 시점(2D)으로 사용
 */
function move2DCameraAll(scene, camera, controls) {
	//1인칭 시점일 때만 작동함
	camera.position.set(0, pacman_height2D, 0); //카메라 셋팅
	controls.target.set(0, 0, 0); //타겟 설정 - 얘를 중심으로 공전
	controls.update();

	// PointLight 있었으면 없애기
	if (userLight != undefined) {
		removePointLight(scene);
	}

	// AmbientLight 없으면 생성
	if (ambientLight == undefined) {
		addAmbientLight(scene, 0xFFFFFF, 1);
	}
}

/**
 * Global Event Listener 삭제
 */
export function removeGlobalEventListener() {
	document.removeEventListener("mousemove", mouseMoveCallback);
	document.removeEventListener("keydown", keyDownCallback);
	document.removeEventListener("keyup", keyUpCallback);
}

/**
 * 상자 만들기
 * @param {THREE.Scene} scene 
 * @param {CANNON.World} world 
 * @param {Object Name} name 
 * @param {X} x 
 * @param {Y} y
 * @param {Z} z
 * @param {Color} sur_color 
 * @param {collisionFilterGroup} collisionFilterGroup_val 
 * @param {mass} mass_val 
 * @param {type} type_val 
 */
export function makeBox(scene, world, name, x, y, z, sur_color, collisionFilterGroup_val, mass_val, type_val) {
	var boxBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2)),
		collisionFilterGroup: collisionFilterGroup_val,
		mass: mass_val,
		type: type_val
	});
	createNewObject(scene, world, name, new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshPhongMaterial({
		color: sur_color,
		flatShading: true
	})), boxBody);
}

/**
 * 상자 만들기
 * @param {THREE.Scene} scene 
 * @param {CANNON.World} world 
 * @param {Object Name} name 
 * @param {X} x 
 * @param {Y} y 
 * @param {Z} z 
 */
 export function createTeleportBox(scene, world, name, x, y, z) {
	var boxBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2)),
		collisionFilterGroup: 8,
		collisionFilterMask: 1 | 2,
		mass: 0,
		type: 1001
	});
	createNewObject(scene, world, name, new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshPhongMaterial({
		color: 0x008000,
		flatShading: true
	})), boxBody);
}


/**
 * 고스트 생성
 * @param {THREE.Scene} scene 
 * @param {CANNON.World} world 
 * @param {Object Name} objName 
 * @param {Position X} x 
 * @param {Position Y} y 
 * @param {Position Z} z 
 * @param {Color} color
 * @param {direction} direction  
 */
export function createGhost(scene, world, objName, x, y, z, color, direction) {
	var ghostBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(150, 200, 150)),
		collisionFilterGroup: 32,
		angularDamping: 1,
		collisionFilterMask: 2 | 4 | 8 | 32,
		mass: 10,
		type: 3
	});

	loader.load("./models/pacman_ghost_blue/scene.gltf", (gltf) => {
		const root = gltf.scene;
		var ghost = root.children[0];
		ghost.scale.set(1.5, 1.5, 1.5);

		root.traverse((ghost) => {
			if (ghost.isMesh) {
				// 눈 부분은 색 안바꾸게
				if (ghost.material.color.r != 0 ||
					ghost.material.color.g != 0 ||
					ghost.material.color.b != 0) {
					ghost.material.color.set(color);
				}

			}
		});
		createNewObject(scene, world, objName, root, ghostBody);
		object[objName].position(x, y, z);
		object[objName].setDirection(direction)
		object[objName].setVelocity(direction, ghostSpeed);

		object[objName].body.addEventListener("collide",  function(e) {
			let output = Object.fromEntries(Object.entries(object).filter(([k,v]) => v.body == e.body));
			const targetWall = Object.keys(output)[0];
			var wall = object[objName].getWall();

			if (item4Flag == true && e.body.type == 1){ //먹는 모드인데 팩맨을 만난다면?
				//사망햇다가
				object[objName].deleteReq();
				changeGhostColor(objName, color);

				setTimeout(function(){
				//8초 뒤에 원래 리스폰 자리에서 부활
				createNewObject(scene, world, objName, root, ghostBody);
				object[objName].position(x, y, z);
				object[objName].setDirection(direction)
				object[objName].setVelocity(direction, ghostSpeed);
				}, 8000);

			}

			else if (wall != targetWall){
				object[objName].setWall(targetWall);

				var speedFlag = object[objName].getDirection(); //반대편으로 조금 갔다가
				if (speedFlag == 1) object[objName].setVelocity(2, ghostSpeed+300);
				if (speedFlag == 2) object[objName].setVelocity(1, ghostSpeed+300);
				if (speedFlag == 3) object[objName].setVelocity(4, ghostSpeed+300);
				if (speedFlag == 4) object[objName].setVelocity(3, ghostSpeed+300);
	
				setTimeout(function(){
					if(object[objName] != undefined) {
						object[objName].setVelocity(0, ghostSpeed); //정지

						//어느 방향으로 갈지 탐색
						var new_speedFlag = Math.floor(Math.random() * 4) + 1;
						if (speedFlag == new_speedFlag){
							new_speedFlag = (new_speedFlag + 1)%4+1
						}
			
						var ghostPosition = object[objName].getPosition();
						object[objName].setDirection(new_speedFlag)
						object[objName].position(ghostPosition.x, y, ghostPosition.z);
						// object[objName].rotateMesh(speedFlag);
						object[objName].setVelocity(new_speedFlag, ghostSpeed);
					}
				}, 500);

			}
		});

	});
}

/**
 * Item Timer
 * @param {Integer} ItemNumber 
 */
export function startTimer(ItemNumber) {
	stopTimer(timer);

	if (ItemNumber == 1) {
		timerImage.setAttribute("src", "./image/timer1/item1-8.png");
		imageArray = ["./image/timer1/item1-7.png", "./image/timer1/item1-6.png", "./image/timer1/item1-5.png", "./image/timer1/item1-4.png",
			"./image/timer1/item1-3.png", "./image/timer1/item1-2.png", "./image/timer1/item1-1.png", "./image/timer1/item1-0.png", "./image/timerStartEnd.png"];
	} else if (ItemNumber == 2) {
		timerImage.setAttribute("src", "./image/timer2/item2-8.png");
		imageArray = ["./image/timer2/item2-7.png", "./image/timer2/item2-6.png", "./image/timer2/item2-5.png", "./image/timer2/item2-4.png",
			"./image/timer2/item2-3.png", "./image/timer2/item2-2.png", "./image/timer2/item2-1.png", "./image/timer2/item2-0.png", "./image/timerStartEnd.png"];
	} else if (ItemNumber == 3) {
		timerImage.setAttribute("src", "./image/timer3/item3-8.png");
		imageArray = ["./image/timer3/item3-7.png", "./image/timer3/item3-6.png", "./image/timer3/item3-5.png", "./image/timer3/item3-4.png",
			"./image/timer3/item3-3.png", "./image/timer3/item3-2.png", "./image/timer3/item3-1.png", "./image/timer3/item3-0.png", "./image/timerStartEnd.png"];
	} else if (ItemNumber == 4) {
		timerImage.setAttribute("src", "./image/timer4/item4-8.png");
		imageArray = ["./image/timer4/item4-7.png", "./image/timer4/item4-6.png", "./image/timer4/item4-5.png", "./image/timer4/item4-4.png",
			"./image/timer4/item4-3.png", "./image/timer4/item4-2.png", "./image/timer4/item4-1.png", "./image/timer4/item4-0.png", "./image/timerStartEnd.png"];
	} else if (ItemNumber == 5) {
		timerImage.setAttribute("src", "./image/timer5/item5-5.png");
		imageArray = ["./image/timer5/item5-4.png", "./image/timer5/item5-3.png", "./image/timer5/item5-2.png",
			"./image/timer5/item5-1.png", "./image/timer5/item5-0.png", "./image/timerStartEnd.png"];
	}

	var imageIndex = 0;
	timer = setInterval(changeImage, 1000);

	function changeImage() {
		timerImage.setAttribute("src", imageArray[imageIndex]);
		imageIndex++;
		console.log(imageArray);
		if (imageIndex >= imageArray.length) {
			clearInterval(timer);
		}
	}
}

/**
 * Stop Timer
 * @param {Timer} timer 
 */
export function stopTimer(timer) {
	clearInterval(timer);
}

/**
 * 오디오 재생
 * @param {Audio Name} audioName 
 */
export function playAudio(audioName) {
	audioList[audioName].currentTime = 0;
	audioList[audioName].play();
}

/**
 * 오디오 정지
 * @param {Audio Name} audioName 
 */
export function stopAudio(audioName) {
	audioList[audioName].currentTime = 0;
	audioList[audioName].pause();
}

/**
 * 오디오 전부 정지
 */
export function stopAllAudio() {
	for(var audioName in audioList) {
		console.log(audioName);
		audioList[audioName].currentTime = 0;
		audioList[audioName].pause()
	}
	
}

/**
 * 스테이지 업데이트
 * @param {Stage Number} newStage 
 */
export function updateStage(newStage) {
	score = 0;
	document.getElementById("scoreNum").innerHTML = "SCORE " + score.toString();
	currentStage = newStage;
	document.getElementById("stageNum").innerHTML = "STAGE " + currentStage;
	stopAllAudio();
}

/**
 * 고스트 색상 업데이트
 * @param {object name} objectName 
 * @param {color} color 
 */
export function changeGhostColor(objectName, color) {
	object[objectName].mesh.traverse((ghost) => {
		if (ghost.isMesh) {
			// 눈 부분은 색 안바꾸게
			if (ghost.material.color.r != 0 ||
				ghost.material.color.g != 0 ||
				ghost.material.color.b != 0) {
				ghost.material.color.set(color);
			}
		}
	});
}

/**
 * AmbientLight를 추가한다
 * @param {THREE.Scene} scene 
 * @param {HEX} color 
 * @param {Int} intensity 
 */
function addAmbientLight(scene, color, intensity) {
	if (ambientLight != undefined) removeAmbientLight(scene);

	ambientLight = new THREE.AmbientLight(color, intensity);
	scene.add(ambientLight);
}

/**
 * AmbientLight를 제거한다
 * @param {THREE.Scene} scene 
 */
function removeAmbientLight(scene) {
	if (ambientLight != undefined) {
		scene.remove(ambientLight);
		ambientLight = undefined;
	}
}

/**
 * PointLight를 추가한다
 * @param {THREE.Scene} scene 
 * @param {HEX} color 
 * @param {Int} intensity 
 * @param {Int} distance 
 * @param {Int} x 
 * @param {Int} y 
 * @param {Int} z 
 */
function addPointLight(scene, color, intensity, distance, x, y, z) {
	if (userLight != undefined) removePointLight(scene);

	userLight = new THREE.PointLight(color, intensity, distance);
	userLight.position.set(x, y, z);
	scene.add(userLight);
}

/**
 * PointLight를 제거한다
 * @param {THREE.Scene} scene 
 */
function removePointLight(scene) {
	if (userLight != undefined) {
		scene.remove(userLight);
		userLight = undefined;
	}
}

/**
 * Set Clear Timer
 * @param {ms} finishMS 
 * @param {stage num} currentStage 
 */
export function setFinishTimer(finishMS) {
	clearTimer = setTimeout(function () {
		if(score <= 100) {
			window.location.href = 'gameover.html?score=' + totalScore;
		}

		stopTimer(timer); // 아이템 타이머 초기화!
		isNeedClear = true;
		timerImage.setAttribute("src", "./image/timerStartEnd.png");

		
		// 현재 스테이지에 따라 다음 동작 정의
		if (currentStage == 1) {
			updateStage(2);
		}
		else if (currentStage == 2) {
			updateStage(3);
		}
		else if (currentStage == 3) {
			window.location.href = 'gameclear.html?score=' + totalScore; // Clear Page
		}
	}, finishMS)
}

/**
 * Update Physical Engine 
 */
export function updatePhysics(scene, world, camera, controls, renderer) {
	if (isloadingFinished) {
		// Step the physics world
		world.step(timeStep);

		if (isNeedClear) {
			deleteReqList.splice(0, deleteReqList.length);
			removeGlobalEventListener();
			Main.clearAll();
			Object.keys(object).forEach(element => {
				object[element] = undefined;
				delete object[element];
			});

			if (currentStage == 2) {
				MapSpace.initSpaceMap(scene, world, controls, camera);
			}
			else if (currentStage == 3) {
				MapGachon.initGachonMap(scene, world, controls, camera);
			}

			isNeedClear = false;
		}
		else {
			// 삭제 요청 리스트를 통한 삭제 처리
			while (deleteReqList.length > 0) {
				let deleteItem = deleteReqList.pop();
				if (object[deleteItem] != undefined) {
					// 아이템 전용 팩맨 Body 처리
					if (deleteItem == "pacman" && pacman_item != undefined) {
						world.removeBody(pacman_item);
						pacman_item = undefined;
					}
					object[deleteItem].delete(scene, world);
				}
			}

			if (object['pacman'] != undefined) {
				// 카메라 설정
				selectCameraType(scene, object['pacman'], camera, controls, renderer);
				pacman_item.position = object['pacman'].body.position;
			}
			Object.keys(object).forEach(function (key) {
				object[key].update();
			});
		}
	}
}