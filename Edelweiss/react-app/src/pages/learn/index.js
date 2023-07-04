// import { Link } from "react-router-dom";
import './index.css';
// import laptop from '../../images/laptop.jpg';
import { LearningCard } from "../../components";

import { useEffect } from 'react';

const Learn = () => {
    useEffect(() => {
        const id = 'top';
        document.querySelector(`#${id}`).scrollIntoView({ behavior: "smooth" })
    }, []);
    return (
        <div>
            {/* <div className='linkhome'>
                <Link to="../">Home</Link>
            </div> */}
            <div className='banner' id='top'>
            </div>
            <div className='container'>
                <div className='maint'>
                    <div className='title' id='top'>
                        <p > Options Chain </p>
                    </div>
                    <p style={{ fontSize: '18px', fontWeight: '200' }}>
                        An options chain is a comprehensive listing of all available options for a particular underlying asset, such as a stock, exchange-traded fund (ETF), or index. It provides traders and investors with detailed information about the various options contracts available for that particular asset, including their strike prices, expiration dates, and premiums.The options chain typically displays the call options and put options for the underlying asset, organized by their respective strike prices and expiration dates.
                    </p>
                </div>
                <div className='Terms'>
                    <div className='container tr'>
                        <p>
                            Terminologies Simplified For You.
                        </p>
                    </div>
                    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <LearningCard head="Call And Put" content="Call and put options are two types of financial derivatives that allow investors to buy or sell an underlying asset at a predetermined price within a specified time frame. 
                        A call option gives the holder the right to buy the underlying asset at the strike price. It is typically used when investors anticipate the price of the asset to rise. If the market price exceeds the strike price, the call option can be exercised for a profit. 
                        On the other hand, a put option grants the holder the right to sell the underlying asset at the strike price. It is used when investors expect the price of the asset to fall. If the market price drops below the strike price, the put option can be exercised to generate a 
                        profit."/>
                        <LearningCard head="Bid Quantity" content="The bid quantity represents the number of contracts that buyers are willing to purchase at the bid price. It indicates the demand for the option at that price level. Higher bid quantities suggest stronger demand and potentially more liquidity for the option. Traders use the bid quantity to assess market interest and competition among 
                        buyers."/>
                    </div>
                    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <LearningCard head="Strike Price" content="The strike price, also known as the exercise price, is a predetermined price at which an underlying asset can be bought or sold when trading options. It is the price at which the option holder has the right to exercise their option contract. For call options, the strike price is the price at which the option holder can buy the underlying asset, while for put options, it is the price at which the option holder can sell the underlying 
                        asset."/>
                        <LearningCard head="Ask Quantity" content="The ask quantity represents the number of contracts that sellers are willing to sell at the ask price. It indicates the supply of the option at that price level. Higher ask quantities suggest more potential sellers and potentially more liquidity for the option. Traders use the ask quantity to assess market availability and competition among 
                        sellers."/>
                    </div>
                    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <LearningCard head="Expiry Date" content="The expiration date is the specific date on which an options contract becomes invalid and ceases to exist. It is displayed alongside other contract details, such as the strike price. After the expiration date, the options contract loses all value, and the rights and obligations associated with it expire. Traders and investors consider the expiration date when selecting options contracts and planning their trading 
                            strategies."/>
                        <LearningCard head="LTP" content="LTP stands for Last Traded Price. It refers to the most recent price at which a security or instrument was bought or sold. It represents the current market value of the security and is used by traders and investors to track price movements and make decisions based on real-time market
                        conditions."/>
                    </div>
                    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <LearningCard head="Volume" content="Volume refers to the number of contracts traded for a specific options contract during a given period, such as a trading day. It indicates the level of trading activity and liquidity for that option. Higher volume suggests greater market interest and participation, while low volume indicates limited trading 
                        activity." />
                        <LearningCard head="Open Interest" content="Open interest (OI) refers to the total number of outstanding or open options contracts for a specific option at a given point in time. It represents the number of contracts that have been initiated but not yet closed or expired. OI provides insights into the overall activity and potential liquidity of an options contract, indicating the level of market interest and the number of contracts held by 
                        traders."/>
                    </div>
                    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <LearningCard head="Change" content="The change column shows the price difference of an options contract compared to the previous trading session. Positive values indicate price increases, negative values indicate price decreases. It helps traders track recent price movements and assess market 
                        activity."/>
                        <LearningCard head="Implied Volatility (IV)" content="Call and put options are two types of financial derivatives that allow investors to buy or sell an underlying asset at a predetermined price within a specified time frame. 
                        A call option gives the holder the right to buy the underlying asset at the strike price. It is typically used when investors anticipate the price of the asset to rise. If the market price exceeds the strike price, the call option can be exercised for a profit. 
                        On the other hand, a put option grants the holder the right to sell the underlying asset at the strike price. It is used when investors expect the price of the asset to fall. If the market price drops below the strike price, the put option can be exercised to generate a 
                        profit. "/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Learn;