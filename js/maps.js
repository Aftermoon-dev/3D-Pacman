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
	// Scene 리셋
	Utils.resetScene(scene, world);

	// 화면에 Stage 글자 변경
	Utils.updateStage(1);

	// 맵 배경 택스쳐 이미지
	
	const loader = new THREE.CubeTextureLoader();
	const texture = loader.load([
		'resources/cubemaps/map1/cloud_px.png',
		'resources/cubemaps/map1/cloud_nx.png',
		'resources/cubemaps/map1/cloud_py.png',
		'resources/cubemaps/map1/cloud_ny.png',
		'resources/cubemaps/map1/cloud_pz.png',
		'resources/cubemaps/map1/cloud_nz.png',
	]);
	scene.background = texture;
	
	// 바닥 만들기
	var groundBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(10000 / 2, 500 / 2, 8000 / 2)),
		collisionFilterGroup: 2,
		collisionFilterMask: 1 | 64,
		mass: 0
	});
	Utils.createNewObject(scene, world, 'ground', new THREE.Mesh(new THREE.BoxGeometry(10000, 500, 8000), new THREE.MeshBasicMaterial({ color: 0x808080 })), groundBody);
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
	Utils.textureLoader.load('resources/textures/gachonlogo_texture.jpg', (texture) => {
		const gachonMaterial = new THREE.MeshPhongMaterial({
			map: texture,
		});

		var wallBody = new CANNON.Body({
			shape: new CANNON.Box(new CANNON.Vec3(1800 / 2, 800 / 2, 1500 / 2)),
			collisionFilterGroup: 4,
			mass: 0,
			type: 1000
		});
	
		let leftSquareMaterialArray = [];
		leftSquareMaterialArray.push(new THREE.MeshPhongMaterial({ color: 0x00b9f2 }));
		leftSquareMaterialArray.push(new THREE.MeshPhongMaterial({ color: 0x00b9f2 }));
		leftSquareMaterialArray.push(gachonMaterial);
		leftSquareMaterialArray.push(new THREE.MeshPhongMaterial({ color: 0x00b9f2 }));
		leftSquareMaterialArray.push(new THREE.MeshPhongMaterial({ color: 0x00b9f2 }));
		leftSquareMaterialArray.push(new THREE.MeshPhongMaterial({ color: 0x00b9f2 }));
	
		Utils.createNewObject(scene, world, 'wall22', new THREE.Mesh(new THREE.BoxGeometry(1800, 800, 1500), leftSquareMaterialArray), wallBody);
		Utils.object['wall22'].position(-3500, 0, 0);
		Utils.object['wall22'].rotateY(90);
	});

	// O
	Utils.createWallObject(scene, world, 'wall23', 0x00b9f2, 1800, 800, 200);
	Utils.object['wall23'].position(2800, 0, 0);
	Utils.object['wall23'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall24', 0x00b9f2, 500, 800, 200);
	Utils.object['wall24'].position(3100, 0, -800);
	Utils.createWallObject(scene, world, 'wall42', 0x00b9f2, 500, 800, 200);
	Utils.object['wall42'].position(4000, 0, -800);

	Utils.createWallObject(scene, world, 'wall25', 0x00b9f2, 1800, 800, 200);
	Utils.object['wall25'].position(4300, 0, 0);
	Utils.object['wall25'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall26', 0x00b9f2, 500, 800, 200);
	Utils.object['wall26'].position(3100, 0, 800);
	Utils.createWallObject(scene, world, 'wall43', 0x00b9f2, 500, 800, 200);
	Utils.object['wall43'].position(4000, 0, 800);

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

	/*
	Utils.createItemObject(scene, world, 'item1', 0xff5b5b, 101);
	Utils.object['item1'].position(Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500); 

	Utils.createItemObject(scene, world, 'item2', 0xffc000, 102);
	Utils.object['item2'].position(Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500);
	
	Utils.createItemObject(scene, world, 'item3', 0x92d050, 103);
	Utils.object['item3'].position(Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500);
	
	Utils.createItemObject(scene, world, 'item4', 0x00b0f0, 104);
	Utils.object['item4'].position(Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500);
	
	Utils.createItemObject(scene, world, 'item5', 0xFF99CC, 105);
	Utils.object['item5'].position(Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500);
	*/
	
	// 텔레포트 구현
	const obj1Pos = Utils.object['tpnorth'].body.position;
	const obj2Pos = Utils.object['tpsouth'].body.position;

	Utils.object['tpnorth'].body.addEventListener("collide", function (e) {
		if (e.body.type == 1) {
			Utils.stopAudio('teleport');
			Utils.playAudio('teleport');
			Utils.object['pacman'].position(obj2Pos.x, 230, obj2Pos.z - 800);
		}
	});

	Utils.object['tpsouth'].body.addEventListener("collide", function (e) {
		if (e.body.type == 1) {
			Utils.stopAudio('teleport');
			Utils.playAudio('teleport');
			Utils.object['pacman'].position(obj1Pos.x, 230, obj1Pos.z + 800);
		}
	});
	
	// 팩맨
	Utils.createPacman(scene, world, 600, 230, 0, 180);
	Utils.setUserEvent(scene, world, controls, camera);

	// 고스트
	Utils.createGhost(scene, world, 'ghost1', 0, 450, 0, 0xFFFF00);

	// 동글이들
	Utils.createCircle(scene, world, -4625, 140, -3675, 1);
	Utils.createCircle(scene, world, -4625, 140, -3375, 2);
	Utils.createCircle(scene, world, -4625, 140, -2975, 3);
	Utils.createCircle(scene, world, -4625, 140, -2625, 4);
	Utils.createCircle(scene, world, -4625, 140, -2275, 5);
	Utils.createCircle(scene, world, -4625, 140, -1925, 6);
	Utils.createCircle(scene, world, -4625, 140, -1575, 7);
	Utils.createCircle(scene, world, -4625, 140, -1225, 8);
	Utils.createCircle(scene, world, -4625, 140, -875, 9);
	Utils.createCircle(scene, world, -4625, 140, -525, 10);
	Utils.createCircle(scene, world, -4625, 140, -175, 11);

	Utils.createCircle(scene, world, -4625, 140, 175, 12);
	Utils.createCircle(scene, world, -4625, 140, 525, 13);
	Utils.createCircle(scene, world, -4625, 140, 875, 14);
	Utils.createCircle(scene, world, -4625, 140, 1225, 15);
	Utils.createCircle(scene, world, -4625, 140, 1575, 16);
	Utils.createCircle(scene, world, -4625, 140, 1925, 17);
	Utils.createCircle(scene, world, -4625, 140, 2275, 18);
	Utils.createCircle(scene, world, -4625, 140, 2625, 19);
	Utils.createCircle(scene, world, -4625, 140, 2975, 20);
	Utils.createCircle(scene, world, -4625, 140, 3375, 21);
	Utils.createCircle(scene, world, -4625, 140, 3675, 22);
	
	Utils.createCircle(scene, world, 4675, 140, -3375, 23);
	Utils.createCircle(scene, world, 4675, 140, -2975, 24);
	Utils.createCircle(scene, world, 4675, 140, -2625, 25);
	Utils.createCircle(scene, world, 4675, 140, -2275, 26);
	Utils.createCircle(scene, world, 4675, 140, -1925, 27);
	Utils.createCircle(scene, world, 4675, 140, -1575, 28);
	Utils.createCircle(scene, world, 4675, 140, -1225, 29);
	Utils.createCircle(scene, world, 4675, 140, -875, 30);
	Utils.createCircle(scene, world, 4675, 140, -525, 31);
	Utils.createCircle(scene, world, 4675, 140, -175, 32);

	Utils.createCircle(scene, world, 4675, 140, 175, 33);
	Utils.createCircle(scene, world, 4675, 140, 525, 34);
	Utils.createCircle(scene, world, 4675, 140, 875, 35);
	Utils.createCircle(scene, world, 4675, 140, 1225, 36);
	Utils.createCircle(scene, world, 4675, 140, 1575, 37);
	Utils.createCircle(scene, world, 4675, 140, 1925, 38);
	Utils.createCircle(scene, world, 4675, 140, 2275, 39);
	Utils.createCircle(scene, world, 4675, 140, 2625, 40);
	Utils.createCircle(scene, world, 4675, 140, 2975, 41);
	Utils.createCircle(scene, world, 4675, 140, 3375, 42);
	
	Utils.createCircle(scene, world, -2400, 140, -3375, 43);
	Utils.createCircle(scene, world, -2400, 140, -2975, 44);
	Utils.createCircle(scene, world, -2400, 140, -2625, 45);
	Utils.createCircle(scene, world, -2400, 140, -2275, 46);
	Utils.createCircle(scene, world, -2400, 140, -1925, 47);
	Utils.createCircle(scene, world, -2400, 140, -1575, 48);
	Utils.createCircle(scene, world, -2400, 140, -875, 49);
	Utils.createCircle(scene, world, -2400, 140, -525, 50);
	Utils.createCircle(scene, world, -2400, 140, -175, 51);

	Utils.createCircle(scene, world, -2400, 140, 175, 52);
	Utils.createCircle(scene, world, -2400, 140, 525, 53);
	Utils.createCircle(scene, world, -2400, 140, 875, 54);
	Utils.createCircle(scene, world, -2400, 140, 1575, 55);
	Utils.createCircle(scene, world, -2400, 140, 1925, 56);
	Utils.createCircle(scene, world, -2400, 140, 2275, 57);
	Utils.createCircle(scene, world, -2400, 140, 2625, 58);
	Utils.createCircle(scene, world, -2400, 140, 2975, 59);
	Utils.createCircle(scene, world, -2400, 140, 3375, 60);
	
	Utils.createCircle(scene, world, 2400, 140, -3375, 61);
	Utils.createCircle(scene, world, 2400, 140, -2975, 62);
	Utils.createCircle(scene, world, 2400, 140, -2625, 63);
	Utils.createCircle(scene, world, 2400, 140, -2275, 64);
	Utils.createCircle(scene, world, 2400, 140, -1925, 65);
	Utils.createCircle(scene, world, 2400, 140, -1575, 66);
	Utils.createCircle(scene, world, 2400, 140, -875, 67);
	Utils.createCircle(scene, world, 2400, 140, -525, 68);
	Utils.createCircle(scene, world, 2400, 140, -175, 69);

	Utils.createCircle(scene, world, 2400, 140, 175, 70);
	Utils.createCircle(scene, world, 2400, 140, 525, 71);
	Utils.createCircle(scene, world, 2400, 140, 875, 72);
	Utils.createCircle(scene, world, 2400, 140, 1575, 73);
	Utils.createCircle(scene, world, 2400, 140, 1925, 74);
	Utils.createCircle(scene, world, 2400, 140, 2275, 75);
	Utils.createCircle(scene, world, 2400, 140, 2625, 76);
	Utils.createCircle(scene, world, 2400, 140, 2975, 77);
	Utils.createCircle(scene, world, 2400, 140, 3375, 78);
	
	Utils.createCircle(scene, world, -4325, 140, 1225, 79);
	Utils.createCircle(scene, world, -4025, 140, 1225, 80);
	Utils.createCircle(scene, world, -3725, 140, 1225, 81);
	Utils.createCircle(scene, world, -3425, 140, 1225, 82);
	Utils.createCircle(scene, world, -3125, 140, 1225, 83);
	Utils.createCircle(scene, world, -2825, 140, 1225, 84);
	Utils.createCircle(scene, world, -2525, 140, 1225, 85);
	Utils.createCircle(scene, world, -2225, 140, 1225, 86);
	Utils.createCircle(scene, world, -1925, 140, 1225, 85);
	Utils.createCircle(scene, world, -1625, 140, 1225, 86);

	Utils.createCircle(scene, world, -1625, 140, 1225, 87);
	Utils.createCircle(scene, world, -1625, 140, 925, 88);
	Utils.createCircle(scene, world, -1625, 140, 625, 89);
	Utils.createCircle(scene, world, -1625, 140, 325, 90);

	Utils.createCircle(scene, world, -1625, 140, -325, 91);
	Utils.createCircle(scene, world, -1625, 140, -575, 92);
	Utils.createCircle(scene, world, -1625, 140, -825, 93);
	Utils.createCircle(scene, world, -1275, 140, -325, 94);
	Utils.createCircle(scene, world, -1275, 140, -575, 95);
	Utils.createCircle(scene, world, -1275, 140, -825, 96);
	
	Utils.createCircle(scene, world, 1625, 140, -925, 97);
	Utils.createCircle(scene, world, 1625, 140, -625, 98);
	Utils.createCircle(scene, world, 1625, 140, -325, 99);

	Utils.createCircle(scene, world, 1625, 140, 325, 100);
	Utils.createCircle(scene, world, 1625, 140, 575, 101);
	Utils.createCircle(scene, world, 1625, 140, 825, 102);
	Utils.createCircle(scene, world, 1275, 140, 325, 103);
	Utils.createCircle(scene, world, 1275, 140, 575, 104);
	Utils.createCircle(scene, world, 1275, 140, 825, 105);

	Utils.createCircle(scene, world, -1325, 140, 1225, 106);
	Utils.createCircle(scene, world, -1025, 140, 1225, 107);
	Utils.createCircle(scene, world, -725, 140, 1225, 108);
	Utils.createCircle(scene, world, -425, 140, 1225, 109);
	Utils.createCircle(scene, world, -125, 140, 1225, 110);
	Utils.createCircle(scene, world, 175, 140, 1225, 111);
	Utils.createCircle(scene, world, 475, 140, 1225, 112);
	Utils.createCircle(scene, world, 775, 140, 1225, 113);
	Utils.createCircle(scene, world, 1075, 140, 1225, 114);
	Utils.createCircle(scene, world, 1375, 140, 1225, 115);
	
	Utils.createCircle(scene, world, 1675, 140, 1225, 116);
	Utils.createCircle(scene, world, 1975, 140, 1225, 117);
	Utils.createCircle(scene, world, 2275, 140, 1225, 118);
	Utils.createCircle(scene, world, 2575, 140, 1225, 119);
	Utils.createCircle(scene, world, 2875, 140, 1225, 120);
	Utils.createCircle(scene, world, 3175, 140, 1225, 121);
	Utils.createCircle(scene, world, 3475, 140, 1225, 122);
	Utils.createCircle(scene, world, 3775, 140, 1225, 123);
	Utils.createCircle(scene, world, 4075, 140, 1225, 124);
	Utils.createCircle(scene, world, 4375, 140, 1225, 125);
	Utils.createCircle(scene, world, 4675, 140, 1225, 126);
	
	Utils.createCircle(scene, world, -4325, 140, -1125, 127);
	Utils.createCircle(scene, world, -4025, 140, -1125, 128);
	Utils.createCircle(scene, world, -3725, 140, -1125, 129);
	Utils.createCircle(scene, world, -3425, 140, -1125, 130);
	Utils.createCircle(scene, world, -3125, 140, -1125, 131);
	Utils.createCircle(scene, world, -2825, 140, -1125, 132);
	Utils.createCircle(scene, world, -2525, 140, -1125, 133);
	Utils.createCircle(scene, world, -2225, 140, -1125, 134);
	Utils.createCircle(scene, world, -1925, 140, -1125, 135);
	Utils.createCircle(scene, world, -1625, 140, -1125, 136);
	
	Utils.createCircle(scene, world, -4300, 140, 3675, 137);
	Utils.createCircle(scene, world, -4000, 140, 3675, 138);
	Utils.createCircle(scene, world, -3700, 140, 3675, 139);
	Utils.createCircle(scene, world, -3400, 140, 3675, 140);
	Utils.createCircle(scene, world, -3100, 140, 3675, 141);
	Utils.createCircle(scene, world, -2800, 140, 3675, 142);
	Utils.createCircle(scene, world, -2500, 140, 3675, 143);
	Utils.createCircle(scene, world, -2200, 140, 3675, 144);
	Utils.createCircle(scene, world, -1900, 140, 3675, 145);
	Utils.createCircle(scene, world, -1600, 140, 3675, 146);
	Utils.createCircle(scene, world, -1300, 140, 3675, 147);
	
	Utils.createCircle(scene, world, 1200, 140, 3675, 148);
	Utils.createCircle(scene, world, 1500, 140, 3675, 149);
	Utils.createCircle(scene, world, 1800, 140, 3675, 150);
	Utils.createCircle(scene, world, 2100, 140, 3675, 151);
	Utils.createCircle(scene, world, 2400, 140, 3675, 152);
	Utils.createCircle(scene, world, 2700, 140, 3675, 153);
	Utils.createCircle(scene, world, 3000, 140, 3675, 154);
	Utils.createCircle(scene, world, 3300, 140, 3675, 155);
	Utils.createCircle(scene, world, 3600, 140, 3675, 156);
	Utils.createCircle(scene, world, 3900, 140, 3675, 157);
	Utils.createCircle(scene, world, 4200, 140, 3675, 158);
	Utils.createCircle(scene, world, 4500, 140, 3675, 159);

	Utils.createCircle(scene, world, -2400, 140, 1925, 160);
	Utils.createCircle(scene, world, -2100, 140, 1925, 161);
	Utils.createCircle(scene, world, -1800, 140, 1925, 162);
	Utils.createCircle(scene, world, -1500, 140, 1925, 163);
	Utils.createCircle(scene, world, -1200, 140, 1925, 164);
	Utils.createCircle(scene, world, -900, 140, 1925, 165);
	Utils.createCircle(scene, world, -600, 140, 1925, 166);
	Utils.createCircle(scene, world, -300, 140, 1925, 167);
	Utils.createCircle(scene, world, 300, 140, 1925, 168);
	Utils.createCircle(scene, world, 600, 140, 1925, 169);
	Utils.createCircle(scene, world, 900, 140, 1925, 170);
	Utils.createCircle(scene, world, 1200, 140, 1925, 171);
	Utils.createCircle(scene, world, 1500, 140, 1925, 172);
	Utils.createCircle(scene, world, 1800, 140, 1925, 173);
	Utils.createCircle(scene, world, 2100, 140, 1925, 174);
	Utils.createCircle(scene, world, 2400, 140, 1925, 175);
	
	Utils.createCircle(scene, world, -4300, 140, -3675, 176);
	Utils.createCircle(scene, world, -4000, 140, -3675, 177);
	Utils.createCircle(scene, world, -3700, 140, -3675, 178);
	Utils.createCircle(scene, world, -3400, 140, -3675, 179);
	Utils.createCircle(scene, world, -3100, 140, -3675, 180);
	Utils.createCircle(scene, world, -2800, 140, -3675, 181);
	Utils.createCircle(scene, world, -2500, 140, -3675, 182);
	Utils.createCircle(scene, world, -2200, 140, -3675, 183);
	Utils.createCircle(scene, world, -1900, 140, -3675, 184);
	Utils.createCircle(scene, world, -1600, 140, -3675, 185);
	Utils.createCircle(scene, world, -1300, 140, -3675, 186);
	
	Utils.createCircle(scene, world, 1200, 140, -3675, 187);
	Utils.createCircle(scene, world, 1500, 140, -3675, 188);
	Utils.createCircle(scene, world, 1800, 140, -3675, 189);
	Utils.createCircle(scene, world, 2100, 140, -3675, 190);
	Utils.createCircle(scene, world, 2400, 140, -3675, 191);
	Utils.createCircle(scene, world, 2700, 140, -3675, 192);
	Utils.createCircle(scene, world, 3000, 140, -3675, 193);
	Utils.createCircle(scene, world, 3300, 140, -3675, 194);
	Utils.createCircle(scene, world, 3600, 140, -3675, 195);
	Utils.createCircle(scene, world, 3900, 140, -3675, 196);
	Utils.createCircle(scene, world, 4200, 140, -3675, 197);
	Utils.createCircle(scene, world, 4500, 140, -3675, 198);

	Utils.createCircle(scene, world, -2400, 140, -1925, 199);
	Utils.createCircle(scene, world, -2100, 140, -1925, 200);
	Utils.createCircle(scene, world, -1800, 140, -1925, 201);
	Utils.createCircle(scene, world, -1500, 140, -1925, 202);
	Utils.createCircle(scene, world, -1200, 140, -1925, 203);
	Utils.createCircle(scene, world, -900, 140, -1925, 204);
	Utils.createCircle(scene, world, -600, 140, -1925, 205);
	Utils.createCircle(scene, world, -300, 140, -1925, 206);
	Utils.createCircle(scene, world, 0, 140, -1925, 207);
	Utils.createCircle(scene, world, 300, 140, -1925, 208);
	Utils.createCircle(scene, world, 600, 140, -1925, 209);
	Utils.createCircle(scene, world, 900, 140, -1925, 210);
	Utils.createCircle(scene, world, 1200, 140, -1925, 211);
	Utils.createCircle(scene, world, 1500, 140, -1925, 212);
	Utils.createCircle(scene, world, 1800, 140, -1925, 213);
	Utils.createCircle(scene, world, 2100, 140, -1925, 214);
	Utils.createCircle(scene, world, 2400, 140, -1925, 215);

	Utils.createCircle(scene, world, -1200, 140, 2260, 216);
	Utils.createCircle(scene, world, -1200, 140, 2595, 217);
	Utils.createCircle(scene, world, -1200, 140, 2930, 218);
	Utils.createCircle(scene, world, -1200, 140, 3265, 219);
	
	Utils.createCircle(scene, world, 0, 140, 1525, 220);
	Utils.createCircle(scene, world, 0, 140, 1845, 221);
	Utils.createCircle(scene, world, 0, 140, 2165, 222);
	Utils.createCircle(scene, world, 0, 140, 2485, 223);
	Utils.createCircle(scene, world, 0, 140, 2805, 224); 
	Utils.createCircle(scene, world, 0, 140, 3125, 225);
	
	Utils.createCircle(scene, world, 0, 140, -1325, 226);
	Utils.createCircle(scene, world, 0, 140, -1625, 226);
	Utils.createCircle(scene, world, 0, 140, -1925, 227);
	Utils.createCircle(scene, world, 0, 140, -2225, 228);
	Utils.createCircle(scene, world, 0, 140, -2525, 229);
	Utils.createCircle(scene, world, 0, 140, -2825, 230);
	Utils.createCircle(scene, world, 0, 140, -3125, 231);

	Utils.createCircle(scene, world, -1250, 140, -3375, 232);
	Utils.createCircle(scene, world, -1250, 140, -3075, 233);
	Utils.createCircle(scene, world, -1250, 140, -2775, 234);
	Utils.createCircle(scene, world, -1250, 140, -2475, 235);
	Utils.createCircle(scene, world, -1250, 140, -2175, 236);
	
	Utils.createCircle(scene, world, -900, 140, 925, 237);
	Utils.createCircle(scene, world, -900, 140, 625, 238);
	Utils.createCircle(scene, world, -900, 140, 325, 239);
	Utils.createCircle(scene, world, -900, 140, 25, 240);
	Utils.createCircle(scene, world, -900, 140, -275, 241);
	Utils.createCircle(scene, world, -900, 140, -575, 242);
	Utils.createCircle(scene, world, -900, 140, -875, 243);
	
	Utils.createCircle(scene, world, 1200, 140, -3375, 244);
	Utils.createCircle(scene, world, 1200, 140, -3075, 245);
	Utils.createCircle(scene, world, 1200, 140, -2775, 246);
	Utils.createCircle(scene, world, 1200, 140, -2475, 247);
	Utils.createCircle(scene, world, 1200, 140, -2175, 248);

	Utils.createCircle(scene, world, 900, 140, 925, 237);
	Utils.createCircle(scene, world, 900, 140, 625, 238);
	Utils.createCircle(scene, world, 900, 140, 325, 239);
	Utils.createCircle(scene, world, 900, 140, 25, 240);
	Utils.createCircle(scene, world, 900, 140, -275, 241);
	Utils.createCircle(scene, world, 900, 140, -575, 242);
	Utils.createCircle(scene, world, 900, 140, -875, 243);

	Utils.createCircle(scene, world, 3300, 140, -3375, 244);
	Utils.createCircle(scene, world, 3300, 140, -3075, 245);
	Utils.createCircle(scene, world, 3300, 140, -2775, 246);
	Utils.createCircle(scene, world, 3600, 140, -3375, 247);
	Utils.createCircle(scene, world, 3600, 140, -3075, 248);
	Utils.createCircle(scene, world, 3600, 140, -2775, 249);
	Utils.createCircle(scene, world, 3900, 140, -3375, 250);
	Utils.createCircle(scene, world, 3900, 140, -3075, 251);
	Utils.createCircle(scene, world, 3900, 140, -2775, 252);

	Utils.createCircle(scene, world, 3300, 140, -2075, 253);
	Utils.createCircle(scene, world, 3300, 140, -1775, 254);
	Utils.createCircle(scene, world, 3300, 140, -1475, 255);
	Utils.createCircle(scene, world, 3600, 140, -2075, 256);
	Utils.createCircle(scene, world, 3600, 140, -1775, 257);
	Utils.createCircle(scene, world, 3600, 140, -1475, 258);
	Utils.createCircle(scene, world, 3900, 140, -2075, 259);
	Utils.createCircle(scene, world, 3900, 140, -1775, 260);
	Utils.createCircle(scene, world, 3900, 140, -1475, 261);

	Utils.createCircle(scene, world, 3600, 140, -785, 262);
	Utils.createCircle(scene, world, 3600, 140, -475, 263);
	Utils.createCircle(scene, world, 3600, 140, -175, 264);
	Utils.createCircle(scene, world, 3600, 140, 175, 265);
	Utils.createCircle(scene, world, 3600, 140, 475, 266);
	Utils.createCircle(scene, world, 3600, 140, 785, 267);

	Utils.createCircle(scene, world, 3200, 140, -475, 268);
	Utils.createCircle(scene, world, 3200, 140, -175, 269);
	Utils.createCircle(scene, world, 3200, 140, 175, 270);
	Utils.createCircle(scene, world, 3200, 140, 475, 271);
	Utils.createCircle(scene, world, 4000, 140, -475, 272);
	Utils.createCircle(scene, world, 4000, 140, -175, 273);
	Utils.createCircle(scene, world, 4000, 140, 175, 274);
	Utils.createCircle(scene, world, 4000, 140, 475, 275);

	Utils.createCircle(scene, world, 3600, 140, 1575, 276);
	Utils.createCircle(scene, world, 3900, 140, 1575, 277);
	Utils.createCircle(scene, world, 3900, 140, 1875, 278);
	Utils.createCircle(scene, world, 3900, 140, 2175, 279);

	Utils.createCircle(scene, world, 3300, 140, 2705, 280);
	Utils.createCircle(scene, world, 3300, 140, 3005, 281);
	Utils.createCircle(scene, world, 3300, 140, 3305, 282);
	Utils.createCircle(scene, world, 3600, 140, 3305, 283);
	
	Utils.createCircle(scene, world, -3900, 140, 3375, 284);
	Utils.createCircle(scene, world, -3600, 140, 3375, 285);
	Utils.createCircle(scene, world, -3300, 140, 3375, 286);
	Utils.createCircle(scene, world, -3900, 140, 3075, 287);
	Utils.createCircle(scene, world, -3600, 140, 3075, 288);
	Utils.createCircle(scene, world, -3300, 140, 3075, 289);
	Utils.createCircle(scene, world, -3900, 140, 2775, 290);
	Utils.createCircle(scene, world, -3600, 140, 2775, 291);
	Utils.createCircle(scene, world, -3300, 140, 2775, 292);

	Utils.createCircle(scene, world, -3825, 140, -2875, 293);
	Utils.createCircle(scene, world, -3525, 140, -2875, 294);
	Utils.createCircle(scene, world, -3225, 140, -2875, 295);
	Utils.createCircle(scene, world, -2925, 140, -2875, 296);

	Utils.createCircle(scene, world, -3825, 140, -1975, 297);
	Utils.createCircle(scene, world, -3525, 140, -1975, 298);
	Utils.createCircle(scene, world, -3225, 140, -1975, 299);

	Utils.createCircle(scene, world, 1200, 140, 2255, 300);
	Utils.createCircle(scene, world, 1200, 140, 2585, 301);
	Utils.createCircle(scene, world, 1200, 140, 2915, 302);
	Utils.createCircle(scene, world, 1200, 140, 3245, 303);
	
	Utils.createCircle(scene, world, -1325, 140, -1125, 304);
	Utils.createCircle(scene, world, -1025, 140, -1125, 305);
	Utils.createCircle(scene, world, -725, 140, -1125, 306);
	Utils.createCircle(scene, world, -425, 140, -1125, 307);
	Utils.createCircle(scene, world, -125, 140, -1125, 308);
	Utils.createCircle(scene, world, 175, 140, -1125, 309);
	Utils.createCircle(scene, world, 475, 140, -1125, 310);
	Utils.createCircle(scene, world, 775, 140, -1125, 311);
	Utils.createCircle(scene, world, 1075, 140, -1125, 312);
	Utils.createCircle(scene, world, 1375, 140, -1125, 313);
	
	Utils.createCircle(scene, world, 1675, 140, -1125, 314);
	Utils.createCircle(scene, world, 1975, 140, -1125, 315);
	Utils.createCircle(scene, world, 2275, 140, -1125, 316);
	Utils.createCircle(scene, world, 2575, 140, -1125, 317);
	Utils.createCircle(scene, world, 2875, 140, -1125, 318);
	Utils.createCircle(scene, world, 3175, 140, -1125, 319);
	Utils.createCircle(scene, world, 3475, 140, -1125, 320);
	Utils.createCircle(scene, world, 3775, 140, -1125, 321);
	Utils.createCircle(scene, world, 4075, 140, -1125, 322);
	Utils.createCircle(scene, world, 4375, 140, -1125, 323);
}

export function initNaturalMap(scene, world, controls, camera) {
	// Scene 리셋
	Utils.resetScene(scene, world);

	Utils.updateStage(2);
	Utils.ChangePacmanHeight(80);

	// 맵 배경 택스쳐 이미지
	const loader = new THREE.CubeTextureLoader();
	const texture = loader.load([
		'resources/cubemaps/map2/natural_px.png',
		'resources/cubemaps/map2/natural_nx.png',
		'resources/cubemaps/map2/natural_py.png',
		'resources/cubemaps/map2/natural_ny.png',
		'resources/cubemaps/map2/natural_pz.png',
		'resources/cubemaps/map2/natural_nz.png',
	]);
	scene.background = texture;

	// 바닥과 벽 택스쳐 가져오기
	Utils.textureLoader.load('/resources/textures/ground_texture_02.jpg', (texture) => {
		const ground_material = new THREE.MeshBasicMaterial({
			map: texture,
		});

		// 바닥 만들기
		var groundBody = new CANNON.Body({
			shape: new CANNON.Box(new CANNON.Vec3(7000 / 2, 5 / 2, 8000 / 2)),
			collisionFilterGroup: 2,
			collisionFilterMask: 1 | 64,
			mass: 0
		});
		Utils.createNewObject(scene, world, 'ground', new THREE.Mesh(new THREE.BoxGeometry(7000, 5, 8000), ground_material), groundBody);
		Utils.object['ground'].position(0, -200, 0);

		/*
		// 아이템
		Utils.createItemObject(scene, world, 'item1', 0xff5b5b, 101);
		Utils.object['item1'].position(Math.floor(Math.random() * 31) * 100 - 1500, 0, Math.floor(Math.random() * 31) * 100 - 1500);

		Utils.createItemObject(scene, world, 'item2', 0xffc000, 102);
		Utils.object['item2'].position(Math.floor(Math.random() * 31) * 100 - 1500, 0, Math.floor(Math.random() * 31) * 100 - 1500);

		Utils.createItemObject(scene, world, 'item3', 0x92d050, 103);
		Utils.object['item3'].position(Math.floor(Math.random() * 31) * 100 - 1500, 0, Math.floor(Math.random() * 31) * 100 - 1500);

		Utils.createItemObject(scene, world, 'item4', 0x00b0f0, 104);
		Utils.object['item4'].position(Math.floor(Math.random() * 31) * 100 - 1500, 0, Math.floor(Math.random() * 31) * 100 - 1500);

		Utils.createItemObject(scene, world, 'item5', 0xFF99CC, 105);
		Utils.object['item5'].position(Math.floor(Math.random() * 31) * 100 - 1500, 0, Math.floor(Math.random() * 31) * 100 - 1500);
		*/

		// 동글이들
		// 제일 왼쪽 세로줄
		Utils.createCircle(scene, world, -2975, 20, -3550, 1);
		Utils.createCircle(scene, world, -2975, 20, -3250, 2);
		Utils.createCircle(scene, world, -2975, 20, -2950, 3);
		Utils.createCircle(scene, world, -2975, 20, -2650, 4);
		Utils.createCircle(scene, world, -2975, 20, -2350, 5);
		Utils.createCircle(scene, world, -2975, 20, -2050, 6);
		Utils.createCircle(scene, world, -2975, 20, -1750, 7);
		Utils.createCircle(scene, world, -2975, 20, -1450, 8);
		Utils.createCircle(scene, world, -2975, 20, -1150, 9);
		Utils.createCircle(scene, world, -2975, 20, -850, 10);
		Utils.createCircle(scene, world, -2975, 20, -550, 21);
		Utils.createCircle(scene, world, -2975, 20, -250, 22);
		Utils.createCircle(scene, world, -2975, 20, 50, 23);
		Utils.createCircle(scene, world, -2975, 20, 350, 24);
		Utils.createCircle(scene, world, -2975, 20, 650, 25);
		Utils.createCircle(scene, world, -2975, 20, 950, 26);
		Utils.createCircle(scene, world, -2975, 20, 1250, 27);
		Utils.createCircle(scene, world, -2975, 20, 1550, 28);
		Utils.createCircle(scene, world, -2975, 20, 1850, 29);
		Utils.createCircle(scene, world, -2975, 20, 2150, 30);
		Utils.createCircle(scene, world, -2975, 20, 2450, 31); 
		
		// 제일 위 왼쪽 가로줄
		Utils.createCircle(scene, world, -2750, 20, -3400, 32);
		Utils.createCircle(scene, world, -2450, 20, -3400, 33);
		Utils.createCircle(scene, world, -2150, 20, -3400, 34);
		Utils.createCircle(scene, world, -1850, 20, -3400, 35);
		Utils.createCircle(scene, world, -1550, 20, -3400, 36);
		Utils.createCircle(scene, world, -1250, 20, -3400, 37);
		Utils.createCircle(scene, world, -950, 20, -3400, 38);
		
		// 위에서 두번째 긴 가로줄
		Utils.createCircle(scene, world, -2750, 20, -2475, 39);
		Utils.createCircle(scene, world, -2450, 20, -2475, 40);
		Utils.createCircle(scene, world, -2150, 20, -2475, 41);
		Utils.createCircle(scene, world, -1850, 20, -2475, 42);
		Utils.createCircle(scene, world, -1550, 20, -2475, 43);
		Utils.createCircle(scene, world, -1250, 20, -2475, 44);
		Utils.createCircle(scene, world, -950, 20, -2475, 45);
		Utils.createCircle(scene, world, -350, 20, -2475, 46);
		Utils.createCircle(scene, world, -50, 20, -2475, 47);
		Utils.createCircle(scene, world, 250, 20, -2475, 48);
		Utils.createCircle(scene, world, 550, 20, -2475, 49);
		Utils.createCircle(scene, world, 550, 20, -2475, 50);
		Utils.createCircle(scene, world, 850, 20, -2475, 51); 
		Utils.createCircle(scene, world, 1150, 20, -2475, 52);
		Utils.createCircle(scene, world, 1450, 20, -2475, 53);
		Utils.createCircle(scene, world, 1750, 20, -2475, 54);
		Utils.createCircle(scene, world, 2050, 20, -2475, 55);
		Utils.createCircle(scene, world, 2350, 20, -2475, 56);
		Utils.createCircle(scene, world, 2650, 20, -2475, 57);
		
		// 왼쪽 위에서 세번째 가로줄
		Utils.createCircle(scene, world, -2750, 20, -1700, 58);
		Utils.createCircle(scene, world, -2450, 20, -1700, 59);
		Utils.createCircle(scene, world, -2150, 20, -1700, 60);

		// 위에서 네번째 가로줄
		Utils.createCircle(scene, world, -1800, 20, -800, 61);
		Utils.createCircle(scene, world, -1500, 20, -800, 62);
		Utils.createCircle(scene, world, -900, 20, -800, 63);
		Utils.createCircle(scene, world, -600, 20, -800, 64);
		Utils.createCircle(scene, world, -300, 20, -800, 65);
		Utils.createCircle(scene, world, 0, 20, -800, 66);
		Utils.createCircle(scene, world, 300, 20, -800, 67);
		Utils.createCircle(scene, world, 600, 20, -800, 68);
		Utils.createCircle(scene, world, 900, 20, -800, 69);
		Utils.createCircle(scene, world, 1500, 20, -800, 70);
		Utils.createCircle(scene, world, 1800, 20, -800, 71);

		// 위에서 다섯번째 가로줄
		Utils.createCircle(scene, world, -2750, 20, 1625, 72);
		Utils.createCircle(scene, world, -2450, 20, 1625, 73);
		Utils.createCircle(scene, world, -2150, 20, 1625, 74);
		Utils.createCircle(scene, world, -1850, 20, 1625, 75);
		Utils.createCircle(scene, world, -1550, 20, 1625, 76);
		Utils.createCircle(scene, world, -1250, 20, 1625, 77);
		Utils.createCircle(scene, world, -950, 20, 1625, 78);
		Utils.createCircle(scene, world, -650, 20, 1625, 79);
		Utils.createCircle(scene, world, -350, 20, 1625, 80);

		// 위에서 여섯번째 가로줄
		Utils.createCircle(scene, world, -3050, 20, 3475, 81);
		Utils.createCircle(scene, world, -2750, 20, 3475, 82);
		Utils.createCircle(scene, world, -2450, 20, 3475, 83);
		Utils.createCircle(scene, world, -2450, 20, 3475, 84);
		Utils.createCircle(scene, world, -2150, 20, 3475, 85);
		Utils.createCircle(scene, world, -1850, 20, 3475, 86);
		Utils.createCircle(scene, world, -1550, 20, 3475, 87);
		Utils.createCircle(scene, world, -1250, 20, 3475, 88);
		Utils.createCircle(scene, world, -950, 20, 3475, 89);

		// 왼쪽에서 두번째 세로줄
		Utils.createCircle(scene, world, -2050, 20, -1400, 90);
		Utils.createCircle(scene, world, -2050, 20, -1100, 91);
		Utils.createCircle(scene, world, -2050, 20, -800, 92);
		Utils.createCircle(scene, world, -2050, 20, -500, 93);
		Utils.createCircle(scene, world, -2050, 20, -200, 94);
		Utils.createCircle(scene, world, -2050, 20, 100, 95);
		Utils.createCircle(scene, world, -2050, 20, 400, 96);
		Utils.createCircle(scene, world, -2050, 20, 700, 97);
		Utils.createCircle(scene, world, -2050, 20, 1000, 98);
		Utils.createCircle(scene, world, -2050, 20, 1300, 99);

		// 왼쪽에서 세번째 세로줄
		Utils.createCircle(scene, world, -1150, 20, -1700, 100);
		Utils.createCircle(scene, world, -1150, 20, -1400, 101);
		Utils.createCircle(scene, world, -1150, 20, -1100, 102);
		Utils.createCircle(scene, world, -1150, 20, -800, 103);
		Utils.createCircle(scene, world, -1150, 20, -500, 105);
		Utils.createCircle(scene, world, -1150, 20, -200, 106);
		Utils.createCircle(scene, world, -1150, 20, 100, 107);
		Utils.createCircle(scene, world, -1150, 20, 400, 108);
		Utils.createCircle(scene, world, -1150, 20, 800, 109);

		// 왼쪽에서 네번째 세로줄
		Utils.createCircle(scene, world, -700, 20, -3550, 110);
		Utils.createCircle(scene, world, -700, 20, -3250, 111);
		Utils.createCircle(scene, world, -700, 20, -2950, 112);
		Utils.createCircle(scene, world, -700, 20, -2650, 113);
		Utils.createCircle(scene, world, -700, 20, -2350, 114);
		Utils.createCircle(scene, world, -700, 20, -2050, 115);
		Utils.createCircle(scene, world, -700, 20, -1720, 116);
		Utils.createCircle(scene, world, -700, 20, -1450, 117);
		Utils.createCircle(scene, world, -700, 20, -1150, 118);

		// 왼쪽에서 다섯번째 가로줄
		Utils.createCircle(scene, world, -175, 20, 1050, 119);
		Utils.createCircle(scene, world, -175, 20, 1350, 120);
		Utils.createCircle(scene, world, -175, 20, 1650, 121);

		// 제일 밑 가운데 왼쪽 세로줄
		Utils.createCircle(scene, world, -800, 20, 2750, 122);
		Utils.createCircle(scene, world, -800, 20, 3050, 123);
		Utils.createCircle(scene, world, -800, 20, 3350, 124);
		
		//////////////////////////////////////////////////////
		
		// 제일 오른쪽 세로줄
		Utils.createCircle(scene, world, 2975, 20, 3550, 125);
		Utils.createCircle(scene, world, 2975, 20, 3250, 126);
		Utils.createCircle(scene, world, 2975, 20, 2950, 127);
		Utils.createCircle(scene, world, 2975, 20, 2650, 128);
		Utils.createCircle(scene, world, 2975, 20, 2350, 129);
		Utils.createCircle(scene, world, 2975, 20, 2050, 130);
		Utils.createCircle(scene, world, 2975, 20, 1750, 131);
		Utils.createCircle(scene, world, 2975, 20, 1450, 132);
		Utils.createCircle(scene, world, 2975, 20, 1150, 133);
		Utils.createCircle(scene, world, 2975, 20, 850, 134);
		Utils.createCircle(scene, world, 2975, 20, 550, 135);
		Utils.createCircle(scene, world, 2975, 20, 250, 135);
		Utils.createCircle(scene, world, 2975, 20, -50, 136);
		Utils.createCircle(scene, world, 2975, 20, -350, 137);
		Utils.createCircle(scene, world, 2975, 20, -650, 138);
		Utils.createCircle(scene, world, 2975, 20, -950, 139);
		Utils.createCircle(scene, world, 2975, 20, -1250, 140);
		Utils.createCircle(scene, world, 2975, 20, -1550, 141);
		Utils.createCircle(scene, world, 2975, 20, -1850, 142);
		Utils.createCircle(scene, world, 2975, 20, -2150, 143);
		Utils.createCircle(scene, world, 2975, 20, -2450, 144); 
		
		// 제일 밑 오른쪽 가로줄
		Utils.createCircle(scene, world, 2750, 20, 3400, 145);
		Utils.createCircle(scene, world, 2450, 20, 3400, 146);
		Utils.createCircle(scene, world, 2150, 20, 3400, 147);
		Utils.createCircle(scene, world, 1850, 20, 3400, 148);
		Utils.createCircle(scene, world, 1550, 20, 3400, 149);
		Utils.createCircle(scene, world, 1250, 20, 3400, 150);
		Utils.createCircle(scene, world, 950, 20, 3400, 151);
		
		// 밑에서 두번째 긴 가로줄
		Utils.createCircle(scene, world, 2750, 20, 2475, 152);
		Utils.createCircle(scene, world, 2450, 20, 2475, 153);
		Utils.createCircle(scene, world, 2150, 20, 2475, 154);
		Utils.createCircle(scene, world, 1850, 20, 2475, 155);
		Utils.createCircle(scene, world, 1550, 20, 2475, 156);
		Utils.createCircle(scene, world, 1250, 20, 2475, 157);
		Utils.createCircle(scene, world, 950, 20, 2475, 158);
		Utils.createCircle(scene, world, 350, 20, 2475, 159);
		Utils.createCircle(scene, world, 50, 20, 2475, 160);
		Utils.createCircle(scene, world, -250, 20, 2475, 161);
		Utils.createCircle(scene, world, -550, 20, 2475, 162);
		Utils.createCircle(scene, world, -550, 20, 2475, 163);
		Utils.createCircle(scene, world, -850, 20, 2475, 164); 
		Utils.createCircle(scene, world, -1150, 20, 2475, 165);
		Utils.createCircle(scene, world, -1450, 20, 2475, 166);
		Utils.createCircle(scene, world, -1750, 20, 2475, 167);
		Utils.createCircle(scene, world, -2050, 20, 2475, 168);
		Utils.createCircle(scene, world, -2350, 20, 2475, 169);
		Utils.createCircle(scene, world, -2650, 20, 2475, 170);
		
		// 오른쪽 밑에서 세번째 가로줄
		Utils.createCircle(scene, world, 2750, 20, 1700, 171);
		Utils.createCircle(scene, world, 2450, 20, 1700, 172);
		Utils.createCircle(scene, world, 2150, 20, 1700, 173);

		// 밑에서 네번째 가로줄
		Utils.createCircle(scene, world, 1800, 20, 800, 174);
		Utils.createCircle(scene, world, 1500, 20, 800, 175);
		Utils.createCircle(scene, world, 900, 20, 800, 176);
		Utils.createCircle(scene, world, 600, 20, 800, 177);
		Utils.createCircle(scene, world, 300, 20, 800, 178);
		Utils.createCircle(scene, world, 0, 20, 800, 179);
		Utils.createCircle(scene, world, -300, 20, 800, 180);
		Utils.createCircle(scene, world, -600, 20, 800, 181);
		Utils.createCircle(scene, world, -900, 20, 800, 182);
		Utils.createCircle(scene, world, -1500, 20, 800, 183);
		Utils.createCircle(scene, world, -1800, 20, 800, 184);

		// 밑에서 다섯번째 가로줄
		Utils.createCircle(scene, world, 2750, 20, -1625, 185);
		Utils.createCircle(scene, world, 2450, 20, -1625, 186);
		Utils.createCircle(scene, world, 2150, 20, -1625, 187);
		Utils.createCircle(scene, world, 1850, 20, -1625, 188);
		Utils.createCircle(scene, world, 1550, 20, -1625, 189);
		Utils.createCircle(scene, world, 1250, 20, -1625, 190);
		Utils.createCircle(scene, world, 950, 20, -1625, 191);
		Utils.createCircle(scene, world, 650, 20, -1625, 192);
		Utils.createCircle(scene, world, 350, 20, -1625, 193);

		// 밑에서 여섯번째 가로줄
		Utils.createCircle(scene, world, 3050, 20, -3475, 194);
		Utils.createCircle(scene, world, 2750, 20, -3475, 195);
		Utils.createCircle(scene, world, 2450, 20, -3475, 196);
		Utils.createCircle(scene, world, 2450, 20, -3475, 197);
		Utils.createCircle(scene, world, 2150, 20, -3475, 198);
		Utils.createCircle(scene, world, 1850, 20, -3475, 199);
		Utils.createCircle(scene, world, 1550, 20, -3475, 200);
		Utils.createCircle(scene, world, 1250, 20, -3475, 201);
		Utils.createCircle(scene, world, 950, 20, -3475, 202);

		// 오른쪽에서 두번째 세로줄
		Utils.createCircle(scene, world, 2050, 20, 1400, 203);
		Utils.createCircle(scene, world, 2050, 20, 1100, 204);
		Utils.createCircle(scene, world, 2050, 20, 800, 205);
		Utils.createCircle(scene, world, 2050, 20, 500, 206);
		Utils.createCircle(scene, world, 2050, 20, 200, 207);
		Utils.createCircle(scene, world, 2050, 20, -100, 208);
		Utils.createCircle(scene, world, 2050, 20, -400, 209);
		Utils.createCircle(scene, world, 2050, 20, -700, 210);
		Utils.createCircle(scene, world, 2050, 20, -1000, 211);
		Utils.createCircle(scene, world, 2050, 20, -1300, 212);
		
		// 오른쪽에서 세번째 세로줄
		Utils.createCircle(scene, world, 1150, 20, 1700, 213);
		Utils.createCircle(scene, world, 1150, 20, 1400, 214);
		Utils.createCircle(scene, world, 1150, 20, 1100, 215);
		Utils.createCircle(scene, world, 1150, 20, 800, 216);
		Utils.createCircle(scene, world, 1150, 20, 500, 217);
		Utils.createCircle(scene, world, 1150, 20, 200, 218);
		Utils.createCircle(scene, world, 1150, 20, -100, 219);
		Utils.createCircle(scene, world, 1150, 20, -400, 220);
		Utils.createCircle(scene, world, 1150, 20, -800, 221);

		// 오른쪽에서 네번째 세로줄
		Utils.createCircle(scene, world, 700, 20, 3550, 222);
		Utils.createCircle(scene, world, 700, 20, 3250, 223);
		Utils.createCircle(scene, world, 700, 20, 2950, 224);
		Utils.createCircle(scene, world, 700, 20, 2650, 225);
		Utils.createCircle(scene, world, 700, 20, 2350, 226);
		Utils.createCircle(scene, world, 700, 20, 2050, 227);
		Utils.createCircle(scene, world, 700, 20, 1720, 228);
		Utils.createCircle(scene, world, 700, 20, 1450, 229);
		Utils.createCircle(scene, world, 700, 20, 1150, 230);

		// 오른쪽에서 다섯번째 가로줄
		Utils.createCircle(scene, world, 175, 20, -1050, 231);
		Utils.createCircle(scene, world, 175, 20, -1350, 232);
		Utils.createCircle(scene, world, 175, 20, -1650, 233);

		// 제일 밑 가운데 오른쪽 세로줄
		Utils.createCircle(scene, world, 800, 20, -2750, 234);
		Utils.createCircle(scene, world, 800, 20, -3050, 235);
		Utils.createCircle(scene, world, 800, 20, -3350, 236);
	});


	Utils.textureLoader.load('/resources/textures/wall_texture_01.jpg', (texture) => {
		const wall_material = new THREE.MeshBasicMaterial({
			map: texture,
		});

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

		// 상단 텔레포트 박스
		Utils.makeBox(scene, world, 'tpnorth', 750, 50, 750, 0x008000, 32, 0);
		Utils.object['tpnorth'].position(3000, -200, -3500);

		// 하단 텔레포트 박스
		Utils.makeBox(scene, world, 'tpsouth', 750, 50, 750, 0x008000, 32, 0);
		Utils.object['tpsouth'].position(-3000, -200, 3500);

		// 고스트 벽 바로 왼쪽 벽
		Utils.createWallObject(scene, world, 'wall8', 0x330033, 200, 800, 1000);
		Utils.object['wall8'].position(-1600, 0, 0); // x,y,z 

		// 고스트 벽 바로 오른쪽 벽
		Utils.createWallObject(scene, world, 'wall9', 0x330033, 200, 800, 1000);
		Utils.object['wall9'].position(1600, 0, 0); // x,y,z 

		// wall 8의 왼쪽 벽
		Utils.createWallObject(scene, world, 'wall10', 0x330033, 200, 800, 2600);
		Utils.object['wall10'].position(-2500, 0, -100); // x,y,z 

		// wall 9의 오른쪽 벽
		Utils.createWallObject(scene, world, 'wall11', 0x330033, 200, 800, 2600);
		Utils.object['wall11'].position(2500, 0, 100); // x,y,z 

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
		Utils.createWallObject(scene, world, 'wall22', 0x330033, 200, 800, 1050);
		Utils.object['wall22'].position(-300, 0, -1625); // x,y,z 
		// wall 23
		Utils.createWallObject(scene, world, 'wall23', 0x330033, 200, 800, 1050);
		Utils.object['wall23'].position(300, 0, 1625); // x,y,z 

		// 맵 감싸는 벽
		Utils.createWallObjectWithTexture(scene, world, 'wall24', 0xFF0033, 300, 800, 7800, wall_material);
		Utils.object['wall24'].position(0, 0, -4000);
		Utils.object['wall24'].rotateY(90);
		Utils.createWallObjectWithTexture(scene, world, 'wall25', 0xFF0033, 300, 800, 7800, wall_material);
		Utils.object['wall25'].position(0, 0, 4000);
		Utils.object['wall25'].rotateY(90);
		Utils.createWallObjectWithTexture(scene, world, 'wall26', 0xFF0033, 300, 800, 7800, wall_material);
		Utils.object['wall26'].position(3500, 0, 0);
		Utils.createWallObjectWithTexture(scene, world, 'wall27', 0xFF0033, 300, 800, 7800, wall_material);
		Utils.object['wall27'].position(-3500, 0, 0);

		// 텔레포트 구현
		const obj1Pos = Utils.object['tpnorth'].body.position;
		const obj2Pos = Utils.object['tpsouth'].body.position;

		Utils.object['tpnorth'].body.addEventListener("collide", function (e) {
			if (e.body.type == 1) {
				Utils.stopAudio('teleport');
				Utils.playAudio('teleport');
				Utils.object['pacman'].position(obj2Pos.x + 500, 0, obj2Pos.z);
			}
		});

		Utils.object['tpsouth'].body.addEventListener("collide", function (e) {
			if (e.body.type == 1) {
				Utils.stopAudio('teleport');
				Utils.playAudio('teleport');
				Utils.object['pacman'].position(obj1Pos.x - 500, 0, obj1Pos.z);
			}
		});

		// 팩맨
		Utils.createPacman(scene, world, 600, 0, 0, 180);
		Utils.setUserEvent(scene, world, controls, camera);
		
		// 고스트
		Utils.createGhost(scene, world, 'ghost1', 0, 250, 0, 0xFFFF00);
	});
}

export function initSpaceMap(scene, world, controls, camera) {
	// Scene 리셋
	Utils.resetScene(scene, world);

	// 화면에 Stage 글자 변경
	Utils.updateStage(3);

	// 맵 배경 택스쳐 이미지
	const loader = new THREE.CubeTextureLoader();
	const texture = loader.load([
		'resources/cubemaps/map3/space_px.png',
		'resources/cubemaps/map3/space_nx.png',
		'resources/cubemaps/map3/space_py.png',
		'resources/cubemaps/map3/space_ny.png',
		'resources/cubemaps/map3/space_pz.png',
		'resources/cubemaps/map3/space_nz.png',
	]);
	scene.background = texture;
	
	var texture_dry = Utils.textureLoader.load('/resources/textures/crater_texture_dry.png');

	Utils.textureLoader.load('/resources/textures/crater_texture.jpg', (texture) => {
		const ground_material = new THREE.MeshBasicMaterial({
			map: texture,
			bumpMap: texture_dry,
		});
		
		// 바닥 만들기
		var groundBody = new CANNON.Body({
			shape: new CANNON.Box(new CANNON.Vec3(10000 / 2, 500 / 2, 8000 / 2)),
			collisionFilterGroup: 2,
			collisionFilterMask: 1 | 64,
			mass: 0
		});
		Utils.createNewObject(scene, world, 'ground', new THREE.Mesh(new THREE.BoxGeometry(8000, 500, 8000),ground_material), groundBody);
		Utils.object['ground'].position(0, -200, 0);

		Utils.createItemObject(scene, world, 'item1', 0xff5b5b, 101);
		Utils.object['item1'].position(Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500); 

		Utils.createItemObject(scene, world, 'item2', 0xffc000, 102);
		Utils.object['item2'].position(Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500);
		
		Utils.createItemObject(scene, world, 'item3', 0x92d050, 103);
		Utils.object['item3'].position(Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500);
		
		Utils.createItemObject(scene, world, 'item4', 0x00b0f0, 104);
		Utils.object['item4'].position(Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500);
		
		Utils.createItemObject(scene, world, 'item5', 0xFF99CC, 105);
		Utils.object['item5'].position(Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500);
	
	});

	/** 벽 만들기 **/
	// C (고스트 시작 위치)
	Utils.createWallObject(scene, world, 'wall1', 0xc8c8c8, 100, 800, 800); // 왼쪽 벽
	Utils.object['wall1'].position(-750, 0, 0); 
	Utils.createWallObject(scene, world, 'wall2', 0xc8c8c8, 100, 800, 800); // 오른쪽 벽
	Utils.object['wall2'].position(750, 0, 0);
	Utils.createWallObject(scene, world, 'wall3', 0xc8c8c8, 100, 800, 1600); // 아래 벽
	Utils.object['wall3'].position(0, 0, 400);
	Utils.object['wall3'].rotateY(90);

	// 맵 감싸는 벽
	Utils.createWallObject(scene, world, 'wall4', 0x282828, 100, 800, 8000);
	Utils.object['wall4'].position(0, 0, -4000);            
	Utils.object['wall4'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall5', 0x282828, 100, 800, 8000);
	Utils.object['wall5'].position(0, 0, 4000);
	Utils.object['wall5'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall6', 0x282828, 100, 800, 8000);
	Utils.object['wall6'].position(-3900, 0, 0);
	Utils.createWallObject(scene, world, 'wall7', 0x282828, 100, 800, 8000);
	Utils.object['wall7'].position(3900, 0, 0);

	// 왼쪽 텔레포트 윗 벽
	Utils.createWallObject(scene, world, 'wall8', 0x282828, 1600, 800, 900);
	Utils.object['wall8'].position(-3100, 0, -800);

	// 오른쪽 텔레포트 윗 벽
	Utils.createWallObject(scene, world, 'wall9', 0x282828, 1600, 800, 900);
	Utils.object['wall9'].position(3100, 0, -800);

	// 왼쪽 텔레포트 아래 벽
	Utils.createWallObject(scene, world, 'wall10', 0x282828, 1600, 800, 900);
	Utils.object['wall10'].position(-3100, 0, 800);

	// 오른쪽 텔레포트 아래 벽
	Utils.createWallObject(scene, world, 'wall11', 0x282828, 1600, 800, 900);
	Utils.object['wall11'].position(3100, 0, 800);

	// 왼쪽 텔레포트 박스
	Utils.makeBox(scene, world, 'tpleft', 680, 50, 680, 0x008000, 32, 0);
	Utils.object['tpleft'].position(-3500, 50, 0);

	// 오른쪽 텔레포트 박스
	Utils.makeBox(scene, world, 'tpright', 680, 50, 680, 0x008000, 32, 0);
	Utils.object['tpright'].position(3500, 50, 0);

	// 위 중앙 기둥
	Utils.createWallObject(scene, world, 'wall12', 0x282828, 200, 800, 1400);
	Utils.object['wall12'].position(0, 0, -3350);

	// 위 중앙 기둥으로부터 맨 왼쪽 벽
	Utils.createWallObject(scene, world, 'wall13', 0x330033, 800, 800, 700); 
	Utils.object['wall13'].position(-2700, 0, -3000);

	// 위 중앙 기둥으로부터 맨 오른쪽 벽
	Utils.createWallObject(scene, world, 'wall14', 0x330033, 800, 800, 700); 
	Utils.object['wall14'].position(2700, 0, -3000);

	// 위 중앙 기둥으로부터 왼쪽 두 번째 벽
	Utils.createWallObject(scene, world, 'wall15', 0x330033, 800, 800, 170);
	Utils.object['wall15'].position(-2700, 0, -1950);

	// 위 중앙 기둥으로부터 오른쪽 두 번째 벽
	Utils.createWallObject(scene, world, 'wall16', 0x330033, 800, 800, 170);
	Utils.object['wall16'].position(2700, 0, -1950);

	// 왼쪽 텔포 바로 오른쪽 아래 벽
	Utils.createWallObject(scene, world, 'wall17', 0x73B2B4, 200, 800, 900);
	Utils.object['wall17'].position(-1550, 0, 800);

	// 오른쪽 텔포 바로 왼쪽 아래 벽
	Utils.createWallObject(scene, world, 'wall18', 0x73B2B4, 200, 800, 900);
	Utils.object['wall18'].position(1550, 0, 800);

	// 위 중앙 기둥 바로 왼쪽 벽
	Utils.createWallObject(scene, world, 'wall19', 0x330033, 1000, 800, 700);
	Utils.object['wall19'].position(-1150, 0, -3000);

	// 위 중앙 기둥 바로 오른쪽 벽
	Utils.createWallObject(scene, world, 'wall20', 0x330033, 1000, 800, 700);
	Utils.object['wall20'].position(1150, 0, -3000);

	// ㅏ
	Utils.createWallObject(scene, world, 'wall21', 0x73B2B4, 200, 800, 1700);
	Utils.object['wall21'].position(-1550, 0, -1200);
	Utils.createWallObject(scene, world, 'wall22', 0x73B2B4, 800, 800, 170);
	Utils.object['wall22'].position(-1100, 0, -1150);

	// ㅓ
	Utils.createWallObject(scene, world, 'wall23', 0x73B2B4, 200, 800, 1700);
	Utils.object['wall23'].position(1550, 0, -1200);
	Utils.createWallObject(scene, world, 'wall24', 0x73B2B4, 800, 800, 170);
	Utils.object['wall24'].position(1100, 0, -1150);

	// ㅜ 1
	Utils.createWallObject(scene, world, 'wall25', 0x73B2B4, 200, 800, 1700);
	Utils.object['wall25'].position(0, 0, -1950);
	Utils.object['wall25'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall26', 0x73B2B4, 200, 800, 900);
	Utils.object['wall26'].position(0, 0, -1500);

	// ㅜ 2
	Utils.createWallObject(scene, world, 'wall27', 0x73B2B4, 200, 800, 1700);
	Utils.object['wall27'].position(0, 0, 1150);
	Utils.object['wall27'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall28', 0x73B2B4, 200, 800, 600);
	Utils.object['wall28'].position(0, 0, 1500);

	// ㅜ 3
	Utils.createWallObject(scene, world, 'wall29', 0x7E6ECD, 200, 800, 1700);
	Utils.object['wall29'].position(0, 0, 2550);
	Utils.object['wall29'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall30', 0x7E6ECD, 200, 800, 600);
	Utils.object['wall30'].position(0, 0, 2900);

	// 왼쪽 ㄱ
	Utils.createWallObject(scene, world, 'wall31', 0x7E6ECD, 800, 800, 170);
	Utils.object['wall31'].position(-2700, 0, 1950);
	Utils.createWallObject(scene, world, 'wall32', 0x7E6ECD, 200, 800, 700);
	Utils.object['wall32'].position(-2400, 0, 2350);

	// 오른쪽 ㄱ
	Utils.createWallObject(scene, world, 'wall33', 0x7E6ECD, 800, 800, 170);
	Utils.object['wall33'].position(2700, 0, 1950);
	Utils.createWallObject(scene, world, 'wall34', 0x7E6ECD, 200, 800, 700);
	Utils.object['wall34'].position(2400, 0, 2350);

	// 왼쪽 -
	Utils.createWallObject(scene, world, 'wall35', 0xFF8200, 900, 800, 150);
	Utils.object['wall35'].position(-1200, 0, 1850);

	// 오른쪽 - 
	Utils.createWallObject(scene, world, 'wall36', 0xFF8200, 900, 800, 150);
	Utils.object['wall36'].position(1200, 0, 1850);

	// ㅗ 왼쪽
	Utils.createWallObject(scene, world, 'wall37', 0xFF8200, 100, 800, 1700);
	Utils.object['wall37'].position(-1600, 0, 3300);
	Utils.object['wall37'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall38', 0xFF8200, 200, 800, 600);
	Utils.object['wall38'].position(-1600, 0, 2950);

	// ㅗ 오른쪽
	Utils.createWallObject(scene, world, 'wall39', 0xFF8200, 100, 800, 1700);
	Utils.object['wall39'].position(1600, 0, 3300);
	Utils.object['wall39'].rotateY(90);
	Utils.createWallObject(scene, world, 'wall40', 0xFF8200, 200, 800, 600);
	Utils.object['wall40'].position(1600, 0, 2950);

	// 맨 아래 왼쪽 -
	Utils.createWallObject(scene, world, 'wall41', 0x282828, 700, 800, 150);
	Utils.object['wall41'].position(-3600, 0, 2650);

	// 맨 아래 오른쪽 -
	Utils.createWallObject(scene, world, 'wall42', 0x282828, 700, 800, 150);
	Utils.object['wall42'].position(3600, 0, 2650);

	// 텔레포트 구현
	const obj1Pos = Utils.object['tpleft'].body.position;
	const obj2Pos = Utils.object['tpright'].body.position;

	Utils.object['tpleft'].body.addEventListener("collide", function (e) {
		if (e.body.type == 1) {
			Utils.stopAudio('teleport');
			Utils.playAudio('teleport');
			Utils.object['pacman'].position(obj2Pos.x - 600, 230, obj2Pos.z);
		}
	});

	Utils.object['tpright'].body.addEventListener("collide", function (e) {
		if (e.body.type == 1) {
			Utils.stopAudio('teleport');
			Utils.playAudio('teleport');
			Utils.object['pacman'].position(obj1Pos.x + 600, 230, obj1Pos.z);
		}
	});

	// 팩맨
	Utils.createPacman(scene, world, 2000, 230, 0, 180);
	Utils.setUserEvent(scene, world, controls, camera);
	
	// 고스트
	Utils.createGhost(scene, world, 'ghost1', 0, 450, 0, 0xFFFF00);
}