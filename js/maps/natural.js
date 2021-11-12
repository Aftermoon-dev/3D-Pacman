/**
 * 3D Pacman - Maps - Natural
 * 2021-2 Computer Graphics Term Project
 * Dept. of Software, Gachon Univ.
 */

import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/optimized/three.js';
import * as Utils from '../utils.js';

/**
 * Stage 1 Map
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world 
 * @param {OrbitControls} controls
 * @param {PerspectiveCamera} camera
 */
export function initNaturalMap(scene, world, controls, camera) {
    // 맵 배경 택스쳐 이미지 
    const texture = Utils.cubeLoader.load([
        'resources/cubemaps/map2/natural_px.png',
        'resources/cubemaps/map2/natural_nx.png',
        'resources/cubemaps/map2/natural_py.png',
        'resources/cubemaps/map2/natural_ny.png',
        'resources/cubemaps/map2/natural_pz.png',
        'resources/cubemaps/map2/natural_nz.png',
    ]);
    scene.background = texture;

    // 바닥과 벽 택스쳐 가져오기
    Utils.textureLoader.load('resources/textures/ground_texture_02.jpg', (texture) => {
        const ground_material = new THREE.MeshBasicMaterial({
            map: texture,
        });

        // 바닥 만들기
        var groundBody = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(7000 / 2, 5 / 2, 8000 / 2)),
            collisionFilterGroup: 4,
            collisionFilterMask: 1 | 2 | 8 | 16 | 32 | 64,
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

        // 아래 튀어나온 Teleport 벽
        Utils.createWallObject(scene, world, 'wall4', 0x333366, 600, 800, 1200);
        Utils.object['wall4'].position(0, 0, 3400); // x,y,z 

        // 위 튀어나온 Teleport 벽
        Utils.createWallObject(scene, world, 'wall5', 0x333366, 600, 800, 1200);
        Utils.object['wall5'].position(0, 0, -3400); // x,y,z 

        // 왼쪽 하단 Teleport 벽
        Utils.createWallObject(scene, world, 'wall6', 0x333366, 2300, 800, 300);
        Utils.object['wall6'].position(-2350, 0, 2950); // x,y,z 

        // 오른쪽 상단 Teleport 벽
        Utils.createWallObject(scene, world, 'wall7', 0x333366, 2300, 800, 300);
        Utils.object['wall7'].position(2350, 0, -2950); // x,y,z 

        // 상단 텔레포트 박스
        Utils.createTeleportBox(scene, world, 'tpnorth', 750, 50, 750);
        Utils.object['tpnorth'].position(3000, -200, -3500);

        // 하단 텔레포트 박스
        Utils.createTeleportBox(scene, world, 'tpsouth', 750, 50, 750);
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
        Utils.createTransparentWallObject(scene, world, 'wall24', 0x918572, 300, 800, 7800);
        Utils.object['wall24'].position(0, 0, -4000);
        Utils.object['wall24'].rotateY(90);
        Utils.createTransparentWallObject(scene, world, 'wall25', 0x918572, 300, 800, 7800);
        Utils.object['wall25'].position(0, 0, 4000);
        Utils.object['wall25'].rotateY(90);
        Utils.createTransparentWallObject(scene, world, 'wall26', 0x918572, 300, 800, 7800);
        Utils.object['wall26'].position(3500, 0, 0);
        Utils.createTransparentWallObject(scene, world, 'wall27', 0x918572, 300, 800, 7800);
        Utils.object['wall27'].position(-3500, 0, 0);

        // 텔레포트 구현
        const obj1Pos = Utils.object['tpnorth'].body.position;
        const obj2Pos = Utils.object['tpsouth'].body.position;

        Utils.audioList['teleport'].volume = 0.3;
        
        Utils.object['tpnorth'].body.addEventListener("collide", function (e) {
            console.log(e);
            if (e.body.type == 1) {
                Utils.playAudio('teleport');
                Utils.object['pacman'].position(obj2Pos.x + 500, Utils.object['pacman'].body.position.y, obj2Pos.z);
            }
        });

        Utils.object['tpsouth'].body.addEventListener("collide", function (e) {
            console.log(e);
            if (e.body.type == 1) {
                Utils.playAudio('teleport');
                Utils.object['pacman'].position(obj1Pos.x - 500, Utils.object['pacman'].body.position.y, obj1Pos.z);
            }
        });

        // 동글이들
        // 제일 왼쪽 세로줄
        Utils.createCircle(scene, world, -2975, 20, -3400);
        Utils.createCircle(scene, world, -2975, 20, -2900);
        Utils.createCircle(scene, world, -2975, 20, -2450);
        Utils.createCircle(scene, world, -2975, 20, -1900);
        Utils.createCircle(scene, world, -2975, 20, -1400);
        Utils.createCircle(scene, world, -2975, 20, -900);
        Utils.createCircle(scene, world, -2975, 20, -400);
        Utils.createCircle(scene, world, -2975, 20, 100);
        Utils.createCircle(scene, world, -2975, 20, 600);
        Utils.createCircle(scene, world, -2975, 20, 1100);
        Utils.createCircle(scene, world, -2975, 20, 1600);
        Utils.createCircle(scene, world, -2975, 20, 2100);

        // 제일 오른쪽 세로줄
        Utils.createCircle(scene, world, 2975, 20, 3400);
        Utils.createCircle(scene, world, 2975, 20, 2900);
        Utils.createCircle(scene, world, 2975, 20, 2450);
        Utils.createCircle(scene, world, 2975, 20, 1900);
        Utils.createCircle(scene, world, 2975, 20, 1400);
        Utils.createCircle(scene, world, 2975, 20, 900);
        Utils.createCircle(scene, world, 2975, 20, 400);
        Utils.createCircle(scene, world, 2975, 20, -100);
        Utils.createCircle(scene, world, 2975, 20, -600);
        Utils.createCircle(scene, world, 2975, 20, -1100);
        Utils.createCircle(scene, world, 2975, 20, -1600);
        Utils.createCircle(scene, world, 2975, 20, -2100);

        // 제일 위 왼쪽 가로줄
        Utils.createCircle(scene, world, -2475, 20, -3400);
        Utils.createCircle(scene, world, -1975, 20, -3400);
        Utils.createCircle(scene, world, -1475, 20, -3400);
        Utils.createCircle(scene, world, -975, 20, -3400);
        Utils.createCircle(scene, world, -475, 20, -3400);

        // 제일 밑 오른쪽 가로줄
        //Utils.createCircle(scene, world, 2475, 20, 3400);
        Utils.createCircle(scene, world, 1975, 20, 3400);
        Utils.createCircle(scene, world, 1475, 20, 3400);
        Utils.createCircle(scene, world, 975, 20, 3400);
        Utils.createCircle(scene, world, 475, 20, 3400);

        // 위에서 두번째 긴 가로줄
        Utils.createCircle(scene, world, -2475, 20, -2475);
        Utils.createCircle(scene, world, -1975, 20, -2475);
        Utils.createCircle(scene, world, -1475, 20, -2475);
        Utils.createCircle(scene, world, -975, 20, -2475);
        Utils.createCircle(scene, world, -475, 20, -2475);
        Utils.createCircle(scene, world, 25, 20, -2475);
        Utils.createCircle(scene, world, 525, 20, -2475);
        Utils.createCircle(scene, world, 1025, 20, -2475);
        Utils.createCircle(scene, world, 1525, 20, -2475);
        Utils.createCircle(scene, world, 2025, 20, -2475);
        Utils.createCircle(scene, world, 2525, 20, -2475);
        Utils.createCircle(scene, world, 2975, 20, -2475);

        // 밑에서 두번째 긴 가로줄
        Utils.createCircle(scene, world, 2475, 20, 2475);
        Utils.createCircle(scene, world, 1975, 20, 2475);
        Utils.createCircle(scene, world, 1475, 20, 2475);
        Utils.createCircle(scene, world, 975, 20, 2475);
        Utils.createCircle(scene, world, 475, 20, 2475);
        Utils.createCircle(scene, world, -25, 20, 2475);
        Utils.createCircle(scene, world, -525, 20, 2475);
        Utils.createCircle(scene, world, -1025, 20, 2475);
        Utils.createCircle(scene, world, -1525, 20, 2475);
        Utils.createCircle(scene, world, -2025, 20, 2475);
        Utils.createCircle(scene, world, -2525, 20, 2475);
        Utils.createCircle(scene, world, -2975, 20, 2475);

        // 왼쪽 두번째 세로줄
        Utils.createCircle(scene, world, -2000, 20, -1700);
        Utils.createCircle(scene, world, -2000, 20, -1250);
        Utils.createCircle(scene, world, -2000, 20, -200);
        Utils.createCircle(scene, world, -2000, 20, 300);

        // 오른쪽 두번째 세로줄
        Utils.createCircle(scene, world, 2000, 20, 1700);
        Utils.createCircle(scene, world, 2000, 20, 1250);
        Utils.createCircle(scene, world, 2000, 20, 200);
        Utils.createCircle(scene, world, 2000, 20, -300);

        // 왼쪽 세번째 세로줄
        Utils.createCircle(scene, world, -1000, 20, -1700);
        Utils.createCircle(scene, world, -1000, 20, -1250);
        Utils.createCircle(scene, world, -1000, 20, -200);
        Utils.createCircle(scene, world, -1000, 20, 300);

        // 오른쪽 세번째 세로줄
        Utils.createCircle(scene, world, 1000, 20, 1700);
        Utils.createCircle(scene, world, 1000, 20, 1250);
        Utils.createCircle(scene, world, 1000, 20, 200);
        Utils.createCircle(scene, world, 1000, 20, -300);

        // 위에서 네번째 가로줄
        Utils.createCircle(scene, world, -2000, 20, -800);
        Utils.createCircle(scene, world, -1500, 20, -800);
        Utils.createCircle(scene, world, -1000, 20, -800);
        Utils.createCircle(scene, world, -500, 20, -800);
        Utils.createCircle(scene, world, 0, 20, -800);
        Utils.createCircle(scene, world, 500, 20, -800);
        Utils.createCircle(scene, world, 1000, 20, -800);
        Utils.createCircle(scene, world, 1500, 20, -800);
        Utils.createCircle(scene, world, 2000, 20, -800);

        // 밑에서 네번째 가로줄
        Utils.createCircle(scene, world, 2000, 20, 800);
        Utils.createCircle(scene, world, 1500, 20, 800);
        Utils.createCircle(scene, world, 1000, 20, 800);
        Utils.createCircle(scene, world, 500, 20, 800);
        Utils.createCircle(scene, world, 0, 20, 800);
        Utils.createCircle(scene, world, -500, 20, 800);
        Utils.createCircle(scene, world, -1000, 20, 800);
        Utils.createCircle(scene, world, -1500, 20, 800);
        Utils.createCircle(scene, world, -2000, 20, 800);

        // 위에서 다섯번째 가로줄
        Utils.createCircle(scene, world, -2500, 20, 1625);
        Utils.createCircle(scene, world, -2000, 20, 1625);
        Utils.createCircle(scene, world, -1500, 20, 1625);
        Utils.createCircle(scene, world, -1000, 20, 1625);
        Utils.createCircle(scene, world, -500, 20, 1625);
        Utils.createCircle(scene, world, 0, 20, 1625);

        // 밑에서 다섯번째 가로줄
        Utils.createCircle(scene, world, 2500, 20, -1625);
        Utils.createCircle(scene, world, 2000, 20, -1625);
        Utils.createCircle(scene, world, 1500, 20, -1625);
        Utils.createCircle(scene, world, 1000, 20, -1625);
        Utils.createCircle(scene, world, 500, 20, -1625);
        Utils.createCircle(scene, world, 0, 20, -1625);

        // 위에서 여섯번째 가로줄
        Utils.createCircle(scene, world, -2000, 20, 3475);
        Utils.createCircle(scene, world, -1500, 20, 3475);
        Utils.createCircle(scene, world, -1000, 20, 3475);
        Utils.createCircle(scene, world, -500, 20, 3475);

        // 밑에서 여섯번째 가로줄
        Utils.createCircle(scene, world, 2000, 20, -3475);
        Utils.createCircle(scene, world, 1500, 20, -3475);
        Utils.createCircle(scene, world, 1000, 20, -3475);
        Utils.createCircle(scene, world, 500, 20, -3475);

        // 추가 점들
        Utils.createCircle(scene, world, -475, 20, -3400);
        Utils.createCircle(scene, world, 475, 20, 3400);

        // 팩맨
        Utils.createPacman(scene, world, 0, 0, 0, 180);
        Utils.setUserEvent(scene, world, controls, camera);

        // 고스트
        Utils.createGhost(scene, world, 'ghost1', 3000, 250, 3500, 0xFF8000, 3); //a방향 시작(주황)
        Utils.createGhost(scene, world, 'ghost2', -3100, 250, 2500, 0x80FF00, 1); // w 방향 시작(초록)
        Utils.createGhost(scene, world, 'ghost3', -3100, 250, -3500, 0x0080FF, 4); // d 방향 시작(파랑)
        Utils.createGhost(scene, world, 'ghost4', 600, 250, -3500, 0xFF97FF, 2); // s 방향 시작(분홍)

        // set camera
        Utils.initcamera(Utils.object['pacman'], controls);

        // 아이템
        Utils.locateItem(scene, world, 1, 1, 1, 1, 1, 3);
        Utils.createItemObject(scene, world, 'item42', 0x00b0f0, 104, 2475, 20, 3400);

        Utils.audioList['natural'].loop = true;
        Utils.audioList['natural'].volume = 0.2;
        Utils.audioList['natural'].play();
    });
}
