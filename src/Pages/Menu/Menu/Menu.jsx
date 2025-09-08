import { Helmet } from 'react-helmet-async';
import MenuHero from './MenuHero';
import menuImg2 from '../../../assets/menu/banner3.jpg'
import dessert from '../../../assets/menu/dessert-bg.jpg'
import pizzas from '../../../assets/menu/pizza-bg.jpg'
import salad from '../../../assets/menu/salad-bg.jpg'
import drinks from '../../../assets/menu/drink-bg.jpg'
import noodles from '../../../assets/menu/noodles.jpg'
import burger_bg from '../../../assets/menu/burger-bg.jpg'
import UseMenu from '../../../Components/Shared/ItemMenu/hooks/UseMenu';
import MenuCategory from './MenuCategory';
import SectionTitle from '../../../Components/Shared/SectionTitle/SectionTitle';
import UseAxiosPublic from '../../../Components/hooks/UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../Components/Shared/Sppiner';
const Menu = () => {
    let axiosPublic = UseAxiosPublic();
    let { data: menu = [], isLoading } = useQuery({
        queryKey: ['foods'],
        queryFn: async () => {
            let { data } = await axiosPublic.get(`/menus`);
            return data;
        }
    })
    let burger = menu.filter(offer => offer.category === 'burger');
    let desserts = menu.filter(offer => offer.category === 'dessert');
    let pizza = menu.filter(offer => offer.category === 'pizza');
    let salads = menu.filter(offer => offer.category === 'salad');
    let noodle = menu.filter(offer => offer.category === 'noodles');
    let drink = menu.filter(offer => offer.category === 'drink');
        if (isLoading) return <Spinner></Spinner>;
    return (
        <div className='max-w-screen-[400px] mx-auto'>
            <Helmet>
                <title>Food Nest | Menu</title>
            </Helmet>
            <MenuHero heading={'OUR MENU'} subHeading={'Would you like to try a dish?'} menuBg={menuImg2}>
            </MenuHero>

             <div className='mt-5'>
                   <SectionTitle heading={'Our-Menu'} subHeading={'check our menu'}></SectionTitle>
             </div>

            <MenuCategory title={'burger'} menuBg={burger_bg} items={burger}></MenuCategory>

            <MenuCategory title={'dessert'} menuBg={dessert} items={desserts}></MenuCategory>

            <MenuCategory title={'pizza'} menuBg={pizzas} items={pizza}></MenuCategory>

            <MenuCategory title={'salad'} menuBg={salad} items={salads}></MenuCategory>

            <MenuCategory title={'noodles'} menuBg={noodles} items={noodle}></MenuCategory>

            <MenuCategory title={'drink'} menuBg={drinks} items={drink}></MenuCategory> 


        </div >
    );
};

export default Menu;