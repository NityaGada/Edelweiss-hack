import { useEffect, useState } from 'react';
import { Parser } from 'json2csv';
import axios from 'axios';

import Table from 'react-bootstrap/Table';

export default function Table1(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://127.0.0.1:8000/option/')
                .then(response => setData(response.data))
                .catch(error => {
                    alert("Error: " + error);
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

    function convertToCSV(data) {
        const fields = ['Expiry Date', 'Volume', 'Open Interest (OI)', 'Change in Open Interest (COI)', 'Last Traded Price (LTP)', 'Implied Volatility', 'Change', 'Bid Quantity', 'Bid Price', 'Ask Price', 'Ask Quantity', 'Strike', 'Call / Put (Ce/Pe)', 'Timestamp', 'Sequence'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(data);
        return csv;
    }

    function downloadCSV() {
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
      

    // for (const key1 in data) {
    //     if (data.hasOwnProperty(key1)) {
    //         console.log(`Key1: ${key1}`);
    //         const innerDict = data[key1];
    //         for (const key2 in innerDict) {
    //             if (innerDict.hasOwnProperty(key2)) {
    //             const value = innerDict[key2];
    //             console.log(`Value: ${value}`);
    //             }
    //         }
    //     }
    // }

    // console.log(data.keys);

    return (
        <div>
            <Table striped bordered hover size="sm">
            {/* <table> */}
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
                        <th>Strike</th>
                        <th>Call / Put (Ce/Pe)</th>
                        <th>Timestamp</th>
                        <th>Sequence</th>
                    </tr>
                </thead>
                <tbody>
                {data &&
                    Object.entries(data).map(([key1, value]) => (
                    <tr key={key1}>
                        {Object.entries(value).map(([key2, value2]) =>
                        key2 === 'tt' || key2 === 'timestamp' ? (
                            <td key={key2}>{formatDateTime(value2)}</td>
                        ) : (
                            <td key={key2}>{value2}</td>
                        )
                        )}
                    </tr>
                    ))}
                </tbody>
            {/* </table> */}
            </Table>
            
            {/* {data.map((item) => (
                <p key={item.id}>{item.title}</p>
            ))} */}
            <button onClick={downloadCSV}>Download CSV</button>
            </div>
        );

}