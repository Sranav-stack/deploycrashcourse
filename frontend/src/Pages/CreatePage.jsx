import {React} from 'react';
import {useState} from 'react';
import { Container,VStack,Heading,Box,Input,Button } from "@chakra-ui/react"
import { Toaster, toaster } from "@/components/ui/toaster"
import { useProductStore } from '../store/product';


const CreatePage = () => {
  
  const [newProduct,setNewProduct] = useState({
    name:"",
    price:"",
    image:"",

  });
  /*const toaster=create();*/
  const {createProduct} = useProductStore() 
  const handleAddProduct = async() =>{
    const {success,message} = await createProduct(newProduct);
    if(!success){
        console.log("upto 1 a working point")
        toaster.create({
            title:"Error",
            description: message,
            status:"error",
            isClosable:true,
            type:"error"
        })
    }else{
        console.log("upto 2 a working point")
        toaster.create({
            title:"Success",
            description: message,
            status:"success",
            isClosable:true,
            type:"success"

        })

    }
    setNewProduct({name:"",price:"",image:""})   
    console.log("SUCCESS",success);
    console.log("MESSAGE",message);
    
    /*console.log(newProduct);*/
  };
  return <Container maxW={"container.sm"}>
    <VStack
      spacing={8}
    >
        <Heading as={"hi"} size="2xl" textAlign={"center"} mb={8} color="white">
            Create new Product
        </Heading>
        <Box
          w={"full"}
          p={6} rounded={"lg"} shadow="md"
        >
        <VStack spacing={4}>

        <Input
				  placeholder="Product Name" 
          _placeholder={{ color: "white" }} 
          color="white"
				  name='name'
				  value={newProduct.name}
				  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
			  />
				<Input
					placeholder="Price" 
          _placeholder={{ color: "white" }} 
					name='price'
          color="white"
					type='number'
					value={newProduct.price}
					onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
				/>
				<Input
					placeholder="Image URL" 
          _placeholder={{ color: "white" }} 
					name='image'
          color="white"
					value={newProduct.image}
					onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
				/>
                <Button bg="blue.400" color="white" w="full" onClick={handleAddProduct}>
                    Add Product
                </Button>

            </VStack>

        </Box>
        
    </VStack>

  </Container>
};

export default CreatePage;