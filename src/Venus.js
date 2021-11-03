import * as THREE from '../lib/three.module.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'


class Venus {

	constructor(){
		this.venus 
		console.log("creating Venus object")
	}

	loadVenus(callback){
		let loader = new GLTFLoader().setPath('./assets/models/')

		loader.load('venus.glb', (gltf) => {

			//callback function that gets called when the model is loaded
			console.log("Venus loaded", gltf)

			gltf.scene.scale.set(0.05,0.05,0.05)
			gltf.scene.position.set(0,-0.9,0)
			this.venus = gltf.scene

			callback()
		})
	}

	getVenus(){
		return this.venus
	}


}


export { Venus }