
class Player{
	
	constructor(){
		this.direction = 0.0
		this.speed = 1.0
		this.isWalking
		this.dx = 0
		this.dz = 0

		let moveForward = false;
		let moveBackward = false;
		let moveLeft = false;
		let moveRight = false;


		document.addEventListener('keyup', () =>{
			console.log("keyup", event.keyCode)

			/* if( (event.keyCode == 87) || (event.keyCode == 38)){
				//w or up
				this.speed = 0.0
				this.dx = Math.sin(this.direction) * this.speed
				this.dz = Math.cos(this.direction) * this.speed

				//console.log(this.direction, this.dx, this.dz)

			} else if ( (event.keyCode == 65) || (event.keyCode == 37)){
				//a or left
				//this.direction += 0.0

			} else if ( (event.keyCode == 83) || (event.keyCode == 40)){
				//s or back
				this.speed = 0.0
				this.dx = Math.sin(this.direction) * this.speed
				this.dz = Math.cos(this.direction) * this.speed
				this.dx = 0.0

			} else if ( (event.keyCode == 68) || (event.keyCode == 39)){
				//d or right
				//this.direction -= 0.0

			} else if (event.keyCode == 81){
				//camera up
			} else if (event.keyCode == 69){
				//camera down
			} */

			switch ( event.code ) {

				case 'ArrowUp':
				case 'KeyW':
					moveForward = false;
					break;
	
				case 'ArrowLeft':
				case 'KeyA':
					moveLeft = false;
					break;
	
				case 'ArrowDown':
				case 'KeyS':
					moveBackward = false;
					break;
	
				case 'ArrowRight':
				case 'KeyD':
					moveRight = false;
					break;
			}
		})

		document.addEventListener('keydown', () =>{
			console.log("keydown", event.keyCode)

			/* if( (event.keyCode == 87) || (event.keyCode == 38)){
				//w or up
				this.speed = 1.0
				this.dx = Math.sin(this.direction) * this.speed
				this.dz = Math.cos(this.direction) * this.speed

				console.log(this.direction, this.dx, this.dz)

			} else if ( (event.keyCode == 65) || (event.keyCode == 37)){
				//a or left
				//this.direction += 0.1

			} else if ( (event.keyCode == 83) || (event.keyCode == 40)){
				//s or back
				this.speed = 1.0
				this.dx = Math.sin(this.direction) * this.speed *-1
				this.dz = Math.cos(this.direction) * this.speed *-1

			} else if ( (event.keyCode == 68) || (event.keyCode == 39)){
				//d or right
				//this.direction -= 0.1

			} else if (event.keyCode == 81){
				//camera up
				//camera.position.y += 0.1
				//this.direction += 
			} else if (event.keyCode == 69){
				//camera down
				//camera.position.y -= 0.1
			} */

			switch ( event.code ) {

				case 'ArrowUp':
				case 'KeyW':
					moveForward = true;
					break;
	
				case 'ArrowLeft':
				case 'KeyA':
					moveLeft = true;
					break;
	
				case 'ArrowDown':
				case 'KeyS':
					moveBackward = true;
					break;
	
				case 'ArrowRight':
				case 'KeyD':
					moveRight = true;
					break;
			} 
		})
	
		const time = performance.now();

		if ( controls.isLocked === true ) {

			raycaster.ray.origin.copy( controls.getObject().position );
			raycaster.ray.origin.y -= 10;

			const intersections = raycaster.intersectObjects( objects, false );

			const onObject = intersections.length > 0;

			const delta = ( time - prevTime ) / 1000;

			velocity.x -= velocity.x * 10.0 * delta;
			velocity.z -= velocity.z * 10.0 * delta;

			velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

			direction.z = Number( moveForward ) - Number( moveBackward );
			direction.x = Number( moveRight ) - Number( moveLeft );
			direction.normalize(); // this ensures consistent movements in all directions

			if ( moveForward || moveBackward ) velocity.z -= direction.z * 60.0 * delta;
			if ( moveLeft || moveRight ) velocity.x -= direction.x * 60.0 * delta;

			if ( onObject === true ) {

				velocity.y = Math.max( 0, velocity.y );
				//canJump = true;

			}

			controls.moveRight( - velocity.x * delta );
			controls.moveForward( - velocity.z * delta );

			controls.getObject().position.y += ( velocity.y * delta ); // new behavior

			if ( controls.getObject().position.y < 0 ) {

			velocity.y = 0;
			controls.getObject().position.y = 0;

			//canJump = true;

			}
		}
	}
}
export { Player }