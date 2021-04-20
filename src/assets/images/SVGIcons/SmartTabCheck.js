import React from "react";



const SmartTabCheck = () => {



    return (
        <>

            <svg className="sm-tb-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                stroke-width="1.3" stroke="#9da3b0" fill="none" stroke-linecap="round" stroke-linejoin="round"
            >

                <g className="a">
                    <circle className="d" stroke="none" cx="16" cy="16" r="16" />
                    <circle className="b bd" cx="16" cy="16" r="15" />
                </g>
                <g transform="translate(10 10)">
                    <path className="b" stroke="none" d="M0,0H12V12H0Z" />
                    <path className="c" stroke-linecap="round" d="M5,9.5,7.5,12l5-5" transform="translate(-2.5 -3.5)" />
                </g>
            </svg>
        </>
    );
};

export default SmartTabCheck;
