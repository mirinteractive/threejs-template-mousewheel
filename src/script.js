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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Load Images
 */
const frame = new THREE.PlaneBufferGeometry(1, 1)

for(let i=0; i<4; i++){
    const loadImages = new THREE.MeshBasicMaterial({
        map: textureLoader.load(`/images/${i}.jpeg`)
    })

    const images = new THREE.Mesh(frame, loadImages)
    images.position.set(Math.random(), i*-1.8)

    scene.add(images)
}

let objects = []

scene.traverse((object) => {
    if (object.isMesh) {
        objects.push(object)
    }
})

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

gui.add(camera.position, 'y').min(-5).max(10)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
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
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update orbit controls
    // controls.update()

    //Raycaster
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(objects)

    for(const intersect of intersects){
        // intersect.object.scale.set(1.1, 1.1)
        gsap.to(intersect.object.scale, {x:1.7, y:1.7})
        gsap.to(intersect.object.rotation, {y:-0.5})
        gsap.to(intersect.object.position, {z:-0.9})
    }

    //inverse of casting objects
    for(const object of objects){
        if (!intersects.find(intersect => intersect.object === object)) {
            // object.scale.set(1,1)
            gsap.to(object.scale, {x:1, y:1})
            gsap.to(object.rotation, {y:0})
            gsap.to(object.position, {z:0})
        }
    }

    //update mousewheel
    updatePosition += mousePositionY
    mousePositionY *= 0.9 //decrease mousewheel speed (smaller = stop faster)
    camera.position.y = -updatePosition

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()