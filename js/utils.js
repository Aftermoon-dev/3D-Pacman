/**
 * 3D Pacman - Utils
 * 2021-2 Computer Graphics Term Project
 * Dept. of Software, Gachon Univ.
 */

import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/optimized/three.js';
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/unoptimized/examples/jsm/loaders/GLTFLoader.js';
import * as Maps from '../js/maps.js'

/* Setting */
const timeStep = 1/30;

export var userSpeed = 500; //유저의 속도를 결정
export var pacman_height = 180; //팩맨의 카메라 높이 결정  -> 나중에 아이템에서 써먹을수있음
export var pacman_height2D = 7300; //2D view height
export var ghostSpeed = 450; // 고스트 속도

export const loadManager = new THREE.LoadingManager();
loadManager.onStart = () => {
	document.getElementById("loading").style.visibility = "visible";
	isloadingFinished = false;
}

loadManager.onLoad = () => {
	document.getElementById("loading").style.visibility = "hidden";
	console.log("Loading Finished");
	isloadingFinished = true;
};

export const loader = new GLTFLoader(loadManager);
export const textureLoader = new THREE.TextureLoader(loadManager);
export let isloadingFinished = false; // 로딩 완료 여부 확인

/* Item Setting */
export var useitem = true; //item 적용할꺼면 true로

export var item1Flag = true;
export var item1Timer;
export var item2Timer;
export var item3Flag = 220; // 팩맨 크기 넣어주기
export var item3Timer;
export var item4Flag = false;
export var item4Timer;
export var item5Timer;
export var imageArray = [];
export var timer;
export var timerImage;

/* Score Setting */
export var score = 0;
export var totalScore = 0;   

/* camera control variable */
<<<<<<< HEAD
export var if2D = false; 
=======
export var if2D = false;
export var first2DFlage = true; //1인칭 -> 3인칭이 처음 된 건지 체크
export var nowMoveOK = true; //이게 true일때 setCameraType에서 온전히 함수들이 작동 (false일때는 카메라가 이동중이라는 의미)
export var targetPosition; //camera 이동할 때 지정해 줄 좌표
export var isTween = false; //tween이 실행중인지


>>>>>>> 56bef68cc5cab94acb42b9345fce7c96c0033d2a
export var developerMode = false; //개발자 모드 ON!

/* Object Dictonary */
export const object = {};

/* Audio List */
export const audioList = {
	'teleport': new Audio("./audio/teleport.mp3"),
	'gameclear': new Audio("./audio/gameclear.mp3"),
	'gameover': new Audio("./audio/gameover.mp3")
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
	
	//객체의 위치를 알려줌
	getPosition() {
		return this.body.position;
	}

	//객체의 회전률을 알려줌
	getRotation() {
	return this.body.rotation;
	}

	// 객체의 속도를 설정
	setVelocity(flag){
		var directionVector;

		if (flag == 1){
			console.log("w");
			directionVector = new CANNON.Vec3(0, 0, 1);
			directionVector.z -= userSpeed;
		}
		else if (flag == 2){
			console.log("s");

			directionVector = new CANNON.Vec3(0, 0, 1);
			directionVector.z += userSpeed;
		}
		else if (flag == 3){
			console.log("a");

			directionVector = new CANNON.Vec3(1, 0, 0);
			directionVector.x -= userSpeed;
		}
		else if (flag == 4){
			console.log("d");

			directionVector = new CANNON.Vec3(1, 0, 0);
			directionVector.x += userSpeed;
		}
		else if (flag == 0){
			this.body.velocity.set(0, 0, 0);
			return;
		}

		if (if2D == false){ // 팩맨의 로컬 좌표랑 매트릭스 연산 => 로컬 직진을 월드 좌표로 맴핑
			directionVector = this.body.quaternion.vmult(directionVector);
		}

		this.body.velocity.set(directionVector.x, 0, directionVector.z);
	}

	// 객체 삭제 - 수행 후 object dict에서도 지워줄 것
	delete(scene, world) {
		scene.remove(this.mesh);
		this.mesh = undefined;
		world.removeBody(this.body);
		this.body = undefined;
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
		collisionFilterGroup: 1,
		angularDamping: 1,
		collisionFilterMask: 2 | 4 | 8 | 16 | 32 | 64 | 128, // 2번 바닥 4번 벽 8번 고스트 시작 벽 16 아이템 32 텔레포트 바닥 64 고스트
		mass: 3,
		type: 1
	});
	
	createNewObject(scene, world, 'pacman', pacmanMesh, pacmanBody);
	object['pacman'].position(posx, posy, posz);
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
		collisionFilterGroup: 4,
		mass: 0,
		type: 1000
	});
	createNewObject(scene, world, wallname, new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshLambertMaterial({ color: wallcolor})), wallBody);
}

