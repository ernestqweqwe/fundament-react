import React from 'react'
import classes from './MyInput.module.css'

const MyInput=React.forwardRef((props, ref)=> {
  return (
    <input ref={ref} className={classes.myInput} type="text" {...props}/> 
  )
})
// При использовании useRef, реакт ругается на созданые самими компоненты, для этого наш 
// компонент нужно обернуть конструкцией React.forwardRef, так же передать в пропсы ref 
// и вставить в самом компоненте

export default MyInput
