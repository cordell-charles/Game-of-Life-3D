import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js';
import { Scene } from './three/build/three.module.js';
import { BoxGeometry } from './three/build/three.module.js';
import { MeshStandardMaterial } from './three/build/three.module.js';
import { Color } from './three/build/three.module.js';
import { Mesh } from './three/build/three.module.js';
import { PointLight } from './three/build/three.module.js';
import { PerspectiveCamera } from './three/build/three.module.js';
import { WebGLRenderer } from './three/build/three.module.js';
import { Clock } from './three/build/three.module.js';



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new Scene()


/*  Sphere example code
const geometry = new THREE.SphereGeometry( 5, 32, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
*/

/* Cube example code
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
*/



// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
// const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)
const geometry = new BoxGeometry(1, 1, 1)


// Materials
const material = new MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.color = new Color(0x2194ce)

// Mesh
const cube = new Mesh(geometry, material)
scene.add(cube)


// Lights -----


// Light 1
const pointLight = new PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


// Light 2
const pointLight2 = new PointLight(0xffffff, 2)
pointLight2.position.set(1.54, 0.46, 0.42)
pointLight2.intensity = 5
scene.add(pointLight2)



// Light 3
const pointLight3 = new PointLight(0xffffff, 2)
pointLight3.position.set(-2.82, 0.46, -0.1)
pointLight3.intensity = 5
scene.add(pointLight3)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth 
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const updateCube = (event) => {
    cube.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateCube)



const clock = new Clock()

const tick = () => {

    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //cube.rotation.x = .5 * elapsedTime
    cube.rotation.y = .5 * elapsedTime

    cube.rotation.x += .5 * (targetY - cube.rotation.x)
    cube.rotation.y += .5 * (targetX - cube.rotation.y)
    cube.position.z += .5 * (targetY - cube.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()