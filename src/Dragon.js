import * as THREE from '../lib/three.module.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'


class Dragon {

	constructor(){
		this.dragon
		this.objectsToPick = []
		console.log("creating Dragon object")
	}

	loadDragon(callback){
		let loader = new GLTFLoader().setPath('./assets/models/dragon/')

		loader.load('scene.gltf', (gltf) => {

			//callback function that gets called when the model is loaded
			console.log("Dragon loaded", gltf)

			gltf.scene.scale.set(0.05,0.05,0.05)
			gltf.scene.position.set(0.9,-0.9,0)
			this.dragon = gltf.scene
			this.dragon.traverse((child)=>{
				this.objectsToPick.push(child)
			})

			console.log(this.dragon)

			callback()
		})
	}

	getDragon(){
		return this.dragon
	}


}


export { Dragon }