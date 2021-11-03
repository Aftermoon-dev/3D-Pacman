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
	Utils.setUserEvent(Utils.object['pacman'], controls);
}