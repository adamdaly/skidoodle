const Star = () => {
  const pathLength = 1589.73046875;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <path
        style={{
          stroke: "rgb(0, 0, 0)",
          fill: "none",
          strokeWidth: 10,
          strokeLinecap: "round",
          strokeDashoffset: pathLength,
          strokeDasharray: pathLength,
          animation: "draw 2000ms linear infinite",
        }}
        d="M 237.634 104.245 C 250.725 185.857 342.419 381.305 366.26 390.475 C 352.02 360.38 139.011 240.28 102.206 227.004 C 145.45 234.183 379.485 216.378 397.794 201.819 C 376.744 199.521 150.495 377.243 135.845 405.885 C 162.51 385.966 227.181 173.959 235.125 94.115"
      >
        <style>
          {`
      @keyframes draw {
        10% {
          stroke-dashoffset: ${pathLength};
        }
        40% {
          stroke-dashoffset: 0;
        }
        60% {
          stroke-dashoffset: 0;
        }
        90% {
          stroke-dashoffset: ${pathLength};
        }
      }
    `}
        </style>
      </path>
    </svg>
  );
};

const Squiggle = () => {
  const squigglePathLength = 2126.167724609375;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <path
        style={{
          stroke: "rgb(0, 0, 0)",
          fill: "none",
          strokeWidth: 10,
          strokeLinecap: "round",
          strokeDashoffset: squigglePathLength,
          strokeDasharray: squigglePathLength,
          animation: "draw 1500ms linear infinite",
        }}
        d="M 175.269 111.058 C 169.664 112.926 63.565 223.213 70.657 231.657 C 77.388 239.671 317.05 79.861 327.773 92.446 C 339.93 106.714 58.762 361.215 65.312 372.813 C 71.959 384.584 413.255 127.577 424.095 139.618 C 433.179 149.708 149.768 405.329 157.311 415.851 C 164.026 425.218 380.668 259.505 392.989 272.924 C 406.361 287.488 332.051 351.01 293.122 433.402"
      >
        <style>
          {`
              @keyframes draw {
                10% {
                  stroke-dashoffset: ${squigglePathLength};
                }
                40% {
                  stroke-dashoffset: 0;
                }
                60% {
                  stroke-dashoffset: 0;
                }
                90% {
                  stroke-dashoffset: ${squigglePathLength};
                }
              }
            `}
        </style>
      </path>
    </svg>
  );
};

const Twirl = () => {
  const pathLength = 1929.2845458984375;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <path
        style={{
          stroke: "rgb(0, 0, 0)",
          fill: "none",
          strokeWidth: 10,
          strokeLinecap: "round",
          strokeDashoffset: pathLength,
          strokeDasharray: pathLength,
          animation: "draw 2000ms ease infinite",
        }}
        d="M 230.218 79.476 C 274.324 75.566 425.865 122.437 421.022 258.218 C 416.18 393.998 334.891 427.869 247.911 428.38 C 160.932 428.889 81.37 368.024 84.659 275.997 C 87.95 183.971 168.111 124.694 251.415 137.4 C 334.72 150.106 357.162 204.243 355.037 268.8 C 352.912 333.357 302.692 353.98 253.389 353.397 C 204.086 352.813 165.578 328.218 164.967 276.729 C 164.357 225.241 202.896 191.296 253.65 198.457 C 304.404 205.618 301.905 240.474 299.539 266.028 C 297.174 291.582 271.893 302.765 252.24 303.614 C 232.586 304.463 215.99 286.16 219.029 269.785 C 222.07 253.41 237.326 243.139 254.105 243.625"
      />
      <style>
        {`
                @keyframes draw {
                  10% {
                    stroke-dashoffset: ${pathLength};
                  }
                  40% {
                    stroke-dashoffset: 0;
                  }
                  60% {
                    stroke-dashoffset: 0;
                  }
                  90% {
                    stroke-dashoffset: ${pathLength};
                  }
                }
              `}
      </style>
    </svg>
  );
};

export const Loader = () => {
  const Graphic = [Star, Squiggle, Twirl][Math.floor(Math.random() * 3)];

  return (
    <div className="flex flex-grow-1 justify-center items-center">
      <div className="w-80">
        <Graphic />
        <div className="font-heading text-center text-2xl">...loading</div>
      </div>
    </div>
  );
};
