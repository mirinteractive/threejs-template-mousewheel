let mousePosition = 0
let updatePosition = 0
let mouseSpeed = 0
let mouseSpeedPercent = 0

function onMouseWheel(event) {
    mousePosition = event.deltaY * 0.0007
    mouseSpeedUpdate()
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

function cameraPositionUpdate( cameraPosition, cameraRotation) {
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
          } 
        //   else if (91 < updatePosition) {
        //       updatePosition = 0
        //       cameraPosition.set(0, 1, 0)
        //   }
      }
  }

export { onMouseWheel, mousePositionUpdate, mousePositionReset, cameraPositionUpdate }