import * as THREE from '../lib/three.module.js'
import { Room } from './Room.js'
import { Player } from './Player.js'
import { Venus} from './Venus.js'

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
let venus
let raycaster
let pointer

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

raycaster = new THREE.Raycaster()
pointer = new THREE.Vector2()

	document.addEventListener('mousemove', onMouseMove, false)
	document.addEventListener('mousedown', onMouseDown, false)
	document.addEventListener('wheel', onMouseWheel, false)

	window.addEventListener('resize', onWindowResize)

}

function initModels(){
	room = new Room()
	room.loadRoom(onRoomLoaded)

	venus = new Venus()
	venus.loadVenus(onVenusLoaded)

	player = new Player()
}


function onRoomLoaded(){
	scene.add(room.getRoom())
}

function onVenusLoaded(){
	scene.add(venus.getVenus())
}

function onMouseMove( event ) {

	mouse.x = ( event.clientX - windowHalf.x );
	mouse.y = ( event.clientY - windowHalf.x );

}

function onMouseDown(event){
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	
	raycast(true)
}

function onMouseWheel( event ) {

  camera.position.z += event.deltaY * 0.1; // move camera along z-axis

}

function animate(){
	requestAnimationFrame(animate)
	
	camera.position.x -= player.dx/20
	camera.position.z -= player.dz/20


	target.x = ( 1 - mouse.x ) * 0.002;
	//target.y = ( 1 - mouse.y ) * 0.002;
	
	//camera.rotation.x += 0.05 * ( target.y - camera.rotation.x );
	player.direction += 0.5 * ( target.x - camera.rotation.y );	//THE MOVEMENT ORIENTATION IS NOT THE SAME AS THE CAMERA

camera.rotation.y = player.direction


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


function raycast(isMouseDown){

	raycaster.setFromCamera(pointer, camera)


	if(room.getRoom()){


		let array1=room.objectsToPick
		let array2=venus.objectsToPick
		Array.prototype.push.apply(array1,array2)

		let intersects = raycaster.intersectObjects(array1)
		let i=0
		intersects.forEach((intersect)=>{

			if(isMouseDown && i==0){
				let object = intersect.object
				if(object.name=="12327_Statue_V1_L3"){
					object.position.y+=0.5
					console.log(intersect)
				}
				//highlight object
				//let object = intersect.object
				console.log(object)
				
			}

		} )

}
}













