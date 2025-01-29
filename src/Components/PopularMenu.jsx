import { useEffect, useState } from "react";
import SectionTitle from "./Shared/SectionTitle/SectionTitle";
import ItemMenu from "./Shared/ItemMenu/ItemMenu";

const PopularMenu = () => {
    let [menu, setMenu] = useState([]); 
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                let popularMenuData = data.filter(menu => menu.category === 'popular');
                setMenu(popularMenuData);
            })
    }, [])
    return (
        <div className="mb-12">
            <SectionTitle
                subHeading={'---Check it out---'}
                heading={'FROM OUR MENU'}
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
                {
                    menu.map(item=><ItemMenu item={item}></ItemMenu>)
                }
            </div>
        </div>
    );
};

export default PopularMenu;