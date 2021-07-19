import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51J5ud4SEe1Mh217YenMoI3sEKFCopNurlDwc1YDCs6YMdnKxHu9PVBZX2A1JfzgItliyXuUybaOcmdIT7vkw0HKa009kyI5uTV";

  const onToken = token => {
    console.log(token);
    alert("Payment Success :)");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Nachias Clothing"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
