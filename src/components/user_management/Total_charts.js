import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCoins , faCar , faCaretUp } from '@fortawesome/free-solid-svg-icons';
const Total_charts = () => {
    return(
        <div className="mian-wrap-user w-100">
            <div className="row mx-0">
                <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                    <div className="user-statics bg-white p-2">
                        <h6 className="text-cus-primary mb-0">Total Earning</h6>
                        <div className="d-flex flex-wrap align-items-center mt-2">
                            <i className="mr-3 text-cus-primary"><FontAwesomeIcon icon={faCoins} /></i>
                            <span className="font-700 text-cus-primary">$50,263</span>
                        </div>
                        <div className="d-flex mt-2 align-items-end">
                            <div className="chart-bar" style={{height:30+'px'}}></div>
                            <div className="chart-bar" style={{height:35+'px'}}></div>
                            <div className="chart-bar" style={{height:45+'px'}}></div>
                            <div className="chart-bar" style={{height:20+'px'}}></div>
                            <div className="chart-bar" style={{height:30+'px'}}></div>
                            <div className="chart-bar" style={{height:32+'px'}}></div>
                            <div className="d-flex align-items-end ml-auto">
                                <span className="text-cus-success mr-2" style={{fontSize:12+'px'}}>300%</span>
                                <i className="text-cus-success"><FontAwesomeIcon icon={faCaretUp} /></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                    <div className="user-statics bg-white p-2">
                        <h6 className="text-cus-primary mb-0">Total DX's</h6>
                        <div className="d-flex flex-wrap align-items-center mt-2">
                            <i className="mr-3 text-cus-primary"><FontAwesomeIcon icon={faCar} /></i>
                            <span className="font-700 text-cus-primary">327</span>
                        </div>
                        <div className="d-flex mt-2 align-items-end">
                            <div className="chart-bar" style={{height:30+'px'}}></div>
                            <div className="chart-bar" style={{height:35+'px'}}></div>
                            <div className="chart-bar" style={{height:45+'px'}}></div>
                            <div className="chart-bar" style={{height:20+'px'}}></div>
                            <div className="chart-bar" style={{height:30+'px'}}></div>
                            <div className="chart-bar" style={{height:32+'px'}}></div>
                            <div className="d-flex align-items-end ml-auto">
                                <span className="text-cus-success mr-2" style={{fontSize:12+'px'}}>300%</span>
                                <i className="text-cus-success"><FontAwesomeIcon icon={faCaretUp} /></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                    <div className="user-statics bg-white p-2">
                        <h6 className="text-cus-primary mb-0">Online Hours</h6>
                        <div className="d-flex flex-wrap align-items-center mt-2">
                            <i className="mr-3 text-cus-primary"><FontAwesomeIcon icon={faCoins} /></i>
                            <span className="font-700 text-cus-primary">19,808</span>
                        </div>
                        <div className="d-flex mt-2 align-items-end">
                            <div className="chart-bar" style={{height:30+'px'}}></div>
                            <div className="chart-bar" style={{height:35+'px'}}></div>
                            <div className="chart-bar" style={{height:45+'px'}}></div>
                            <div className="chart-bar" style={{height:20+'px'}}></div>
                            <div className="chart-bar" style={{height:30+'px'}}></div>
                            <div className="chart-bar" style={{height:32+'px'}}></div>
                            <div className="d-flex align-items-end ml-auto">
                                <span className="text-cus-success mr-2" style={{fontSize:12+'px'}}>300%</span>
                                <i className="text-cus-success"><FontAwesomeIcon icon={faCaretUp} /></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                    <div className="user-statics bg-white p-2">
                        <h6 className="text-cus-primary mb-0">Traveled Miles</h6>
                        <div className="d-flex flex-wrap align-items-center mt-2">
                            <i className=" mr-3 text-cus-primary"><FontAwesomeIcon icon={faCoins} /></i>
                            <span className="font-700 text-cus-primary">32,457</span>
                        </div>
                        <div className="d-flex mt-2 align-items-end">
                            <div className="chart-bar" style={{height:30+'px'}}></div>
                            <div className="chart-bar" style={{height:35+'px'}}></div>
                            <div className="chart-bar" style={{height:45+'px'}}></div>
                            <div className="chart-bar" style={{height:20+'px'}}></div>
                            <div className="chart-bar" style={{height:30+'px'}}></div>
                            <div className="chart-bar" style={{height:32+'px'}}></div>
                            <div className="d-flex align-items-end ml-auto">
                                <span className="text-cus-success mr-2" style={{fontSize:12+'px'}}>300%</span>
                                <i className="text-cus-success"><FontAwesomeIcon icon={faCaretUp} /></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                   
    )
}
export default Total_charts;