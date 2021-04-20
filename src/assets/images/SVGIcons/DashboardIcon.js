import React from "react";

const DashboardIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#9da3b0"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path className="a" d="M6.4,20a9,9,0,1,1,11.2,0Z" />
        {/* <path className="b" d="M0,0H24V24H0Z" /> */}
        <circle
          className="a"
          cx="2"
          cy="2"
          r="2"
          transform="translate(10 11)"
        />
        <line
          className="a"
          y1="2.05"
          x2="2.05"
          transform="translate(13.45 9.5)"
        />
      </svg>
    </>
  );
};

export default DashboardIcon;
