import React from 'react';



export default function ExportIcon() {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <defs>
                    {/* <style>.a,.b{fill:none;}.b{stroke:#9da3b0;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}</style> */}
                </defs>
                <path className="a" d="M0,0H24V24H0Z" />
                <path className="b" d="M11,7H6A2,2,0,0,0,4,9v9a2,2,0,0,0,2,2h9a2,2,0,0,0,2-2V13" />
                <line className="b" y1="10" x2="10" transform="translate(10 4)" />
                <path className="b" d="M15,4h5V9" />
            </svg>
        </>
    );
}
