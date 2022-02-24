import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import * as environment from './environment.js'
import * as scroll from './scroll-control.js'

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

scroll.windowSetting(mouse, cameraPosition, cameraRotation)
environment.baseElement(scene)
environment.generateParticles(scene)

//animate
function animate() {

    requestAnimationFrame(animate)
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()