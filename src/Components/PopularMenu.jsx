import { useEffect, useState } from "react";
import SectionTitle from "./Shared/SectionTitle/SectionTitle";
import ItemMenu from "./Shared/ItemMenu/ItemMenu";
import UseMenu from "./Shared/ItemMenu/hooks/UseMenu";
import { Link } from "react-router-dom";
import Spinner from "./Shared/Sppiner";

const PopularMenu = () => {
    let [menu,isLoading] = UseMenu();
    console.log(menu)
    let menuItems = menu.filter(menuItem => menuItem.category === 'salad');
      if (isLoading) return <Spinner></Spinner>;
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
            <Link to={'/menu'} className="text-center">
                <button className="btn px-8 btn-outline border-0 border-b-4 my-4">View Full Menu</button>
            </Link>
        </div>
    );
};

export default PopularMenu;