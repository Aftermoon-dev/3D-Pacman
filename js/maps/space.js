/**
 * 3D Pacman - Maps - Space
 * 2021-2 Computer Graphics Term Project
 * Dept. of Software, Gachon Univ.
 */

import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports,min/optimized/three.js';
import * as Utils from '../utils.js';

/**
 * Stage 2 Map
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world 
 * @param {OrbitControls} controls
 * @param {PerspectiveCamera} camera
 */
export function initSpaceMap(scene, world, controls, camera) {
    // 맵 배경 택스쳐 이미지
    const texture = Utils.cubeLoader.load([
        'resources/cubemaps/map3/space_px.png',
        'resources/cubemaps/map3/space_nx.png',
        'resources/cubemaps/map3/space_py.png',
        'resources/cubemaps/map3/space_ny.png',
        'resources/cubemaps/map3/space_pz.png',
        'resources/cubemaps/map3/space_nz.png',
    ]);
    scene.background = texture;

    var texture_dry = Utils.textureLoader.load('resources/textures/crater_texture_dry.png');

    Utils.textureLoader.load('resources/textures/crater_texture.jpg', (texture) => {
        const ground_material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: texture_dry,
        });

        // 바닥 만들기
        var groundBody = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(10000 / 2, 5 / 2, 8000 / 2)),
            collisionFilterGroup: 4,
            collisionFilterMask: 1 | 2 | 8 | 16 | 32 | 64,
            mass: 0
        });
        Utils.createNewObject(scene, world, 'ground', new THREE.Mesh(new THREE.BoxGeometry(10000, 5, 8000), ground_material), groundBody);
        Utils.object['ground'].position(0, -200, 0);

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
        Utils.createTransparentWallObject(scene, world, 'wall4', 0x282828, 100, 800, 8000);
        Utils.object['wall4'].position(0, 0, -4000);
        Utils.object['wall4'].rotateY(90);
        Utils.createTransparentWallObject(scene, world, 'wall5', 0x282828, 100, 800, 8000);
        Utils.object['wall5'].position(0, 0, 4000);
        Utils.object['wall5'].rotateY(90);
        Utils.createTransparentWallObject(scene, world, 'wall6', 0x282828, 100, 800, 8000);
        Utils.object['wall6'].position(-3900, 0, 0);
        Utils.createTransparentWallObject(scene, world, 'wall7', 0x282828, 100, 800, 8000);
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
        Utils.createTeleportBox(scene, world, 'tpleft', 680, 50, 680);
        Utils.object['tpleft'].position(-3500, -200, 0);

        // 오른쪽 텔레포트 박스
        Utils.createTeleportBox(scene, world, 'tpright', 680, 50, 680);
        Utils.object['tpright'].position(3500, -200, 0);

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

        Utils.audioList['teleport'].volume = 0.3;
        
        Utils.object['tpleft'].body.addEventListener("collide", function (e) {
            if (e.body.type == 1) {
                Utils.playAudio('teleport');
                Utils.object['pacman'].position(obj2Pos.x - 600, Utils.object['pacman'].body.position.y, obj2Pos.z);
            }
        });

        Utils.object['tpright'].body.addEventListener("collide", function (e) {
            if (e.body.type == 1) {
                Utils.playAudio('teleport');
                Utils.object['pacman'].position(obj1Pos.x + 600, Utils.object['pacman'].body.position.y, obj1Pos.z);
            }
        });

        // 오른쪽 첫번째 세로줄
        Utils.createCircle(scene, world, -3475, 20, -3580);
        Utils.createCircle(scene, world, -3475, 20, -3080);
        Utils.createCircle(scene, world, -3475, 20, -2580);
        Utils.createCircle(scene, world, -3475, 20, -2080);
        Utils.createCircle(scene, world, -3475, 20, -1580);

        // 왼쪽 첫번째 세로줄
        Utils.createCircle(scene, world, 3475, 20, -3580);
        Utils.createCircle(scene, world, 3475, 20, -3080);
        Utils.createCircle(scene, world, 3475, 20, -2580);
        Utils.createCircle(scene, world, 3475, 20, -2080);
        Utils.createCircle(scene, world, 3475, 20, -1580);

        // 오른쪽 두번째 세로줄
        Utils.createCircle(scene, world, -1975, 20, -3580);
        Utils.createCircle(scene, world, -1975, 20, -3080);
        Utils.createCircle(scene, world, -1975, 20, -2580);
        Utils.createCircle(scene, world, -1975, 20, -2080);
        Utils.createCircle(scene, world, -1975, 20, -1580);
        Utils.createCircle(scene, world, -1975, 20, -1080);
        Utils.createCircle(scene, world, -1975, 20, -580);
        Utils.createCircle(scene, world, -1975, 20, 0);
        Utils.createCircle(scene, world, -1975, 20, 420);
        Utils.createCircle(scene, world, -1975, 20, 920);
        Utils.createCircle(scene, world, -1975, 20, 1420);
        Utils.createCircle(scene, world, -1975, 20, 1920);
        Utils.createCircle(scene, world, -1975, 20, 2420);
        Utils.createCircle(scene, world, -1975, 20, 2920);

        // 왼쪽 두번째 세로줄
        Utils.createCircle(scene, world, 1975, 20, -3580);
        Utils.createCircle(scene, world, 1975, 20, -3080);
        Utils.createCircle(scene, world, 1975, 20, -2580);
        Utils.createCircle(scene, world, 1975, 20, -2080);
        Utils.createCircle(scene, world, 1975, 20, -1580);
        Utils.createCircle(scene, world, 1975, 20, -1080);
        Utils.createCircle(scene, world, 1975, 20, -580);
        Utils.createCircle(scene, world, 1975, 20, 0);
        Utils.createCircle(scene, world, 1975, 20, 420);
        Utils.createCircle(scene, world, 1975, 20, 920);
        Utils.createCircle(scene, world, 1975, 20, 1420);
        Utils.createCircle(scene, world, 1975, 20, 1920);
        Utils.createCircle(scene, world, 1975, 20, 2420);
        Utils.createCircle(scene, world, 1975, 20, 2920);

        // 왼쪽 세번째 세로줄
        Utils.createCircle(scene, world, -1150, 20, -1580);
        Utils.createCircle(scene, world, -1150, 20, -580);
        Utils.createCircle(scene, world, -1150, 20, -80);
        Utils.createCircle(scene, world, -1150, 20, 420);
        Utils.createCircle(scene, world, -1150, 20, 920);

        // 오른쪽 세번째 세로줄
        Utils.createCircle(scene, world, 1150, 20, -1580);
        Utils.createCircle(scene, world, 1150, 20, -580);
        Utils.createCircle(scene, world, 1150, 20, -80);
        Utils.createCircle(scene, world, 1150, 20, 420);
        Utils.createCircle(scene, world, 1150, 20, 920);

        // 왼쪽 네번째 세로줄
        Utils.createCircle(scene, world, -375, 20, -3580);
        Utils.createCircle(scene, world, -375, 20, -3000);
        Utils.createCircle(scene, world, -375, 20, -1580);
        Utils.createCircle(scene, world, -375, 20, -1080);
        Utils.createCircle(scene, world, -375, 20, -580);

        // 오른쪽 네번째 세로줄
        Utils.createCircle(scene, world, 375, 20, -3580);
        Utils.createCircle(scene, world, 375, 20, -3000);
        Utils.createCircle(scene, world, 375, 20, -1580);
        Utils.createCircle(scene, world, 375, 20, -1080);
        Utils.createCircle(scene, world, 375, 20, -580);

        // 제일 위 가로줄 왼쪽
        Utils.createCircle(scene, world, -3475, 20, -3600);
        Utils.createCircle(scene, world, -2975, 20, -3600);
        Utils.createCircle(scene, world, -2475, 20, -3600);
        Utils.createCircle(scene, world, -1975, 20, -3600);
        Utils.createCircle(scene, world, -1475, 20, -3600);
        Utils.createCircle(scene, world, -975, 20, -3600);

        // 제일 위 가로줄 오른쪽
        Utils.createCircle(scene, world, 3475, 20, -3600);
        Utils.createCircle(scene, world, 2975, 20, -3600);
        Utils.createCircle(scene, world, 2475, 20, -3600);
        Utils.createCircle(scene, world, 1975, 20, -3600);
        Utils.createCircle(scene, world, 1475, 20, -3600);
        Utils.createCircle(scene, world, 975, 20, -3600);

        // 위에서 두번째 가로줄 
        Utils.createCircle(scene, world, -2975, 20, -2342.5);
        Utils.createCircle(scene, world, -2475, 20, -2342.5);
        Utils.createCircle(scene, world, -1475, 20, -2342.5);
        Utils.createCircle(scene, world, -975, 20, -2342.5);
        Utils.createCircle(scene, world, -475, 20, -2342.5);
        Utils.createCircle(scene, world, 25, 20, -2342.5);
        Utils.createCircle(scene, world, 525, 20, -2342.5);
        Utils.createCircle(scene, world, 1025, 20, -2342.5);
        Utils.createCircle(scene, world, 1525, 20, -2342.5);
        Utils.createCircle(scene, world, 2525, 20, -2342.5);
        Utils.createCircle(scene, world, 3025, 20, -2342.5);

        // 왼쪽 첫번째 밑 세로줄
        Utils.createCircle(scene, world, -3475, 20, 3600);
        Utils.createCircle(scene, world, -3475, 20, 3050);
        Utils.createCircle(scene, world, -3475, 20, 2305);
        Utils.createCircle(scene, world, -3475, 20, 1600);

        // 오른쪽 첫번째 밑 세로줄
        Utils.createCircle(scene, world, 3475, 20, 3600);
        Utils.createCircle(scene, world, 3475, 20, 3050);
        Utils.createCircle(scene, world, 3475, 20, 2305);
        Utils.createCircle(scene, world, 3475, 20, 1600);

        // 왼쪽 텔레포트 밑 가로줄
        Utils.createCircle(scene, world, -2975, 20, 1600);
        Utils.createCircle(scene, world, -2475, 20, 1600);
        Utils.createCircle(scene, world, -1475, 20, 1600);
        Utils.createCircle(scene, world, -975, 20, 1600);
        Utils.createCircle(scene, world, -475, 20, 1600);

        // 오른쪽 텔레포트 밑 가로줄
        Utils.createCircle(scene, world, 2975, 20, 1600);
        Utils.createCircle(scene, world, 2475, 20, 1600);
        Utils.createCircle(scene, world, 1475, 20, 1600);
        Utils.createCircle(scene, world, 975, 20, 1600);
        Utils.createCircle(scene, world, 475, 20, 1600);

        // 밑 텔레포트 벽 가로줄
        Utils.createCircle(scene, world, -550, 20, 800);
        Utils.createCircle(scene, world, 0, 20, 800);
        Utils.createCircle(scene, world, 550, 20, 800);

        // 제일 밑 가로줄
        Utils.createCircle(scene, world, -2975, 20, 3600);
        Utils.createCircle(scene, world, -2475, 20, 3600);
        Utils.createCircle(scene, world, -1975, 20, 3600);
        Utils.createCircle(scene, world, -1475, 20, 3600);
        Utils.createCircle(scene, world, -975, 20, 3600);
        Utils.createCircle(scene, world, -475, 20, 3600);
        Utils.createCircle(scene, world, 0, 20, 3600);
        Utils.createCircle(scene, world, 475, 20, 3600);
        Utils.createCircle(scene, world, 975, 20, 3600);
        Utils.createCircle(scene, world, 1475, 20, 3600);
        Utils.createCircle(scene, world, 1975, 20, 3600);
        Utils.createCircle(scene, world, 2475, 20, 3600);
        Utils.createCircle(scene, world, 2975, 20, 3600);

        // 밑에서 두번째 가운데 가로줄
        Utils.createCircle(scene, world, -1100, 20, 3000);
        Utils.createCircle(scene, world, -475, 20, 3000);
        Utils.createCircle(scene, world, 475, 20, 3000);
        Utils.createCircle(scene, world, 1100, 20, 3000);

        // 제일 밑 ㅜ 위 가로줄
        Utils.createCircle(scene, world, -1475, 20, 2187.5);
        Utils.createCircle(scene, world, -975, 20, 2187.5);
        Utils.createCircle(scene, world, -475, 20, 2187.5);
        Utils.createCircle(scene, world, 0, 20, 2187.5);
        Utils.createCircle(scene, world, 475, 20, 2187.5);
        Utils.createCircle(scene, world, 975, 20, 2187.5);
        Utils.createCircle(scene, world, 1475, 20, 2187.5);

        // 추가 점들
        Utils.createCircle(scene, world, -2975, 20, -1580);
        Utils.createCircle(scene, world, -2475, 20, -1580);
        Utils.createCircle(scene, world, 2525, 20, -1580);
        Utils.createCircle(scene, world, 3025, 20, -1580);

        Utils.createCircle(scene, world, -2975, 20, 0);
        Utils.createCircle(scene, world, -2475, 20, 0);
        Utils.createCircle(scene, world, 2525, 20, 0);
        Utils.createCircle(scene, world, 3025, 20, 0);

        Utils.createCircle(scene, world, -2975, 20, 2305);
        Utils.createCircle(scene, world, 2975, 20, 2305);

        Utils.createCircle(scene, world, -2975, 20, 2975);
        Utils.createCircle(scene, world, 2975, 20, 2975);

        Utils.createCircle(scene, world, -2475, 20, 2975);
        Utils.createCircle(scene, world, 2475, 20, 2975);

        Utils.createCircle(scene, world, -1550, 20, 0);
        Utils.createCircle(scene, world, 1550, 20, 0);

        // 팩맨
        Utils.createPacman(scene, world, 0, 0, -700, 180, true, controls);
        Utils.setUserEvent(scene, world, controls, camera);

        // 고스트
        Utils.createGhost(scene, world, 'ghost1', 3500, 250, 3700, 0xFF8000, 1); //a방향 시작(주황)
        Utils.createGhost(scene, world, 'ghost2', -3500, 250, 3700, 0x80FF00, 1); // w 방향 시작(초록)
        Utils.createGhost(scene, world, 'ghost3', -3500, 250, -3700, 0x0080FF, 4); // d 방향 시작(파랑)
        Utils.createGhost(scene, world, 'ghost4', 3500, 250, -3700, 0xFF97FF, 2); // s 방향 시작(분홍)
        
        //set camera
        Utils.initcamera(Utils.object['pacman'], controls);

        // 아이템
        Utils.locateItem(scene, world, 2, 1, 1, 1, 1, 4);

        Utils.audioList['space'].loop = true;
        Utils.audioList['space'].volume = 0.2;
        Utils.audioList['space'].play();
    });
}