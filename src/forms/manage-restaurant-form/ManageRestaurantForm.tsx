import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import DetailsSection from "./DetailsSection";
import { Separator } from "@radix-ui/react-separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";


const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant name is required"
    }),
    city: z.string({ 
        required_error: "City is required"
    }),
    country: z.string({
        required_error: "Country is required"
    }),
    deliveryPrice: z.coerce.number({
        required_error: "Delivery price is required",
        invalid_type_error: "Delivery price must be a valid number"
    }),
    estimatedDelivaryTime: z.coerce.number({
        required_error: "Estimated delivary time is required",
        invalid_type_error: "Estimated delivary time must be a valid number"
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "Please select at least one item"
    }),
    menuItems: z.array(
        z.object({
            name: z.string().min(1,"name is required"),
            price: z.coerce.number().min(1,"price is required")
        })
    ),
});
type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData:RestaurantFormData)=>void;
    isLoading:boolean;
}

const ManageRestaurantForm = ({onSave , isLoading , restaurant}:Props)=>{
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            cuisines: [],
            menuItems: [ {name: "",price: 0} ]
        }
    });

    useEffect(() => {
        if (!restaurant) {
        return;
        }
    
        // price lowest domination of 100 = 100pence == 1GBP
        /*const deliveryPriceFormatted = parseInt(
        (restaurant.deliveryPrice / 100).toFixed(2)
        );
    
        const menuItemsFormatted = restaurant.menuItems.map((item) => ({
        ...item,
        price: parseInt((item.price / 100).toFixed(2)),
        }));
    
        const updatedRestaurant = {
        ...restaurant,
        deliveryPrice: deliveryPriceFormatted,
        menuItems: menuItemsFormatted,
        };*/
    
        form.reset(restaurant);
    }, [form, restaurant]);
    /*const OnSubmit = (formDataJson:RestaurantFormData)=>{
        const formData = new FormData();

        formData.append("restaurantName" , formDataJson.restaurantName);
        formData.append("city" , formDataJson.city);
        formData.append("country" , formDataJson.country);
        formData.append("deliveryPrice" , (formDataJson.deliveryPrice*100).toString());
        formData.append("estimatedDelivaryTime" , formDataJson.estimatedDelivaryTime.toString());

        formDataJson.cuisines.forEach((cuisine , index)=>{
            formData.append(`cuisines[${index}]` , cuisine)
        });

        formDataJson.menuItems.forEach((menuItem , index)=>{
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(`menuItems[${index}][price]`, (menuItem.price*100).toString());
        })
        onSave(formData);
    };*/
    return(
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSave)}
            className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <DetailsSection/>
                <Separator/>
                <CuisinesSection/>
                <Separator/>
                <MenuSection/>
                {isLoading ? (<LoadingButton/> )
                :(<Button type="submit" className="bg-orange-500">Submit</Button>) }
            </form>
        </Form>
    )
}

export default ManageRestaurantForm;