import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";


export default function OrderConfirmationPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const reference = params.get("reference");
  
    useEffect(() => {
      if (reference) {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
    
        dispatch(capturePayment({ reference, orderId, paymentMethod: "Cash on delivery" }))
          .then((data) => {
            if (data?.payload?.success) {
              sessionStorage.removeItem("currentOrderId");
              toast.success("Your order has been placed successfully.");
              window.location.href = "/shop/account"; 
            }
          });
      }
    }, [reference, dispatch]);
    


    return (
        <Card>
          <CardHeader className="my-10" >
            <CardTitle>Processing Order... Please wait!</CardTitle>
          </CardHeader>
        </Card>
      );
}
