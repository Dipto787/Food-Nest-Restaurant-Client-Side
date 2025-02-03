import { useState } from "react";

const UseMenu = () => {
    let [menu, setMenu] = useState([]);
    let [loading,setLoading]=useState(true);
    fetch('menu.json')
        .then(res => res.json())
        .then(data => {
            setMenu(data);
            setLoading(false);
        })

        return [menu,loading];
};

export default UseMenu;