import * as THREE from '../lib/three.module.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'


class Room {

	constructor(){
		this.room 
		console.log("creating Room object")
	}

	loadRoom(callback){
		let loader = new GLTFLoader().setPath('./assets/models/')

		loader.load('VirtualMuseum.glb', (gltf) => {

			//callback function that gets called when the model is loaded
			console.log("room loaded", gltf)

			this.room = gltf.scene

			callback()
		})
	}

	getRoom(){
		return this.room
	}


}


export { Room }