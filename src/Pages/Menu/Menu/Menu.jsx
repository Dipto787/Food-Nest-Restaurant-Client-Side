import { Helmet } from 'react-helmet-async';
import MenuHero from './MenuHero';
import menuImg2 from '../../../assets/menu/banner3.jpg' 
const Menu = () => {
    return (
        <div> 
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <MenuHero heading={'OUR MENU'} subHeading={'Would you like to try a dish?'} menuBg={menuImg2}> </MenuHero>
        </div>
    );
};

export default Menu;