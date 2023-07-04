import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { SelectBox } from '../../components';
import '../../pages/table/index.css';

export default function Table1(props) {
    const [data, setData] = useState(null);
    const { state } = useLocation();
    const navigate = useNavigate();
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [expiryFilter, setExpiryFilter] = useState('');
    const [expiryDates, setExpiryDates] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/option/',
            })
                .then((response) => {
                    setData(response.data);
                    const dates = Object.values(response.data).map((item) => {
                        const date = new Date(item["tt"]);
                        return date.toLocaleDateString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                        });
                    })
                    setExpiryDates(dates);
                })
                .catch((error) => {
                    alert('Api Error: ' + error);
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

        dataArray.forEach((item) => {
            const row = Object.values(item)
                .slice(0, 16)
                .map((value) => `"${value}"`)
                .join(','); // Limit to 15 columns
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

    const handleExpiryFilter = (value) => {
        setExpiryFilter(value);
    };

    const filteredData = data && Object.entries(data)
        .sort(([, value1], [, value2]) => {
            if (sortColumn === 'strike') {
                const strike1 = value1.sp;
                const strike2 = value2.sp;
                return sortOrder === 'asc' ? strike1 - strike2 : strike2 - strike1;
            }
            return 0;
        })
        .filter(([, value]) => {
            if (expiryFilter === '') {
                return true;
            }
            const expiryDate = new Date(value['tt']);
            const formattedExpiryDate = expiryDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
            return formattedExpiryDate === expiryFilter;
        });


    const expiryDatesSet = new Set(expiryDates)
    const expiryDatesList = Array.from(expiryDatesSet);
    expiryDatesList.sort((a, b) => new Date(a) - new Date(b));
    return (
        <div>
            <div>
                <h1>
                    The Options Chain
                </h1>
            </div>
            <div className='uprow' style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
                {/*-------------- button and stock value ----------- */}
                <div style={{ display: 'flex', flexFlow: 'row', marginTop: '20px', }} className='om'>Options Market : {state.name}</div>
                <div style={{ display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between', marginTop: '20px', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', flexFlow: 'row' }}>
                        <SelectBox />
                        {/* <label htmlFor="expiryFilter">Expiry Date:</label> */}
                        <select name="expiryFilter" id="expiryFilter" value={expiryFilter} onChange={(e) => handleExpiryFilter(e.target.value)}>
                            <option value="">Select Expiry Date</option>
                            {expiryDatesList.map((expiryDate, index) => (
                                <option key={index} value={expiryDate}>
                                    {expiryDate}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexFlow: 'row', marginRight: '10px', paddingRight: '10px' }}>
                        <button onClick={downloadCSV} className='csv-button'>Download CSV</button>
                        <button onClick={() => { navigate('/table2'); }} className='csv-button btn'> View Futures </button>
                    </div>
                </div>

                {/* <div className='butons'>
                    <p style={{ textAlign: "center", fontSize: '20px' }} className='om'>Options Market : {state.name}</p>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ width: '75%' }}>
                            <p className='sort'>Sort By</p>
                            <SelectBox />
                            <label htmlFor="expiryFilter">Expiry Date:</label>
                            <select name="expiryFilter" id="expiryFilter" value={expiryFilter} onChange={(e) => handleExpiryFilter(e.target.value)}>
                                <option value="">Expiry Dates</option>
                                {expiryDatesList.map((expiryDate, index) => (
                                    <option key={index} value={expiryDate}>
                                        {expiryDate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ textAlign: 'right', PaddingRight: '20px' }}>
                            <button onClick={downloadCSV} className='csv-button'>Download CSV</button>
                            <button onClick={() => { navigate('/table2'); }} className='csv-button'> View Futures </button>
                        </div>
                    </div> */}
            </div>
            <div className='moneyy'>
                <div>
                    <button className='backhome'><Link to='/' className='home'>Back to Home</Link></button>
                </div>
                <div className='money'>
                    <div className='inmoney'>In the Money</div>
                    <div className='outmoney'>Out of Money</div>
                </div>
            </div>


            <div className='container'>
                <div className='table-container'>
                    <table className='custom-table'>
                        <thead>
                            <tr>
                                <th>Expiry Date</th>
                                <th>Volume</th>
                                <th>OI</th>
                                <th>Change in OI (COI)</th>
                                <th>LTP</th>
                                <th>IV (%)</th>
                                <th>Change</th>
                                <th>Bid Qty</th>
                                <th>Bid Price</th>
                                <th>Ask Price</th>
                                <th>Ask Qty</th>
                                <th onClick={() => handleSort('strike')} style={{ cursor: "pointer" }}>Strike Price</th>
                                <th>Call/Put</th>
                                <th>Time Stamp</th>
                                <th>Sequence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData && filteredData.map(([key1, value]) => {
                                const sname = value['name'];
                                if (sname === state.name) {
                                    return (
                                        <tr key={key1} style={value['colour'] === true ? { color: '#234F1E' } : { color: '#ff0000' }}>
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
                </div>
            </div>
        </div >
    );
}
