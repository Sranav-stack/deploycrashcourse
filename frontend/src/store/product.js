import {create} from "zustand"

export const useProductStore = create((set)=>({
    products : [],
    setProducts: (products)=> set({products}),
    createProduct : async (newProduct) =>{
        if( !newProduct.name || !newProduct.image || !newProduct.price){
            return {success:false,message:"Please fill in all fields"}
        }
        /*console.log("point 1")*/
        const res = await fetch("/api/products",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct),
            
        })
        /*console.log("point2")*/
        const data = await res.json();
        set ((state)=>({products:[...state.products,data.data]}))
        return {success:true,message:"The details are succesfully filled"}
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
		const data = await res.json();
		set({ products: data.message });
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`,{
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success:false,message:data.message};

        //update the products directly without needing to refresh
        set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
        return {success:true,message:data.message}

    },
    updateProduct: async (pid, updatedProduct) => {
        console.log("here we are")
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
        if (!data.message) {
            console.error("Error: Response does not include 'data'.", data);
            return { success: false, message: "Invalid server response" };
        }
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
        console.log("second pt");
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.message : product)),
		}));
		return { success: true, message: "product updated succesfully"};
	},
    
}))

/*const [state,setState] = useState()*/