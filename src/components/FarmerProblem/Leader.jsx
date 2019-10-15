import React from 'react'
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';

const Leader = ({ leader }) => {
    return (
        <div className="dp-card-wrapper">
            <Card className="dp-card">
                <CardTitle>
                    <h5 className="dp-card__title">Lider</h5>
                </CardTitle>
                <CardBody className="dp-card__body dp-card__body--leader">
                    <div>
                        {leader.name}
                    </div>
                    <div>
                        {leader.size} Dönüm
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default Leader
