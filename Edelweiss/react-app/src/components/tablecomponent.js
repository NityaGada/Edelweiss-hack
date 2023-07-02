// import React from "react";
import Table from 'react-bootstrap/Table';

export default function Tablecomponent(props) {
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Expiry Date</th>
                    <th>Sequence Number</th>
                    <th>Volume</th>
                    <th>Open Interest (OI)</th>
                    <th>Change
                        in Open Interest (COI)</th>
                    <th>Last Traded Price (LTP)</th>
                    <th>Implied Volatility</th>
                    <th>Change</th>
                    <th>Bid Quantity</th>
                    <th>Bid Price</th>
                    <th>Ask Price</th>
                    <th>Ask Quantity</th>
                    <th>Strike</th>
                    <th>Call / Put (Ce/Pe)</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.symbol}</td>
                        <td>{item.LTP}</td>
                        <td>{item.LTQ}</td>
                        <td>{item.totalTradedVolume}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}