import * as THREE from '../lib/three.module.js'
import { PointerLockControls } from '../lib/PointerLockControls.js'////////
import { Room } from './Room.js'
import { Player } from './Player.js'
import { Venus } from './Venus.js'
import { Dragon } from './Dragon.js'
import { Roza } from './Roza.js'
import { Nepal } from './Nepal.js'
import { Lion } from './Lion.js'

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2( window.innerWidth/2, window.innerHeight/2 );

let container
let camera
let scene
let light
let renderer
let room
let player
let venus
let raycaster
let pointer
let dragon
let roza
let nepal
let lion

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let controls
let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const objects = [];
			

init()
initModels()
animate()

function init(){

	console.log("hello world")

	container = document.createElement('div')	
	document.body.appendChild(container)	

	camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 10000)
	
	camera.position.set(0,-0.5,2)

	scene = new THREE.Scene()
	scene.background = new THREE.Color(0xFFFFFF)	// 0xRRGGBB (RR is the level of red, GG green, and BB blue)

	// scene.add(camera)

	light = new THREE.HemisphereLight(0x9999FF, 0xFFFF99, 1)
	scene.add(light)

	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)

	// html body -> div container -> DOM (document object model) element of the renderer
	container.appendChild(renderer.domElement)

	//raycaster = new THREE.Raycaster()
	pointer = new THREE.Vector2()
	controls = new PointerLockControls( camera, document.body );


	instructions.addEventListener( 'click', function () {
		
		controls.lock();
	});

	controls.addEventListener( 'lock', function () {

		instructions.style.display = 'none';
		blocker.style.display = 'none';
	});

	controls.addEventListener( 'unlock', function () {

		blocker.style.display = 'block';
		instructions.style.display = '';
	});

	///////////
	scene.add( controls.getObject() );
	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
	////////////

	const onKeyDown = function ( event ) {

		switch ( event.code ) {

			case 'ArrowUp':
			case 'KeyW':
				moveForward = true;
				break;

			case 'ArrowLeft':
			case 'KeyA':
				moveLeft = true;
				break;

			case 'ArrowDown':
			case 'KeyS':
				moveBackward = true;
				break;

			case 'ArrowRight':
			case 'KeyD':
				moveRight = true;
				break;
		}
	};

	const onKeyUp = function ( event ) {

		switch ( event.code ) {

			case 'ArrowUp':
			case 'KeyW':
				moveForward = false;
				break;

			case 'ArrowLeft':
			case 'KeyA':
				moveLeft = false;
				break;

			case 'ArrowDown':
			case 'KeyS':
				moveBackward = false;
				break;

			case 'ArrowRight':
			case 'KeyD':
				moveRight = false;
				break;
		}
	};

	document.addEventListener( 'keydown', onKeyDown );
	document.addEventListener( 'keyup', onKeyUp );

	window.addEventListener('resize', onWindowResize)

}

function initModels(){
	room = new Room()
	room.loadRoom(onRoomLoaded)

	venus = new Venus()
	venus.loadVenus(onVenusLoaded)

	dragon = new Dragon()
	dragon.loadDragon(onDragonLoaded)

	roza = new Roza()
	roza.loadRoza(onRozaLoaded)

	nepal = new Nepal()
	nepal.loadNepal(onNepalLoaded)

	lion = new Lion()
	lion.loadLion(onLionLoaded)

	//player = new Player()
}

function onRoomLoaded(){

	scene.add(room.getRoom())
}

function onVenusLoaded(){

	scene.add(venus.getVenus())
}

function onDragonLoaded(){
	scene.add(dragon.getDragon())
}

function onRozaLoaded(){
	scene.add(roza.getRoza())
}

function onNepalLoaded(){
	scene.add(nepal.getNepal())
}

function onLionLoaded(){
	scene.add(lion.getLion())
}

/* function onMouseMove( event ) {

	mouse.x = ( event.clientX - windowHalf.x );
	mouse.y = ( event.clientY - windowHalf.x );
}

function onMouseDown(event){

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	
	raycast(true)
} */

function raycast(isMouseDown){

	raycaster.setFromCamera(pointer, camera)

	if(room.getRoom()){

		let array1=room.objectsToPick
		let array2=venus.objectsToPick
		let array3=dragon.objectsToPick
		let array4=roza.objectsToPick
		let array5=nepal.objectsToPick
		let array6=lion.objectsToPick
		

		Array.prototype.push.apply(array1,array2)
		Array.prototype.push.apply(array1,array3)
		Array.prototype.push.apply(array1,array4)
		Array.prototype.push.apply(array1,array5)
		Array.prototype.push.apply(array1,array6)

		let intersects = raycaster.intersectObjects(array1)
		let i=0
		intersects.forEach((intersect)=>{

			if(isMouseDown && i==0){
				let object = intersect.object
				if(object.name=="12327_Statue_V1_L3"){	//CHANGE THE NAME OF OUR OBJECTS
					//object.position.y+=0.5
					camera.position.x = intersect.point.x
					camera.position.z = intersect.point.z+1	//ADD THE CORRECT CAMERA ORIENTATION 

					//camera.lookAt(0,0,0)

					console.log(intersect.point)
				}

				//console.log(object)
				
			}
		})
	}
}

function animate(){
	requestAnimationFrame(animate)
	
	/* camera.position.x -= player.dx/30
	camera.position.z -= player.dz/30

	target.x = ( 1 - mouse.x ) * 0.002;
	//target.y = ( 1 - mouse.y ) * 0.002;
	
	//camera.rotation.x += 0.05 * ( target.y - camera.rotation.x );
	player.direction += 0.5 * ( target.x - camera.rotation.y );	

	camera.rotation.y = player.direction */

	const time = performance.now();

	if ( controls.isLocked === true ) {

		raycaster.ray.origin.copy( controls.getObject().position );
		raycaster.ray.origin.y -= 10;

		const intersections = raycaster.intersectObjects( objects, false );

		const onObject = intersections.length > 0;

		const delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveRight ) - Number( moveLeft );
		direction.normalize(); // this ensures consistent movements in all directions

		if ( moveForward || moveBackward ) velocity.z -= direction.z * 40.0 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 40.0 * delta;

		if ( onObject === true ) {

			velocity.y = Math.max( 0, velocity.y );
			//canJump = true;

		}

		controls.moveRight( - velocity.x * delta );
		controls.moveForward( - velocity.z * delta );

		controls.getObject().position.y += ( velocity.y * delta ); // new behavior

		if ( controls.getObject().position.y < 0 ) {

		velocity.y = 0;
		controls.getObject().position.y = 0;

		//canJump = true;

		} 
	}

	prevTime = time;

	render()

}

function render(){
	renderer.render(scene, camera)
}

function onWindowResize(){
	console.log("resize")
	camera.aspect = window.innerWidth/window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
}
