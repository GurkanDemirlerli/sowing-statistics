import React, { useState } from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap';
const Fields = ({ fields, onCreate }) => {

    const [name, setName] = useState("");
    const [size, setSize] = useState("");

    const resetForm = () => {
        setName("");
        setSize("");
    }

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

                    <form className="dp-card__form" onSubmit={(e) => { e.preventDefault(); resetForm(); return onCreate({ name, size }) }}>
                        <div class="form-row">
                            <div className="col-8">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control form-control-sm" id="name" placeholder="Tarla Adı" />
                            </div>
                            <div className="col">
                                <input type="number" value={size} onChange={(e) => setSize(e.target.value)} className="form-control form-control-sm" id="size" placeholder="Dönüm" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-sm">+</button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>

    )
}

export default Fields;
