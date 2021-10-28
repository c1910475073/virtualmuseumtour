
class Player{
	
	constructor(){
		this.direction = 0.0
		this.speed = 1.0
		this.isWalking
		this.dx = 0
		this.dz = 0

		document.addEventListener('keyup', () =>{
			console.log("keyup", event.keyCode)

			if( (event.keyCode == 87) || (event.keyCode == 38)){
				//w or up
				this.speed = 0.0
				this.dx = Math.sin(this.direction) * this.speed
				this.dz = Math.cos(this.direction) * this.speed

				//console.log(this.direction, this.dx, this.dz)

			} else if ( (event.keyCode == 65) || (event.keyCode == 37)){
				//a or left
				this.direction += 0.0

			} else if ( (event.keyCode == 83) || (event.keyCode == 40)){
				//s or back
				this.speed = 0.0
				this.dx = Math.sin(this.direction) * this.speed
				this.dz = Math.cos(this.direction) * this.speed
				this.dx = 0.0

			} else if ( (event.keyCode == 68) || (event.keyCode == 39)){
				//d or right
				this.direction -= 0.0

			} else if (event.keyCode == 81){
				//camera up
			} else if (event.keyCode == 69){
				//camera down
			}
		})

		document.addEventListener('keydown', () =>{
			console.log("keydown", event.keyCode)

			if( (event.keyCode == 87) || (event.keyCode == 38)){
				//w or up
				this.speed = 1.0
				this.dx = Math.sin(this.direction) * this.speed
				this.dz = Math.cos(this.direction) * this.speed

				console.log(this.direction, this.dx, this.dz)

			} else if ( (event.keyCode == 65) || (event.keyCode == 37)){
				//a or left
				this.direction += 0.1

			} else if ( (event.keyCode == 83) || (event.keyCode == 40)){
				//s or back
				this.speed = 1.0
				this.dx = Math.sin(this.direction) * this.speed *-1
				this.dz = Math.cos(this.direction) * this.speed *-1

			} else if ( (event.keyCode == 68) || (event.keyCode == 39)){
				//d or right
				this.direction -= 0.1

			} else if (event.keyCode == 81){
				//camera up
				//camera.position.y += 0.1
				//this.direction += 
			} else if (event.keyCode == 69){
				//camera down
				//camera.position.y -= 0.1
			}
		})
	}

}
export { Player }