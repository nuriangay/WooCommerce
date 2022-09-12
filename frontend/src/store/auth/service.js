import axios from "axios";


const register=async(userData)=>{
    const response=await axios.post('/users/register',userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}
const login=async(userData)=>{
    const response=await axios.post('/users/login',userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

const authService={register,login}

export default authService
