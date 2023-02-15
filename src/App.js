
import './App.css';
import Digitbutton from './Digitbutton';
import Operation from './Operation';
import {useReducer} from "react";

export const ACTIONS={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}
  function reducer(state,{type,payload}){


switch(type){
  case ACTIONS.ADD_DIGIT:
    if(state.overwrite){
      return{
        ...state,
        currentOperand:payload.digit,
        overwrite:false
      }
    }
    if(payload.digit==='0'&& state.currentOperand==='0')return state;
    if(payload.digit==='.'&& state.currentOperand.includes(".")){
      return state;
    }
    return{
      ...state,
      currentOperand:`${state.currentOperand || ""}${payload.digit}`,
    
    }
    
    case ACTIONS.CLEAR:
      return{};
      case ACTIONS.CHOOSE_OPERATION:
        if(state.currentOperand==null && state.previousOperand==null){
          return state;
        }
        if(state.currentOperand==null){
          return {
            ...state,
          operation:payload.operation,
        }
      }
        if(state.previousOperand==null){
          return{
...state,
operation:payload.operation,
previousOperand:state.currentOperand,
currentOperand:null

        }

        
      }
      

      return {
        ...state,
        
        previousOperand:evaluate(state),
        operation:payload.operation,
        currentOperand:null
      }
      case ACTIONS.EVALUATE:
        if(state.operation==null||state.currentOperand==null||state.previousOperand==null){
          return state;
        }
        return{
          ...state,
        previousOperand:null,
        overwrite:true,
        currentOperand:evaluate(state),
        operation:null
        }
      case ACTIONS.DELETE_DIGIT:
        if(state.overwrite){
          return {
            ...state,
            currentOperand:null,
            overwrite:false
          }
        }
          
        if(state.currentOperand==null){
          return state;

        }
        return{
          ...state,
          currentOperand:state.currentOperand.slice(0,-1),
        }
      

      
}
}
function evaluate({currentOperand,previousOperand,operation}){
  const current=parseFloat(currentOperand);
  const prev=parseFloat(previousOperand);
  if(isNaN(prev)||isNaN(current)){
    return "";
  }
  let computation="";
  switch(operation){
    case"+":
    computation=prev+current;
    break;
    case "-":
      computation=prev-current;
      break;
      case "*":
      computation=prev*current;
      break;
      case "÷":
      computation=prev/current;
      break;
  }
  return computation;
}
//number formatter
const INTEGER_FORMATTER = new Intl.NumberFormat('en-us',{
maximumFractionDigits:0,
})
 function formatOperand(operand){
  if(operand==null){
    return;
  }
  
  const[integer,decimal]= operand.toString().split(".")
  

 if(decimal==null)return INTEGER_FORMATTER.format(integer)
 return `${INTEGER_FORMATTER.format(integer)}.${decimal}`

}
function App() {
  //usereducer hooks
  const [{currentOperand,previousOperand,operation},dispatch] =   useReducer(
    reducer, 
    {}
    )
  
  return (
    <div className="calculator-grid">
       <div className="output">
        <div className="previous-operand"> {formatOperand(previousOperand)}<br/>{operation}   </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
       </div>
       <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
       <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEl</button>
        <Operation operation ="÷"dispatch={dispatch}/> 
       <Digitbutton digit='1'dispatch={dispatch}/>
       <Digitbutton digit='2'dispatch={dispatch}/>
       <Digitbutton digit='3'dispatch={dispatch}/>
       <Operation operation ="*"dispatch={dispatch}/> 
       <Digitbutton digit='4'dispatch={dispatch}/>
       <Digitbutton digit='5'dispatch={dispatch}/>
       <Digitbutton digit='6'dispatch={dispatch}/>
       <Operation operation ='+'dispatch={dispatch}/> 
       <Digitbutton digit='7'dispatch={dispatch}/>
       <Digitbutton digit='8'dispatch={dispatch}/>
       <Digitbutton digit='9'dispatch={dispatch}/>
       <Operation operation ='-'dispatch={dispatch}/> 
       <Digitbutton digit='.' dispatch={dispatch}/>
       <Digitbutton digit='0' dispatch={dispatch}/>
       <button className="span-two"  onClick={ ()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>

       





    </div>
  );
}

export default App;
