/**
 * 3D Pacman - Utils
 * 2021-2 Computer Graphics Term Project
 * Dept. of Software, Gachon Univ.
 */

import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/optimized/three.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/unoptimized/examples/jsm/loaders/GLTFLoader.js';
// import { FontLoader } from '../build/FontLoader.js';
// import { TextGeometry } from '../build/TextGeometry.js';


/* Setting */
const timeStep = 1/30;

export var userSpeed = 250; //유저의 속도를 결정
export var pacman_height = 180; //팩맨의 카메라 높이 결정  -> 나중에 아이템에서 써먹을수있음
export var pacman_height2D = 8000; //2D view height

export const loader = new GLTFLoader();
 
/* Item Setting */
export var useitem = true; //item 적용할꺼면 true로

export var itemArr = [];
export var circleArr = [];
export var item1Flag = true;
export var item1Timer;
export var item2Timer;
export var item3Flag = 180; // 팩맨 크기 넣어주기
export var item3Timer;
export var item4Flag = true;
export var item4Timer;
export var item5Timer;

/* Score Setting */
export var score = 0;

/* camera control variable */
export var if2D = false;
export var currentCameraType = 1; //1 - 1인칭, 2 - 2D (ㅎ)

export var developerMode = true; //개발자 모드 ON!


/* Object Dictonary */
export const object = {};

/* Audio List */
export const audioList = {
	'teleport': new Audio("./audio/teleport.mp3")
};

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
	var pacmanMesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 16), new THREE.MeshBasicMaterial({ color: 0xffd400 }))
	var pacmanBody = new CANNON.Body({ 
		shape: new CANNON.Sphere(radius),
		collisionFilterGroup: 1,
		angularDamping: 1,
		collisionFilterMask: 2 | 4 | 8 | 32, // 2번 바닥 4번 벽 8번 고스트 시작 벽 16 아이템 32 텔레포트 바닥 64 고스트
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
	createNewObject(scene, world, wallname, new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshBasicMaterial({ color: wallcolor})), wallBody);
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
	createNewObject(scene, world, wallname, new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshBasicMaterial({ color: 0xffd400})), wallBody);
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
	var itemMesh = new THREE.Mesh(new THREE.SphereGeometry(80, 32, 16), new THREE.MeshBasicMaterial({ color: itemColor}));
	var itemBody = new CANNON.Body({ 
		shape: new CANNON.Sphere(80),
		collisionFilterGroup: 16,
		type: itemNumber,
	});
	
	createNewObject(scene, world, itemName, itemMesh, itemBody);
	itemArr.push(itemName);
}

/**
 * Item과 충돌 여부 확인 Step (1)
 * @param {worldObj} pacman 
 * @param {worldObj} item
 */
export function itemCollisionCheck(pacman, item) {
	var distance = Math.pow((Math.pow((pacman.body.position.x - item.body.position.x), 2) + Math.pow((pacman.body.position.z - item.body.position.z), 2)), 1/2)

	if (distance <= 200 + 100) // distance <= pacmanRadius + itemRadius (범위 좀 더 넓게)
		return true;
	else
		return false;
}

/**
 * 먹은 Item 삭제 Step (2)
 * @param {THREE.Scene} scene 
 * @param {CANNON.World} world 
 * @param {worldObj} object 
 */
export function deleteObject(scene, world, object) {
	console.log("Item Name : " + object.objName);
 
	world.removeBody(object.body);
	scene.remove(object.mesh);
 
	// itemArr에서 이미 먹은 아이템들을 제거
	for (var i = 0; i < itemArr.length; i++) {
		if (itemArr[i] === object.objName) {
			itemArr.splice(i, 1);
			i--;
		}
	}
}

/**
 * Item Event 함수
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world 
 * @param {worldObj} userObject 
 * @param {OrbitControls} controls
 * @param {String} itemName
 */
 export function applyItemEvent(scene, world, userObject, controls, itemName) {
	if (itemName == 'item1') {
		applyItem1Event();
	} else if (itemName == 'item2') {
		applyItem2Event();
	} else if (itemName == 'item3') {
		// applyItem3Event(scene, world, userObject, controls);
		// 미완성
	} else if (itemName == 'item4') {
		// applyItem4Event();
	} else if (itemName == 'item5') {
		applyItem5Event();
	}
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
		userSpeed = 100;
	} else {
		userSpeed = 500;
	}
 
	item2Timer = setTimeout(function(){
		userSpeed = 250;
	}, 8000)
}

