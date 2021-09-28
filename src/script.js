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
  *  EE6C4D
  */
 const planeTop1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), new THREE.MeshBasicMaterial({color: '#f7f7f7'}))
 planeTop1.rotation.set(-Math.PI*0.5, 0, 0)
 planeTop1.position.set(0, -1, 0)

 const planeElevation1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), new THREE.MeshBasicMaterial({color: '#3b5998'}))
 planeElevation1.position.set(0, -10, -30)
 planeElevation1.name = 'planeElevation1'

 const planeBottom1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#ffffff'}))
 planeBottom1.rotation.set(-Math.PI*0.5, 0, 0)
 planeBottom1.name = 'planeBottom1'

 const planeBottom2 = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), new THREE.MeshBasicMaterial({color: '#dfe3ee'}))
 planeBottom2.rotation.set(-Math.PI*0.5, 0, 0)
 planeBottom2.position.set(-5, 0, -10)
 planeBottom2.name = 'planeBottom2'

 const planeBottom3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), new THREE.MeshBasicMaterial({color: '#f7f7f7'}))
 planeBottom3.rotation.set(-Math.PI*0.5, 0, 0)
 planeBottom3.position.set(-15, 0, 15)

 const groupBottom = new THREE.Group()
 groupBottom.position.set(0, -1, -15)
 groupBottom.add(planeBottom1, planeBottom2, planeBottom3)

 scene.add(planeTop1, planeElevation1, groupBottom)

const textureLoader = new THREE.TextureLoader()

const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')

const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
for (let i=0; i<300; i++) {
    const donut = new THREE.Mesh(donutGeometry, new THREE.MeshMatcapMaterial({ matcap: matcapTexture3}))

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
    const tetra = new THREE.Mesh(tetraGeometry, new THREE.MeshMatcapMaterial({ matcap: matcapTexture4}))

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
const rayDirectionZ = new THREE.Vector3(0,-1,0)
rayDirectionZ.normalize()
// raycasterZ.far = 10

const raycasterY = new THREE.Raycaster()
const rayDirectionY = new THREE.Vector3(0,0,-1)
rayDirectionY.normalize()
// raycasterY.far = 10

const raycasterX = new THREE.Raycaster()
const rayDirectionX = new THREE.Vector3(0,-1,0)
rayDirectionX.normalize()
// raycasterX.far = 10

const intersectObjectsZ = [planeTop1, planeBottom1, planeBottom3]
const intersectObjectsY = [planeElevation1]
const intersectObjectsX = [planeBottom2]

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
    raycasterZ.set(rayOrigin, rayDirectionZ)
    raycasterY.set(rayOrigin, rayDirectionY)
    raycasterX.set(rayOrigin, rayDirectionX)

    const intersectZ = raycasterZ.intersectObjects(intersectObjectsZ)
    const intersectY = raycasterY.intersectObjects(intersectObjectsY)
    const intersectX = raycasterX.intersectObjects(intersectObjectsX)

    for(const intersect of intersectZ){
        mousePositionZ()
        cameraPosition.z = updatePositionZ
        // cast = true
        if(intersect.object.name === 'planeBottom1'){
            mouseRotationY()
            cameraRotation.y = updateRotationY*-(Math.PI*0.05)
            console.log('hgeehehehe');
        }
    }

    for(const intersect of intersectX){
        mousePositionX()
        cameraPosition.x = updatePositionX
        // cast = true
        console.log('happy');
    }

    // if(cast != true) { 
    //     for(const intersect of intersectY){
    //         mousePositionY()
    //         cameraPosition.y = updatePositionY
    //         if(intersect.object.name === 'planeElevation1'){
    //             mouseRotationY()
    //             cameraRotation.y = updateRotationY*-(Math.PI*0.08)
    //             mousePositionX()
    //             cameraPosition.x = updatePositionX*(Math.PI*0.1)
    //         }
    //     }
    // }

    scene.add(new THREE.ArrowHelper(raycasterX.ray.direction, raycasterX.ray.origin, 300, 0xff0000) );
    // scene.add(new THREE.ArrowHelper(raycasterY.ray.direction, raycasterY.ray.origin, 300, 0x0000ff) );

    // Render
    // controls.update()
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()