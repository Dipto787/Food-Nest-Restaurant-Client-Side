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
    let categories = ['salads', 'pizza', 'soups', 'desserts', 'drinks'];
    let [perPage, setPerPages] = useState(4);
    let [filter, setFilter] = useState('salad');
    let [currentPage, setCurrentPage] = useState(0);
    let [menu] = UseMenu({ filter, perPage, currentPage });
    let { category } = useParams();
    let initialIndex = categories.indexOf(category);
    let [tabs, setTabs] = useState(initialIndex);
    let [count, setCount] = useState(0);
    let drinks = menu.filter(offer => offer.category === 'drinks');
    let desserts = menu.filter(offer => offer.category === 'dessert');
    let pizza = menu.filter(offer => offer.category === 'pizza');
    let salads = menu.filter(offer => offer.category === 'salad');
    let soups = menu.filter(offer => offer.category === 'soup');
    // console.log(currentPage,perPage,filter)
    // useEffect(()=>{
    //     axios.get(`http://localhost:5000/menu?page=${currentPage}&size=${perPage}&filter=${filter}`)
    //     .then(res=>{ 
    //         // setMenu(res.data);
    //         console.log(res.data)

    //     })
    // },[currentPage,perPage,filter])


    useEffect(() => {
        axios.get(`http://localhost:5000/countFood?filter=${filter}`)
            .then(res => {
                setCount(res.data.count)
            })
    }, [filter])



    // pagination
    let pages = [...Array(Math.ceil(count / perPage)).keys()];
    let handleReturn = (e) => {
        const tabValue = e.target.getAttribute("value");
        setFilter(tabValue);
        setCurrentPage(0);
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
                {/* <p>{currentPage}</p> */}
                {
                    pages.map(page => ( <button onClick={() => setCurrentPage(page)}

                        className={`btn text-center mr-4 ${page === currentPage ? 'bg-blue-700' : ''} px-6 bg-orange-500 text-white font-bold `}>{page}</button>
                    ))
                }

            </div>

        </div>
    );
};

export default Order;