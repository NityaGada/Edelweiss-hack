import { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

import axios from 'axios';

import { Select } from '../../components';

// import Table from 'react-bootstrap/Table';

export default function Table1(props) {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

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

        // Fetch data initially
        fetchData();

        // Fetch data every 30 seconds
        const interval = setInterval(fetchData, 30000);

        // Clean up the interval when the component unmounts
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
    
        const headers = Object.keys(dataArray[0]).join(',');
        csvRows.push(headers);
    
        dataArray.forEach(item => {
          const row = Object.values(item).map(value => `"${value}"`).join(',');
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
            <button onClick={downloadCSV}>Download CSV</button> <br />
            <div style={{textAlign: "center"}}>Options Market : ALL</div>
            <button 
            onClick= {() => {
                navigate('/table2');
            }}> View Futures </button> <br />
            <Select />
            <table>
                <thead>
                    <tr>
                        <th>Expiry Date</th>
                        <th>Volume</th>
                        <th>Open Interest (OI)</th>
                        <th>Change in Open Interest (COI)</th>
                        <th>Last Traded Price (LTP)</th>
                        <th>Implied Volatility</th>
                        <th>Change</th>
                        <th>Bid Quantity</th>
                        <th>Bid Price</th>
                        <th>Ask Price</th>
                        <th>Ask Quantity</th>
                        <th onClick={() => handleSort('strike')}>Strike</th>
                        <th>Call / Put (Ce/Pe)</th>
                        <th>Timestamp</th>
                        <th>Sequence</th>
                        <th>Name</th>
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
                        
                        return (
                            
                            <tr key={key1} style={value['colour'] === true? { backgroundColor: '#e7dece' } : {}}>
                            {Object.entries(value).map(([key2, value2], index) => {
                                if (index < 16) {
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
                        }
                    )}

                </tbody>
            </table>
            
            {/* {data.map((item) => (
                <p key={item.id}>{item.title}</p>
            ))} */}
            
        </div>
        );

}