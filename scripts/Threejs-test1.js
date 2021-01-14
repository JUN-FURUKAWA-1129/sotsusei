function test1(){
// scene(シーン)の作成 
var scene = new THREE.Scene();

// camera(カメラ)の作成 
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// renderer(レンダラー)の作成　
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// object(オブジェクト)の作成 
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// camera(カメラ)の位置設定
camera.position.z = 5;

// 繰り返しの処理　
var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();
}

function test2(){

    function init() {

        // サイズを指定
        const width = 960;
        const height = 540;
  
        // レンダラーを作成
        const renderer = new THREE.WebGLRenderer({
          canvas: document.querySelector('#canvas2')
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
  
        // シーンを作成
        const scene = new THREE.Scene();
  
        // カメラを作成
        const camera = new THREE.PerspectiveCamera(45, width / height);
        camera.position.set(0, 0, +1000);
  
        // 箱を作成
        const geometry = new THREE.BoxGeometry(400, 400, 400);
        const material = new THREE.MeshNormalMaterial();
        const box = new THREE.Mesh(geometry, material);
        scene.add(box);
  
        tick();

        function tick() {
            // メッシュを回転させる
            box.rotation.y += 0.01;
            // レンダリング
            renderer.render(scene, camera);
        
            requestAnimationFrame(tick);
          }

    }
    init();
}

function test3(){
    const width = 960;
    const height = 540;

    function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas3')
      });
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 0, +1000);

    // 球体を作成
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    const loader = new THREE.TextureLoader();
    const texture = loader.load('../images/cyber-city.jpg');
    // マテリアルにテクスチャーを設定
    const material = new THREE.MeshStandardMaterial({
      map: texture
    });
    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    // 3D空間にメッシュを追加
    scene.add(mesh);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        // メッシュを回転させる
        mesh.rotation.y += 0.01;
        // レンダリング
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
        }
    }

    init();
}

function test4(){
    function init() {
        // サイズを指定
        const width = 960;
        const height = 540;
        let rot = 0;

        // レンダラーを作成
        const renderer = new THREE.WebGLRenderer({
          canvas: document.querySelector('#canvas4')
        });
        renderer.setSize(width, height);

        // シーンを作成
        const scene = new THREE.Scene();

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(45, width / height);

        // 平行光源を作成
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // マテリアルを作成
        const material = new THREE.MeshStandardMaterial({
          map: new THREE.TextureLoader().load('../images/cyber-city.jpg'),
          side: THREE.DoubleSide
        });

        // 球体の形状を作成します
        const geometry = new THREE.SphereGeometry(300, 30, 30);
        // 形状とマテリアルからメッシュを作成します
        const earthMesh = new THREE.Mesh(geometry, material);
        // シーンにメッシュを追加します
        scene.add(earthMesh);

        // 星屑を作成します (カメラの動きをわかりやすくするため)
        createStarField();

        function createStarField() {
          // 形状データを作成
          const geometry = new THREE.Geometry();
          for (let i = 0; i < 1000; i++) {
            geometry.vertices.push(
              new THREE.Vector3(
                3000 * (Math.random() - 0.5),
                3000 * (Math.random() - 0.5),
                3000 * (Math.random() - 0.5)
              )
            );
          }
          // マテリアルを作成
          const material = new THREE.PointsMaterial({
            size: 10,
            color: 0xffffff
          });

          // 物体を作成
          const mesh = new THREE.Points(geometry, material);
          scene.add(mesh);
        }

        tick();

        // 毎フレーム時に実行されるループイベントです
        function tick() {
          rot += 0.5; // 毎フレーム角度を0.5度ずつ足していく
          // ラジアンに変換する
          const radian = (rot * Math.PI) / 180;
          // 角度に応じてカメラの位置を設定
          camera.position.x = 1000 * Math.sin(radian);
          camera.position.z = 1000 * Math.cos(radian);
          // 原点方向を見つめる
          camera.lookAt(new THREE.Vector3(0, 0, 0));

          // レンダリング
          renderer.render(scene, camera);

          requestAnimationFrame(tick);
        }
      }

    init();
}

function test5(){
    function init() {
        // サイズを指定
        const width = 960;
        const height = 540;
        let rot = 0;
        let mouseX =0;

        // レンダラーを作成
        const renderer = new THREE.WebGLRenderer({
          canvas: document.querySelector('#canvas5')
        });
        renderer.setSize(width, height);

        // シーンを作成
        const scene = new THREE.Scene();

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(45, width / height);

        // 平行光源を作成
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // マテリアルを作成
        const material = new THREE.MeshStandardMaterial({
          map: new THREE.TextureLoader().load('../images/cyber-city.jpg'),
          side: THREE.DoubleSide
        });

        // 球体の形状を作成します
        const geometry = new THREE.SphereGeometry(300, 30, 30);
        // 形状とマテリアルからメッシュを作成します
        const earthMesh = new THREE.Mesh(geometry, material);
        // シーンにメッシュを追加します
        scene.add(earthMesh);

        // 星屑を作成します (カメラの動きをわかりやすくするため)
        createStarField();

        function createStarField() {
          // 形状データを作成
          const geometry = new THREE.Geometry();
          for (let i = 0; i < 1000; i++) {
            geometry.vertices.push(
              new THREE.Vector3(
                3000 * (Math.random() - 0.5),
                3000 * (Math.random() - 0.5),
                3000 * (Math.random() - 0.5)
              )
            );
          }
          // マテリアルを作成
          const material = new THREE.PointsMaterial({
            size: 10,
            color: 0xffffff
          });

          // 物体を作成
          const mesh = new THREE.Points(geometry, material);
          scene.add(mesh);
        }

        document.addEventListener('mousemove', event => {
            mouseX = event.pageX;
          });

        tick();

        // 毎フレーム時に実行されるループイベントです
        function tick() {
            const targetRot = (mouseX / window.innerWidth) * 360;
          rot += (targetRot - rot) * 0.02;
          // ラジアンに変換する
          const radian = (rot * Math.PI) / 180;
          // 角度に応じてカメラの位置を設定
          camera.position.x = 1000 * Math.sin(radian);
          camera.position.z = 1000 * Math.cos(radian);
          // 原点方向を見つめる
          camera.lookAt(new THREE.Vector3(0, 0, 0));

          earthMesh.rotation.y += 0.01;

          // レンダリング
          renderer.render(scene, camera);

          requestAnimationFrame(tick);
        }
      }

    init();
}

function test6(){
    
}