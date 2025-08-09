import { useEffect, useState } from 'react';
import coverImg from '../../../assets/shop/banner2.jpg'
import MenuHero from '../../Menu/Menu/MenuHero';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UseMenu from '../../../Components/Shared/ItemMenu/hooks/UseMenu';
import FoodCard from './FoodCard';
import OrderTabs from './OrderTabs';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from '../../../Components/hooks/UseAxiosPublic';
import queryString from 'query-string';
import StarRatings from 'react-star-ratings';
import Spinner from '../../../Components/Shared/Sppiner';

const Order = () => {
    let axiosPublic = UseAxiosPublic();
    let [count, setCount] = useState(0);
    let navigate = useNavigate();
    let [params, setParams] = useSearchParams();
    let categories = params.get('category') || 'burger';
    let [tab, setTab] = useState(categories);
    let handleClick = (category) => {
        let currentQuery = { category };
        let url = queryString.stringifyUrl({
            url: '/order',
            query: currentQuery,
        })
        navigate(url)
    }
    console.log(categories)
    let { data: foods = [], isLoading } = useQuery({
        queryKey: ['foods', tab],
        queryFn: async () => {
            let { data } = await axiosPublic.get(`/menu?category=${tab}`);
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

    let [perPage, setPerPage] = useState(10);

    useEffect(() => {
        axiosPublic.get(`/countFood?filter=${tab}`).then(res => {
            setCount(res.data.count);
        })
    }, [tab])
    console.log(tab, count)
    // pagination
    let pages = [...Array(Math.ceil(count / perPage)).keys()];


if(isLoading || isPending) return <Spinner></Spinner>;

    return (
        <div className='max-w-[90%] mx-auto'>
            <MenuHero heading={'our shop'} menuBg={coverImg}></MenuHero>



            <div className='flex gap-20 my-8'>
                {
                    category.map(category => (
                        <h3 onClick={() => { setTab(category.category), handleClick(category.category) }} className={`text-2xl  cursor-pointer ${category.category === tab ? 'border-b-8 text-gray-600 font-bold   border-orange-500 ' : 'text-black'} font-semibold capitalize `}>{category.category}</h3>
                    ))
                }
            </div>
            <div>
                <div className='grid grid-cols-3 gap-5'>
                    {
                        foods.map(food => (
                            <div className="card p-5  shadow-xl ">
                                <figure className="px-10 max-h-[500px] ">
                                    <img
                                        src={food.img}
                                        alt="Shoes"
                                        className="rounded-xl " />
                                </figure>
                                <div className="card-body  text-center">
                                    <h2 className="card-title flex justify-center">{food.name}</h2>
                                    <p>{food.description}</p>
                                    <p className='text-xl text-orange-400'>$ {food.price}</p>
                                    <div className='text-left'>
                                        <StarRatings

                                            rating={food.rating}
                                            starRatedColor="#FFD700"
                                            numberOfStars={5}
                                            name="rating"
                                            starDimension="30px"
                                            starSpacing="2px"
                                        />
                                    </div>

                                    {/* <div className="card-actions">
                                        <button

                                            className="flex mt-3 items-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 
                 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform 
                 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                            aria-label="Add to Cart"
                                        >
                                            <svg
                                                className="w-6 h-6 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                                                <circle cx="7" cy="21" r="1" />
                                                <circle cx="17" cy="21" r="1" />
                                            </svg>
                                            Add to Cart
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='text-center m-4 '>
                {/* <p>{currentPage}</p> */}
                {
                    pages.map(page => (<button onClick={() => setCurrentPage(page)}

                        className={`btn mr-4 border-2   'bg-blue-500 text-white'  px-8 text-center`}>{page}</button>
                    ))
                }

            </div>


        </div>
    );
};

export default Order;