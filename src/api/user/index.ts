import { axiosInstance } from ".."

export const _addUser = async(userData:any)=>{
    const data = {
        email: userData.email,
        name: userData.username,
        uid:userData.uid
    }
    const response = axiosInstance.post("/user",data)
    .then(res=>({
        success:true,
        data:data
    }))
    .catch(err=>{
        console.log(err);
        return {
            success:false,
            data:data
        }
    });

    return response;
}