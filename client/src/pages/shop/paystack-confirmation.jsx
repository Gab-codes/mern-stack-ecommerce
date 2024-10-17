import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";


export default function PaystackConfirmationPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const reference = params.get("reference");
  
    useEffect(() => {
      if (reference) {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
  
        dispatch(capturePayment({ reference, orderId })).then((data) => {
          if (data?.payload?.success) {
            sessionStorage.removeItem("currentOrderId");
            window.location.href = "/shop/account";
          }
        });
      }
    }, [reference, dispatch]);


    return (
        <Card>
          <CardHeader>
            <CardTitle>Processing Payment... Please wait!</CardTitle>
          </CardHeader>
        </Card>
      );
}
