import { Link } from "react-router-dom";
import ItemMenu from "../../../Components/Shared/ItemMenu/ItemMenu";
import MenuHero from "./MenuHero";

const MenuCategory = ({ items, menuBg, title }) => {
    return (
        <div className="p-4">
            {title && <MenuHero menuBg={menuBg} heading={title} ></MenuHero>}
            <div className="grid md:grid-cols-2 gap-10 mt-8">
                {
                    items.map(item => <ItemMenu item={item}></ItemMenu>)
                }
            </div>
            <Link  to={`/order?category=${title}`}>
                <button className='btn mt-4 text-xs bg-orange-600 text-white'>Order now</button>
            </Link>
        </div>
    );
};

export default MenuCategory;