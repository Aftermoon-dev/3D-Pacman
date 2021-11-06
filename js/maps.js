/**
 * 3D Pacman - Maps
 * 2021-2 Computer Graphics Term Project
 * Dept. of Software, Gachon Univ.
 */

/**
 * 바닥 collisionFilterGroup 2
 * 벽 collisionFilterGroup 4
 * 바닥 / 벽 mass 0
 */

import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/optimized/three.js';
import * as Utils from './utils.js';

/**
 * Gachon Map 초기화
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world 
 * @param {OrbitControls} controls
 * @param {PerspectiveCamera} camera

 */
export function initGachonMap(scene, world, controls, camera) {
	document.getElementById("loading").style.visibility = "visible";

    // Scene 리셋
    Utils.resetScene(scene);

	const hlight = new THREE.AmbientLight(0x404040, 100);
	scene.add(hlight);

	// 화면에 Stage 글자 변경
	document.getElementById("stageNum").innerHTML="STAGE 1";

    // 바닥 만들기
	var groundBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(10000 / 2, 500 / 2, 8000 / 2)),
		collisionFilterGroup: 2,
		collisionFilterMask: 1 | 64,
		mass: 0
	});
	Utils.createNewObject(scene, world, 'ground', new THREE.Mesh(new THREE.BoxGeometry(10000, 500, 8000), new THREE.MeshBasicMaterial({ color: 0x808080})), groundBody);
	Utils.object['ground'].position(0, -200, 0);

	/** 벽 만들기 **/

	// 맵 감싸는 벽
	Utils.createWallObject(scene, world, 'wall6', 0x1200ff, 100, 800, 10000);
	Utils.object['wall6'].position(0, 0, -4000);
	Utils.object['wall6'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall9', 0x1200ff, 100, 800, 10000);
	Utils.object['wall9'].position(0, 0, 4000);
	Utils.object['wall9'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall42', 0x1200ff, 100, 800, 8000);
	Utils.object['wall42'].position(5000, 0, 0);
	Utils.createWallObject(scene, world, 'wall43', 0x1200ff, 100, 800, 8000);
	Utils.object['wall43'].position(-5000, 0, 0);

	// C (고스트 시작 위치)
	Utils.createWallObject(scene, world, 'wall1', 0xFFFFFF, 100, 800, 1200);
	Utils.object['wall1'].position(0, 0, -800);
	Utils.object['wall1'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall2', 0xFFFFFF, 100, 800, 1600);
	Utils.object['wall2'].position(-550, 0, 0);
	Utils.createWallObject(scene, world, 'wall3', 0xFFFFFF, 100, 800, 1200);
	Utils.object['wall3'].position(0, 0, 800);
	Utils.object['wall3'].rotateY(90);
	// Utils.createStartWallObject(scene, world, 'ghost_wall', 100, 600, 1600); // Ghost 출발 벽
	// Utils.object['ghost_wall'].position(550, 0, 0);

	// 위 Teleport 벽
	Utils.createWallObject(scene, world, 'wall4', 0x1200ff, 600, 800, 1800);
	Utils.object['wall4'].position(-600, 0, -3100);
	Utils.createWallObject(scene, world, 'wall5', 0x1200ff, 600, 800, 1800);
	Utils.object['wall5'].position(600, 0, -3100);
	Utils.makeBox(scene, world, 'tpnorth', 600, 50, 600, 0x008000, 32, 0);
	Utils.object['tpnorth'].position(0, 50, -3700);

	// 아래 Teleport 벽
	Utils.createWallObject(scene, world, 'wall7', 0x1200ff, 600, 800, 1800);
	Utils.object['wall7'].position(-600, 0, 3100);
	Utils.createWallObject(scene, world, 'wall8', 0x1200ff, 600, 800, 1800);
	Utils.object['wall8'].position(600, 0, 3100);
	Utils.makeBox(scene, world, 'tpsouth', 600, 50, 600, 0x008000, 32, 0);
	Utils.object['tpsouth'].position(0, 50, 3700);

	// 위 2칸 블록 왼쪽
	Utils.createWallObject(scene, world, 'wall10', 0x1200ff, 600, 800, 1200);
	Utils.object['wall10'].position(-1800, 0, -2800);
	Utils.createWallObject(scene, world, 'wall11', 0x1200ff, 600, 800, 1200);
	Utils.object['wall11'].position(1800, 0, -2800);
	Utils.createWallObject(scene, world, 'wall12', 0x1200ff, 600, 800, 1200);
	Utils.object['wall12'].position(-1800, 0, 2800);
	Utils.createWallObject(scene, world, 'wall13', 0x1200ff, 600, 800, 1200);
	Utils.object['wall13'].position(1800, 0, 2800);

	// 오른쪽 아래 긴 벽 
	Utils.createWallObject(scene, world, 'wall14', 0x1200ff, 200, 800, 1800);
	Utils.object['wall14'].position(1200, 0, 1500);
	Utils.object['wall14'].rotateY(90);

	// 왼쪽 아래 긴 벽 
	Utils.createWallObject(scene, world, 'wall15', 0x1200ff, 200, 800, 1800);
	Utils.object['wall15'].position(-1200, 0, 1500);
	Utils.object['wall15'].rotateY(90);

	// 오른쪽 위 긴 벽
	Utils.createWallObject(scene, world, 'wall16', 0x1200ff, 200, 800, 1800);
	Utils.object['wall16'].position(1200, 0, -1500);
	Utils.object['wall16'].rotateY(90);

	// 왼쪽 위 긴 벽
	Utils.createWallObject(scene, world, 'wall17', 0x1200ff, 200, 800, 1800);
	Utils.object['wall17'].position(-1200, 0, -1500);
	Utils.object['wall17'].rotateY(90);

	// 시작지점 왼쪽
	Utils.createWallObject(scene, world, 'wall18', 0x1200ff, 200, 800, 1800);
	Utils.object['wall18'].position(-2000, 0, 0);
	Utils.createWallObject(scene, world, 'wall20', 0x1200ff, 200, 800, 800);
	Utils.object['wall20'].position(-1500, 0, 0);
	Utils.object['wall20'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall43', 0x1200ff, 200, 800, 800);
	Utils.object['wall43'].position(-1200, 0, 500);

	// 시작지점 오른쪽
	Utils.createWallObject(scene, world, 'wall21', 0x1200ff, 200, 800, 800);
	Utils.object['wall21'].position(1500, 0, 0);
	Utils.object['wall21'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall19', 0x1200ff, 200, 800, 1800);
	Utils.object['wall19'].position(2000, 0, 0);
	Utils.createWallObject(scene, world, 'wall42', 0x1200ff, 200, 800, 800);
	Utils.object['wall42'].position(1200, 0, -500);

	// 왼쪽 사각형
	Utils.createWallObject(scene, world, 'wall22', 0x1200ff, 1800, 800, 1500);
	Utils.object['wall22'].position(-3500, 0, 0);
	Utils.object['wall22'].rotateY(90);

	// O
	Utils.createWallObject(scene, world, 'wall23', 0x00b9f2, 1800, 800, 200);
	Utils.object['wall23'].position(2800, 0, 0);
	Utils.object['wall23'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall24', 0x00b9f2, 1600, 800, 200);
	Utils.object['wall24'].position(3500, 0, -800);
	Utils.createWallObject(scene, world, 'wall25', 0x00b9f2, 1800, 800, 200);
	Utils.object['wall25'].position(4300, 0, 0);
	Utils.object['wall25'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall26', 0x00b9f2, 1600, 800, 200);
	Utils.object['wall26'].position(3500, 0, 800);

	// G
	Utils.createWallObject(scene, world, 'wall27', 0x004e96, 2000, 800, 200);
	Utils.object['wall27'].position(-4200, 0, -2400);
	Utils.object['wall27'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall28', 0x004e96, 1400, 800, 200);
	Utils.object['wall28'].position(-3400, 0, -3300);
	Utils.createWallObject(scene, world, 'wall29', 0x004e96, 1400, 800, 200);
	Utils.object['wall29'].position(-3400, 0, -1500);
	Utils.createWallObject(scene, world, 'wall30', 0x004e96, 900, 800, 200);
	Utils.object['wall30'].position(-2800, 0, -2000);
	Utils.object['wall30'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall31', 0x004e96, 1000, 800, 200);
	Utils.object['wall31'].position(-3200, 0, -2400);

	// A
	Utils.createWallObject(scene, world, 'wall32', 0x004e96, 2000, 800, 200);
	Utils.object['wall32'].position(-4200, 0, 2400);
	Utils.object['wall32'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall33', 0x004e96, 2000, 800, 200);
	Utils.object['wall33'].position(-2900, 0, 2400);
	Utils.object['wall33'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall34', 0x004e96, 1400, 800, 200);
	Utils.object['wall34'].position(-3500, 0, 1500);
	Utils.createWallObject(scene, world, 'wall35', 0x004e96, 1400, 800, 200);
	Utils.object['wall35'].position(-3500, 0, 2400);

	// H
	Utils.createWallObject(scene, world, 'wall36', 0xfcaf16, 1500, 800, 200);
	Utils.object['wall36'].position(3500, 0, -2400);
	Utils.createWallObject(scene, world, 'wall37', 0xfcaf16, 2000, 800, 200);
	Utils.object['wall37'].position(2800, 0, -2400);
	Utils.object['wall37'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall38', 0xfcaf16, 2000, 800, 200);
	Utils.object['wall38'].position(4300, 0, -2400);
	Utils.object['wall38'].rotateY(90);

	// N
	Utils.createWallObject(scene, world, 'wall39', 0x80c341, 2000, 800, 200);
	Utils.object['wall39'].position(2800, 0, 2400);
	Utils.object['wall39'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall40', 0x80c341, 2000, 800, 200);
	Utils.object['wall40'].position(4300, 0, 2400);
	Utils.object['wall40'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall41', 0x80c341, 2300, 800, 200);
	Utils.object['wall41'].position(3550, 0, 2400);
	Utils.object['wall41'].rotateY(-60);

	// 아이템 만들기
	// random int 계산식 맵 크기에 따라서 나중에 수정해주기!!!
	// Math.random() * (맵크기 / 간격 + 1) * (간격 얼마나 줄건지) - (맵크기 / 2)

	// 아이템 종류
	//  -> 방향키 반대로 (빨강) / 속도 빨라지거나 느려지게 하는 것 (주황) / 팩맨 크기 커지는 것 (연두)
	//  -> 유령 먹을 수 있게 되는 것 (하늘) / 3D -> 2D 시야 변경 (분홍)

	Utils.createItemObject(scene, world, 'item1', 0xff5b5b, 101);
	Utils.object['item1'].position(Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500); 

	Utils.createItemObject(scene, world, 'item2', 0xffc000, 102);
	Utils.object['item2'].position(Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500);
	
	Utils.createItemObject(scene, world, 'item3', 0x92d050, 103);
	Utils.object['item3'].position(Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500);
	
	Utils.createItemObject(scene, world, 'item4', 0x00b0f0, 104);
	Utils.object['item4'].position(Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500);
	
	Utils.createItemObject(scene, world, 'item5', 0xFF99CC, 105);
	Utils.object['item5'].position(Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500);

	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500, 1);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500, 2);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500, 3);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500, 4);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500, 5);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500, 6);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500, 7);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500, 8);

	// 텔레포트 구현
	const obj1Pos = Utils.object['tpnorth'].body.position;
	const obj2Pos = Utils.object['tpsouth'].body.position;

	Utils.object['tpnorth'].body.addEventListener("collide", function(e) {
		if (e.body.type == 1) {
			Utils.playAudio('teleport');
			Utils.object['pacman'].position(obj2Pos.x, 230, obj2Pos.z - 800);
		}
	});

	Utils.object['tpsouth'].body.addEventListener("collide", function(e) {
		if (e.body.type == 1) {
			Utils.playAudio('teleport');
			Utils.object['pacman'].position(obj1Pos.x, 230, obj1Pos.z + 800);
		}
	});

	// 팩맨
	Utils.createPacman(scene, world, 600, 230, 0, 180);
	Utils.setUserEvent(scene, world, Utils.object['pacman'], controls, camera);
	
	// 고스트
	Utils.createGhost(scene, world, 'ghost1', 0, 450, 0, 0xFFFF00);
	
	document.getElementById("loading").style.visibility = "hidden";
}	

export function initBasicMap(scene, world, controls, camera) {
	document.getElementById("loading").style.visibility = "visible";

	// Scene 리셋
    Utils.resetScene(scene);

	// 바닥과 벽 택스쳐 가져오기
	var textureLoader = new THREE.TextureLoader();
	var texture_wall = textureLoader.load('textures/wall_texture_01.jpg');
    var texture_ground = textureLoader.load('textures/ground_texture_02.jpg');
	const ground_material = new THREE.MeshBasicMaterial({
		map: texture_ground,
	});
	const wall_material = new THREE.MeshBasicMaterial({
		map: texture_wall,
	});

	document.getElementById("stageNum").innerHTML="STAGE 2";

    // 바닥 만들기
	var groundBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(10000 / 2, 5 / 2, 8000 / 2)),
		collisionFilterGroup: 2,
		mass: 0
	});
	Utils.createNewObject(scene, world, 'ground', new THREE.Mesh(new THREE.BoxGeometry(7000, 5, 8000), ground_material), groundBody);
	Utils.object['ground'].position(0, -200, 0);

	/** 벽 만들기 **/

	// C (고스트 시작 위치)
	Utils.createWallObject(scene, world, 'wall1', 0xFFFFFF, 100, 800, 1600);
	Utils.object['wall1'].position(0, 0, -400); // x,y,z (오른쪽으로 얼마나 갈건지(음수면 왼쪽),위로 얼마나 올라갈건지(공중),하단으로 얼마나 갈건지(음수면 상단으로))
	Utils.object['wall1'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall2', 0xFFFFFF, 100, 800, 800);
	Utils.object['wall2'].position(-750, 0, 0);
	Utils.createWallObject(scene, world, 'wall3', 0xFFFFFF, 100, 800, 1600);
	Utils.object['wall3'].position(0, 0, 400);
	Utils.object['wall3'].rotateY(90);
	// Utils.createStartWallObject(scene, world, 'ghost_wall', 100, 600, 800); // Ghost 출발 벽
	// Utils.object['ghost_wall'].position(750, 0, 0);

	// 아래 튀어나온 Teleport 벽
	Utils.createWallObject(scene, world, 'wall4', 0x333366, 800, 800, 1200);
	Utils.object['wall4'].position(0, 0, 3400); // x,y,z 

	// 위 튀어나온 Teleport 벽
	Utils.createWallObject(scene, world, 'wall5', 0x333366, 800, 800, 1200);
	Utils.object['wall5'].position(0, 0, -3400); // x,y,z 
	
	// 왼쪽 하단 Teleport 벽
	Utils.createWallObject(scene, world, 'wall6', 0x333366, 2300, 800, 300);
	Utils.object['wall6'].position(-2350, 0, 2950); // x,y,z 

	// 오른쪽 상단 Teleport 벽
	Utils.createWallObject(scene, world, 'wall7', 0x333366, 2300, 800, 300);
	Utils.object['wall7'].position(2350, 0, -2950); // x,y,z 

	// 고스트 벽 바로 왼쪽 벽
	Utils.createWallObject(scene, world, 'wall8', 0x330033, 200, 800, 1000);
	Utils.object['wall8'].position(-1600, 0, 0); // x,y,z 

	// 고스트 벽 바로 오른쪽 벽
	Utils.createWallObject(scene, world, 'wall9', 0x330033, 200, 800, 1000);
	Utils.object['wall9'].position(1600, 0, 0); // x,y,z 

	// wall 8의 왼쪽 벽
	Utils.createWallObject(scene, world, 'wall10', 0x330033, 200, 800, 2800);
	Utils.object['wall10'].position(-2500, 0, 0); // x,y,z 

	// wall 9의 오른쪽 벽
	Utils.createWallObject(scene, world, 'wall11', 0x330033, 200, 800, 2800);
	Utils.object['wall11'].position(2500, 0, 0); // x,y,z 

	// wall 12
	Utils.createWallObject(scene, world, 'wall12', 0x330033, 100, 800, 1600);
	Utils.object['wall12'].position(-1800, 0, -2850); // x,y,z 
	Utils.object['wall12'].rotateY(90);
	// wall 13
	Utils.createWallObject(scene, world, 'wall13', 0x330033, 100, 800, 1600);
	Utils.object['wall13'].position(1800, 0, 2850); // x,y,z 
	Utils.object['wall13'].rotateY(90);

	// wall 14
	Utils.createWallObject(scene, world, 'wall14', 0x330033, 100, 800, 1600);
	Utils.object['wall14'].position(-1800, 0, -2100); // x,y,z 
	Utils.object['wall14'].rotateY(90);
	// wall 15
	Utils.createWallObject(scene, world, 'wall15', 0x330033, 100, 800, 1600);
	Utils.object['wall15'].position(1800, 0, 2100); // x,y,z 
	Utils.object['wall15'].rotateY(90);
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// wall 16
	Utils.createWallObject(scene, world, 'wall16', 0x330033, 200, 800, 1000);
	Utils.object['wall16'].position(-1600, 0, -1600); // x,y,z 
	// wall 17
	Utils.createWallObject(scene, world, 'wall17', 0x330033, 200, 800, 1000);
	Utils.object['wall17'].position(1600, 0, 1600); // x,y,z 

	// wall 18
	Utils.createWallObject(scene, world, 'wall18', 0x330033, 100, 800, 2800);
	Utils.object['wall18'].position(1200, 0, -2100); // x,y,z 
	Utils.object['wall18'].rotateY(90);
	// wall 19
	Utils.createWallObject(scene, world, 'wall19', 0x330033, 100, 800, 2800);
	Utils.object['wall19'].position(-1200, 0, 2100); // x,y,z 
	Utils.object['wall19'].rotateY(90);

	// wall 20
	Utils.createWallObject(scene, world, 'wall20', 0x330033, 100, 800, 1100);
	Utils.object['wall20'].position(1100, 0, -1150); // x,y,z 
	Utils.object['wall20'].rotateY(90);
	// wall 21
	Utils.createWallObject(scene, world, 'wall21', 0x330033, 100, 800, 1100);
	Utils.object['wall21'].position(-1100, 0, 1150); // x,y,z 
	Utils.object['wall21'].rotateY(90);

	// wall 22
	Utils.createWallObject(scene, world, 'wall22', 0x330033, 200, 800, 1000);
	Utils.object['wall22'].position(-100, 0, -1600); // x,y,z 
	// wall 23
	Utils.createWallObject(scene, world, 'wall23', 0x330033, 200, 800, 1000);
	Utils.object['wall23'].position(100, 0, 1600); // x,y,z 

	// 맵 감싸는 벽
	Utils.createWallObjectWithTexture(scene, world, 'wall24', 0xFF0033, 300, 800, 7800, wall_material);
	Utils.object['wall24'].position(0, 0, -4000);
	Utils.object['wall24'].rotateY(90);
	Utils.createWallObjectWithTexture(scene, world, 'wall25', 0xFF0033, 300, 800, 7800,wall_material);
	Utils.object['wall25'].position(0, 0, 4000);
	Utils.object['wall25'].rotateY(90);
	Utils.createWallObjectWithTexture(scene, world, 'wall26', 0xFF0033, 300, 800, 7800,wall_material);
	Utils.object['wall26'].position(3500, 0, 0);
	Utils.createWallObjectWithTexture(scene, world, 'wall27', 0xFF0033, 300, 800, 7800,wall_material);
	Utils.object['wall27'].position(-3500, 0, 0);

	// 팩맨
	Utils.createPacman(scene, world, 0, 230, 0, 180);
	Utils.setUserEvent(scene, world, Utils.object['pacman'], controls, camera);

	Utils.createItemObject(scene, world, 'item1', 0xff5b5b, 101);
	Utils.object['item1'].position(Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500); 

	Utils.createItemObject(scene, world, 'item2', 0xffc000, 102);
	Utils.object['item2'].position(Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500);
	
	Utils.createItemObject(scene, world, 'item3', 0x92d050, 103);
	Utils.object['item3'].position(Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500);
	
	Utils.createItemObject(scene, world, 'item4', 0x00b0f0, 104);
	Utils.object['item4'].position(Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500);
	
	Utils.createItemObject(scene, world, 'item5', 0xFF99CC, 105);
	Utils.object['item5'].position(Math.floor(Math.random() * 31) * 100 - 1500, 180, Math.floor(Math.random() * 31) * 100 - 1500);

	document.getElementById("loading").style.visibility = "hidden";
}	