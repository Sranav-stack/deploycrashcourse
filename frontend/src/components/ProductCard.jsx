"use client"
import React from 'react';
import { useState } from "react"
import {
  Box,
  Input,
  Button,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogActionTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { BiEdit,BiTrash } from "react-icons/bi";
import {  toaster } from "@/components/ui/toaster"
import { useProductStore } from "../store/product";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteProduct,updateProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
      type: success ? "success" : "error",
    });
  };
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    useProductStore.getState() // Update store
    toaster.create({
        title: success ? "Success" : "Error",
        description: message,
        status: success ? "success" : "error",
        isClosable: true,
        type: success ? "success" : "error",
      });

        
 };



  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      p={4}
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
    >
    {/* Action Buttons */}
    <HStack mt={4} spacing={2}>
    <Button
          onClick={() => handleDeleteProduct(product._id)}
          bg="transparent"
          _hover={{ bg: "red.100" }}
          aria-label="Delete Product"
        >
          <BiTrash style={{ color: "red", fontSize: "20px" }} />
        </Button>
      <DialogRoot isOpen={isOpen} onClose={onClose}>
        <DialogTrigger asChild>
            <Button
                //variant="outline"
                //size="sm"
                onClick={onOpen}
                bg="transparent"
                _hover={{ bg: "red.100" }}
            aria-label="Edit Product"
            >
            <BiEdit style={{ color: "blue", fontSize: "20px" }} />
            </Button>
        </DialogTrigger >
        <DialogContent maxW="sm" borderRadius="md" p={4} bg="white">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p>Edit the details of your product here.</p>
            <VStack spacing={4}>
				<Input
					placeholder='Product Name'
					name='name'
					value={updatedProduct.name}
					onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
				/>
				<Input
					placeholder='Price'
					name='price'
					type='number'
					value={updatedProduct.price}
					onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
				/>
				<Input
					placeholder='Image URL'
					name='image'
					value={updatedProduct.image}
					onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
				/>
			</VStack>
          </DialogBody>
          <DialogFooter>
            <DialogCloseTrigger asChild>
            <Button
               variant="outline"
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                style={{
                 display: "block",
                 margin: "20px auto",
                 padding: "10px 20px",
                 backgroundColor: "#007bff",
                 color: "#fff",
                 border: "2px solid #007bff",
                 borderRadius: "5px",
                 fontSize: "16px",
                 textAlign: "center",
                 cursor: "pointer",
                 transition: "background-color 0.3s, border-color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
            Update
            </Button>
            </DialogCloseTrigger>
          </DialogFooter>
        </DialogContent>
        </DialogRoot>


    </HStack>
      {/* Product Image */}
      <Image
        src={product.image}
        alt={product.name}
        borderRadius="md"
        mb={4}
        w="100%"
        objectFit="cover"
      />

      {/* Product Details */}
      <VStack align="start" spacing={2}>
        <Heading as="h4" size="md" color="white">
          {product.name}
        </Heading>
        <Text fontSize="lg" fontWeight="bold" color="white">
          ${product.price}
        </Text>
      </VStack>



      {/* Dialog for Edit/Update */}

    </Box>
  );
};

export default ProductCard;
