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
  * E5D352 EE6C4D
  */
 const plane1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 30), new THREE.MeshBasicMaterial({color: '#C9CBA3'}))
 plane1.position.set(0, -1, 0)
 plane1.rotation.set(-Math.PI*0.5, 0, 0)

 const plane2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), new THREE.MeshBasicMaterial({color: '#FFE1A8'}))
 plane2.position.set(0, -10, -25)

 const plane3 = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), new THREE.MeshBasicMaterial({color: '#E26D5C'}))
 plane3.position.set(-15, -20, -15)
 plane3.rotation.set(-Math.PI*0.5, 0, 0)

 scene.add(plane1, plane2, plane3)

const textureLoader = new THREE.TextureLoader()

const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png')
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png')

const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
for (let i=0; i<300; i++) {
    const donut = new THREE.Mesh(donutGeometry, new THREE.MeshMatcapMaterial({ matcap: matcapTexture7}))

    donut.position.x = (Math.random() - 0.5) * -60
    donut.position.y = (Math.random() - 0.5) * 30
    donut.position.z = (Math.random() - 0.5) * 30

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scaleDonut = Math.random()
    donut.scale.set(scaleDonut,scaleDonut,scaleDonut)

    scene.add(donut)
}

const tetraGeometry = new THREE.TetrahedronGeometry(1, 0)
for (let i=0; i<300; i++) {
    const tetra = new THREE.Mesh(tetraGeometry, new THREE.MeshMatcapMaterial({ matcap: matcapTexture8}))

    tetra.position.x = (Math.random() - 0.5) * -60
    tetra.position.y = (Math.random() - 0.5) * 30
    tetra.position.z = (Math.random() - 0.5) * 30

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
let updatePositionZ = 0
let updatePositionY = 0
let updatePositionX = 0
let updateRotationY = 0

function onMouseWheel(event) {
    mousePosition = event.deltaY * 0.0007 //smaller number faster scroll speed
}

const mouse = new THREE.Vector2()

// ToDo:
// 이 더러운것들 생성자나 함수 하나만 써서 묶어주기...
function mousePositionZ() {
    updatePositionZ += mousePosition
    mousePosition *= 0.9
}

function mousePositionY() {
    updatePositionY += mousePosition
    mousePosition *= 0.9
}

function mousePositionX() {
    updatePositionX += mousePosition
    mousePosition *= 0.9
}

function mouseRotationY() {
    updateRotationY += mousePosition
    mousePosition *= 0.9
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width *2-1 //transfer values from -1 to +1
    mouse.y = -(event.clientY / sizes.height) *2+1 //invert the value
})

/**
 * Raycaster
 */
const raycasterZ = new THREE.Raycaster()
const rayDirectionZ = new THREE.Vector3(0.1,-1,0.1)
rayDirectionZ.normalize()

const raycasterY = new THREE.Raycaster()
const rayDirectionY = new THREE.Vector3(0,-1,-5)
rayDirectionY.normalize()

const intersectObjectsZ = [plane1]
const intersectObjectsY = [plane2]

/**
 * Animate
 */
const tick = () =>
{
    let cameraPosition = camera.position
    let cameraRotation = camera.rotation

    //Raycaster
    let cast = false
    const rayOrigin = new THREE.Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z)

    //ToDo:
    //ray near far & ray direction 맞게 설정해주기
    raycasterZ.set(rayOrigin, rayDirectionZ)
    raycasterY.set(rayOrigin, rayDirectionY)

    const intersect1 = raycasterZ.intersectObjects(intersectObjectsZ)
    const intersect2 = raycasterY.intersectObjects(intersectObjectsY)

    //camera movement to z axis at specific direction
    for(const intersect of intersect1){
        mousePositionZ()
        cameraPosition.z = updatePositionZ
        cast = true
    }

    if(cast != true) { 
        //default camera movement = y axis
        mousePositionY()
        cameraPosition.y = updatePositionY
        for(const intersect of intersect2){
            //x position 움직이는 로직
            // mousePositionX()
            // //-updatePositionX하면 반대로 이동
            // cameraPosition.x = updatePositionX
            mouseRotationY()
            cameraRotation.y = updateRotationY*(Math.PI*0.092)
        }
    }

    scene.add(new THREE.ArrowHelper(raycasterZ.ray.direction, raycasterZ.ray.origin, 300, 0xff0000) );
    scene.add(new THREE.ArrowHelper(raycasterY.ray.direction, raycasterY.ray.origin, 300, 0x0000ff) );

    // Render
    // controls.update()
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()