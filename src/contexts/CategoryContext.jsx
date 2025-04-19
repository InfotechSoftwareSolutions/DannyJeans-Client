import { createContext, useContext, useEffect, useState } from "react";
import UserService from "../services/user-api-service/UserService";

// Create Context
export const CategoryContext = createContext();

// Provider Component
export const CategoryProvider = ({ children }) => {
    const {getFilterProducts } = UserService();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData= async()=> {
      try {
        const response = await getHomePageData();
        console.log(response,"datas");
        setProducts(response.data);
        // const newArr = response?.newArrivedProducts.slice(0,2); // Removes the first 3 elements
        // setNewArrival(newArr)
        
      } catch (error) {
        
      }
    }
  

    const filterProducts= async(categoryId )=> {
      try {
        console.log(categoryId,'categoryId');
        
        const response = await getFilterProducts(categoryId );
        console.log(response,'filterProducts');
        
        console.log(response,"datas");
        setProducts(response.product);
        // const newArr = response?.newArrivedProducts.slice(0,2); // Removes the first 3 elements
        // setNewArrival(newArr)
        
      } catch (error) {
        
      }
    }

  return (
    <CategoryContext.Provider value={{products,setProducts, selectedCategory, setSelectedCategory ,filterProducts}}>
      {children}
    </CategoryContext.Provider>
  );
};
