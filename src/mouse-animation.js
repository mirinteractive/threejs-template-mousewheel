let mousePosition = 0
let updatePosition = 0

function onMouseWheel(event) {
    mousePosition = event.deltaY * 0.0007
    console.log('mousePosition', mousePosition);
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

//touch scroll
let scrollAmount = 0
let startClientY=0
let endClientY=0
let touchScrollAmount=0

const countTouchScroll=()=>{
  scrollAmount = scrollAmount+touchScrollAmount
  if (scrollAmount<0){
    scrollAmount = 0
  }
}
const touchStart = (event)=>{
  startClientY = event.touches[0].clientY;
}

const touchEnd = (event)=>{
  endClientY = event.changedTouches[0].clientY;
  touchScrollAmount = Math.round((startClientY-endClientY)/100)*5
  countTouchScroll()
}

const onTouchScroll=()=>{
  touchScrollAmount = startClientY-endClientY
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

export { 
  onMouseWheel, mousePositionUpdate, mousePositionReset, 
  touchStart, touchEnd, onTouchScroll,
  cameraPositionUpdate 
}