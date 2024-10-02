"use client";

// PROJECT IMPORTS
//import AddNewProduct from 'views/apps/AddNewProduct';
import dynamic from "next/dynamic";

const DynamicBundledEditor = dynamic(() => import("../../components/BundledEditor"), {
  ssr: false,
});
import PreviewContainer from 'feature/preview/preview'

// ==============================|| ECOMMERCE - ADD PRODUCT ||============================== //

function AddNewProductPage() {
  return <PreviewContainer />;
}

export default AddNewProductPage;
