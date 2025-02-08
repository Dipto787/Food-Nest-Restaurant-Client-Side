import { useEffect, useState } from "react";

const UseMenu = ({ filter = '', perPage = 4, currentPage = 0 } = {}) => {
    let [menu, setMenu] = useState([]);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        let url = '';
        if (filter) {
            url = `http://localhost:5000/menu?page=${currentPage}&size=${perPage}&filter=${filter}`
        } else {
            url = `http://localhost:5000/menu`
        }
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setMenu(data);
                setLoading(false);
            })
    }, [filter, perPage, currentPage])

    return [menu, loading];
};

export default UseMenu;