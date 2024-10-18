import { useEffect, useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import AdminOrderDetailsView from "./order-details";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  const statusClass = {
    confirmed: "bg-green-500",
    delivered: "bg-green-500",
    rejected: "bg-red-600",
    pending: "bg-black",
  };

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  const renderedOrders = useMemo(() => {
    return orderList && orderList.length > 0 ? (
      orderList.map((orderItem) => (
        <TableRow key={orderItem._id}>
          <TableCell>{orderItem?._id ?? "N/A"}</TableCell>
          <TableCell>{orderItem?.orderDate.split("T")[0] ?? "N/A"}</TableCell>
          <TableCell>
            <Badge className={`py-1 px-3 ${statusClass[orderItem?.orderStatus]}`}>
              {orderItem?.orderStatus}
            </Badge>
          </TableCell>
          <TableCell>
          {`₦${new Intl.NumberFormat('en-NG', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          }).format(orderItem?.totalAmount ?? "N/A")}`}
          </TableCell>
          <TableCell>
            <Button onClick={() => handleFetchOrderDetails(orderItem._id)}>
              View Details
            </Button>
            <Dialog
              open={openDetailsDialog}
              onOpenChange={() => {
                setOpenDetailsDialog(false);
                dispatch(resetOrderDetails());
              }}
            >
              <AdminOrderDetailsView orderDetails={orderDetails} />
            </Dialog>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={5}>No orders available</TableCell>
      </TableRow>
    );
  }, [orderList, openDetailsDialog, dispatch, orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderedOrders}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
