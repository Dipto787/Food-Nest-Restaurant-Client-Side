import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GET_WAY_PK);
const PayMentGetWay = () => {
    return (
        <div>
            <SectionTitle heading={'Reservation'} subHeading={'BOOK A TABLE'}></SectionTitle>
            <Elements stripe={stripePromise}>
               <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    );
};

export default PayMentGetWay;