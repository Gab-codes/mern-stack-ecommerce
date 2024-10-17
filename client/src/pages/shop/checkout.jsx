import Address from "@/components/shop/address";
import img from "../../assets/account.jpeg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shop/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "react-toastify";


function ShopCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { paymentURL, isLoading } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();

  const totalCartAmount = cartItems?.items?.reduce(
    (sum, currentItem) =>
      sum +
      (currentItem.salePrice > 0 ? currentItem.salePrice : currentItem.price) *
        currentItem.quantity,
    0
  ) || 0;

  // Paystack payment initiation
  function handleInitiatePaystackPayment() {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed.");
      return;
    }

    if (!currentSelectedAddress) {
      toast.error("Please select an address to proceed.");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      email: user?.email,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        state: currentSelectedAddress?.state,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paystack",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      reference: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
        toast.error("Payment initiation failed. Please try again.");
      }
    });
  }

  // Cash on Delivery (COD) order processing
  function handleCashOnDelivery() {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed.");
      return;
    }

    if (!currentSelectedAddress) {
      toast.error("Please select an address to proceed.");
      return;
    }

    // Check if the address state is "Lagos"
    if (currentSelectedAddress?.state?.toLowerCase() !== "lagos") {
      toast.error("Cash on Delivery is only available within Lagos.");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      email: user?.email,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        state: currentSelectedAddress?.state,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "cash_on_delivery",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      reference: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Order placed successfully with Cash on Delivery.");
        // Optionally redirect to orders page or show success message
      } else {
        toast.error("Failed to place the order. Please try again.");
      }
    });
  }

  // Use effect to handle Paystack payment URL redirection
  useEffect(() => {
    if (paymentURL) {
      window.location.href = paymentURL;
    }
  }, [paymentURL]);

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0 &&
            cartItems.items.map((item) => (
              <UserCartItemsContent key={item._id} cartItem={item} />
            ))}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">
                {`₦${totalCartAmount.toFixed(2)}`}
              </span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatePaystackPayment}
              className="w-full"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading || isPaymentStart
                ? "Processing Paystack Payment..."
                : "Checkout with Paystack"}
            </Button>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handleCashOnDelivery}
              className="w-full bg-green-500 text-white"
            >
              Checkout with Cash on Delivery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCheckout;
