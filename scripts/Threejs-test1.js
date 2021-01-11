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

}

function test3(){
    
}

function test4(){
    
}