import { Link, useNavigate } from "react-router-dom";

import './index.css';

export default function Card2(props) {
    const navigate = useNavigate();

    const text = {
        position: "absolute",
        left: "15px",
        bottom: "0",
        fontWeight: "600",
        fontSize: "22px",
        letterSpacing: "1.3px",
    }
    
    const bgimg = {
        backgroundImage: `linear-gradient(to right bottom,
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.4)),url(${props.url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    }

    return (
        <div className="col-sm-3">
            <Link to={{pathname: '/table1',
                        state: props.name}}>
                <div className="card2" style={bgimg}>
                    <div className="card-body">
                        <p style={text}>{props.name}</p>
                    </div>
                </div>
            </Link>
            {/* <button onClick= {() => {
                navigate('/table1',
                {
                    state: {
                        name: props.name,
                    }
                });
            }
            }> 
                <div className="card2" style={bgimg}>
                    <div className="card-body">
                        <p style={text}>{props.name}</p>
                    </div>
                </div> 
            </button> */}
        </div>
    )
}