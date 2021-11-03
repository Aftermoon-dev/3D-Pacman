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
 */
export function initGachonMap(scene, world, controls) {
    // Scene 리셋
    Utils.resetScene(scene);

    // 바닥 만들기
	var groundBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(8000 / 2, 5 / 2, 7000 / 2)),
		collisionFilterGroup: 2,
		mass: 0
	});
	Utils.createNewObject(scene, world, 'ground', new THREE.Mesh(new THREE.BoxGeometry(8000, 5, 7000), new THREE.MeshBasicMaterial({ color: 0x808080})), groundBody);
	Utils.object['ground'].position(0, 0, 0);

	// 벽 만들기
	Utils.createWallObject(scene, world, 'wall1', 0xFFFFFF, 100, 800, 500);
	Utils.object['wall1'].position(0, 0, -400);
	Utils.object['wall1'].rotateY(90);

	Utils.createWallObject(scene, world, 'wall2', 0xFFFFFF, 100, 800, 500);
	Utils.object['wall2'].position(-400, 0, 0);

	Utils.createWallObject(scene, world, 'wall3', 0xFFFFFF, 100, 800, 500);
	Utils.object['wall3'].position(400, 0, 0);
	
	// 팩맨 만들기
	Utils.createPacman(scene, world, 0, 180, 0);
	Utils.setUserEvent(scene, world, Utils.object['pacman'], controls);
	// itemFlag = 이동 방향이 정방향인지 반대 방향인지 구분하기 위함!

	// 아이템 만들기
	// 아이템 y축 나중에 팩맨 중심이랑 맞도록 바꾸기!!!!
	// random int 계산식 맵 크기에 따라서 나중에 수정해주기!!!
	// Math.random() * (맵크기 / 간격 + 1) * (간격 얼마나 줄건지) - (맵크기 / 2)

	// 아이템 종류
	//  -> 방향키 반대로 (빨강) / 속도 빨라지거나 느려지게 하는 것 (주황) / 팩맨 크기 커지는 것 (연두)
	//  -> 유렁 먹을 수 있게 되는 것 (하늘) / 3D -> 2D 시야 변경 (분홍)

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
}