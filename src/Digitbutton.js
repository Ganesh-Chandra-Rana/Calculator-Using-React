import {ACTIONS} from './App'


function Digitbutton({dispatch,digit}) {
  return (
    
   <button 
   onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>
    {digit}
   </button>
   
  )
}
export default Digitbutton;