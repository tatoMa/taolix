import {useEffect} from "react";

export const useFocus=(focusRef)=>{

    useEffect(()=>{
        if(focusRef.current){
            focusRef.current?.focus();
        }
    },[focusRef])
    return focusRef;
}