export function createWallObjectWithTexture(scene, world, wallname, wallcolor, x, y, z, material) {
	var wallBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2)),
		collisionFilterGroup: 4,
		mass: 0,
		type: 1000
	});
	createNewObject(scene, world, wallname, new THREE.Mesh(new THREE.BoxGeometry(x, y, z), material), wallBody);
}

/**
 * 고스트 시작 위치 벽 생성
 * @param {THREE.Scene} scene 
 * @param {CANNON.World} world 
 * @param {String} wallname 
 * @param {X} x 
 * @param {Y} y 
 * @param {Z} z 
 */
 export function createStartWallObject(scene, world, wallname, x, y, z) {
	var wallBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2)),
		collisionFilterGroup: 8,
		mass: 0,
		type: 1000
	});
	createNewObject(scene, world, wallname, new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshPhongMaterial({ 
		color: 0xffd400,
		flatShading: true
	})), wallBody);
}

/**
 * Item 등록
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world
 * @param {String} itemName
 * @param {String (Color Hex Code, 0xFFFFFF)} itemColor
 * @param {Integer} itemNumber
 */
export function createItemObject(scene, world, itemName, itemColor, itemNumber) { // item 번호 붙여서 번호마다 기능 다르게 넣기
	var itemMesh = new THREE.Mesh(new THREE.SphereGeometry(80, 256, 128), new THREE.MeshPhongMaterial({ 
		color: itemColor,
		flatShading: true
	}));
	var itemBody = new CANNON.Body({ 
		shape: new CANNON.Sphere(80),
		collisionFilterGroup: 16,
		collisionFilterMask: 1 | 2 | 4 | 8 | 32, // 2번 바닥 4번 벽 8번 고스트 시작 벽 16 아이템 32 텔레포트 바닥
		mass: 0,
		type: itemNumber,
	});
	
	createNewObject(scene, world, itemName, itemMesh, itemBody);
}

/**
 * Item1 - 방향키 반대로
 */
 export function applyItem1Event() {
	item1Flag = false;
 
	item1Timer = setTimeout(function(){
		item1Flag = true;
	}, 8000)
	// 8초 동안만 방향키 반대로 5초 지나면 원래대로!!
}

/**
 * Item2 - 팩맨 Speed
 */
 export function applyItem2Event() {
	var speedFlag = Math.random() * 10
	// Random Integer 값을 이용해 0 ~ 4 = Speed Down / 5 ~ 9 = Speed Up

	if (speedFlag <= 4) {
		userSpeed = 300;
	} else {
		userSpeed = 700;
	}
 
	item2Timer = setTimeout(function(){
		userSpeed = 500;
	}, 8000)
}

/**
 * Item3 - 팩맨 Size Up
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world 
 * @param {OrbitControls} controls
 * @param {THREE.PerspectiveCamera} camera
 */
 export function applyItem3Event(scene, world, controls, camera) {
	var x = object['pacman'].body.position.x;
	var y = object['pacman'].body.position.y + 50;
	var z = object['pacman'].body.position.z;

	object['pacman'].body.removeEventListener(userObjectCollide);
	object['pacman'].delete(scene, world);
	delete object['pacman'];

	removeGlobalEventListener()
	createPacman(scene, world, x, y, z, item3Flag);
	setUserEvent(scene, world, controls, camera);
	pacman_height += 30;
	
	item3Timer = setTimeout(function(){
		var x = object['pacman'].body.position.x;
		var y = object['pacman'].body.position.y - 20;
		var z = object['pacman'].body.position.z;

		object['pacman'].body.removeEventListener(userObjectCollide);
		object['pacman'].delete(scene, world);
		delete object['pacman'];

		createPacman(scene, world, x, y, z, 180); // Default 180
		removeGlobalEventListener()
		setUserEvent(scene, world, controls, camera);
		pacman_height -= 30;
		
	}, 8000);
}

