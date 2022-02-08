import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import * as environment from './environment.js'
import * as animation from './mouse-animation.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color('#000000')
const sizes = { width: window.innerWidth, height: window.innerHeight}

const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement) 
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const mouse = new THREE.Vector2()
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
)
camera.position.set(0,0,0)
let cameraPosition = camera.position
let cameraRotation = camera.rotation

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    render()
}

window.addEventListener("wheel", animation.onMouseWheel)
if ('ontouchstart' in window){
    window.addEventListener('touchmove', move);
    }else{
    // window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX / sizes.width *2-1
        mouse.y = -(event.clientY / sizes.height) *2+1 
    })
}

window.addEventListener("touchstart", animation.touchStart);

window.addEventListener("touchend", animation.touchEnd);

function move(evt){
    mouse.x = (evt.touches) ? evt.touches[0].clientX : evt.clientX;
    mouse.y = (evt.touches) ? evt.touches[0].clientY : evt.clientY;
}

//import files
environment.baseElement(scene)
environment.generateParticles(scene)

//animate
function animate() {
    animation.mousePositionUpdate()
    animation.mousePositionReset()
    animation.cameraPositionUpdate(cameraPosition, cameraRotation)

    requestAnimationFrame(animate)
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()