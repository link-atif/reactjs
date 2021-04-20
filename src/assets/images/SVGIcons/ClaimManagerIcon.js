import React from "react";

const ClaimManagerIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#9da3b0"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* <path class="a" d="M0,0H24V24H0Z" /> */}
        <rect
          class="b"
          width="18"
          height="13"
          rx="3"
          transform="translate(3 7)"
        />
        <path class="b" d="M8,7V5a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V7" />
        <line class="c" y2="0.01" transform="translate(12 12)" />
        <path class="b" d="M3,13a20,20,0,0,0,18,0" />
      </svg>
    </>
  );
};

export default ClaimManagerIcon;
