import { axiosInstance } from ".."

export const _getAllCategories = async()=>{
    const response = await axiosInstance.get("/api/v1/categories");
    if(response.status === 200)return response.data;
    return []
}