import { useNavigate } from "react-router-dom";

export default function Select(props) {
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
        <select name="securities" id="securities" onChange={(e) => handleOptionChange(e.target.value)} className="custom-select">
            <option value="">Select</option>
            <option value="ALL">ALL</option>
            <option value="ALLBANKS">ALLBANKS</option>
            <option value="MAINIDX">MAINIDX</option>
            <option value="FINANCIALS">FINANCIALS</option>
            <option value="MIDCAPS">MIDCAPS</option>
            
        </select>
        </>
    );
}