/**
 * Item4 - Kill the Ghost
 */
export function applyItem4Event() {
	//changeGhostColor("ghost1", 0xFFFFFF);
	item4Flag = true;

	item4Timer = setTimeout(function(){
		item4Flag = false;
	}, 8000);
}

/**
 * Item5 - Change 3D -> 2D
 */
export function applyItem5Event() {
	if2D = true;

	item5Timer = setTimeout(function(){
		if2D = false
	}, 5000);
}

/**
 * User Event Listener 등록
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world 
 * @param {OrbitControls} controls
 * @param {PerspectiveCamera} camera
 */
export function setUserEvent(scene, world, controls, camera) {
	const userObject = object['pacman'];

	userObject.body.velocity.set(0, 0, 0);
	userObject.body.angularDamping = 1;

	//3인칭 뷰 일 때에는 마우스 작동이 아예 안되게! 
	if (if2D == false)
		controls.enabled = true;
	else
		controls.enabled = false;

	// Key를 올렸을 때
	keyDownCallback = function(event) {
		userObject.body.angularDamping = 1;

		switch(event.key) {
			case "W":
			case "w":
				if (item1Flag)
					userObject.setVelocity(1); //w
				else
					userObject.setVelocity(2); //s		
				break;

			case "S":
			case "s":
				if (item1Flag)
					userObject.setVelocity(2);
				else
					userObject.setVelocity(1);
				break;

			case "A":
			case "a":
				if (item1Flag)
					userObject.setVelocity(3); //a
				else
					userObject.setVelocity(4); //d
				break;
				
			case "D":
			case "d":
				if (item1Flag)
					userObject.setVelocity(4);
				else
					userObject.setVelocity(3);
				break;


			//임시로 넣어둔 부분! 누르면 1인칭 <-> 3인칭
			case "C":
			case "c":
				changePointOfView(userObject, controls, camera);
				break;

			// // 이부분은 팩맨 커지는 아이템에 사용하면 될 듯
			// //임시로 넣어둔 부분! 누르면 팩맨 카메라 높이가 올라감
			// case "Z":
			// case "z":
			// 	if (if2D == false)
			// 		pacman_height += 30;
			// 	break;

			// //임시로 넣어둔 부분! 누르면 팩맨 카메라 높이가 내려감
			// case "X":
			// case "x":
			// 	if (if2D == false)
			// 		pacman_height -= 30;
			// 	break;
		}
	};
	document.addEventListener("keydown", keyDownCallback);

	// Key를 뗐을 때 
	keyUpCallback = function(event) {
		switch(event.key) {
			case "W":
			case "w":
			case "S":
			case "s":
			case "A":
			case "a":
			case "D":
			case "d":
				userObject.setVelocity(0);
				break;
		}
	};
	document.addEventListener("keyup", keyUpCallback);

	// mouse로 카메라 움직일 때
	mouseMoveCallback = function (event) {
		const toangle = controls.getAzimuthalAngle() * (180 / Math.PI);
		//1인칭 시점일 때만 작동함
		if (if2D == false && userObject != undefined)
			userObject.rotateY(toangle); //카메라 보는 각도가 정면이 되도록 팩맨을 돌림

	};
	document.addEventListener("mousemove", mouseMoveCallback);

	// Collide Event
	userObjectCollide = function(e) {
		let output = Object.fromEntries(Object.entries(object).filter(([k,v]) => v.body == e.body));

		// 고스트랑 닿을 경우
		if (e.body.type == 3) {
			console.log("Meet the Ghost!" + item4Flag);

			// 먹는 모드일 경우
			if(item4Flag) {
				output[Object.keys(output)[0]].delete(scene, world);
				delete object[output[Object.keys(output)[0]].objName];
			}
			// 아니면
			else {
				document.location.href = "./gameover.html";
			}
		} else if (e.body.type == 4) { // Point
			score += 10;
			totalScore += 10;
			document.getElementById("scoreNum").innerHTML = "SCORE " + score.toString();
			
			console.log(Object.keys(output)[0]) /////////////////
			output[Object.keys(output)[0]].delete(scene, world);
			delete object[output[Object.keys(output)[0]].objName];
			
			// 현재 스테이지에 따라 다음 동작 정의
			if(currentStage == 1) {
				if (totalScore == 3400) {  // Stage 1 Clear 점수 넣기!
					stopTimer(timer); // 아이템 타이머 초기화!
					Maps.initBasicMap(scene, world, controls, camera); // Next Map
					timerImage.setAttribute("src", "./image/timerStartEnd.png");
				}
			}
			else if (currentStage == 2) {
				if (totalScore == 4000) {  // Stage 2 Clear 점수 넣기!
					stopTimer(timer); // 아이템 타이머 초기화!
					Maps.initBasicMap(scene, world, controls, camera); // Next Map
					timerImage.setAttribute("src", "./image/timerStartEnd.png");
				}
			}
			else if (currentStage == 3) {
				if (totalScore == 4600) {  // Stage 3 Clear 점수 넣기!
					window.location.href = 'gameclear.html'; // Clear Page
				}
			}
		} else if (e.body.type == 101) {
			stopTimer(timer);
			startTimer(1);
			applyItem1Event();
			output[Object.keys(output)[0]].delete(scene, world);
			delete object[output[Object.keys(output)[0]].objName];
		} else if (e.body.type == 102) {
			stopTimer(timer);
			startTimer(2);
			applyItem2Event();
			output[Object.keys(output)[0]].delete(scene, world);
			delete object[output[Object.keys(output)[0]].objName];
		} else if (e.body.type == 103) {
			stopTimer(timer);
			startTimer(3);
			applyItem3Event(scene, world, controls, camera);
			output[Object.keys(output)[0]].delete(scene, world);
			delete object[output[Object.keys(output)[0]].objName];
		} else if (e.body.type == 104) {
			stopTimer(timer);
			startTimer(4);
			applyItem4Event();
			output[Object.keys(output)[0]].delete(scene, world);
			delete object[output[Object.keys(output)[0]].objName];
		} else if (e.body.type == 105) {
			stopTimer(timer);
			startTimer(5);
			applyItem5Event();
			output[Object.keys(output)[0]].delete(scene, world);
			delete object[output[Object.keys(output)[0]].objName];
		}
	};
	userObject.body.addEventListener("collide", userObjectCollide);
}


