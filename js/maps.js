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

import * as THREE from 'https://unpkg.com/three@0.108.0/build/three.module.js';
import * as Utils from './utils.js';

/**
 * Gachon Map 초기화
 * @param {THREE.Scene} scene 
 * @param {CANNON.World} world 
 */
export function initGachonMap(scene, world) {
    // Scene 리셋
    Utils.resetScene(scene);

    // 바닥 만들기
	var groundBody = new CANNON.Body({
		shape: new CANNON.Box(new CANNON.Vec3(5000, 5, 4000)),
		collisionFilterGroup: 2,
		mass: 0
	});
	Utils.object['ground'] = Utils.createNewObject(scene, world, 'ground', new THREE.Mesh(new THREE.BoxGeometry(5000, 5, 4000), new THREE.MeshBasicMaterial({ color: 0x808080})), groundBody);
	Utils.object['ground'].position(0, -60, 0);
}