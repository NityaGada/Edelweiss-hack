import './index.css';

import { useNavigate } from "react-router-dom";

export default function SelectBox(props) {
    const navigate = useNavigate();

    const handleOptionChange = (selectedOption) => {
        if (selectedOption === "ALL") {
            navigate('/table3');
        }
        else {
            navigate('/table1', {
                state: {
                    name: selectedOption
                }
            });
        }
    };

    return (
        <>
            <select style={{ marginLeft: '10px', marginBottom: '10px', padding: '7px 13px 7px 13px', border: 'none', borderRadius: '7px', fontWeight: '500', backgroundColor: '#151515', color: '#E7DECE' }} name="securities" id="securities" onChange={(e) => handleOptionChange(e.target.value)} className="custom-select">
                <option value="">Select Symbols</option>
                <option value="ALL">ALL</option>
                <option value="ALLBANKS">ALLBANKS</option>
                <option value="FINANCIALS">FINANCIALS</option>
                <option value="MAINIDX">MAINIDX</option>
                <option value="MIDCAPS">MIDCAPS</option>
            </select>
        </>
    );
}