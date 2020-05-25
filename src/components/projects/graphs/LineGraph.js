import React, { useState, useEffect } from 'react';
import { Chart, Line } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import moment from 'moment'


const LineGraph = (props) => {
    const [lineData, setLineData] = useState({});
    const [price, setPrice] = useState(0);
    let { ticker, tickerName } = props;

    const lineDataset = (stockLabels, stockData) => {
        return {
            labels: stockLabels,
            datasets: [
                {
                    label: 'Price',
                    data: stockData,
                },
            ]
        }
    }

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 0
            }
        },
        tooltips: {
            position: 'nearest',
            mode: 'index',
            intersect: false
        },

        scales: {
            xAxes: [{
                display: false //this will remove all the x-axis grid lines
            }],
            yAxes: [{
                display: false //this will remove all the x-axis grid lines
            }]
        },
        plugins: {
            colorschemes: {
                scheme: "brewer.SetThree8",
                // scheme: 'tableau.HueCircle19',
                // reverse: true
            }
        },
        legend: {
            display: false,
        }
    }

    const line = () => {
        let price = [];
        let time = [];

        const chars = ticker.split('.');
        if (chars[1] == 'TRT') ticker = ticker.slice(0, -3) + 'TO'
        
        const API_key = 'bqo7povrh5reqlm366jg';
        console.log(ticker)
        let lineAPI = `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=15&from=1572651390&to=1572910590&token=bqo7povrh5reqlm366jg`;
        let priceAPI = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_key}`
        const axios = require('axios');

        const getLineAPI = axios.get(lineAPI)
        const getPriceAPI = axios.get(priceAPI)
        axios.all([getLineAPI, getPriceAPI]).then(
            axios.spread((...allData) => {
                console.log(allData)
                const lineInfo = allData[0]
                const currPrice = Number(allData[1]["data"]["c"]).toFixed(2)
                // console.log(currPrice, lineInfo)

                for (const dataObj in lineInfo["data"]["c"]) {
                    price.push(Number(lineInfo["data"]["c"][dataObj]).toFixed(2))
                    time.push(moment.unix(lineInfo["data"]["t"][dataObj]).calendar())

                }
               
                setLineData(lineDataset(time, price));
                setPrice(currPrice);
            })
        ).catch(err => {
            console.log(err)
        })
    }

    const styles = {
        container: {
            display: 'inline-flex',
            flexDirection: 'row',
            padding: '1rem'
        },
        textContainer: {
            display: 'inline-flex',
            paddingRight: '1rem',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: '7rem',
            justifyContent: 'space-between'
        },
        chartContainer: {
            marginTop: 'auto',
            width: '150px',
            height: '65px'
        },
        chart: {
            width: '130px',
            height: '65px'
        }
    }



    useEffect(() => {

        line()
        //    return () => {maintainmaintainAspectRatioAspectRatio
        Chart.pluginService.register({
            afterDraw: function (chart, easing) {
                if (chart.tooltip._active && chart.tooltip._active.length && chart.scales['y-axis-0']) {
                    const activePoint = chart.controller.tooltip._active[0];
                    const ctx = chart.ctx;
                    const x = activePoint.tooltipPosition().x;
                    const topY = chart.scales['y-axis-0'].top;
                    const bottomY = chart.scales['y-axis-0'].bottom;

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#e23fa9';
                    ctx.stroke();
                    ctx.restore();
                }
            }
        });

    }, [])

    return (

        <div style={styles.container} >
            <div style={styles.textContainer}>
                <div>
                    <Typography align="left" variant="h6">{ticker}</Typography>
                    <Typography style={{ fontSize: '0.8rem' }} align="left" variant="subtitle1">{tickerName}</Typography>
                </div>
                <Typography style={{ fontSize: '1.2rem', fontWeight: 500 }}>${price}</Typography>
            </div>
            <div style={styles.chartContainer}>
                <Line
                    style={styles.chart}
                    data={lineData}
                    options={lineOptions}
                />
            </div>
        </div>

    )

}
export default LineGraph;


