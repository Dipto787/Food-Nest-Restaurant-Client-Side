import { Helmet } from 'react-helmet-async';
import MenuHero from './MenuHero';
import menuImg2 from '../../../assets/menu/banner3.jpg'
import dessert from '../../../assets/menu/dessert-bg.jpeg'
import pizzas from '../../../assets/menu/pizza-bg.jpg'
import salad from '../../../assets/menu/salad-bg.jpg'
import soup from '../../../assets/menu/soup-bg.jpg'
import UseMenu from '../../../Components/Shared/ItemMenu/hooks/UseMenu';
import MenuCategory from './MenuCategory';
import SectionTitle from '../../../Components/Shared/SectionTitle/SectionTitle';
const Menu = () => {
    let [menu,refetch] = UseMenu(); 
    let offered = menu.filter(offer => offer.category === 'offered');
    let desserts = menu.filter(offer => offer.category === 'dessert');
    let pizza = menu.filter(offer => offer.category === 'pizza');
    let salads = menu.filter(offer => offer.category === 'salad');
    let soups = menu.filter(offer => offer.category === 'soup');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <MenuHero heading={'OUR MENU'} subHeading={'Would you like to try a dish?'} menuBg={menuImg2}>
            </MenuHero>
            <SectionTitle heading={"TODAY'S OFFER"} subHeading={"Don't miss"}> </SectionTitle>
            <MenuCategory items={offered}></MenuCategory>

            <MenuCategory title={'desserts'} menuBg={dessert} items={desserts}></MenuCategory>
     
            <MenuCategory title={'pizza'} menuBg={pizzas} items={pizza}></MenuCategory>

            <MenuCategory title={'salads'} menuBg={salad} items={salads}></MenuCategory>

            <MenuCategory title={'soups'} menuBg={soup} items={soups}></MenuCategory>


        </div >
    );
};

export default Menu;