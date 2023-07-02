import { useEffect, useState } from 'react';

import axios from 'axios';

import { Tablecomponent } from "../../components";

export default function Table1(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/option/');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            {/* Render the data in your React components */}
            {/* {data.map((item) => (
                <p key={item.id}>{item.title}</p>
            ))} */}
        </div>
    );

}