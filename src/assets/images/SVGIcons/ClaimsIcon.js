import React from "react";

const UsersIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        strokeLinejoin="round"
      >
        {/* <path class="a" d="M0,0H24V24H0Z" /> */}
        <path class="b" d="M14,3V7a1,1,0,0,0,1,1h4" />
        <path
          class="b"
          d="M17,21H7a2,2,0,0,1-2-2V5A2,2,0,0,1,7,3h7l5,5V19A2,2,0,0,1,17,21Z"
        />
        <line class="b" x2="1" transform="translate(9 7)" />
        <line class="b" x2="6" transform="translate(9 13)" />
        <line class="b" x2="2" transform="translate(13 17)" />
      </svg>
    </>
  );
};

export default UsersIcon;
