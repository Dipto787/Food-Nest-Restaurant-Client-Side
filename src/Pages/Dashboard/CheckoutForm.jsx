import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from './../../Components/hooks/UseAxiosSecure'
import useCart from './../../Components/hooks/UseCart'
import UseAuth from "../../Components/hooks/UseAuth";
import { useNavigate } from "react-router-dom";
const CheckoutForm = () => {
    let [error, setError] = useState('');
    let [clientSecret, setClientSecret] = useState('');
    let [transactionId, setTransactionId] = useState('');
    let stripe = useStripe();
    let elements = useElements();
    let axiosSecure = useAxiosSecure();
    let [cart, refetch] = useCart();
    let navigate = useNavigate();
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
    }, [axiosSecure, totalPrice])
    ;
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
                navigate('/dashboard/paymentHistory')
                refetch();

                console.log(res.data)
            }

        }

    }
    return (

        <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center min-h-screen bg-gray-100"
        >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6">

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">💳 Secure Payment</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Enter your card details to complete your purchase
                    </p>
                </div>

                {/* Card Input */}
                <div className="p-3 border border-gray-300 rounded-xl shadow-sm bg-gray-50">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#32325d",
                                    fontFamily: "Arial, sans-serif",
                                    "::placeholder": {
                                        color: "#a0aec0",
                                    },
                                },
                                invalid: {
                                    color: "#e53e3e",
                                },
                            },
                        }}
                    />
                </div>

                {/* Error & Success Messages */}
                {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
                {transactionId && (
                    <p className="text-green-600 text-sm mt-3">
                        ✅ Payment successful! Transaction ID:{" "}
                        <span className="font-medium">{transactionId}</span>
                    </p>
                )}

                {/* Pay Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full mt-6 rounded-xl"
                    disabled={!stripe || !clientSecret}
                >
                    Pay Now
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;