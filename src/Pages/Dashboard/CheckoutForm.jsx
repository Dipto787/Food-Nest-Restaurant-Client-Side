import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from './../../Components/hooks/UseAxiosSecure'
import useCart from './../../Components/hooks/UseCart'
import UseAuth from "../../Components/hooks/UseAuth";
const CheckoutForm = () => {
    let [error, setError] = useState('');
    let [clientSecret, setClientSecret] = useState('');
    let [transactionId, setTransactionId] = useState('');
    let stripe = useStripe();
    let elements = useElements();
    let axiosSecure = useAxiosSecure();
    let [cart, refetch] = useCart();
    console.log(cart);
    let { user } = UseAuth();
    let totalPrice = cart.reduce((total, item) => total + item.price, 0);
    useEffect(() => {
        if (totalPrice > 0) {   
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice]);
    let handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        let card = elements.getElement(CardElement);
        if (card === null) {
            return
        }
        let { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setError(error.message);
            console.log('payment error', error)
        } else {
            setError('');
            console.log(paymentMethod);
        }

        // confirm payment
        let { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        } else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                let payment = {
                    email: user.email,
                    price: totalPrice,
                    transaction: paymentIntent.id,
                    date: new Date(),
                    cardId: cart.map(item => item._id),
                    menuItemId: cart.map(item => item.menuId),
                    status: 'pending'
                }
                let res = axiosSecure.post('/payments', payment)
                refetch();

                console.log(res.data)
            }

        }

    }
    return (
        
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit"
                disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-700">{error}...</p>
            {transactionId && <p className="text-green-700">Your transaction id {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;