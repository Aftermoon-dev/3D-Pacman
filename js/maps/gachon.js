/**
 * 3D Pacman - Maps - Gachon
 * 2021-2 Computer Graphics Term Project
 * Dept. of Software, Gachon Univ.
 */

import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/optimized/three.js';
import * as Utils from '../utils.js';

/**
 * Stage 3 Map
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world 
 * @param {OrbitControls} controls
 * @param {PerspectiveCamera} camera
 */
export function initGachonMap(scene, world, controls, camera) {
    // Scene 리셋
    Utils.resetScene(scene, world);

    // 화면에 Stage 글자 변경
    Utils.updateStage(3);

    // 맵 배경 택스쳐 이미지
    const texture = Utils.cubeLoader.load([
        'resources/cubemaps/map1/gachon_px.png',
        'resources/cubemaps/map1/gachon_nx.png',
        'resources/cubemaps/map1/gachon_py.png',
        'resources/cubemaps/map1/gachon_ny.png',
        'resources/cubemaps/map1/gachon_pz.png',
        'resources/cubemaps/map1/gachon_nz.png',
    ]);
    scene.background = texture;

    let ground_texture_dry = Utils.textureLoader.load('resources/textures/brown_planks_09_disp_4k.png');


    // 바닥 만들기
    Utils.textureLoader.load('resources/textures/brown_planks_09_diff_4k.jpg', (texture) => {
        const ground_material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: ground_texture_dry,
        });

        var groundBody = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(10000 / 2, 500 / 2, 8000 / 2)),
            collisionFilterGroup: 2,
            collisionFilterMask: 1 | 64,
            mass: 0
        });

        Utils.createNewObject(scene, world, 'ground', new THREE.Mesh(new THREE.BoxGeometry(10000, 500, 8000), ground_material), groundBody);
        Utils.object['ground'].position(0, -200, 0);

    });

    /** 벽 만들기 **/
    // 맵 감싸는 벽
    Utils.createTransparentWallObject(scene, world, 'wall6', 0x1200ff, 100, 800, 10000);
    Utils.object['wall6'].position(0, 0, -4000);
    Utils.object['wall6'].rotateY(90);
    Utils.createTransparentWallObject(scene, world, 'wall9', 0x1200ff, 100, 800, 10000);
    Utils.object['wall9'].position(0, 0, 4000);
    Utils.object['wall9'].rotateY(90);
    Utils.createTransparentWallObject(scene, world, 'wall42', 0x1200ff, 100, 800, 8000);
    Utils.object['wall42'].position(5000, 0, 0);
    Utils.createTransparentWallObject(scene, world, 'wall43', 0x1200ff, 100, 800, 8000);
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
    Utils.createGhost(scene, world, 'ghost1', 0, 360, 0, 0xFFFF00);

    // 동글이들
    // 제일 왼쪽 세로줄
    Utils.createCircle(scene, world, -4625, 140, -3675);
    Utils.createCircle(scene, world, -4625, 140, -3175);
    Utils.createCircle(scene, world, -4625, 140, -2675);
    Utils.createCircle(scene, world, -4625, 140, -2175);
    Utils.createCircle(scene, world, -4625, 140, -1675);
    Utils.createCircle(scene, world, -4625, 140, -1175);
    Utils.createCircle(scene, world, -4625, 140, -675);
    Utils.createCircle(scene, world, -4625, 140, -175);
    Utils.createCircle(scene, world, -4625, 140, 325);
    Utils.createCircle(scene, world, -4625, 140, 825);
    Utils.createCircle(scene, world, -4625, 140, 1225);
    Utils.createCircle(scene, world, -4625, 140, 1825);
    Utils.createCircle(scene, world, -4625, 140, 2325);
    Utils.createCircle(scene, world, -4625, 140, 2825);
    Utils.createCircle(scene, world, -4625, 140, 3325);

    // 제일 오른쪽 세로줄
    Utils.createCircle(scene, world, 4675, 140, -3675);
    Utils.createCircle(scene, world, 4675, 140, -3175);
    Utils.createCircle(scene, world, 4675, 140, -2675);
    Utils.createCircle(scene, world, 4675, 140, -2175);
    Utils.createCircle(scene, world, 4675, 140, -1675);
    Utils.createCircle(scene, world, 4675, 140, -1175);
    Utils.createCircle(scene, world, 4675, 140, -675);
    Utils.createCircle(scene, world, 4675, 140, -175);
    Utils.createCircle(scene, world, 4675, 140, 325);
    Utils.createCircle(scene, world, 4675, 140, 825);
    Utils.createCircle(scene, world, 4675, 140, 1825);
    Utils.createCircle(scene, world, 4675, 140, 2325);
    Utils.createCircle(scene, world, 4675, 140, 2825);
    Utils.createCircle(scene, world, 4675, 140, 3325);

    // 제일 밑 왼쪽 가로줄
    Utils.createCircle(scene, world, -4625, 140, 3675);
    Utils.createCircle(scene, world, -4125, 140, 3675);
    Utils.createCircle(scene, world, -3625, 140, 3675);
    Utils.createCircle(scene, world, -3125, 140, 3675);
    Utils.createCircle(scene, world, -2625, 140, 3675);
    Utils.createCircle(scene, world, -2125, 140, 3675);
    Utils.createCircle(scene, world, -1625, 140, 3675);
    Utils.createCircle(scene, world, -1125, 140, 3675);

    // 제일 밑 오른쪽 가로줄
    Utils.createCircle(scene, world, 4675, 140, -3675);
    Utils.createCircle(scene, world, 4175, 140, -3675);
    Utils.createCircle(scene, world, 3675, 140, -3675);
    Utils.createCircle(scene, world, 3175, 140, -3675);
    Utils.createCircle(scene, world, 2675, 140, -3675);
    Utils.createCircle(scene, world, 2175, 140, -3675);
    Utils.createCircle(scene, world, 1675, 140, -3675);
    Utils.createCircle(scene, world, 1175, 140, -3675);

    // 제일 위 왼쪽 가로줄
    Utils.createCircle(scene, world, -4625, 140, -3675);
    Utils.createCircle(scene, world, -4125, 140, -3675);
    Utils.createCircle(scene, world, -3625, 140, -3675);
    Utils.createCircle(scene, world, -3125, 140, -3675);
    Utils.createCircle(scene, world, -2625, 140, -3675);
    Utils.createCircle(scene, world, -2125, 140, -3675);
    Utils.createCircle(scene, world, -1625, 140, -3675);
    Utils.createCircle(scene, world, -1125, 140, -3675);

    // 제일 밑 오른쪽 가로줄
    Utils.createCircle(scene, world, 4675, 140, 3675);
    Utils.createCircle(scene, world, 4175, 140, 3675);
    Utils.createCircle(scene, world, 3675, 140, 3675);
    Utils.createCircle(scene, world, 3175, 140, 3675);
    Utils.createCircle(scene, world, 2675, 140, 3675);
    Utils.createCircle(scene, world, 2175, 140, 3675);
    Utils.createCircle(scene, world, 1675, 140, 3675);
    Utils.createCircle(scene, world, 1175, 140, 3675);

    // 밑에서 두번째 가로줄
    Utils.createCircle(scene, world, -4325, 140, 1225);
    Utils.createCircle(scene, world, -3825, 140, 1225);
    Utils.createCircle(scene, world, -3325, 140, 1225);
    Utils.createCircle(scene, world, -2825, 140, 1225);
    Utils.createCircle(scene, world, -2325, 140, 1225);
    Utils.createCircle(scene, world, -1825, 140, 1225);
    Utils.createCircle(scene, world, -1325, 140, 1225);
    Utils.createCircle(scene, world, -825, 140, 1225);
    Utils.createCircle(scene, world, -325, 140, 1225);
    Utils.createCircle(scene, world, 175, 140, 1225);
    Utils.createCircle(scene, world, 675, 140, 1225);
    Utils.createCircle(scene, world, 1175, 140, 1225);
    Utils.createCircle(scene, world, 1675, 140, 1225);
    Utils.createCircle(scene, world, 2175, 140, 1225);
    Utils.createCircle(scene, world, 2675, 140, 1225);
    Utils.createCircle(scene, world, 3175, 140, 1225);
    Utils.createCircle(scene, world, 3675, 140, 1225);
    Utils.createCircle(scene, world, 4175, 140, 1225);
    Utils.createCircle(scene, world, 4675, 140, 1225);

    // 위에서 두번째 가로줄
    Utils.createCircle(scene, world, -4325, 140, -1175);
    Utils.createCircle(scene, world, -3825, 140, -1175);
    Utils.createCircle(scene, world, -3325, 140, -1175);
    Utils.createCircle(scene, world, -2825, 140, -1175);
    Utils.createCircle(scene, world, -2325, 140, -1175);
    Utils.createCircle(scene, world, -1825, 140, -1175);
    Utils.createCircle(scene, world, -1325, 140, -1175);
    Utils.createCircle(scene, world, -825, 140, -1175);
    Utils.createCircle(scene, world, -325, 140, -1175);
    Utils.createCircle(scene, world, 175, 140, -1175);
    Utils.createCircle(scene, world, 675, 140, -1175);
    Utils.createCircle(scene, world, 1175, 140, -1175);
    Utils.createCircle(scene, world, 1675, 140, -1175);
    Utils.createCircle(scene, world, 2175, 140, -1175);
    Utils.createCircle(scene, world, 2675, 140, -1175);
    Utils.createCircle(scene, world, 3175, 140, -1175);
    Utils.createCircle(scene, world, 3675, 140, -1175);
    Utils.createCircle(scene, world, 4175, 140, -1175);
    Utils.createCircle(scene, world, 4675, 140, -1175);

    // 밑에서 두번째 가로줄
    Utils.createCircle(scene, world, -4325, 140, 1225);
    Utils.createCircle(scene, world, -3825, 140, 1225);
    Utils.createCircle(scene, world, -3325, 140, 1225);
    Utils.createCircle(scene, world, -2825, 140, 1225);
    Utils.createCircle(scene, world, -2325, 140, 1225);
    Utils.createCircle(scene, world, -1825, 140, 1225);
    Utils.createCircle(scene, world, -1325, 140, 1225);
    Utils.createCircle(scene, world, -825, 140, 1225);
    Utils.createCircle(scene, world, -325, 140, 1225);
    Utils.createCircle(scene, world, 175, 140, 1225);
    Utils.createCircle(scene, world, 675, 140, 1225);
    Utils.createCircle(scene, world, 1175, 140, 1225);
    Utils.createCircle(scene, world, 1675, 140, 1225);
    Utils.createCircle(scene, world, 2175, 140, 1225);
    Utils.createCircle(scene, world, 2675, 140, 1225);
    Utils.createCircle(scene, world, 3175, 140, 1225);
    Utils.createCircle(scene, world, 3675, 140, 1225);
    Utils.createCircle(scene, world, 4175, 140, 1225);
    Utils.createCircle(scene, world, 4675, 140, 1225);

    // 위에서 두번째 가로줄
    Utils.createCircle(scene, world, -2400, 140, -1925);
    Utils.createCircle(scene, world, -1900, 140, -1925);
    Utils.createCircle(scene, world, -1400, 140, -1925);
    Utils.createCircle(scene, world, -900, 140, -1925);
    Utils.createCircle(scene, world, -400, 140, -1925);
    Utils.createCircle(scene, world, 100, 140, -1925);
    Utils.createCircle(scene, world, 600, 140, -1925);
    Utils.createCircle(scene, world, 1100, 140, -1925);
    Utils.createCircle(scene, world, 1600, 140, -1925);
    Utils.createCircle(scene, world, 2100, 140, -1925);

    // 밑에서 두번째 가로줄
    Utils.createCircle(scene, world, -2400, 140, 1925);
    Utils.createCircle(scene, world, -1900, 140, 1925);
    Utils.createCircle(scene, world, -1400, 140, 1925);
    Utils.createCircle(scene, world, -900, 140, 1925);
    Utils.createCircle(scene, world, -400, 140, 1925);
    Utils.createCircle(scene, world, 100, 140, 1925);
    Utils.createCircle(scene, world, 600, 140, 1925);
    Utils.createCircle(scene, world, 1100, 140, 1925);
    Utils.createCircle(scene, world, 1600, 140, 1925);
    Utils.createCircle(scene, world, 2100, 140, 1925);

    // 왼쪽 h
    Utils.createCircle(scene, world, -1525, 140, -575);
    Utils.createCircle(scene, world, -1625, 140, 575);

    // 오른쪽 4
    Utils.createCircle(scene, world, 1625, 140, -575);
    Utils.createCircle(scene, world, 1525, 140, 575);

    // H 윗부분
    Utils.createCircle(scene, world, 3300, 140, -3225);
    Utils.createCircle(scene, world, 3300, 140, -2775);
    Utils.createCircle(scene, world, 3900, 140, -3225);
    Utils.createCircle(scene, world, 3900, 140, -2775);

    // H 아랫부분
    Utils.createCircle(scene, world, 3300, 140, -2075);
    Utils.createCircle(scene, world, 3300, 140, -1625);
    Utils.createCircle(scene, world, 3900, 140, -2075);
    Utils.createCircle(scene, world, 3900, 140, -1625);

    // O 통로 부분
    Utils.createCircle(scene, world, 3600, 140, -785);
    Utils.createCircle(scene, world, 3600, 140, 785);

    // O 가운데 부분
    Utils.createCircle(scene, world, 3300, 140, -325);
    Utils.createCircle(scene, world, 3300, 140, 325);
    Utils.createCircle(scene, world, 3900, 140, -325);
    Utils.createCircle(scene, world, 3900, 140, 325);

    // N 오른쪽 윗부분
    Utils.createCircle(scene, world, 3900, 140, 1575);
    Utils.createCircle(scene, world, 3900, 140, 2175);

    // N 왼쪽 밑부분
    Utils.createCircle(scene, world, 3300, 140, 2755);
    Utils.createCircle(scene, world, 3300, 140, 3295);

    // A 밑부분
    Utils.createCircle(scene, world, -3850, 140, 3225);
    Utils.createCircle(scene, world, -3350, 140, 3225);
    Utils.createCircle(scene, world, -3850, 140, 2825);
    Utils.createCircle(scene, world, -3350, 140, 2825);

    // G 윗부분
    Utils.createCircle(scene, world, -3825, 140, -2875);
    Utils.createCircle(scene, world, -3225, 140, -2875);

    // G 밑부분
    Utils.createCircle(scene, world, -3825, 140, -1975);
    Utils.createCircle(scene, world, -3225, 140, -1975);

    // 추가 점들
    Utils.createCircle(scene, world, -2400, 140, -3125);
    Utils.createCircle(scene, world, -2400, 140, -2525);
    Utils.createCircle(scene, world, -2400, 140, -1925);
    Utils.createCircle(scene, world, -2400, 140, -575);
    Utils.createCircle(scene, world, -2400, 140, 0);
    Utils.createCircle(scene, world, -2400, 140, 575);
    Utils.createCircle(scene, world, -2400, 140, 1925);
    Utils.createCircle(scene, world, -2400, 140, 2525);
    Utils.createCircle(scene, world, -2400, 140, 3125);

    Utils.createCircle(scene, world, 2400, 140, -3125);
    Utils.createCircle(scene, world, 2400, 140, -2525);
    Utils.createCircle(scene, world, 2400, 140, -1925);
    Utils.createCircle(scene, world, 2400, 140, -575);
    Utils.createCircle(scene, world, 2400, 140, 0);
    Utils.createCircle(scene, world, 2400, 140, 575);
    Utils.createCircle(scene, world, 2400, 140, 1925);
    Utils.createCircle(scene, world, 2400, 140, 2525);
    Utils.createCircle(scene, world, 2400, 140, 3125);

    Utils.createCircle(scene, world, -900, 140, -575);
    Utils.createCircle(scene, world, -900, 140, 0);
    Utils.createCircle(scene, world, -900, 140, 575);

    Utils.createCircle(scene, world, 900, 140, -575);
    Utils.createCircle(scene, world, 900, 140, 0);
    Utils.createCircle(scene, world, 900, 140, 575);

    Utils.createCircle(scene, world, -1150, 140, -3125);
    Utils.createCircle(scene, world, -1150, 140, -2525);
    Utils.createCircle(scene, world, -1150, 140, 2525);
    Utils.createCircle(scene, world, -1150, 140, 3125);

    Utils.createCircle(scene, world, 1150, 140, -3125);
    Utils.createCircle(scene, world, 1150, 140, -2525);
    Utils.createCircle(scene, world, 1150, 140, 2525);
    Utils.createCircle(scene, world, 1150, 140, 3125);

    Utils.createCircle(scene, world, 0, 140, -3125);
    Utils.createCircle(scene, world, 0, 140, -2525);
    Utils.createCircle(scene, world, 0, 140, 3125);
    Utils.createCircle(scene, world, 0, 140, 2525);
}