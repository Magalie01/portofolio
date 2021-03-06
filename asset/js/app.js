let container = document.getElementById('container');
let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,10000);
let distance = 700; 
camera.position.z = distance;

let scene = new THREE.Scene();
scene.add(camera);

renderer = new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

camera.lookAt(new THREE.Vector3(0,0,0));

let geometry = new THREE.Geometry();

for ( let i = 0; i < 50; i ++ ) {

	particle = new THREE.Particle( new THREE.ParticleCanvasMaterial( {

		color: Math.random() * 0x808080 + 0x808080, //0x0000000,
		opacity: 1,//0.1,
		program: function ( context ) {

			context.beginPath();
			context.arc( 0, 0, 1, 0, Math.PI * 2, true );
			context.closePath();
			context.fill();

		}

	} ) );
	particle.position.x = Math.random() * 2000 - 1000;
	particle.position.y = Math.random() * 2000 - 1000;
	particle.position.z = Math.random() * 2000 - 1000;
	particle.scale.x = particle.scale.y = Math.random() * 12 + 5;
	scene.add( particle );

	geometry.vertices.push( new THREE.Vertex( particle.position ) );

}

let line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.05 } ) );
scene.add( line );

renderer.render( scene, camera );

document.addEventListener( 'mousemove', onMouseMove, false );

function onMouseMove(event){
	mouseX = (event.clientX - window.innerWidth/2) / window.innerWidth/2;
	mouseY = (event.clientY - window.innerHeight/2) / window.innerHeight/2;
	camera.position.x = Math.sin(mouseX * Math.PI) * distance;
	camera.position.y = - Math.sin(mouseY * Math.PI) * distance;
	camera.lookAt(new THREE.Vector3(0,0,0));
	renderer.render( scene, camera );
}
