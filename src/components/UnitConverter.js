import './UnitConverter.css';
import React, { useState, useEffect } from 'react';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import { Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';

const cn = (...args) => args.filter(Boolean).join(' ');

const Tab = ({ children }) => {
    const { isActive, onClick } = useTabState();

    return (
        <button className={cn('tab', isActive && 'active')} onClick={onClick}>
            {children}
        </button>
    );
};

const UnitConverter = () => {
    const [index, setIndex] = useState(0);
    const [result, setResult] = useState();
    const [value, setValue] = useState();
    const [unitFrom, setUnitFrom] = useState([]);
    const [unitTo, setUnitTo] = useState([]);

    const handleSubmit = () => {
        axios
            .get(
                `https://converter.doxxie.live/convert?from=${unitFrom}&to=${unitTo}&amount=${value}`
            )
            .then((res) => {
                setResult(res.data.converted);
                console.log(res.data.converted);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        setIndex(1);
    }, []);

    return (
        <div id='unit-converter'>
            <Tabs state={[index, setIndex]}>
                <div className='tab-list'>
                    <Tab>Length</Tab>
                    <Tab>Weight</Tab>
                    <Tab>Volume</Tab>
                    <Tab>Area</Tab>
                    <Tab>Data</Tab>
                    <Tab>Time</Tab>
                    <Tab>Temperature</Tab>
                </div>
                <div className='tabs'>
                    {/* Length */}
                    <Panel>
                        <div className='panel-container'>
                            <div className='unit-from'>
                                <div>
                                    <p className='panel-style'>FROM:</p>
                                </div>
                                <form>
                                    <div>
                                        <input
                                            type='number'
                                            className='input-style'
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                    </div>
                                </form>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitFrom}
                                            onChange={(e) => setUnitFrom([e.target.value])}
                                            multiple
                                        >
                                            <option value='m'>Meter</option>
                                            <option value='km'>Kilometer</option>
                                            <option value='cm'>Centimeter</option>
                                            <option value='mm'>Millimeter</option>
                                            <option value='mi'>Mile</option>
                                            <option value='yd'>Yard</option>
                                            <option value='ft'>Feet</option>
                                            <option value='in'>Inch</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className='unitTo'>
                                <div>
                                    <p className='panel-style'>TO:</p>
                                </div>
                                <div className='display-style'>
                                    <p>{result}</p>
                                </div>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitTo}
                                            onChange={(e) => setUnitTo([e.target.value])}
                                            multiple
                                        >
                                            <option value='m'>Meter</option>
                                            <option value='km'>Kilometer</option>
                                            <option value='cm'>Centimeter</option>
                                            <option value='mm'>Millimeter</option>
                                            <option value='mi'>Mile</option>
                                            <option value='yd'>Yard</option>
                                            <option value='ft'>Feet</option>
                                            <option value='in'>Inch</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Panel>

                    {/*  */}
                    {/*  */}
                    {/* Weight */}
                    <Panel>
                        <div className='panel-container'>
                            <div className='unit-from'>
                                <div>
                                    <p className='panel-style'>FROM:</p>
                                </div>
                                <form>
                                    <div>
                                        <input
                                            type='number'
                                            className='input-style'
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                    </div>
                                </form>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitFrom}
                                            onChange={(e) => setUnitFrom([e.target.value])}
                                            multiple
                                        >
                                            <option value='g'>Gram</option>
                                            <option value='kg'>Kilogram</option>
                                            <option value='mg'>Miligram</option>
                                            <option value='lb'>Pound</option>
                                            <option value='t'>Ton</option>
                                            <option value='mt'>Metric Ton</option>
                                            <option value='oz'>Ounce</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className='unitTo'>
                                <div>
                                    <p className='panel-style'>TO:</p>
                                </div>
                                <div className='display-style'>
                                    <p>{result}</p>
                                </div>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitTo}
                                            onChange={(e) => setUnitTo([e.target.value])}
                                            multiple
                                        >
                                            <option value='g'>Gram</option>
                                            <option value='kg'>Kilogram</option>
                                            <option value='mg'>Miligram</option>
                                            <option value='lb'>Pound</option>
                                            <option value='t'>Ton</option>
                                            <option value='mt'>Metric Ton</option>
                                            <option value='oz'>Ounce</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Panel>

                    {/* Volume */}
                    <Panel>
                        <div className='panel-container'>
                            <div className='unit-from'>
                                <div>
                                    <p className='panel-style'>FROM:</p>
                                </div>
                                <form>
                                    <div>
                                        <input
                                            type='number'
                                            className='input-style'
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                    </div>
                                </form>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitFrom}
                                            onChange={(e) => setUnitFrom([e.target.value])}
                                            multiple
                                        >
                                            <option value='ml'>Militer</option>
                                            <option value='l'>Liter</option>
                                            <option value='m3'>Cubic Meter</option>
                                            <option value='km3'>Cubic Kilometer</option>
                                            <option value='cm3'>Cubic Centimeter</option>
                                            <option value='mm3'>Cubic Milimeter</option>
                                            <option value='gal'>US Gallon</option>
                                            <option value='qt'>US Quart</option>
                                            <option value='cup'>US Cup</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className='unitTo'>
                                <div>
                                    <p className='panel-style'>TO:</p>
                                </div>
                                <div className='display-style'>
                                    <p>{result}</p>
                                </div>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitTo}
                                            onChange={(e) => setUnitTo([e.target.value])}
                                            multiple
                                        >
                                            <option value='ml'>Militer</option>
                                            <option value='l'>Liter</option>
                                            <option value='m3'>Cubic Meter</option>
                                            <option value='km3'>Cubic Kilometer</option>
                                            <option value='cm3'>Cubic Centimeter</option>
                                            <option value='mm3'>Cubic Milimeter</option>
                                            <option value='gal'>US Gallon</option>
                                            <option value='qt'>US Quart</option>
                                            <option value='cup'>US Cup</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Panel>

                    {/* Area */}
                    <Panel>
                        <div className='panel-container'>
                            <div className='unit-from'>
                                <div>
                                    <p className='panel-style'>FROM:</p>
                                </div>
                                <form>
                                    <div>
                                        <input
                                            type='number'
                                            className='input-style'
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                    </div>
                                </form>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitFrom}
                                            onChange={(e) => setUnitFrom([e.target.value])}
                                            multiple
                                        >
                                            <option value='m2'>Square Meter</option>
                                            <option value='km2'>Square Kilometer</option>
                                            <option value='cm2'>Square Centimeter</option>
                                            <option value='mm2'>Square Millimeter</option>
                                            <option value='in2'>Square Inch</option>
                                            <option value='mi2'>Square Mile</option>
                                            <option value='yd2'>Square Yard</option>
                                            <option value='ha'>Hectare</option>
                                            <option value='ac'>Acres</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className='unitTo'>
                                <div>
                                    <p className='panel-style'>TO:</p>
                                </div>
                                <div className='display-style'>
                                    <p>{result}</p>
                                </div>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitTo}
                                            onChange={(e) => setUnitTo([e.target.value])}
                                            multiple
                                        >
                                            <option value='m2'>Square Meter</option>
                                            <option value='km2'>Square Kilometer</option>
                                            <option value='cm2'>Square Centimeter</option>
                                            <option value='mm2'>Square Millimeter</option>
                                            <option value='in2'>Square Inch</option>
                                            <option value='mi2'>Square Mile</option>
                                            <option value='yd2'>Square Yard</option>
                                            <option value='ha'>Hectare</option>
                                            <option value='ac'>Acres</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Panel>

                    {/* Data */}
                    <Panel>
                        <div className='panel-container'>
                            <div className='unit-from'>
                                <div>
                                    <p className='panel-style'>FROM:</p>
                                </div>
                                <form>
                                    <div>
                                        <input
                                            type='number'
                                            className='input-style'
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                    </div>
                                </form>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitFrom}
                                            onChange={(e) => setUnitFrom([e.target.value])}
                                            multiple
                                        >
                                            <option value='b'>Byte</option>
                                            <option value='Kb'>Kilobyte</option>
                                            <option value='Mb'>Megabyte</option>
                                            <option value='Gb'>Gigabyte</option>
                                            <option value='Tb'>Terabyte</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className='unitTo'>
                                <div>
                                    <p className='panel-style'>TO:</p>
                                </div>
                                <div className='display-style'>
                                    <p>{result}</p>
                                </div>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitTo}
                                            onChange={(e) => setUnitTo([e.target.value])}
                                            multiple
                                        >
                                            <option value='b'>Byte</option>
                                            <option value='Kb'>Kilobyte</option>
                                            <option value='Mb'>Megabyte</option>
                                            <option value='Gb'>Gigabyte</option>
                                            <option value='Tb'>Terabyte</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Panel>

                    {/* Time */}
                    <Panel>
                        <div className='panel-container'>
                            <div className='unit-from'>
                                <div>
                                    <p className='panel-style'>FROM:</p>
                                </div>
                                <form>
                                    <div>
                                        <input
                                            type='number'
                                            className='input-style'
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                    </div>
                                </form>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitFrom}
                                            onChange={(e) => setUnitFrom([e.target.value])}
                                            multiple
                                        >
                                            <option value='s'>Second</option>
                                            <option value='ms'>Millisecond</option>
                                            <option value='min'>Minute</option>
                                            <option value='h'>Hour</option>
                                            <option value='d'>Day</option>
                                            <option value='week'>Week</option>
                                            <option value='month'>Month</option>
                                            <option value='year'>Year</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className='unitTo'>
                                <div>
                                    <p className='panel-style'>TO:</p>
                                </div>
                                <div className='display-style'>
                                    <p>{result}</p>
                                </div>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitTo}
                                            onChange={(e) => setUnitTo([e.target.value])}
                                            multiple
                                        >
                                            <option value='s'>Second</option>
                                            <option value='ms'>Millisecond</option>
                                            <option value='min'>Minute</option>
                                            <option value='h'>Hour</option>
                                            <option value='d'>Day</option>
                                            <option value='week'>Week</option>
                                            <option value='month'>Month</option>
                                            <option value='year'>Year</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Panel>

                    {/* Temperature */}
                    <Panel>
                        <div className='panel-container'>
                            <div className='unit-from'>
                                <div>
                                    <p className='panel-style'>FROM:</p>
                                </div>
                                <form>
                                    <div>
                                        <input
                                            type='number'
                                            className='input-style'
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                    </div>
                                </form>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitFrom}
                                            onChange={(e) => setUnitFrom([e.target.value])}
                                            multiple
                                        >
                                            <option value='C'>Celsius</option>
                                            <option value='K'>Kelvin</option>
                                            <option value='F'>Fahrenheit</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className='unitTo'>
                                <div>
                                    <p className='panel-style'>TO:</p>
                                </div>
                                <div className='display-style'>
                                    <p>{result}</p>
                                </div>
                                <form className='unit-converter'>
                                    <div className='list-container'>
                                        <select
                                            className='list-style'
                                            value={unitTo}
                                            onChange={(e) => setUnitTo([e.target.value])}
                                            multiple
                                        >
                                            <option value='C'>Celsius</option>
                                            <option value='K'>Kelvin</option>
                                            <option value='F'>Fahrenheit</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Panel>
                </div>
            </Tabs>
            <div>
                <Row className='mb-4'>
                    <Col style={{ textAlign: 'center' }}>
                        <Button className='submit-button' variant='white' onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default UnitConverter;
