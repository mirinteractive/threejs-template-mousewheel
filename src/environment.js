import * as THREE from 'three'

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 0.25, 0)

const textureLoader = new THREE.TextureLoader()
const parameters = {}
parameters.count = 3000
parameters.particleColor = '#f2f2f2'
const particleTexture = textureLoader.load("textures/particles/1.png")

const generateParticles=(scene)=>{
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const scales = new Float32Array(parameters.count * 1)

    const particleColor = new THREE.Color(parameters.particleColor)

    for(let i = 0; i < parameters.count; i++){
        positions[i] = (Math.random() - 0.5) * 30
        colors[i] = Math.random()

        scales[i] = Math.random()*0.8
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

const particleMaterial = new THREE.PointsMaterial({
        size: 0.2,
        sizeAttenuation: true,
        color:'#f2f2f2',
        transparent: true,
        alphaMap: particleTexture,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    const points = new THREE.Points(geometry, particleMaterial)
    points.position.set(0,-5,1)
    scene.add(points)
}

const baseElement =(scene)=>{
    scene.add(ambientLight, directionalLight)
}

export { generateParticles, baseElement }