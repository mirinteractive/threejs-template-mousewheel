
let mousePosition = 0
let updatePosition = 0

function onMouseWheel(event: WheelEvent) {
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

function cameraPositionUpdate( cameraPosition: any, cameraRotation: any) {
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

export { onMouseWheel, mousePositionUpdate, mousePositionReset, cameraPositionUpdate }