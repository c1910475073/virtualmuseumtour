import * as THREE from '../lib/three.module.js'
import { PointerLockControls } from '../lib/PointerLockControls.js'
import { Room } from './Room.js'

import { Venus } from './Venus.js'
import { Dragon } from './Dragon.js'
import { Roza } from './Roza.js'
import { Nepal } from './Nepal.js'
import { Lion } from './Lion.js'


let container
let camera
let scene
let light
let renderer
let room

let venus
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
			

init()
initModels()
animate()

function init(){

	container = document.createElement('div')	
	document.body.appendChild(container)	

	camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 10000)
	
	camera.position.set(0,0,2)	//Camera's initial position

	scene = new THREE.Scene()
	scene.background = new THREE.Color(0xFFFFFF)	// 0xRRGGBB (RR is the level of red, GG green, and BB blue)

	scene.add(camera)

	light = new THREE.HemisphereLight(0xF3F3F3, 0xF3F3F3, 1)
	scene.add(light)

	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)

	// html body -> div container -> DOM (document object model) element of the renderer
	container.appendChild(renderer.domElement)

	//Pointer Lock Controls
	controls = new PointerLockControls( camera, document.body );

	instructions.addEventListener('click', function () {
		
		controls.lock();
	});

	controls.addEventListener('lock', function () {

		instructions.style.display = 'none';
		blocker.style.display = 'none';
	});

	controls.addEventListener('unlock', function () {

		blocker.style.display = 'block';
		instructions.style.display = '';
	});

	//Player movement
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

	document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);

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

function animate(){
	requestAnimationFrame(animate)

	const time = performance.now();

	if ( controls.isLocked === true ) {

		const delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveRight ) - Number( moveLeft );
		direction.normalize(); // this ensures consistent movements in all directions

		if ( moveForward || moveBackward ) velocity.z -= direction.z * 40.0 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 40.0 * delta;

		controls.moveRight( - velocity.x * delta );
		controls.moveForward( - velocity.z * delta );
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
