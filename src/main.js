import * as THREE from '../lib/three.module.js'
import { Room } from './Room.js'
import { Player } from './Player.js'

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );

let container
let camera
let scene
let light
let renderer
let room
let player

init()
initModels()
animate()

function init(){
	console.log("hello world")

	container = document.createElement('div')
	document.body.appendChild(container)

	camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 10000)
	
	camera.position.set(0,0,2)
	//camera.lookAt(new THREE.Vector3(0,0,-5))

	scene = new THREE.Scene()
	scene.background = new THREE.Color(0xFFFFFF)	// 0xRRGGBB (RR is the level of red, GG green, and BB blue)

	// scene.add(camera)

	light = new THREE.HemisphereLight(0x9999FF, 0xFFFF99, 1)
	scene.add(light)

	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)

	// html body -> div container -> DOM (document object model) element of the renderer
	container.appendChild(renderer.domElement)

	document.addEventListener('mousemove', onMouseMove, false)
	document.addEventListener('wheel', onMouseWheel, false)

	window.addEventListener('resize', onWindowResize)

}

function initModels(){
	room = new Room()
	room.loadRoom(onRoomLoaded)

	player = new Player()
}

function onRoomLoaded(){
	scene.add(room.getRoom())
}

function onMouseMove( event ) {

	mouse.x = ( event.clientX - windowHalf.x );
	mouse.y = ( event.clientY - windowHalf.x );

}

function onMouseWheel( event ) {

  camera.position.z += event.deltaY * 0.1; // move camera along z-axis

}

function animate(){
	requestAnimationFrame(animate)
	
	camera.position.x -= player.dx/20
	camera.position.z -= player.dz/20

	//camera.rotation.y = player.direction

	target.x = ( 1 - mouse.x ) * 0.002;
	//target.y = ( 1 - mouse.y ) * 0.002;
	
	//camera.rotation.x += 0.05 * ( target.y - camera.rotation.x );
	camera.rotation.y += 0.5 * ( target.x - camera.rotation.y );

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


