function hasJWT(){
    let flag = false;
  
    localStorage.getItem("access_token") ? flag=true : flag=false
    return flag
  }

export default hasJWT;