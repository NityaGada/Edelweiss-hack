import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SelectBox } from '../../components';
import './index.css';

// import Table from 'react-bootstrap/Table';

export default function Table2(props) {
    const [data, setData] = useState(null);
    // const { state } = useLocation();
    const navigate = useNavigate();

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

        // Generate CSV headers
        const headers = Object.keys(dataArray[0]).join(',');
        csvRows.push(headers);

        // Generate CSV rows
        dataArray.forEach(item => {
            const row = Object.values(item).map(value => `"${value}"`).join(',');
            csvRows.push(row);
        });

        // Create a CSV data string
        const csvData = csvRows.join('\n');

        // Create a Blob object with the CSV data
        const blob = new Blob([csvData], { type: 'text/csv' });

        // Create a temporary URL for the Blob object
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'table_data.csv');
        document.body.appendChild(link);

        // Trigger the file download
        link.click();

        // Clean up the temporary URL and link element
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };



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
            <div>
                <h1>The Options Chain</h1>
            </div>

            <div className='uprow' style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
                {/*-------------- button and stock value ----------- */}
                <div style={{ display: 'flex', flexFlow: 'row' }} className='om'>Futures Market</div>
                <div style={{ display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between', marginTop: '20px', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', flexFlow: 'row' }}>
                        <SelectBox />
                        {/* <label htmlFor="expiryFilter">Expiry Date:</label> */}
                    </div>
                    <div style={{ display: 'flex', flexFlow: 'row', marginRight: '10px', paddingRight: '10px' }}>
                        <button onClick={downloadCSV} className='csv-button'>Download CSV</button>
                        <button onClick={() => { navigate('/table3'); }} className='csv-button btn'> View Options </button>
                    </div>
                </div>
            </div>


            {/* <div className="headings">
                <button onClick={downloadCSV} className='csv-button'>Download CSV</button>
                <div style={{ textAlign: "center" }}>Futures Market</div>
                <button onClick={() => {
                    navigate('/table3');
                }}
                    className='nav'> View Options </button>
            </div> */}
            {/* <Table striped bordered hover size="sm"> */}
            <div className='moneyy' style={{ marginTop: '10px' }}>
                <div>
                    <button className='backhome'><Link to='/' className='home'>Back to Home</Link></button>
                </div>
                {/* <div className='money'>
                    <div className='inmoney'>In the Money</div>
                    <div className='outmoney'>Out of Money</div>
                </div> */}
            </div>

            <div className='container'>
                <div className='table-container'>
                    <table className='custom-table'>
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
                                <th>Strike Price</th>
                                <th>Call / Put (Ce/Pe)</th>
                                <th>Timestamp</th>
                                <th>Sequence</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                Object.entries(data).map(([key1, value]) => {
                                    const name = value['cp'];
                                    console.log(name);
                                    if (name === "XX") {
                                        return (
                                            <tr key={key1}>
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
                                    } else {
                                        return null;
                                    }
                                })}

                        </tbody>
                        {/* </Table> */}
                    </table>

                    {/* {data.map((item) => (
                <p key={item.id}>{item.title}</p>
            ))} */}

                </div>
            </div>
        </div>
    );

}