const windowSetting=(mouse, cameraPosition, cameraRotation)=>{
  if ('ontouchstart' in window){
    window.addEventListener('touchmove', (event)=>{
      mouse.x = (event.touches) ? event.touches[0].clientX : event.clientX;
      mouse.y = (event.touches) ? event.touches[0].clientY : event.clientY;
    });
    }else{
      window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX / window.innerWidth *2-1
        mouse.y = -(event.clientY / window.innerHeight) *2+1
    })
  }
  window.addEventListener("touchstart", touchStart);
  window.addEventListener("touchend", (event)=>{
    touchEnd(event, cameraPosition, cameraRotation)
    cameraControl(cameraPosition, cameraRotation)
  });
  window.addEventListener("wheel", (event)=>{
    mousePosition = event.deltaY * 0.0007
    cameraControl(cameraPosition, cameraRotation)
  })
}
//mouse scroll
let mousePosition = 0
let updatePosition = 0
const scrollAmountReset=(cameraPosition, cameraRotation)=>{
  cameraPosition.set(0,1.2,0)
  cameraRotation.set(0,Math.PI*0.5,0)
}
function mousePositionUpdate() {
    updatePosition += mousePosition
    mousePosition *= 0.9
    console.log(updatePosition);
    if (updatePosition < 0) {
      updatePosition = 0
      mousePosition = 0
  }
}
function mousePositionReset() {
    if (updatePosition < 0) {
        updatePosition = 0
        mousePosition = 0
    }
}
//touch scroll
let startClientY=0
let endClientY=0
const countTouchScroll=()=>{
  updatePosition = updatePosition+mousePosition*0.1
  if (updatePosition < 0) {
    updatePosition = 0
    mousePosition = 0
}
}
const touchStart = (event)=>{
  startClientY = event.touches[0].clientY;
}
const touchEnd = (event)=>{
  endClientY = event.changedTouches[0].clientY;
  mousePosition = Math.round((startClientY-endClientY)/100)
}
function cameraPositionUpdate( cameraPosition, cameraRotation) {
    if(0 <= updatePosition) {
        if( updatePosition < 8) {
          if(updatePosition < 1) {
            cameraRotation.set(0, Math.PI*0.5, 0)
            cameraPosition.set(0,1.2,0)
          }
            cameraRotation.set(0, Math.PI*0.5, 0)
            cameraPosition.x -= mousePosition
        }
        else if ( updatePosition < 15) {
            if (updatePosition < 9) {
                cameraPosition.set(-7, 1.2, 0)
                cameraRotation.set(0, Math.PI*0.5, 0)
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
const cameraControl =(cameraPosition, cameraRotation)=>{
    mousePositionUpdate()
    countTouchScroll()
    cameraPositionUpdate(cameraPosition, cameraRotation)
}
export { scrollAmountReset, windowSetting, cameraControl }