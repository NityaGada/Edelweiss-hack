import React from 'react'
import Card from 'react-bootstrap/Card'
import './index.css';
import { Link } from "react-router-dom";

const Home2 = () => {
    return (

        <div>
            <h1>The Options Chain</h1>
            <h2 className='start'>Trending Symbols</h2>
            <div className='container '>
                <div className='securities flex text-white flex-row md:flex-col'>
                    <div className="row">
                        <div className="col-sm-3">
                            <Link to="#">
                                <div className="card c1">
                                    <div className="card-body">
                                        <p>ALLBANKS</p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-sm-3">
                            <Link to="#">
                                <div className="card c2" >
                                    <div className="card-body">
                                        <p>MAINIDX</p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-sm-3">
                            <Link to="#">
                                <div className="card c3">
                                    <div className="card-body">
                                        <p>FINANCIALS</p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-sm-3">
                            <Link to="#">
                                <div className="card c4" >
                                    <div className="card-body">
                                        <p>MIDCAPS</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
            <h2><span> Learn to Earn!</span></h2>
            <div className='learn'>
                <div className='container'>
                    <Link to="#">
                        <Card className="bg-dark text-white shadow-primary">
                            {/* <Card.Img src="" alt="Card image" /> */}
                            <Card.ImgOverlay>
                                <Card.Text>
                                    Know the basics and terminology of Options Chain.
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default Home2;