/** 
 * 카메라 시점 변경 
*/
function changePointOfView(userObject, controls, camera){
	if (if2D == false){ //1인칭 -> 2D
		if2D = true;
		//set position
		targetPosition = new THREE.Vector3(0, pacman_height2D, 200);
		controls.target.set(0, 0, 0); 
	}
	else{ // 2D -> 1인칭
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
function selectCameraType(scene, userObject, camera, controls){
	var duration = 1500; //during 3 second
	
	if (nowMoveOK == false){ //c에서 조절
		tweenCamera(targetPosition, duration, controls, camera);
		nowMoveOK = true;
	}
	//1인칭 시점일 때만 작동함
	if (if2D == false){
		if (first2DFlage == false){
			nowMoveOK = false;
			// controls.reset()
			first2DFlage = true;
			controls.minPolarAngle =  Math.PI * 0.5;
			controls.maxPolarAngle =  Math.PI * 0.5;
			controls.rotateSpeed = 1;
		}
		if (nowMoveOK == true)
			moveFirstPersonCameraAll(scene, userObject, camera, controls);
	}
	else if(if2D == true){
		if (first2DFlage == true){
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
        .to( targetPosition, duration )
        .easing( TWEEN.Easing.Linear.None)
        .onUpdate( function () {
            camera.position.copy( position );
            camera.lookAt( controls.target );
        } )
		.onComplete( function () {
            camera.position.copy( targetPosition );
            controls.enabled = true;
			isTween = false;
        } ).start();
}


/**
 * orbitcontrol을 first person 시점으로 사용
 */
function moveFirstPersonCameraAll(scene, userObject, camera, controls){
	userObject.body.angularDamping = 1; //계속 회전 방지

	var ve = userObject.getPosition(); //현재 팩맨 중심좌표
	var direct = new THREE.Vector3();
	camera.getWorldDirection(direct); // 카메라가 바라보는 방향 받아오기
	
	camera.position.set(ve.x - 10 * direct.x, pacman_height, ve.z - 10 * direct.z); //카메라 셋팅
	controls.target.set(ve.x, pacman_height, ve.z); //타겟 설정 - 얘를 중심으로 공전

	userObject.body.angularDamping = 1; //계속 회전 방지
	controls.update();

	// AmbientLight 있었으면 없애기
	if(isTween == false && ambientLight != undefined) {
		removeAmbientLight(scene);
	}

	// 기존에 사용자 Light 없으면
	if(userLight == undefined) {
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
function move2DCameraAll(scene, camera, controls){
	//1인칭 시점일 때만 작동함
	camera.position.set(0, pacman_height2D, 0); //카메라 셋팅
	controls.target.set(0, 0, 0); //타겟 설정 - 얘를 중심으로 공전
	controls.update();

	// PointLight 있었으면 없애기
	if(userLight != undefined) {
		removePointLight(scene);
	}

	// AmbientLight 없으면 생성
	if(ambientLight == undefined) {
		addAmbientLight(scene, 0xFFFFFF, 1);
	}
}

/**
 * Global Event Listener 삭제
 */
export function removeGlobalEventListener() {
	document.removeEventListener("keydown", keyDownCallback);
	document.removeEventListener("keyup", keyUpCallback);
	document.removeEventListener("mousemove", mouseMoveCallback);
}

/**
 * Scene 초기화
 * @param {THREE.Scene} scene 
 */
export function resetScene(scene, world) {
	removeGlobalEventListener();

	Object.keys(object).forEach(element => {
		if(element == "pacman") {
			object[element].body.removeEventListener(userObjectCollide);
		}
		object[element].delete(scene, world);
		delete object[element];
	});
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
 */
export function makeBox(scene, world, name, x, y, z, sur_color, collisionFilterGroup_val, mass_val) {
	var boxBody = new CANNON.Body({
	   shape: new CANNON.Box(new CANNON.Vec3(x/2, y/2, z/2)),
	   collisionFilterGroup: collisionFilterGroup_val,
	   mass: mass_val
	});
	createNewObject(scene, world, name, new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshPhongMaterial ({ 
		color: sur_color,
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
 */
export function createGhost(scene, world, objName, x, y, z, color) {
	var ghostBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(150, 400, 150)),
		collisionFilterGroup: 64,
		angularDamping: 1,
		collisionFilterMask: 1 | 2 | 4 | 8 | 32, // 2번 바닥 4번 벽 8번 고스트 시작 벽 16 아이템 32 텔레포트 바닥
		position: new CANNON.Vec3(x, y, z),
		mass: 0,
		type: 3
	});

	loader.load("./models/pacman_ghost_blue/scene.gltf", (gltf) => {
		const root = gltf.scene;
		var ghost = root.children[0];
		ghost.scale.set(1.5, 1.5, 1.5);
		
		root.traverse((ghost) => {
			if (ghost.isMesh) {
				// 눈 부분은 색 안바꾸게
				if(ghost.material.color.r != 0 ||
					ghost.material.color.g != 0 ||
					ghost.material.color.b != 0) {
						ghost.material.color.set(color);
					}
				
			}
		});
		createNewObject(scene, world, objName, root, ghostBody);
		object[objName].position(x, y, z);
	});
}

/**
 * 동글이 만들기
 * @param {THREE.Scene} scene 
 * @param {CANNON.World} world 
 * @param {X} posx 
 * @param {Y} posy 
 * @param {Z} posz 
 * @param {Integer} circleNumber
 */
 export function createCircle(scene, world, posx, posy, posz, circleNumber) {
	var circleMesh = new THREE.Mesh(new THREE.SphereGeometry(40, 256, 128), new THREE.MeshPhongMaterial({ 
		color: 0xFFFF7D,
		flatShading: true 
	}));

	var circleBody = new CANNON.Body({ 
		shape: new CANNON.Sphere(40),
		collisionFilterGroup: 128,
		collisionFilterMask: 1,
		type: 4
	});

	var circleName = 'circle' + circleNumber;
	createNewObject(scene, world, circleName, circleMesh, circleBody);
	object[circleName].position(posx, posy, posz);
}

/**
 * Item Timer
 * @param {Integer} ItemNumber 
 */
export function startTimer(ItemNumber) {
	timerImage = document.getElementById("timerimage");
	stopTimer(timer);

	if (ItemNumber == 1) {
		timerImage.setAttribute("src", "./image/timer1/item1-8.png");
		imageArray=["./image/timer1/item1-7.png", "./image/timer1/item1-6.png", "./image/timer1/item1-5.png", "./image/timer1/item1-4.png",
		"./image/timer1/item1-3.png", "./image/timer1/item1-2.png", "./image/timer1/item1-1.png", "./image/timer1/item1-0.png", "./image/timerStartEnd.png"];
	} else if (ItemNumber == 2) {
		timerImage.setAttribute("src", "./image/timer2/item2-8.png");
		imageArray=["./image/timer2/item2-7.png", "./image/timer2/item2-6.png", "./image/timer2/item2-5.png", "./image/timer2/item2-4.png", 
		"./image/timer2/item2-3.png", "./image/timer2/item2-2.png", "./image/timer2/item2-1.png", "./image/timer2/item2-0.png", "./image/timerStartEnd.png"];
	} else if (ItemNumber == 3) {
		timerImage.setAttribute("src", "./image/timer3/item3-8.png");
		imageArray=["./image/timer3/item3-7.png", "./image/timer3/item3-6.png", "./image/timer3/item3-5.png", "./image/timer3/item3-4.png", 
		"./image/timer3/item3-3.png", "./image/timer3/item3-2.png", "./image/timer3/item3-1.png", "./image/timer3/item3-0.png", "./image/timerStartEnd.png"];
	} else if (ItemNumber == 4) {
		timerImage.setAttribute("src", "./image/timer4/item4-8.png");
		imageArray=["./image/timer4/item4-7.png", "./image/timer4/item4-6.png", "./image/timer4/item4-5.png", "./image/timer4/item4-4.png", 
		"./image/timer4/item4-3.png", "./image/timer4/item4-2.png", "./image/timer4/item4-1.png", "./image/timer4/item4-0.png", "./image/timerStartEnd.png"];
	} else if (ItemNumber == 5) {
		timerImage.setAttribute("src", "./image/timer5/item5-5.png");
		imageArray = ["./image/timer5/item5-4.png", "./image/timer5/item5-3.png", "./image/timer5/item5-2.png", 
		"./image/timer5/item5-1.png", "./image/timer5/item5-0.png", "./image/timerStartEnd.png"];
	}
	
	var imageIndex = 0;
	timer = setInterval(changeImage, 1000);

	function changeImage(){
		timerImage.setAttribute("src", imageArray[imageIndex]);
		imageIndex++;
		console.log(imageArray);
		if (imageIndex >= imageArray.length){
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
 * 팩맨 카메라 높이 변경
 * @param {Pacman height} height 
 */
 export function ChangePacmanHeight(height){
	pacman_height = height;
}

/**
 * 스테이지 업데이트
 * @param {Stage Number} newStage 
 */
export function updateStage(newStage) {
	score = 0;
	document.getElementById("scoreNum").innerHTML = "SCORE " + score.toString();
	currentStage = newStage;
	document.getElementById("stageNum").innerHTML="STAGE " + currentStage;
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
			if(ghost.material.color.r != 0 ||
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
	if(ambientLight != undefined) {
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
	if(userLight != undefined) {
		scene.remove(userLight);
		userLight = undefined;
	}
}

/**
 * Update Physical Engine 
 */
export function updatePhysics(scene, world, camera, controls, renderer) {
	if (isloadingFinished) {
		// Step the physics world
		world.step(timeStep);

		if(object['pacman'] != undefined) {
			// 카메라 설정
			selectCameraType(scene, object['pacman'], camera, controls, renderer);
		}


		Object.keys(object).forEach(function(key) {
			object[key].update();
		});
	}
}