import React from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap';
const Fields = ({ fields }) => {
    return (
        <div className="dp-card-wrapper">
            <Card className="dp-card">
                <CardTitle>
                    <h5 className="dp-card__title">Tarlalar</h5>

                </CardTitle>
                <CardBody className="dp-card__body">
                    <div className="dp-card__item-list">
                        {fields.map(field => {
                            return (
                                <div className="dp-card__item dp-card__item--multiple" key={field.id}>
                                    <span>
                                        {field.name}
                                    </span>
                                    <span>
                                        {field.size} Dönüm
                                    </span>
                                </div>

                            )
                        })}
                    </div>

                    <form className="dp-card__form">
                        <div class="form-row">
                            <div className="col-8">
                                <input type="text" className="form-control" id="name" placeholder="Tarla Adı" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" id="size" placeholder="Dönüm" />
                            </div>
                            <button type="submit" className="btn btn-primary">+</button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>

    )
}

export default Fields;
