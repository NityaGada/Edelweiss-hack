import { useEffect, useState } from 'react';

import { useNavigate, useLocation } from "react-router-dom";

import axios from 'axios';

import { Select } from '../../components';

import './index.css';

// import Table from 'react-bootstrap/Table';

export default function Table1(props) {
    const [data, setData] = useState(null);
    const { state } = useLocation();
    const navigate = useNavigate();
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');


    console.log(state.name);
    useEffect(() => {
        const fetchData = () => {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/option/'
            })
                .then(response => setData(response.data))
                .catch(error => {
                    alert("Api Error: " + error);
                });
        };

        fetchData();

        const interval = setInterval(fetchData, 30000);

        
        return () => {
            clearInterval(interval);
        };
    }, []);
    
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const formattedDate = dateTime.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const formattedTime = dateTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        return `${formattedDate} ${formattedTime}`;
    };

    const downloadCSV = () => {
        if (!data) return;
    
        const dataArray = Object.entries(data).map(([key, value]) => value);
    
        const csvRows = [];
    
        const headers = Object.keys(dataArray[0]).slice(0, 16).join(','); // Limit to 15 columns
        csvRows.push(headers);

        dataArray.forEach(item => {
            const row = Object.values(item).slice(0, 16).map(value => `"${value}"`).join(','); // Limit to 15 columns
            csvRows.push(row);
        });
    
        const csvData = csvRows.join('\n');
    
        const blob = new Blob([csvData], { type: 'text/csv' });
    
        const url = window.URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'table_data.csv');
        document.body.appendChild(link);

        link.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      };
    
    const handleSort = (column) => {
    if (sortColumn === column) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
        setSortColumn(column);
        setSortOrder('asc');
    }
    };

    return (
        <div>
            <div className='headings'>
            <button onClick={downloadCSV} className='csv-button'>Download CSV</button> <br />
            <div style={{textAlign: "center"}}>Options Market : {state.name}</div>
            <button onClick= {() => {navigate('/table2');}} className='nav'> View Futures </button> <br />
            <Select />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Expiry Date</th>
                        <th>Volume</th>
                        <th>Open Interest (OI)</th>
                        <th>Change in Open Interest (COI)</th>
                        <th>Last Traded Price (LTP) (Rupees)</th>
                        <th>Implied Volatility (%)</th>
                        <th>Change (Rupees)</th>
                        <th>Bid Quantity</th>
                        <th>Bid Price (Rupees)</th>
                        <th>Ask Price (Rupees)</th>
                        <th>Ask Quantity</th>
                        <th onClick={() => handleSort('strike')} style={{cursor: "pointer"}}>Strike Price</th>
                        <th>Call / Put (Ce/Pe)</th>
                        <th>Timestamp</th>
                        <th>Sequence</th>
                    </tr>
                </thead>
                <tbody>
                {data &&
                    Object.entries(data)
                    .sort(([, value1], [, value2]) => {
                        if (sortColumn === 'strike') {
                          const strike1 = value1.sp;
                          const strike2 = value2.sp;
                          return sortOrder === 'asc' ? strike1 - strike2 : strike2 - strike1;
                        }
                        return 0;
                      })
                    .map(([key1, value]) => {
                        const sname = value['name'];
                        if (sname === state.name) { 
                        console.log(value['colour'])
                        return (
                            
                            <tr key={key1} style={value['colour'] === true? { backgroundColor: '#e7dece' } : {}}>
                            {Object.entries(value).map(([key2, value2], index) => {
                                if (index < 15) {
                                return (
                                    <td key={key2}>
                                    {key2 === 'tt' || key2 === 'timestamp' ? formatDateTime(value2) : value2}
                                    </td>
                                );
                                } else {
                                return null;
                                }
                            })}
                            </tr>
                        );
                        } else {
                        return null;
                        }
                    })}

                </tbody>
            </table>
            
            {/* {data.map((item) => (
                <p key={item.id}>{item.title}</p>
            ))} */}
            
        </div>
        );

}