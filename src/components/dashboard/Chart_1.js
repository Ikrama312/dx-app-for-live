import React from 'react';
import  'chart.js';
function Chart_1() {
  return (
    <div class="w-100 d-flex flex-wrap">
        <div className="col-md-4 pr-md-0">
            <div className="w-100">
                <div className="bg-cus-primary py-4 position-relative text-white pl-5 pr-2 border-left-round h-100">
                    <div className="dx-text mb-3">
                        <span className="tiny-head">Total DX</span>
                        <h5>3134</h5>
                    </div>
                    <div className="total-rev mb-3">
                        <span className="tiny-head">Total Revenue</span>
                        <h5>$14587.01</h5>
                    </div>
                    <div className="dix-running">
                        <span className="tiny-head">Dix Running Now</span>
                        <h5>124</h5>
                    </div>
                    <div className="wrap-rotate-text text-uppercase">
                        <p className="w-100">Statistics</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-8 pl-0">
            <div className="">
                <p className="mb-3 text-cus-primary text-center font-700">Revenue</p>
            </div>
            <div className="px-2">
                <canvas id="canvas"></canvas>
            </div>
        </div>
    </div>
    
  );
  
}

export default Chart_1;
