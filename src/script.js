import './style.css'
import * as THREE from 'three'
import * as environment from './environment.js'
import * as animation from './animation.js'

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
window.addEventListener("wheel", animation.onMouseWheel)
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
const tetraGeometry = new THREE.TetrahedronGeometry(1, 0)

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

const mouse = new THREE.Vector2()
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 1, 0)
scene.add(camera)

let cameraPosition = camera.position
let cameraRotation = camera.rotation

const tick = () =>
{
    animation.mousePositionUpdate()
    animation.mousePositionReset()
    animation.cameraPositionUpdate(cameraPosition, cameraRotation)

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()


