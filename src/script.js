import './style.css'
import * as THREE from 'three'
import * as environment from './environment.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const sizes = { width: window.innerWidth, height: window.innerHeight}
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
window.addEventListener("wheel", onMouseWheel)
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width *2-1
    mouse.y = -(event.clientY / sizes.height) *2+1 
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

environment.floor.map(x => {scene.add(x)})

const textureLoader = new THREE.TextureLoader()
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')

const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
for (let i=0; i<100; i++) {
    const donut = new THREE.Mesh(donutGeometry, new THREE.MeshMatcapMaterial({ matcap: matcapTexture3}))

    donut.position.x = (Math.random() - 0.5) * 40 - 5
    donut.position.y = (Math.random() - 0.5) * 5 + 1
    donut.position.z = (Math.random() - 0.5) * 50 + 20

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scaleDonut = Math.random()
    donut.scale.set(scaleDonut,scaleDonut,scaleDonut)

    scene.add(donut)
}

const tetraGeometry = new THREE.TetrahedronGeometry(1, 0)
for (let i=0; i<100; i++) {
    const tetra = new THREE.Mesh(tetraGeometry, new THREE.MeshMatcapMaterial({ matcap: matcapTexture4}))

    tetra.position.x = (Math.random() - 0.5) * 40 - 5
    tetra.position.y = (Math.random() - 0.5) * 5 + 1
    tetra.position.z = (Math.random() - 0.5) * 50 + 20

    tetra.rotation.x = Math.random() * Math.PI
    tetra.rotation.y = Math.random() * Math.PI

    const scaleTetta = Math.random() * 0.5
    tetra.scale.set(scaleTetta,scaleTetta,scaleTetta)

    scene.add(tetra)
}

let mousePosition = 0
let updatePosition = 0
const mouse = new THREE.Vector2()

function onMouseWheel(event) {
    mousePosition = event.deltaY * 0.0007
}

function mousePositionUpdate() {
    updatePosition += mousePosition
    mousePosition *= 0.9
}

function mousePositionReset() {
    if (updatePosition < 0) {
        updatePosition = 0
        mousePosition = 0
    }
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 1, 0)
scene.add(camera)

/** 
 * Animate
 */    
let cameraPosition = camera.position
let cameraRotation = camera.rotation

function cameraPositionUpdate() {
    if(0 <= updatePosition) {
        if( updatePosition < 10) {
            cameraRotation.set(0, Math.PI, 0)
            cameraPosition.z += mousePosition
        } else if ( updatePosition < 15) {
            if (updatePosition < 11) {
                cameraPosition.set(0, 1, 10)
            }
            cameraPosition.x -= mousePosition
            cameraPosition.z += mousePosition
            cameraRotation.y -= mousePosition*Math.PI*0.1
        } else if ( updatePosition < 25) {
            if (updatePosition < 16) {
                cameraRotation.set(0, Math.PI*0.55, 0)
                cameraPosition.set(-5, 1, 15)
            }
            cameraPosition.x -= mousePosition
        } else if ( updatePosition < 30 ) {
            cameraPosition.x -= mousePosition
            cameraPosition.z += mousePosition
            cameraRotation.y += mousePosition*Math.PI*0.1
        } else if ( updatePosition < 45 ) {
            cameraRotation.set(0, Math.PI, 0)
            cameraPosition.z += mousePosition
            cameraPosition.y -= mousePosition*0.1
        } else if ( updatePosition < 50 ) {
            cameraPosition.x += mousePosition
            cameraPosition.z += mousePosition
            cameraRotation.y += mousePosition*Math.PI*0.1
        } else if ( updatePosition < 55 ) {
            cameraPosition.x += mousePosition
            cameraPosition.z -= mousePosition
            cameraRotation.y += mousePosition*Math.PI*0.1
        } else if ( updatePosition < 70 ) {
            cameraRotation.set(0, Math.PI*0.01, 0)
            cameraPosition.z -= mousePosition
        } else if (updatePosition < 85) {
            if (updatePosition < 71) {
                cameraPosition.set(-8.7, 0, 20)
            }
            cameraPosition.z -= mousePosition
            cameraPosition.x += mousePosition*Math.PI*0.1
        } else if (updatePosition < 92) {
            cameraPosition.z -= mousePosition
            cameraPosition.x -= mousePosition*Math.PI*0.1
        } else if (91 < updatePosition) {
            updatePosition = 0
            cameraPosition.set(0, 1, 0)
        }
    }
}

const tick = () =>
{
    mousePositionUpdate()
    mousePositionReset()
    cameraPositionUpdate()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()