/**
 * Item3 - 팩맨 Size Up
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world 
 * @param {worldObj} userObject 
 * @param {OrbitControls} controls
 */
 export function applyItem3Event(scene, world, userObject, controls) {
	var x = userObject.body.position.x;
	var y = userObject.body.position.y;
	var z = userObject.body.position.z;

	createPacman(scene, world, x, y, z, 300);
	setUserEvent(scene, world, object['pacman'], controls);

	item3Flag = 300;

	//////////////////////////////////
	// 물리엔진 body 없애기

	// world.removeBody(userObject.body);
	scene.remove(userObject.mesh);

	item3Timer = setTimeout(function(){
	// world.removeBody(object['pacman'].body);
		scene.remove(object['pacman'].mesh);

		var x = object['pacman'].body.position.x;
		var y = object['pacman'].body.position.y;
		var z = object['pacman'].body.position.z;

		createPacman(scene, world, x, y, z, 180);
		setUserEvent(scene, world, object['pacman'], controls);

		item3Flag = 180;
	}, 8000);
}

/**
 * Item4 - Kill the Ghost
 */
 export function applyItem4Event() {
	/*
	item4Flag = false;

	item4Timer = setTimeout(function(){
		item4Flag = true;
	}, 8000);
	*/
}

/**
 * Item5 - Change 3D -> 2D
 */
 export function applyItem5Event() {
	if2D = true;

	item5Timer = setTimeout(function(){
		if2D = false
	}, 10000);
}

/**
 * Eat Item Final
 * @param {THREE.Scene} scene 
 * @param {CANNON.World} world 
 * @param {OrbitControls} controls
 * @param {worldObj} userObject 
 */
export function eatItem(scene, world, controls, userObject) {
	if (useitem == true){
		for (var i = 0; i < itemArr.length; i++) { // To Check the Collision with All items
			var collisionResult = itemCollisionCheck(userObject, object[itemArr[i]]); // Check the Collision with item
	
			if (collisionResult == true) { // True = Collision / False = Not Collision
				applyItemEvent(scene, world, userObject, controls, object[itemArr[i]].objName);
				deleteObject(scene, world, object[itemArr[i]]);
			}
		}
		checkItemState();
	}
}


/**
 * 적용된 아이템 확인
 */
export function checkItemState() {
	 /*
	console.log('Arror = ' + item1Flag); // Item1
	console.log('Pacman Speed = ' + userSpeed); // Item2
	console.log('Pacman Size = ' + item3Flag); // Item3
	console.log('ITEM4 = '); // Item4
	console.log('ITEM5 = '); // Item5
	*/
}

/**
 * User Event Listener 등록
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world 
 * @param {worldObj} userObject 
 * @param {OrbitControls} controls
 * @param {PerspectiveCamera} camera
 */
export function setUserEvent(scene, world, userObject, controls, camera) {
	userObject.body.velocity.set(0, 0, 0);
	userObject.body.angularDamping = 1;

	//3인칭 뷰 일 때에는 마우스 작동이 아예 안되게! 
	if (if2D == false)
		controls.enabled = true;
	else
		controls.enabled = false;

	// Key를 올렸을 때
	document.addEventListener("keydown", function(event) {
		userObject.body.angularDamping = 1;
		eatItem(scene, world, controls, userObject);
		eatCircle(scene, world, userObject);

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
				if (if2D == false){
					if2D = true;
				}
				else{
					if2D = false;
				}
				break;

			// 이부분은 팩맨 커지는 아이템에 사용하면 될 듯
			//임시로 넣어둔 부분! 누르면 팩맨 카메라 높이가 올라감
			case "Z":
			case "z":
				if (if2D == false)
					pacman_height += 30;
				break;

			//임시로 넣어둔 부분! 누르면 팩맨 카메라 높이가 내려감
			case "X":
			case "x":
				if (if2D == false)
					pacman_height -= 30;
				break;
		}
	});

	// Key를 뗐을 때 
	document.addEventListener("keyup", function(event) {
		eatItem(scene, world, controls, userObject);
		eatCircle(scene, world, userObject);

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
	});

	// Collide Event
	userObject.body.addEventListener("collide", function(e) {
		// 부딪힌 Object Type 확인
		// if (e.body.type == 1000) {
		 	// console.log("Collide with Walls!");
		// }
		if (e.body.type == 4444) {
			console.log("Meet the Ghost!");
		}
	});

	// mouse로 카메라 움직일 때
	document.addEventListener("mousemove", function(event) {
		const toangle = controls.getAzimuthalAngle() * (180 / Math.PI);
			//1인칭 시점일 때만 작동함
		if (if2D == false)
			userObject.rotateY(toangle); //카메라 보는 각도가 정면이 되도록 팩맨을 돌림
	})
}

/**
 *  카메라 선택
 */
