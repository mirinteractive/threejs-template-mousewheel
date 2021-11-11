import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as environment from './environment.js'
import * as animation from './mouse-animation.js'
import sampleVertexShader from './shaders/sample/vertex.glsl'
import sampleFragmentShader from './shaders/sample/fragment.glsl'

const scene = new THREE.Scene()
scene.background = new THREE.Color('#000000')
const sizes = { width: window.innerWidth, height: window.innerHeight}

const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

const mouse = new THREE.Vector2()
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
)
camera.position.set(-1,1,0)
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
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width *2-1
    mouse.y = -(event.clientY / sizes.height) *2+1 
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

environment.base.map(x => {scene.add(x)})
environment.background.map(x => {scene.add(x)})

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