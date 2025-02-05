
const FoodCard = ({ item }) => {
    let { image, recipe, name, price } = item;
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        src={image}
                        alt="Shoes" />
                </figure>
                <p className="absolute right-0 mr-4 mt-4 text-white px-4 bg-slate-900">{price}</p>
                <div className="card-body flex items-center">
                    <h2 className="card-title">{name}</h2>
                    <p className="flex-grow">{recipe}</p>
                    <div className="card-actions justify-end">
                        <button className="btn border-0 border-orange-500  border-b-4 ">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;