function selectCameraType(userObject, camera, controls){
	//1인칭 시점일 때만 작동함
	if (if2D == false && currentCameraType == 1){
		moveFirstPersonCameraAll(userObject, camera, controls)
	}
	else if(if2D == false && currentCameraType == 2){
		controls.minPolarAngle =  Math.PI * 0.5;
		controls.maxPolarAngle =  Math.PI * 0.5;
		controls.rotateSpeed = 1;

		currentCameraType = 1;
		moveFirstPersonCameraAll(userObject, camera, controls)
	}
	else if(if2D == true && currentCameraType == 1){
		controls.minPolarAngle =  0;
		controls.maxPolarAngle =  0;
		controls.rotateSpeed = 0;

		currentCameraType = 2;
		move2DCameraAll(camera, controls);
	}
}



/**
 * orbitcontrol을 first person 시점으로 사용
 */
function moveFirstPersonCameraAll(userObject, camera, controls){
	userObject.body.angularDamping = 1; //계속 회전 방지

	var ve = userObject.getPosition(); //현재 팩맨 중심좌표
	var direct = new THREE.Vector3();
	camera.getWorldDirection(direct); // 카메라가 바라보는 방향 받아오기

	camera.position.set(ve.x - 10 * direct.x, pacman_height, ve.z - 10 * direct.z); //카메라 셋팅
	controls.target.set(ve.x, pacman_height, ve.z); //타겟 설정 - 얘를 중심으로 공전

	userObject.body.angularDamping = 1; //계속 회전 방지
}


/**
 * orbitcontrol을 3인칭 시점(2D)으로 사용
 */
function move2DCameraAll(camera, controls){
	//1인칭 시점일 때만 작동함
	camera.position.set(0, pacman_height2D, 0); //카메라 셋팅
	controls.target.set(0, 0, 0); //타겟 설정 - 얘를 중심으로 공전
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
	createNewObject(scene, world, name, new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshDepthMaterial ({ color: sur_color})), boxBody);
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
		collisionFilterMask: 2 | 4 | 8 | 32, // 2번 바닥 4번 벽 8번 고스트 시작 벽 16 아이템 32 텔레포트 바닥
		position: new CANNON.Vec3(x, y, z),
		mass: 3,
		// type: 4444
	});

	loader.load("./models/pacman_ghost_blue/scene.gltf", (gltf) => {
		console.log("LOAD");
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
	var circleMesh = new THREE.Mesh(new THREE.SphereGeometry(40, 32, 16), new THREE.MeshBasicMaterial({ color: 0xffd400 }))
	var circleBody = new CANNON.Body({ 
		shape: new CANNON.Sphere(40),
		collisionFilterGroup: 128,
	});

	var circleName = 'circle' + circleNumber;
	
	createNewObject(scene, world, circleName, circleMesh, circleBody);
	object[circleName].position(posx, posy, posz);
	circleArr.push(circleNumber);
}

/**
 * 동글이와 충돌 여부 확인 - Step (1)
 * @param {worldObj} pacman 
 * @param {worldObj} circle
 */
 export function circleCollisionCheck(pacman, circle) {
	var distance = Math.pow((Math.pow((pacman.body.position.x - circle.body.position.x), 2) + Math.pow((pacman.body.position.z - circle.body.position.z), 2)), 1/2)

	if (distance <= 200 + 60) // distance <= pacmanRadius + itemRadius (범위 좀 더 넓게)
		return true;
	else
		return false;
}

/**
 * 먹은 동글이 삭제 - Step (2)
 * @param {THREE.Scene} scene 
 * @param {CANNON.World} world 
 * @param {worldObj} object 
 */
 export function deleteCircle(scene, world, object) {
	score += 10;
	document.getElementById("scoreNum").innerHTML = "SCORE " + score.toString();

	world.removeBody(object.body);
	scene.remove(object.mesh);

	for (var i = 0; i < circleArr.length; i++) {
		if (circleArr[i] == object.objName.substr(6)) {
			circleArr.splice(i, 1);
		}
	}
}

/**
 * Eat Circle Final
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world 
 * @param {worldObj} userObject 
 */
 export function eatCircle(scene, world, userObject) {
	for (var i = 0; i < circleArr.length; i++) {
		var circleName = 'circle' + circleArr[i];
		var collisionResult = circleCollisionCheck(userObject, object[circleName]); 

		if (collisionResult == true) {
			deleteCircle(scene, world, object[circleName]);
			console.log(circleArr);
		}
	}
}

/**
 * 오디오 재생
 * @param {Audio Name} audioName 
 */
export function playAudio(audioName) {
	audioList[audioName].play();
}

/**
 * Update Physical Engine 
 */
export function updatePhysics(world, camera, controls) {
	// Step the physics world
	world.step(timeStep);

	//카메라 설정
	selectCameraType(object['pacman'], camera, controls)

	Object.keys(object).forEach(function(key) {
		object[key].update();
	});
}