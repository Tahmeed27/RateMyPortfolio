import React from 'react'
import { Doughnut } from 'react-chartjs-2';


const DonutGraph = (props) => {
    const { project } = props

    const chartData = {
        labels: project.tickers,
        datasets: [
            {
                label: 'Asset Allocation',
                data: project.percentages,
                // backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#2980b9'],
            }],
    }
    const chartOptions = {
        cutoutPercentage: 60,
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
            colorschemes: {
                scheme: "office.Metro6",
                // scheme: 'tableau.HueCircle19',
                // reverse: true
            }
        },
        legend: {
            position: 'top',
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var currentValue = dataset.data[tooltipItem.index];
                    return currentValue + '%';
                },
                title: function (tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                }
            }
        },
    }

    return (
        <Doughnut
            data={chartData}
            options={chartOptions} 
        />
    )
}

export default DonutGraph
