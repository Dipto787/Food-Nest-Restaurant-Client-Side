import { useEffect, useState } from 'react';
import coverImg from '../../../assets/shop/banner2.jpg'
import MenuHero from '../../Menu/Menu/MenuHero';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UseMenu from '../../../Components/Shared/ItemMenu/hooks/UseMenu';
import FoodCard from './FoodCard';
import OrderTabs from './OrderTabs';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Order = () => {
    let [menu] = UseMenu();
    let categories = ['salads', 'pizza', 'soups', 'desserts', 'drinks'];
    let { category } = useParams();
    let initialIndex = categories.indexOf(category);
    let [tabs, setTabs] = useState(initialIndex);
    let [filter, setFilter] = useState('');
    let [count, setCount] = useState(0);
    let drinks = menu.filter(offer => offer.category === 'drinks');
    let desserts = menu.filter(offer => offer.category === 'dessert');
    let pizza = menu.filter(offer => offer.category === 'pizza');
    let salads = menu.filter(offer => offer.category === 'salad');
    let soups = menu.filter(offer => offer.category === 'soup');

    useEffect(() => {
        axios.get(`http://localhost:5000/countFood?filter=${filter}`)
            .then(res => {
                setCount(res.data.count)
            })
    }, [filter])



    // pagination
    let [perPage, setPerPages] = useState(4);
    let [currentPage,setCurrentPage]=useState(0);
    let pages = [...Array(Math.ceil(count / perPage)).keys()];
    console.log(pages)
    let handleReturn = (e) => {
        const tabValue = e.target.getAttribute("value");
        setFilter(tabValue);
    }
    return (
        <div>
            <MenuHero heading={'our shop'} menuBg={coverImg}></MenuHero>

            <Tabs className={'mt-8'} defaultIndex={tabs} onSelect={(index) => setTabs(index)}>
                <TabList onClick={handleReturn}>
                    <Tab value={'salad'}>Salad</Tab>
                    <Tab value={'pizza'}>pizza</Tab>
                    <Tab value={'soup'}>soups</Tab>
                    <Tab value={'dessert'}>desserts</Tab>
                    <Tab value={'drinks'}>drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTabs items={salads}></OrderTabs>
                </TabPanel>
                <TabPanel>
                    <OrderTabs items={pizza}></OrderTabs>
                </TabPanel>
                <TabPanel>
                    <OrderTabs items={soups}></OrderTabs>
                </TabPanel>
                <TabPanel>
                    <OrderTabs items={desserts}></OrderTabs>
                </TabPanel>
                <TabPanel>
                    <OrderTabs items={drinks}></OrderTabs>
                </TabPanel>
            </Tabs>
            <div className='text-center m-4 '>
                {
                    pages.map(page =><button className='btn text-center mr-4  px-6 bg-orange-500 text-white font-bold  '>{page}</button>)
                }

            </div>

        </div>
    );
};

export default Order;