import React from 'react';
const Progress_bar = ()=>{
    return(
       <div class="progress w-100  position-fixed custom-progress-bar">
           <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{marginTop:100+'px'}} color='#f11946' >
               Description
            </div>
        </div>
    )
}
export default Progress_bar;