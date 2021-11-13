import * as THREE from '../lib/three.module.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'


class Lion {

	constructor(){
		this.lion
		this.objectsToPick = []
		console.log("creating Lion object")
	}

	loadLion(callback){
		let loader = new GLTFLoader().setPath('./assets/models/lion/')

		loader.load('lion.gltf', (gltf) => {

			//callback function that gets called when the model is loaded
			console.log("Lion loaded", gltf)

			gltf.scene.scale.set(0.4,0.2,0.2)
			gltf.scene.position.set(-1.5,1,8.5)
			this.lion= gltf.scene
			this.lion.traverse((child)=>{
				this.objectsToPick.push(child)
			})

			console.log(this.lion)

			callback()
		})
	}

	getLion(){
		return this.lion
	}


}


export { Lion }