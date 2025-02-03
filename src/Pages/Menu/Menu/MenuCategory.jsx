import ItemMenu from "../../../Components/Shared/ItemMenu/ItemMenu";
import MenuHero from "./MenuHero";

const MenuCategory = ({ items,menuBg,title }) => {
    return (
        <div className="p-4">
            { title && <MenuHero menuBg={menuBg} heading={title} ></MenuHero>}
            <div className="grid md:grid-cols-2 gap-10 mt-8">
                {
                    items.map(item => <ItemMenu item={item}></ItemMenu>)
                }
            </div>
        </div>
    );
};

export default MenuCategory;