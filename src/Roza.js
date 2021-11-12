import * as THREE from '../lib/three.module.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'


class Roza {

	constructor(){
		this.roza
		this.objectsToPick = []
		console.log("creating Roza object")
	}

	loadRoza(callback){
		let loader = new GLTFLoader().setPath('./assets/models/roza/')

		loader.load('scene.gltf', (gltf) => {

			//callback function that gets called when the model is loaded
			console.log("Roza loaded", gltf)

			gltf.scene.scale.set(0.001,0.001,0.001)
			gltf.scene.position.set(0.9,-0.5,5)
			this.roza = gltf.scene
			this.roza.traverse((child)=>{
				this.objectsToPick.push(child)
			})

			console.log(this.roza)

			callback()
		})
	}

	getRoza(){
		return this.roza
	}


}


export { Roza }