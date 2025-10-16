function initiatePayment(paymentHandlers, onOrderCreateFailure) {
    fetch('/api/orders', {
        method: 'POST'
    })
    .then(res => res.json())
    .then(res => {
        const options = {
            key: process.env.REACT_APP_RZP_KEY_ID,
            amount: res.amount,
            currency: res.currency,
            order_id: res.rzpOrderId,
            name: 'E-Store',
            image: 'https://techpatio.com/wp-content/uploads/2020/05/ecommerce-online-shopping.jpg',
            description: 'E-commerce',
            prefill: {
                contact: 9876543210,
                email: 'e-store.test123@mail.com'
                // method: 'card',
                //   card[number]: '5267318187975449',
                //   card[expiry]: '12/56',
                //   card[cvv]: '123'
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
                  // "method": 'card',
                  // "card[number]": '5267318187975449',
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
