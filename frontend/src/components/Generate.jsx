import React, {useState, useEffect} from "react";
import api from "../api/api";
import "./style.css"
import MainLayout from "./Layout";


function Generate(){
    

  return (
    <MainLayout>
      <div>
        <label>Number of Images</label>  
        <input/>
        {/* <ControlledSlider/> */}
        <button>Generate</button>
      </div>
    </MainLayout>
    
      
  );
  
}


export default Generate;