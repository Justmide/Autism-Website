import React, { useEffect } from "react";

const PayPalButton = ({ amount }) => {
  useEffect(() => {
    if (!window.paypal) return;

    // Clear any existing buttons to prevent duplicates on re-render
    const container = document.getElementById("paypal-button-container");
    if (container) container.innerHTML = "";

    window.paypal.Buttons({
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: String(amount), // dynamic amount from your frontend
              },
            },
          ],
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          alert(`Payment successful! Thank you, ${details.payer.name.given_name}`);
          // redirect or show success page here
        });
      },
      onError: function (err) {
        console.error(err);
        alert("Payment could not be completed.");
      },
    }).render("#paypal-button-container"); // div ID where button appears
  }, [amount]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
