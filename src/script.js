import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.25, - 0.25, 1)
scene.add(camera)

// gui.add(camera.position, 'y').min(0).max(10)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

 /**
  * Test scene
  */
 const wall1 = new THREE.Mesh(new THREE.PlaneGeometry(sizes.width, 15), new THREE.MeshBasicMaterial({color: '#fff6cc'}))
 wall1.position.set(0, -1, 0)
 wall1.rotation.set(-Math.PI*0.5, 0, 0)

 const wall2 = new THREE.Mesh(new THREE.PlaneGeometry(sizes.width, 15), new THREE.MeshBasicMaterial({color: '#fff2b2'}))
 wall2.position.set(0, -1, -15)
 wall2.rotation.set(-Math.PI*0.5, 0, 0)


 const wall3 = new THREE.Mesh(new THREE.PlaneGeometry(sizes.width, 15), new THREE.MeshBasicMaterial({color: '#ffee99'}))
 wall3.position.set(0, -1, -30)
 wall3.rotation.set(-Math.PI*0.5, 0, 0)

 scene.add(wall1, wall2, wall3)

const textureLoader = new THREE.TextureLoader()

const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png')
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png')

const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
for (let i=0; i<200; i++) {
    const donut = new THREE.Mesh(donutGeometry, new THREE.MeshMatcapMaterial({ matcap: matcapTexture7}))

    donut.position.x = (Math.random() - 0.5) * 15
    donut.position.y = (Math.random() - 0.5) * 2
    donut.position.z = (Math.random() - 0.5) * 60

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scaleDonut = Math.random()
    donut.scale.set(scaleDonut,scaleDonut,scaleDonut)

    scene.add(donut)
}

const tetraGeometry = new THREE.TetrahedronGeometry(1, 0)
for (let i=0; i<200; i++) {
    const tetra = new THREE.Mesh(tetraGeometry, new THREE.MeshMatcapMaterial({ matcap: matcapTexture8}))

    tetra.position.x = (Math.random() - 0.5) * 15
    tetra.position.y = (Math.random() - 0.5) * 2
    tetra.position.z = (Math.random() - 0.5) * 60

    tetra.rotation.x = Math.random() * Math.PI
    tetra.rotation.y = Math.random() * Math.PI

    const scaleTetta = Math.random() * 0.5
    tetra.scale.set(scaleTetta,scaleTetta,scaleTetta)

    scene.add(tetra)
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Mousewheel Event
 */
window.addEventListener("wheel", onMouseWheel)

let mousePositionY = 0
let updatePosition = 0

function onMouseWheel(event) {
    mousePositionY = event.deltaY * 0.0007 //smaller number faster scroll speed
}

const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width *2-1 //transfer values from -1 to +1
    mouse.y = -(event.clientY / sizes.height) *2+1 //invert the value
})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update orbit controls
    // controls.update()

    

    //update mousewheel
    updatePosition += mousePositionY
    mousePositionY *= 0.9 //decrease mousewheel speed (smaller = stop faster)
    camera.position.z = updatePosition

    // console.log(mousePositionZ);

    // Render
    // renderer.setClearColor(0xff0000)
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()