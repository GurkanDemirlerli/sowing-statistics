import React from 'react'
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import * as randomColor from 'randomcolor';
const TotalStatistics = ({ data }) => {
    // const options = {
    //     scales: {
    //         xAxes: [{
    //             stacked: true
    //         }],
    //         yAxes: [{
    //             stacked: true
    //         }]
    //     }
    // }

    // let data = {
    //     datasets: [{
    //         label: 'test1',
    //         data: [1]
    //     },
    //     {
    //         label: 'test2',
    //         data: [2]
    //     }],
    //     labels: ['label']
    // }



    return (
        <div className="dp-card-wrapper">
            <Card className="dp-card">
                <CardTitle>
                    <h5 className="dp-card__title">Toplam Ekim İstatistiği</h5>
                </CardTitle>
                <CardBody className="dp-card__body">

                    <Bar height={500} data={data} options={{
                        maintainAspectRatio: false,
                    }} />
                </CardBody>
            </Card>
        </div>

    )
}

export default TotalStatistics;
