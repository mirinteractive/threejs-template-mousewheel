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
camera.position.set(0, 1, 0)
camera.rotation.set(0, Math.PI, 0)
scene.add(camera)

// gui.add(camera.position, 'y').min(0).max(10)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

 /**
  * Test scene
  *  EE6C4D
  */
 const planeZ1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), new THREE.MeshBasicMaterial({color: '#f7f7f7'}))
 planeZ1.rotation.set(-Math.PI*0.5, 0, 0)
 planeZ1.position.set(0, 0, 10)
 planeZ1.name = 'planeZ1'

//  const planeZ2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), new THREE.MeshBasicMaterial({color: '#dfe3ee'}))
//  planeZ2.rotation.set(-Math.PI*0.5, 0, 0)
//  planeZ2.position.set(-55, -5, 0)
//  planeZ2.name = 'planeZ2'

//  const planeZ3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 1), new THREE.MeshBasicMaterial({color: '#000000'}))
//  planeZ3.rotation.set(-Math.PI*0.5, 0, 0)
//  planeZ3.position.set(-55, -50, 10.5)
//  planeZ3.name = 'planeZ3'

 const planeY1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), new THREE.MeshBasicMaterial({color: '#3b5998'}))
 planeY1.rotation.set(0, -Math.PI*0.5, 0)
 planeY1.position.set(-20, -10, -20)

 const planeY2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), new THREE.MeshBasicMaterial({color: '#000000'}))
 planeY2.rotation.set(0, Math.PI, 0)
 planeY2.position.set(-50, -10, -3)

 const planeX1 = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), new THREE.MeshBasicMaterial({color: '#dfe3ee'}))
 planeX1.rotation.set(-Math.PI*0.5, 0, 0)
 planeX1.position.set(-15, 0, 25)

//  const planeX2 = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), new THREE.MeshBasicMaterial({color: '#dfe3ee'}))
//  planeX2.rotation.set(-Math.PI*0.5, 0, 0)
//  planeX2.position.set(-30, -5, -5)
//  planeX2.name = 'planeX2'

const planeR1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#ffffff'}))
planeR1.rotation.set(-Math.PI*0.5, 0, 0)
planeR1.position.set(0, 0, 25)

//  const planeR2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#f7f7f7'}))
//  planeR2.rotation.set(-Math.PI*0.5, 0, 0)
//  planeR2.position.set(-45, -5, -5)
//  planeR2.name = 'planeR2'

 scene.add(planeX1, planeZ1, planeY1, planeY2, planeR1)

const textureLoader = new THREE.TextureLoader()

const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')

const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
for (let i=0; i<100; i++) {
    const donut = new THREE.Mesh(donutGeometry, new THREE.MeshMatcapMaterial({ matcap: matcapTexture3}))

    donut.position.x = (Math.random() - 0.5) * 50 - 10
    donut.position.y = (Math.random() - 0.5) * 5 + 1
    donut.position.z = (Math.random() - 0.5) * 50 - 10

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scaleDonut = Math.random()
    donut.scale.set(scaleDonut,scaleDonut,scaleDonut)

    scene.add(donut)
}

const tetraGeometry = new THREE.TetrahedronGeometry(1, 0)
for (let i=0; i<100; i++) {
    const tetra = new THREE.Mesh(tetraGeometry, new THREE.MeshMatcapMaterial({ matcap: matcapTexture4}))

    tetra.position.x = (Math.random() - 0.5) * 50 - 10
    tetra.position.y = (Math.random() - 0.5) * 5 + 1
    tetra.position.z = (Math.random() - 0.5) * 50 - 10

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

let mousePosition = 0
let updatePosition = 0

function onMouseWheel(event) {
    mousePosition = event.deltaY * 0.0007 //smaller number faster scroll speed
}

const mouse = new THREE.Vector2()

function mousePositionUpdate() {
    updatePosition += mousePosition
    mousePosition *= 0.9
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width *2-1 //transfer values from -1 to +1
    mouse.y = -(event.clientY / sizes.height) *2+1 //invert the value
})

/**
 * Animate
 */    
let cameraPosition = camera.position
let cameraRotation = camera.rotation

function cameraPositionUpdate() {
    if(0 <= updatePosition) {
        if( updatePosition < 25) {
            cameraPosition.z += mousePosition
        } 
        else if ( updatePosition < 30) {
            cameraPosition.x -= mousePosition
            cameraRotation.y -= mousePosition*Math.PI*0.5
        }
        else if ( updatePosition < 50) {
            cameraPosition.x -= mousePosition
        }
    }
}

const tick = () =>
{
    mousePositionUpdate()
    cameraPositionUpdate()

    // Render
    // controls.update()
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


