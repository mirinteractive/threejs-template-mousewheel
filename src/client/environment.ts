import * as THREE from 'three'

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 0.25, 0)

const planeZ1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#dfe3ee'}))
planeZ1.rotation.set(-Math.PI*0.5, 0, 0)
planeZ1.position.set(0, 0, 5)

const planeZ2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#dfe3ee'}))
planeZ2.rotation.set(-Math.PI*0.5+0.1, 0, 0)
planeZ2.position.set(-20, -0.5, 25)

const planeZ3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#dfe3ee'}))
planeZ3.rotation.set(-Math.PI*0.5, 0, 0)
planeZ3.position.set(-10, -1, 25)

const planeZ4 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#dfe3ee'}))
planeZ4.rotation.set(-Math.PI*0.5, 0, 0)
planeZ4.position.set(-10, -1, 15)

const planeZ5 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#dfe3ee'}))
planeZ5.rotation.set(-Math.PI*0.5, 0, 0)
planeZ5.position.set(-10, -1, 5)

const planeX1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#f7f7f7'}))
planeX1.rotation.set(-Math.PI*0.5, 0, 0)
planeX1.position.set(-10, 0, 15)

const planeY1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#3b5998'}))
//  planeY1.rotation.set(0, Math.PI*0.5, 0)
planeY1.position.set(-10, -1, 0)

const planeR1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#ffffff'}))
planeR1.rotation.set(-Math.PI*0.5, 0, 0)
planeR1.position.set(0, 0, 15)

const planeR2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#ffffff'}))
planeR2.rotation.set(-Math.PI*0.5, 0, 0)
planeR2.position.set(-20, 0, 15)

const planeR3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#ffffff'}))
planeR3.rotation.set(-Math.PI*0.5, 0, 0)
planeR3.position.set(-20, -1, 35)

const planeR4 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({color: '#ffffff'}))
planeR4.rotation.set(-Math.PI*0.5, 0, 0)
planeR4.position.set(-10, -1, 35)


const base = [ambientLight, directionalLight]
const floor = [planeZ1, planeZ2, planeZ3, planeZ4, planeZ5, planeX1, planeY1, planeR1, planeR2, planeR3, planeR4]

export { base, floor }