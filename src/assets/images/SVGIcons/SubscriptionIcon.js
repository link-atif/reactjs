import React from "react";



const SubscriptionIcon = () => {



    return (
        <>



            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="#9da3b0" fill="none" stroke-linecap="round" stroke-linejoin="round">

                {/* <path class="a" d="M0,0H24V24H0Z" /> */}
                <path class="b" d="M3,9l9,6,9-6L12,3,3,9" />
                <path class="b" d="M21,9V19a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2V9" />
                <line class="b" y1="6" x2="6" transform="translate(3 13)" />
                <line class="b" x2="6" y2="6" transform="translate(15 13)" />
            </svg>
        </>
    );
};

export default SubscriptionIcon;
