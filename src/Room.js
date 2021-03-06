import * as THREE from '../lib/three.module.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'


class Room {

	constructor(){
		this.room 
		this.objectsToPick = []
		console.log("creating Room object")
	}

	loadRoom(callback){
		let loader = new GLTFLoader().setPath('./assets/models/room/')

		loader.load('room.gltf', (gltf) => {

			//callback function that gets called when the model is loaded
			console.log("room loaded", gltf)

			gltf.scene.position.set(-4,-0.5,-5)
			this.room = gltf.scene

			this.room.traverse((child)=>{
				this.objectsToPick.push(child)
				console.log("child",child)
			})

			callback()
		})
	}

	getRoom(){
		return this.room
	}


}


export { Room }