function initiatePayment(paymentHandlers, onOrderCreateFailure) {
    fetch('/api/orders', {
        method: 'POST'
    })
    .then(res => res.json())
    .then(res => {
      console.log("POST RESPONSE")
        console.log(res)
        console.log("my amount");
        console.log(res.amount)
        const options = {
            key: process.env.REACT_APP_RZP_KEY_ID,
            amount: res.amount,
            currency: res.currency,
            order_id: res.rzpOrderId,
            name: 'E-Store',
            image: 'https://img.flaticon.com/icons/png/512/45/45552.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF',
            description: 'E-commerce',
            prefill: {
                contact: 9876543210,
                email: 'e-store.test123@mail.com',
              //   method: 'card',
              //     card[number]: '5267318187975449',
              //     card[expiry]: '12/26',
              //     card[cvv]: '123'
            },
            theme: {
                color: 'rgb(16, 114, 212)',
            },
            modal: {
                ondismiss: paymentHandlers.onDismiss || (() => {}),
                escape: false,
            },
            options: {
              checkout: {
                prefill: {
                  "method": 'card',
                  "card[number]": '5267318187975449',
                }
              }
            },
            handler: response => {
                paymentHandlers.onSuccess &&
                    paymentHandlers.onSuccess({
                        ...response,
                        id: res.orderId,
                        amount: res.amount,
                        currency: res.currency,
                    });
                    console.log("hello response")
                    console.log(response)
            },
            
        };
        
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    },
    err => {
        onOrderCreateFailure && onOrderCreateFailure(err);
    });
  }
  
  export { initiatePayment };