import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";


export default function AdminProductTitle({  product, setFormData, setOpenCreateProductsDialog, setCurrentEditedId, handleDelete,}) {
  return (
        <Card className="w-full max-w-sm mx-auto" >
            <div className="relative">
                <img 
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-200px object-cover rounded-t-lg"
                />
            </div>
            <CardContent>
                <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
                <div className="flex flex-wrap justify-between items-center mb-2">
                    <span className={`${product?.salePrice > 0 ? "line-through" : " "} text-sm sm:text-lg font-semibold text-primary`} >
                        {`₦${new Intl.NumberFormat('en-NG', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }).format(product?.price)}`}
                    </span>
                    {product?.salePrice > 0 ? (
                        <span className="text-sm sm:text-lg font-bold">
                            {`₦${new Intl.NumberFormat('en-NG', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            }).format(product?.salePrice)}`}
                        </span>
                        ) : null}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center" >
                 <Button onClick= {()=> {
                    setOpenCreateProductsDialog(true)
                    setCurrentEditedId(product?._id)
                    setFormData(product)
                 }} > Edit</Button>
                <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
            </CardFooter>
        </Card>
  )
}
