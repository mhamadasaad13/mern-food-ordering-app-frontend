import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = ()=>{
    const {getAccessTokenSilently} =useAuth0();
    const GetMyRestaurant = async ():Promise<Restaurant>=>{
        const accesstoken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant` , {
            method: "GET",
            headers: {
                Authorization : `Bearer ${accesstoken}`,
                "Content-Type" : "application/json"
            },
        }) 
        if(!response.ok){
            throw new Error("Failed to get restaurant");
        }
        return response.json();
    }
    const { data:restaurant,isLoading,} = useQuery(
        "fetchCurrentRestaurant" , 
        GetMyRestaurant);
        
    return{ restaurant,isLoading }
}

export const useCreateMyRestaurant = ()=>{
    const {getAccessTokenSilently} = useAuth0();
    const createMyRestaurantRequest = async (restaurantFormData:any)=>{
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type" : "application/json"
            },
            body: JSON.stringify(restaurantFormData),
        }); 
        if(!response.ok){
            throw new Error("Failed to create restaurant");
        }
        
    }
    const {
        mutate: createRestaurant,
        isLoading,
        isSuccess,
        error,
    } = useMutation(createMyRestaurantRequest);
    
    if (isSuccess) {
        toast.success("Restaurant created!");
    }
    
    if (error) {
        toast.error("Unable to update restaurant");
    }
    
    return { createRestaurant, isLoading };
}

export const useUpdateMyRestaurant = ()=>{
    const {getAccessTokenSilently} = useAuth0();
    const UpdateMyRestaurant = async (restaurant:any):Promise<Restaurant>=>{
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant` , {
            method: "PUT",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(restaurant),
        });
        if(!response.ok){
            throw new Error("Failed to update restaurant");
        }
        return response.json();
    }

    const {mutate:updateRestaurant 
            , isLoading 
            , error 
            , isSuccess} = useMutation(UpdateMyRestaurant);
    
    if(error){
        toast.error("Unable to update restaurant");
    }
    if(isSuccess){
        toast.success("Restaurant updated");
    }

    return {updateRestaurant , isLoading};
}