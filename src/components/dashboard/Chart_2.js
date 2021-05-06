import React from 'react';
import  'chart.js';
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function Chart_2() {
const percentage = 66;
  return (
    <div className="w-100 d-flex mt-3 flex-wrap">
        <div className="col-md-4  pr-md-0">
            <div className="bg-cus-primary py-4 position-relative text-white pl-5 pr-2 border-left-round h-100">
                <div className="dx-text mb-3">
                    <span className="tiny-head">This Week</span>
                    <h5>3134</h5>
                </div>
                <div className="total-rev mb-3">
                    <span className="tiny-head">Today</span>
                    <h5>768</h5>
                </div>
                <div className="wrap-rotate-text text-uppercase">
                    <p className="w-100">Goal Bound</p>
                </div>
            </div>
        </div>
        <div className="col-md-8 pl-0 mt-3">
            <div className="d-flex align-items-end bg-white h-100 p-4">
                <div className="">
                    <div className="">
                        <p className="mb-3 text-cus-primary font-700">Goal progress</p>
                    </div>
                    <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: 'round',
                        textSize: '20px',
                        pathTransitionDuration: 1,
                        pathColor: `#26366f`,
                        textColor: '#26366f',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                    })}/>
                </div>   
                <div className="bars-chart ml-5 mb-2">
                <div className="">
                    <p className="mb-3 text-cus-primary text-center font-700">Goal progress</p>
                </div>
                    <div className="d-flex  align-items-end align-items-end" style={{marginTop : "29px"}}>
                        <div className="chart-bar" style={{height:"100px"}}></div>
                        <div className="chart-bar bg-cus-primary" style={{height : 50+"px"}}></div>
                        <div className="chart-bar ml-2" style={{height : 100+"px"}}></div>
                        <div className="chart-bar bg-cus-primary" style={{height : 80+"px"}}></div>
                        <div className="chart-bar ml-2" style={{height : 20+"px"}}></div>
                        <div className="chart-bar bg-cus-primary" style={{height : 40+"px"}}></div>
                        <div className="chart-bar ml-2" style={{height : 70+"px"}}></div>
                        <div className="chart-bar bg-cus-primary" style={{height : 40+"px"}}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  );
  
}

export default Chart_2;
