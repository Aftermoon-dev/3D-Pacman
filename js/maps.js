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
	
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500, 1);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500, 2);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500, 3);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500, 4);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500, 5);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500, 6);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500, 7);
	Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 140, Math.floor(Math.random() * 31) * 100 - 1500, 8);

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

		// 동글이들
		Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 20, Math.floor(Math.random() * 31) * 100 - 1500, 1);
		Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 20, Math.floor(Math.random() * 31) * 100 - 1500, 2);
		Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 20, Math.floor(Math.random() * 31) * 100 - 1500, 3);
		Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 20, Math.floor(Math.random() * 31) * 100 - 1500, 4);
		Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 20, Math.floor(Math.random() * 31) * 100 - 1500, 5);
		Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 20, Math.floor(Math.random() * 31) * 100 - 1500, 6);
		Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 20, Math.floor(Math.random() * 31) * 100 - 1500, 7);
		Utils.createCircle(scene, world, Math.floor(Math.random() * 31) * 100 - 1500, 20, Math.floor(Math.random() * 31) * 100 - 1500, 8);
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