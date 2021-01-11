//sceneの作成
var scene = new THREE.Scene();

//cameraの作成
var camera = new THREE.PerspectiveCamere(50,window.innerWidth/window.innerHeight,1,1000);

//rendererの作成
var renderer = new THREE.WebGLRenderer({anitialias:true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//Lightの設定
var ambientLight = new THREE.AmbientLight(0xccccc,2);
scene.add(ambientLight);

//cameraの位置の設定
camera.position.z=250;

//cameraをマウス操作する設定
var controls = new THREE.OrbitalControls(camera);

//MTLファイルとobjファイルの読み込み
new THREE.MTLLoader().setPath("../models/male02/").load("male02.mtl",function(materials){
    materials.preload();
    new THREE.OBJLoader().setPath("../models/male02/").setMaterials(materilas).load("male02.obj",function(object){
        object.position.y = - 95;
        scene.add(onject);
    });
});

//繰り返しの処理
var animate =function(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
};

animate();
