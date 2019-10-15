import React, { useState } from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap';
const Products = ({ products, onCreate }) => {

    const [name, setName] = useState("");

    const resetForm = () => {
        setName("");
    }

    return (
        <div className="dp-card-wrapper">
            <Card className="dp-card">
                <CardTitle>
                    <h5 className="dp-card__title">Ürünler</h5>

                </CardTitle>
                <CardBody className="dp-card__body">
                    <div className="dp-card__item-list">
                        {products.map(field => {
                            return (
                                <div className="dp-card__item" key={field.id}>
                                    <span>
                                        {field.name}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    <form className="dp-card__form" onSubmit={(e) => { e.preventDefault(); resetForm(); return onCreate({ name }) }}>
                        <div class="form-row">
                            <div className="col">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)}  className="form-control form-control-sm" id="name" placeholder="Ürün Adı" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-sm">+</button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>

    )
}

export default Products;
