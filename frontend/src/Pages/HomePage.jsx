import {React,useEffect} from 'react';
import { Text,Container,VStack, SimpleGrid } from "@chakra-ui/react"
import {Link} from "react-router-dom"
import { useProductStore } from '../store/product';
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const {fetchProducts,products} = useProductStore();
  useEffect(()=>{
    fetchProducts();
  },[fetchProducts]);
  console.log("Products",products)
  return (
  
  <Container maxW="container.xl"  py={12}>
    <VStack spacing={8}>
    <Text
          
          fontSize="2xl"
          fontWeight="bold"
          textAlign="right"
          style={{
            background: "linear-gradient(to right, cyan, blue)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            display:"inline"
          }}
    >
      Current Products 
      <Text as="span" fontSize="2xl" fontWeight="bold"
        style={{
            background: "transparent",
            WebkitBackgroundClip: "text",
            color:"green"
        }}

       >🚀</Text>
          
    </Text>
    
    <SimpleGrid
        columns={{
            base:1,
            md:2,
            lg:3
        }}
        spacing={10}
        w="full"
    >
        {products.map((product)=>(
            <ProductCard key={product._id} product={product}/>
        ))}


    </SimpleGrid>
    
    {products.length===0 && (
            <Text fontSize="xl" textAlign="center" fontWeight="bold" color="white">
            No Products Found 😢
            <Link to="/create">
              <Text as="span" color="blue.500" _hover={{textDecoration:"underline"}}>
                Create a Product
              </Text>
            </Link>
        </Text>
    )}

    </VStack>

  </Container>

  );
};

export default HomePage;