import * as THREE from '../lib/three.module.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'


class Venus {

	constructor(){
		this.venus
		this.objectsToPick = []
		console.log("creating Venus object")
	}

	loadVenus(callback){
		let loader = new GLTFLoader().setPath('./assets/models/')

		loader.load('venus.glb', (gltf) => {

			//callback function that gets called when the model is loaded
			console.log("Venus loaded", gltf)

			gltf.scene.scale.set(0.15,0.07,0.07)
			gltf.scene.position.set(7.5,-0.9,4.2)
			this.venus = gltf.scene
			this.venus.traverse((child)=>{
				this.objectsToPick.push(child)
			})

			console.log(this.venus)

			callback()
		})
	}

	getVenus(){
		return this.venus
	}


}


export { Venus }