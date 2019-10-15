import React from 'react'
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';


const Plantings = ({ periods, fields, selectedPeriod, selectedField, onSelectPeriod, onSelectField, products, plantings }) => {
    const getPlantingData = () => {
        const currentPlantings = plantings.filter(x => x.periodId === Number(selectedPeriod) && x.fieldId === Number(selectedField));
        const plantedProductIds = [...new Set(currentPlantings.map(x => x.productId))];
        const plantedProducts = products.filter(x => plantedProductIds.includes(x.id)).map(product => {
            const percent = plantings.find(x => x.periodId === Number(selectedPeriod) && x.fieldId === Number(selectedField) && x.productId === product.id).percent;
            return { color: product.color, name: product.name, percent: percent };
        });

        let filledPercent;
        if (plantedProducts.length === 0)
            filledPercent = 100;
        else if (plantedProducts.length === 1)
            filledPercent = plantedProducts[0].percent;
        else
            filledPercent = plantedProducts.reduce((total, num) => {
                return total.percent + (num.percent);
            });

        if (filledPercent !== 100) {
            plantedProducts.push({
                color: '#CCC',
                name: "Boş",
                percent: (100 - filledPercent)
            });
        }

        return {
            labels: plantedProducts.map(x => x.name),
            datasets: [{
                data: plantedProducts.map(x => x.percent),
                backgroundColor: plantedProducts.map(x => x.color),
                hoverBackgroundColor: plantedProducts.map(x => x.color)

            }]
        };
    }

    return (
        <div className="dp-card-wrapper">
            <Card className="dp-card">
                <CardTitle>
                    <h5 className="dp-card__title">Ekimler</h5>
                </CardTitle>
                <CardBody className="dp-card__body">
                    <Row>
                        <Col lg={2} >
                            <div class="form-group">
                                <select class="form-control" id="field" onChange={onSelectPeriod} value={selectedPeriod}>
                                    <option value="" className="dp-default-option">Yıl Seçiniz</option>
                                    {periods.map(period => {
                                        return <option key={period.id} value={period.id}>{period.name}</option>
                                    })}
                                </select>

                            </div>
                            <div class="form-group">
                                <select class="form-control" id="field" onChange={onSelectField} value={selectedField}>
                                    <option value="" className="dp-default-option">Tarla Seçiniz</option>
                                    {fields.map(field => {
                                        return <option key={field.id} value={field.id}>{field.name}</option>
                                    })}
                                </select>
                            </div>
                        </Col>
                        {
                            (selectedField && selectedPeriod) &&
                            <React.Fragment>
                                <Col lg={4}>
                                    {products.map(product => {
                                        return (
                                            <div class="form-group row">
                                                <label for={product.name} class="col-sm-1 col-form-label">{product.name}</label>
                                                <div class="col-sm-10">
                                                    <input type="email" class="form-control" id={product.name} placeholder="Ekim Yüzdesi" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Col>

                                <Col lg={6}>
                                    <Doughnut data={getPlantingData()}
                                    />
                                </Col>
                            </React.Fragment>
                        }
                    </Row>
                </CardBody>
            </Card>
        </div>

    )
}

export default Plantings;
