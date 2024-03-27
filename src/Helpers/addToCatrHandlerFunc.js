import { toast } from "react-toastify";

export const addCartHandler = async (addToCart, id) => {
    
    await addToCart(id)
        .then((res) => {
            toast.success(`${res.data.message}`);
        })
        .catch((err) => {
            toast.error('Error Adding Product To Cart');
        });
};