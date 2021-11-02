import * as THREE from '../lib/three.module.js'
import { Lab } from './Lab.js'
import { Player } from './Player.js'

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );

let container
let camera
let scene
let light
let renderer
let lab 	//It cant be called "Lab" because of the class name
let player

init()
initObjects()
animate()

function init(){
	console.log("hello world")

	container = document.createElement('div')
	document.body.appendChild(container)

	camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 10000)
	
	camera.position.set(0,0.5,5)
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

/*function onKeyDown(event){
	console.log("keydown", event.keyCode)

	if( (event.keyCode == 87) || (event.keyCode == 38)){
		//w or up
		camera.position.z -= 0.1
	} else if ( (event.keyCode == 65) || (event.keyCode == 37)){
		//a or left
		//camera.position.x -= 0.1
		camera.rotation.y += 0.1
	} else if ( (event.keyCode == 83) || (event.keyCode == 40)){
		//s or back
		camera.position.z += 0.1
	} else if ( (event.keyCode == 68) || (event.keyCode == 39)){
		//d or right
		//camera.position.x += 0.1
		camera.rotation.y -= 0.1
	} else if (event.keyCode == 81){
		//camera up
		camera.position.y += 0.1
	} else if (event.keyCode == 69){
		//camera down
		camera.position.y -= 0.1
	}
}*/

function initObjects(){
	lab = new Lab()
	lab.loadLab(onLabLoaded)	//Only when the 3d object "Lab" is loaded

	player = new Player()
}

function onLabLoaded(){
	scene.add(lab.getLab())
}

function animate(){
	requestAnimationFrame(animate)
	
	camera.position.x -= player.dx/20
	camera.position.z -= player.dz/20

	camera.rotation.y = player.direction
	
	render()	
}

function render(){
	renderer.render(scene, camera)
}

function onWindowResize(){
	//console.log("resize")
	camera.aspect = window.innerWidth/window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
}


