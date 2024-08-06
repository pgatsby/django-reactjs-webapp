import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";

import React from "react";
import { payOrder } from "../actions/orderActions";

function CustomPayPalButtons({ amount, orderId }) {
  const dispatch = useDispatch();
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      console.log("Transaction completed by " + details.payer.name.given_name);
      dispatch(payOrder(orderId, details));
    });
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
}

export default CustomPayPalButtons;
