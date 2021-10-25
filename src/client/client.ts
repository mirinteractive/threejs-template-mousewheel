import * as THREE from 'three'
import * as dat from 'three/examples/jsm/libs/dat.gui.module'
import * as environment from './environment'
import * as objects from './object'
import * as animation from './animation'

// static folder location
// 'static/....'

const scene = new THREE.Scene()
const sizes = { width: window.innerWidth, height: window.innerHeight}

scene.background = new THREE.Color('#8b9dc3')

const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.physicallyCorrectLights = true
document.body.appendChild(renderer.domElement)

const mouse = new THREE.Vector2()
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
)
camera.position.set(0, 1, 0)

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

const gui = new dat.GUI()
//이거로 애니메이션 poc 진행
// const baseEnvironment = environment.base.filter(x => {
//     scene.add(x)
//     lightFolder.add(x, 'intensity').min(0).max(10).step(0.001).name(x.type)
//     return x
// })
const lightFolder = gui.addFolder('Light')
lightFolder.open()
environment.base.filter(x => {
    scene.add(x)
    lightFolder.add(x, 'intensity').min(0).max(10).step(0.001).name(x.type)
    lightFolder.add(x.position, 'x').min(- 5).max(5).step(0.001).name('lightX')
    lightFolder.add(x.position, 'y').min(- 5).max(5).step(0.001).name('lightY')
    lightFolder.add(x.position, 'z').min(- 5).max(5).step(0.001).name('lightZ')
    return x
})
environment.floor.map(x => {scene.add(x)})
objects.geometry.map(x=>{scene.add(x)})

function animate() {
    animation.mousePositionUpdate()
    animation.mousePositionReset()
    animation.cameraPositionUpdate(cameraPosition, cameraRotation)

    render()
    requestAnimationFrame(animate)
}

function render() {
    renderer.render(scene, camera)
}

animate()