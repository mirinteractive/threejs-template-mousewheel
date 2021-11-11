import * as THREE from 'three'

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 0.25, 0)

const textureLoader = new THREE.TextureLoader()

const particlesGeometry = new THREE.SphereGeometry(1,32,32)
const particlesCount = 8000
const particlePositions = new Float32Array(particlesCount*3)
const particleColors = new Float32Array(particlesCount*3)
const particleTexture = textureLoader.load("/textures/particles/1.png")
for(let i=0; i <particlesCount*3; i++){
    particlePositions[i] = (Math.random() - 0.5) * 10
    particleColors[i] = Math.random()
}
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.04,
    sizeAttenuation: true,
    color:'#0090f0',
    transparent: true,
    alphaMap: particleTexture,
    //alphaTest: 0.001
    //depthTest: false
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
})
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))
const particles = new THREE.Points(particlesGeometry, particlesMaterial)

const base = [ambientLight, directionalLight]
const background = [particles]

export { base, background }