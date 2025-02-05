import { useEffect, useState } from "react";

const UseMenu = ({filter,perPage,currentPage}) => { 
    let [menu, setMenu] = useState([]);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:5000/menu?page=${currentPage}&size=${perPage}&filter=${filter}`)
            .then(res => res.json())
            .then(data => {
                setMenu(data);
                setLoading(false);
            })
    }, [filter,perPage,currentPage])

    return [menu, loading];
};

export default UseMenu;