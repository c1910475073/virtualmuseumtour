import * as THREE from '../lib/three.module.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'


class Lab {

	constructor(){
		this.lab
		console.log("creating Lab object")
	}

	loadLab(callback){	//We could use onLabLoaded instead of callback
		let loader = new GLTFLoader().setPath('./assets/models/')
		loader.load('VirtualMuseumTour.glb', (gltf) => {
			//callback function that gets called when the model is loaded
			console.log("model loaded", gltf)

			this.lab = gltf.scene
			//this.lab.scale.set(1,1,1)

			callback()
		})
	}

	getLab(){
		return this.lab
	}

}

export { Lab }
