import React from "react";



const ReportIcon = () => {



    return (
        <>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="#9da3b0" fill="none" stroke-linecap="round" stroke-linejoin="round">

                {/* <path class="a" d="M0,0H24V24H0Z" /> */}
                <path class="b" d="M14,3V7a1,1,0,0,0,1,1h4" />
                <path class="b" d="M17,21H7a2,2,0,0,1-2-2V5A2,2,0,0,1,7,3h7l5,5V19A2,2,0,0,1,17,21Z" />
                <line class="b" y1="5" transform="translate(9 12)" />
                <line class="b" y1="1" transform="translate(12 16)" />
                <line class="b" y1="3" transform="translate(15 14)" />
            </svg>
        </>
    );
};

export default ReportIcon;
