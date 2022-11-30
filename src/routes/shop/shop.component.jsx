import { Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import {useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import {setCategories } from '../../store/categories/category.action'


import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils'
// import { CategoriesProvider } from '../../contexts/categories.context.jsx'
const Shop = () => {
   const dispatch = useDispatch();

  useEffect(()=> {
    const getCategoriesMap = async()=> {
      const categoriesArray = await getCategoriesAndDocuments();
      // console.log(categoriesArray)
      // console.log(categoryMap);
      dispatch(setCategories(categoriesArray));
      ;
    }
    getCategoriesMap();
  },[])
  
  return (
     // <CategoriesProvider>
    <Routes>
    	<Route index element={<CategoriesPreview />} / >
    	<Route path=":category" element={<Category />} / >
    </Routes>
     // </CategoriesProvider>
  );
};

export default Shop;