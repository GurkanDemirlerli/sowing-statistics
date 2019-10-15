import React from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap';
const Periods = ({ periods }) => {
    return (
        <div className="dp-card-wrapper">
            <Card className="dp-card">
                <CardTitle>
                    <h5 className="dp-card__title">Yıllar</h5>

                </CardTitle>
                <CardBody className="dp-card__body">
                    <div className="dp-card__item-list">
                        {periods.map(field => {
                            return (
                                <div className="dp-card__item" key={field.id}>
                                    <span>
                                        {field.name}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    <form className="dp-card__form">
                        <div class="form-row">
                            <div className="col">
                                <input type="text" className="form-control" id="name" placeholder="Yıl" />
                            </div>
                            <button type="submit" className="btn btn-primary">+</button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>

    )
}

export default Periods;