import { useEffect, useState } from 'react';
import coverImg from '../../../assets/shop/banner2.jpg'
import MenuHero from '../../Menu/Menu/MenuHero';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UseMenu from '../../../Components/Shared/ItemMenu/hooks/UseMenu';
import FoodCard from './FoodCard';
import OrderTabs from './OrderTabs';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from '../../../Components/hooks/UseAxiosPublic';
import queryString from 'query-string';
import StarRatings from 'react-star-ratings';
import Spinner from '../../../Components/Shared/Sppiner';

const Order = () => {
    let axiosPublic = UseAxiosPublic();
    let [count, setCount] = useState(0);
    let navigate = useNavigate();
    let [currentPage, setCurrentPage] = useState(1);
    let [perPage, setPerPage] = useState(9);
    let [params, setParams] = useSearchParams();
    let categories = params.get('category') || 'burger';
    let [tab, setTab] = useState(categories);
    let handleClick = (category) => {
        let currentQuery = { category };
        let url = queryString.stringifyUrl({
            url: '/order',
            query: currentQuery,
        })
        setCurrentPage(1);
        navigate(url)
    }
    console.log(categories)
    let { data: foods = [], isLoading } = useQuery({
        queryKey: ['foods', tab, perPage, currentPage],
        queryFn: async () => {
            let { data } = await axiosPublic.get(`/menu?category=${tab}&page=${currentPage}&size=${perPage}`);
            return data;
        }
    })

    let { data: category = [], isPending } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            let { data } = await axiosPublic.get(`/categories`);
            return data;
        }
    })



    useEffect(() => {
        axiosPublic.get(`/countFood?filter=${tab}`).then(res => {
            setCount(res.data.count);

        })
    }, [tab, perPage, currentPage])
    console.log(tab, count)
    // pagination
    let pages = [...Array(Math.ceil(count / perPage)).keys()];


    if (isLoading || isPending) return <Spinner></Spinner>;

    return (
        <div className='max-w-full mx-auto'>
             <MenuHero heading={'our shop'} menuBg={coverImg}></MenuHero>
           <div className='max-w-screen-xl mx-auto' > 

            <div className='flex gap-14 my-4'>
                {
                    category.map(category => (
                        <h3 onClick={() => { setTab(category.category), handleClick(category.category) }} className={`text-sm  cursor-pointer ${category.category === tab ? 'border-b-8 text-gray-600 font-bold   border-orange-500 ' : 'text-black'} font-semibold capitalize `}>{category.category}</h3>
                    ))
                }
            </div>
            <div>
                <div className='grid lg:grid-cols-3 px-3 gap-5'>
                    {
                        foods.map(food => (
                            <Link to={`/order/${food._id}`} className="card hover:border-x-4 duration-100 cursor-pointer border-orange-600  shadow-xl ">
                                <figure className="px- max-h-[500px]  overflow-hidden">
                                    <img
                                        src={food.img}
                                        alt="Shoes"
                                        className= " w-full h-44 object-cover rounded-t-xl transition-transform duration-150 ease-in-out hover:scale-110"
                                        style={{ transformOrigin: "center center" }}
                                    />
                                </figure>

                                <div className="card-body  text-center">
                                    <h2 className="card-title flex text-sm justify-center">{food.name}</h2>
                                    <p className='text-xs'> {food.description}</p>
                                    <p className='text-xs text-orange-400'>$ {food.price}</p>
                                    <div className='text-left'>
                                        <StarRatings

                                            rating={food.rating}
                                            starRatedColor="#FFD700"
                                            numberOfStars={5}
                                            name="rating"
                                            starDimension="18px"
                                            starSpacing="2px"
                                        />
                                    </div>

                                    
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className='text-center m-4 '>
                {/* <p>{currentPage}</p> */}
                {
                    pages.map(page => (<button onClick={() => setCurrentPage(page + 1)}

                        className={`btn mr-4 border-2 ${page + 1 === currentPage ? 'bg-blue-500 text-white' : ''}     px-8 text-center`}>{page + 1}</button>
                    ))
                }

            </div>
           </div>


        </div>
    );
};

export default Order;