import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import Fields from './Fields';
import Products from './Products';
import Periods from './Periods';
import Plantings from './Plantings';
export class FarmerProblem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [
                {
                    id: 1,
                    name: "Tarla 1",
                    size: 10
                }, {
                    id: 2,
                    name: "Tarla 2",
                    size: 10
                }, {
                    id: 3,
                    name: "Tarla 3",
                    size: 10
                },
            ],
            products: [
                {
                    id: 1,
                    name: "a",
                    color: "#B0B145",
                }, {
                    id: 2,
                    name: "b",
                    color: "#36A2EB",

                }, {
                    id: 3,
                    name: "c",
                    color: "#FFCE56",

                },
            ],
            periods: [
                {
                    id: 1,
                    name: "2019",
                }, {
                    id: 2,
                    name: "2020"
                }, {
                    id: 3,
                    name: "2021"
                }, {
                    id: 4,
                    name: "2022"
                },
            ],
            plantings: [
                {
                    id: 1,
                    periodId: 1,
                    fieldId: 1,
                    productId: 1,
                    percent: 100
                }, {
                    id: 2,
                    periodId: 1,
                    fieldId: 2,
                    productId: 2,
                    percent: 100
                }, {
                    id: 3,
                    periodId: 1,
                    fieldId: 3,
                    productId: 3,
                    percent: 100
                }, {
                    id: 4,
                    periodId: 2,
                    fieldId: 1,
                    productId: 1,
                    percent: 100
                }, {
                    id: 5,
                    periodId: 2,
                    fieldId: 2,
                    productId: 2,
                    percent: 50
                }, {
                    id: 6,
                    periodId: 2,
                    fieldId: 2,
                    productId: 3,
                    percent: 50
                }, {
                    id: 7,
                    periodId: 2,
                    fieldId: 3,
                    productId: 3,
                    percent: 100
                }, {
                    id: 8,
                    periodId: 3,
                    fieldId: 1,
                    productId: 1,
                    percent: 20
                }, {
                    id: 9,
                    periodId: 3,
                    fieldId: 1,
                    productId: 2,
                    percent: 80
                }, {
                    id: 10,
                    periodId: 3,
                    fieldId: 2,
                    productId: 2,
                    percent: 100
                }, {
                    id: 11,
                    periodId: 3,
                    fieldId: 3,
                    productId: 3,
                    percent: 100
                }, {
                    id: 12,
                    periodId: 4,
                    fieldId: 1,
                    productId: 1,
                    percent: 1
                }, {
                    id: 13,
                    periodId: 4,
                    fieldId: 2,
                    productId: 2,
                    percent: 100
                }, {
                    id: 14,
                    periodId: 4,
                    fieldId: 3,
                    productId: 3,
                    percent: 100
                }
            ],
            selectedPeriod: null,
            selectedField: null
        };
    }

    handlePeriodSelect = (e) => {
        const value = e.target.value;
        if (value === "")
            this.setState({ selectedPeriod: null })
        else this.setState({ selectedPeriod: value });
    }

    handleFieldSelect = (e) => {
        const value = e.target.value;
        if (value === "")
            this.setState({ selectedField: null })
        else this.setState({ selectedField: value });
    }

    render() {
        const { fields, periods, selectedPeriod, selectedField, products, plantings } = this.state;
        return (
            <div className="dp-container">
                <Row>
                    <Col md={12} lg={4}>
                        <Fields fields={this.state.fields} />
                    </Col>
                    <Col md={12} lg={4}>
                        <Products products={this.state.products} />
                    </Col>
                    <Col md={12} lg={4}>
                        <Periods periods={this.state.periods} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Plantings
                            onSelectField={this.handleFieldSelect}
                            onSelectPeriod={this.handlePeriodSelect}
                            plantings={plantings}
                            products={products}
                            selectedPeriod={selectedPeriod}
                            selectedField={selectedField}
                            fields={fields}
                            periods={periods}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default FarmerProblem
