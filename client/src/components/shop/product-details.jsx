import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/store/shop/products-slice";


export default function ProductDetailsDialog({open, setOpen, productDetails}) {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);


    function handleAddToCart(getCurrentProductId, getTotalStock) {
        let getCartItems = cartItems.items || [];
      
        if (getCartItems.length) {
          const indexOfCurrentItem = getCartItems.findIndex(
            (item) => item.productId === getCurrentProductId
          );
          if (indexOfCurrentItem > -1) {
            const getQuantity = getCartItems[indexOfCurrentItem].quantity;
            if (getQuantity + 1 > getTotalStock) {
              toast.error(`Only ${getQuantity} quantity can be added for this item`);
      
              return;
            }
          }
        }
      
        dispatch(
          addToCart({
            userId: user?.id,
            productId: getCurrentProductId,
            quantity: 1,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchCartItems(user?.id));
            toast.success("Product is added to cart");
          }
        });
      }
      
      function hadnleDialogClose(){
        setOpen(false)
        dispatch(setProductDetails())
      }

  return (
    <Dialog open={open} onOpenChange={hadnleDialogClose} >
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]" >
            <div className="relative overflow-hidden rounded-lg">
                <img 
                    src={productDetails?.image}
                    alt={productDetails?.title}
                    width={600}
                    height={600}
                    className="aspect-square w-full object-cover"
                />
            </div>
            <div>
                <div>
                    <h1 className="text-3xl font-extrabold" >{productDetails?.title}</h1>
                    <p className="text-muted-foreground text-xl mb-5 mt-4">{productDetails?.description}</p>
                </div>

                <div className="flex items-center justify-between">
                    <p
                    className={`text-3xl font-bold text-primary ${
                        productDetails?.salePrice > 0 ? "line-through" : ""
                    }`}
                    >
                    ₦{productDetails?.price}
                    </p>
                    {productDetails?.salePrice > 0 ? (
                    <p className="text-2xl font-bold text-muted-foreground">
                        ₦{productDetails?.salePrice}
                    </p>
                    ) : null}
                </div>
                <div className="flex items-center gap-2 mt-2 mb-1">
                    <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-none" />
                    </div>
                    <span className="text-muted-foreground" >(4.5)</span>
                </div>
                <div>
                    <Button onClick={() => handleAddToCart( productDetails?._id, productDetails?.totalStock)}
                     className="w-full mb-5" >Add to Cart</Button>
                </div>

                <Separator />
                <div className="max-h-[300px] overflow-auto">
                    <h2 className="text-xl font-bold mb-4" >Reviews</h2>
                    <div className="grid gap-6">
                        <div className="flex gap-4">
                            <Avatar className="w-10 h-10 border" >
                                <AvatarFallback>TD</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold" >Temi Dayo</h3>
                                </div>
                                <div className="flex items-center gap-0.5">
                                    <StarIcon className="w-5 h-5 fill-primary" />
                                    <StarIcon className="w-5 h-5 fill-primary" />
                                    <StarIcon className="w-5 h-5 fill-primary" />
                                    <StarIcon className="w-5 h-5 fill-primary" />
                                    <StarIcon className="w-5 h-5 fill-none" />
                                </div>
                                <p className="text-muted-foreground" >This is an awesome product</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <Input placeholder="Write a review..." />
                        <Button>Submit</Button>
                    </div>
                </div>
            </div>

        </DialogContent>
    </Dialog>
  )
}
