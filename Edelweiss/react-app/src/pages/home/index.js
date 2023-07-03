import React from 'react'
import Card from 'react-bootstrap/Card';
import './index.css';
import { Link } from "react-router-dom";
import {Card2} from "../../components";
import stockmarket from "../../images/stock_market.jpeg";
import stm from "../../images/stm.jpg";
import futurestockmarket from "../../images/futuristic-stock-market-background-with-trend-graph_83282-38.jpeg";
import learning from "../../images/learning.jpeg";

const Home = () => {
    return (

        <div>
            <h1>The Options Chain</h1>
            <div style={{ backgroundColor: '#E7DECE', paddingBottom: '20px' }}>
            <h2 className='start'>Trending Symbols</h2>
                <div className='container '>
                    <div className='securities flex text-white flex-row md:flex-col'>
                        <div className="row">
                            <Card2 name='ALLBANKS' url={stockmarket}/>
                            <Card2 name='MAINIDX' url={stm}/>
                            <Card2 name='FINANCIALS' url={futurestockmarket}/>
                            <Card2 name='MIDCAPS' url={stockmarket}/>
                        </div>
                    </div>
                </div >
            </div>
            <div className='learn'>
                <div className='banner'></div>
                    <div style={{ backgroundColor: '#E7DECE', paddingBottom: '20px' }}>
                        <h2 className='start'>What are Options Chain</h2>
                        <div className='container'>
                    <Link to="#">
                        <Card className="bg-dark text-white shadow-primary"> 
                            <Card.Img src={learning} alt="Card image" />
                            <Card.ImgOverlay>
                                <Card.Text>
                                    Know the basics and terminologies of the Options Chain.
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
                </div>
            </div>
        </div >
    )
}

export default Home;

