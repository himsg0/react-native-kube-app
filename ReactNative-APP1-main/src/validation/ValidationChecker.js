import Regex from "./ValidationRegex";

const ValidationCheck = (reg, value)=>{
    if(value?.length==0)
        return Regex[reg].empty;
    
    else if(Regex[reg]?.pattern?.test(value)==false)
        return Regex[reg].error;
    
    else
        return ''
}

export default ValidationCheck;