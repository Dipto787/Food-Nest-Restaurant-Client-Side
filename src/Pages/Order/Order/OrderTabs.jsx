import FoodCard from "./FoodCard";

const OrderTabs = ({ items }) => {
    return (
        <div className='grid md:grid-cols-3 gap-4'>
            {items.map(salad => <FoodCard item={salad}></FoodCard>)}
        </div>
    );
};

export default OrderTabs;