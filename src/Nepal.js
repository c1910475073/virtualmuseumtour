import * as THREE from '../lib/three.module.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'


class Nepal {

	constructor(){
		this.nepal
		this.objectsToPick = []
		console.log("creating Nepal object")
	}

	loadNepal(callback){
		let loader = new GLTFLoader().setPath('./assets/models/nepal/')

		loader.load('scene.gltf', (gltf) => {

			//callback function that gets called when the model is loaded
			console.log("Nepal loaded", gltf)

			gltf.scene.scale.set(0.04,0.02,0.02)
			gltf.scene.position.set(9,-0.9,-2)
			this.nepal = gltf.scene
			this.nepal.traverse((child)=>{
				this.objectsToPick.push(child)
			})

			console.log(this.nepal)

			callback()
		})
	}

	getNepal(){
		return this.nepal
	}


}

export { Nepal }
