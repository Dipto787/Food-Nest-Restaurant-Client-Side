import { useEffect, useState } from "react";
import SectionTitle from "./Shared/SectionTitle/SectionTitle";
import ItemMenu from "./Shared/ItemMenu/ItemMenu";
import UseMenu from "./Shared/ItemMenu/hooks/UseMenu";

const PopularMenu = () => {
    let [menu] = UseMenu();
    console.log(menu)
    let menuItems = menu.filter(menuItem => menuItem.category === 'popular');
    
    return (
        <div className="mb-12">
            <SectionTitle
                subHeading={'---Check it out---'}
                heading={'OUR MENU'}
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
                {
                    menuItems.map(item => <ItemMenu item={item}></ItemMenu>)
                }
            </div>
            <div className="text-center">
                <button className="btn px-8 btn-outline border-0 border-b-4 my-4">View Full Menu</button>
            </div>
        </div>
    );
};

export default PopularMenu;