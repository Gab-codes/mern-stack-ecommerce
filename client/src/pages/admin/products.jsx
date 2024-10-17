import ProductImageUpload from "@/components/admin/image-upload";
import AdminProductTile from "@/components/admin/product-title";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null); 

  
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  
  function onSubmit(event) {
    event.preventDefault();

    if (currentEditedId !== null) {
      
      dispatch(editProduct({ id: currentEditedId, formData }))
        .then((data) => handleAfterSubmit(data, "edit"));
    } else {
      
      dispatch(addNewProduct({ ...formData, image: uploadedImageUrl }))
        .then((data) => handleAfterSubmit(data, "add"));
    }
  }

  
  function handleAfterSubmit(data, action) {
    if (data?.payload?.success) {
      dispatch(fetchAllProducts()); 
      setFormData(initialFormData); 
      setOpenCreateProductsDialog(false); 
      setCurrentEditedId(null); 

      
      const message = action === "add" ? "Product added successfully" : "Product updated successfully";
      toast.success(message);
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }

  
  function handleDelete(productId) {
    dispatch(deleteProduct(productId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast.success("Product deleted successfully.");
      } else {
        toast.error("Failed to delete the product.");
      }
    });
  }

  
  function isFormValid() {
    return Object.keys(formData)
      .filter((key) => key !== "averageReview" && key !== "salePrice") 
      .every((key) => formData[key] !== ""); 
  }

  
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>


      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
      </div>


      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem.id}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>


      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null); 
          setFormData(initialFormData); 
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

    
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

    
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()} 
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
