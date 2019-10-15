import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import Fields from './Fields';
import Products from './Products';
import Periods from './Periods';
import Plantings from './Plantings';
import { randomId } from '../../helpers';
import * as randomColor from 'randomcolor';
import TotalStatistics from './TotalStatistics';
import Leader from './Leader';
import * as _ from 'lodash';
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
            selectedPeriod: 3,
            selectedField: 1,
        };
    }

    componentDidMount() {
        this.getTotalStatisticsData();
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

    //VALIDATION HATALARI GONDERILMEMISTIR
    handlePercentChange = (value, productId) => {
        //YUZDE YUZDEN FAZLA EKIM OLMAMASI İÇİN VALİASYON
        if (value < 0) {
            return;
        }
        const currentPlantings = this.state.plantings.filter(x => x.periodId === Number(this.state.selectedPeriod) && x.fieldId === Number(this.state.selectedField));
        const plantedProductIds = [...new Set(currentPlantings.map(x => x.productId))];
        const plantedProducts = this.state.products.filter(x => plantedProductIds.includes(x.id)).map(product => {
            const percent = this.state.plantings.find(x => x.periodId === Number(this.state.selectedPeriod) && x.fieldId === Number(this.state.selectedField) && x.productId === product.id).percent;
            return { ...product, percent: percent };
        });

        let filledPercent = 0;
        for (let i = 0; i < plantedProducts.length; i++) {
            if (plantedProducts[i].id === productId)
                continue;
            filledPercent += plantedProducts[i].percent;

        }

        if (filledPercent + value > 100) {
            return;
        }

        let changedPlanting = this.state.plantings.find(x => x.periodId === Number(this.state.selectedPeriod) && x.fieldId === Number(this.state.selectedField) && x.productId === productId);
        if (!changedPlanting)
            changedPlanting = {
                id: randomId(),
                periodId: Number(this.state.selectedPeriod),
                fieldId: Number(this.state.selectedField),
                productId: productId,
            }
        changedPlanting.percent = value;
        const otherPlantings = this.state.plantings.filter(x => !(x.periodId === Number(this.state.selectedPeriod) && x.fieldId === Number(this.state.selectedField) && x.productId === productId));
        this.setState({
            plantings: [...otherPlantings, changedPlanting]
        });
    }

    //ZAMANIM OLMADIĞINDAN KOD TEKRARI GİDERİLMEMİŞTİR
    //VALIDATION HATALARI GONDERILMEMISTIR
    handleFieldCreate = (values) => {
        if (this.state.fields.filter(x => x.name === values.name).length < 1)
            this.setState({
                fields: [
                    ...this.state.fields,
                    {
                        id: randomId(), ...values
                    }
                ]
            })
    }

    //ZAMANIM OLMADIĞINDAN KOD TEKRARI GİDERİLMEMİŞTİR
    //VALIDATION HATALARI GONDERILMEMISTIR
    handlePeriodCreate = (values) => {
        if (this.state.periods.filter(x => x.name === values.name).length < 1)
            this.setState({
                periods: [
                    ...this.state.periods,
                    {
                        id: randomId(), ...values
                    }
                ]
            })
    }

    //ZAMANIM OLMADIĞINDAN KOD TEKRARI GİDERİLMEMİŞTİR
    //VALIDATION HATALARI GONDERILMEMISTIR
    handleProductCreate = (values) => {
        if (this.state.products.filter(x => x.name === values.name).length < 1)
            this.setState({
                products: [
                    ...this.state.products,
                    {
                        id: randomId(), ...values,
                        color: randomColor()
                    }
                ]
            })
    }

    getTotalStatisticsData = () => {
        const arbitraryStackKey = "stack1";

        let datasets = []
        let labels = [];

        for (let i = 0; i < this.state.products.length; i++) {
            labels.push(this.state.products[i].name);
        }

        for (let i = 0; i < this.state.periods.length; i++) {
            let data = []

            for (let i = 0; i < this.state.products.length; i++) {
                data.push({
                    productId: this.state.products[i].id,
                    size: 0
                })
            }

            const currentPlantings = this.state.plantings.filter(x => x.periodId === Number(this.state.periods[i].id)).map((plt => {
                const field = this.state.fields.find(x => x.id === plt.fieldId);
                const product = this.state.products.find(x => x.id === plt.productId);
                const period = this.state.periods.find(x => x.id === plt.periodId);

                return {
                    ...plt, field, product, period
                }

            }));

            for (let m = 0; m < currentPlantings.length; m++) {
                for (let j = 0; j < this.state.products.length; j++) {
                    if (currentPlantings[m].productId !== this.state.products[j].id)
                        continue;
                    for (let k = 0; k < data.length; k++) {
                        if (data[k].productId === this.state.products[j].id) {
                            data[k].size = data[k].size + (currentPlantings[m].percent * currentPlantings[m].field.size / 100);
                        }
                    }

                }

            }


            let color;

            if (!this.state.periods[i].color) {
                const others = this.state.periods.filter(x => x.id !== this.state.periods[i].id);
                const updated = { ...this.state.periods[i] }
                color = randomColor;
                updated.color = color();
                this.setState({
                    periods: [...others, updated]
                })
            } else {
                color = this.state.periods[i].color;
            }

            datasets.push({
                stack: arbitraryStackKey,
                backgroundColor: color,
                label: this.state.periods[i].name,
                data: data.map(x => x.size)
            });
        }

        return {
            labels,
            datasets: datasets
        }
    }



    calculateLeader = () => {
        let leader = {
            name: "None",
            size: 0
        }

        const populatedPlantings = this.state.plantings.map((plt => {
            const field = this.state.fields.find(x => x.id === plt.fieldId);
            const product = this.state.products.find(x => x.id === plt.productId);
            const period = this.state.periods.find(x => x.id === plt.periodId);

            return {
                ...plt, field, product, period
            }

        }));

        let grouped = _.groupBy(populatedPlantings, x => x.productId);
        debugger;
        for (const pr in grouped) {
            let totalSize = 0;
            for (let j = 0; j < grouped[pr].length; j++) {
                totalSize += grouped[pr][j].percent * grouped[pr][j].field.size / 100;
            }
            if (totalSize > leader.size) {
                leader = {
                    name: grouped[pr][0].product.name,
                    size: totalSize
                }
            }
        }
        return leader;

    };



    render() {
        const { fields, periods, selectedPeriod, selectedField, products, plantings } = this.state;
        return (
            <div className="dp-container">
                <Row style={{ alignItems: 'stretch' }}>
                    <Col md={12} lg={4}>
                        <Fields fields={this.state.fields} onCreate={this.handleFieldCreate} />
                    </Col>
                    <Col md={12} lg={4}>
                        <Products products={this.state.products} onCreate={this.handleProductCreate} />
                    </Col>
                    <Col md={12} lg={4}>
                        <Periods periods={this.state.periods} onCreate={this.handlePeriodCreate} />
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
                            onPercentChange={this.handlePercentChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} lg={8}>
                        <TotalStatistics data={this.getTotalStatisticsData()} />
                    </Col>
                    <Col md={12} lg={4}>
                        <Leader leader={this.calculateLeader()} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default FarmerProblem
