export const ErrorGraphic = () => {
  const headPathLength = 725.740966796875;
  const eyeLeftPathLength = 331.6078796386719;
  const eyeRightPathLength = 257.8143005371094;
  const mouthPathLength = 155.034423828125;

  const duration = 10_000;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <path
        style={{
          stroke: "rgb(0, 0, 0)",
          fill: "none",
          strokeWidth: 1,
          strokeLinecap: "round",
          strokeDashoffset: headPathLength,
          strokeDasharray: headPathLength,
          animation: `draw ${duration}ms linear infinite`,
        }}
        d="M 243.662 138.284 C 269.252 137.993 313.623 151.741 333.34 168.868 C 349.632 183.019 369.338 215.865 369.137 247.093 C 368.931 278.969 362.04 298.717 340.619 322.323 C 318.526 346.668 285.569 360.857 252.705 361.724 C 206.465 362.944 181.739 346.913 164.133 327.866 C 147.442 309.809 130.523 278.865 130.87 251.935 C 131.111 233.185 139.459 199.749 158.922 176.21 C 176.537 154.907 223.452 138.514 243.662 138.284 Z"
      >
        <style>
          {`
              @keyframes draw {
                0% {
                  stroke-dashoffset: ${headPathLength};
                }
                5% {
                  stroke-dashoffset: 0;
                }
                80% {
                  stroke-dashoffset: 0;
                }
                90% {
                  stroke-dashoffset: ${headPathLength};
                }
              }
            `}
        </style>
      </path>
      <path
        style={{
          stroke: "rgb(0, 0, 0)",
          fill: "none",
          strokeWidth: 1,
          strokeLinecap: "round",
          strokeDashoffset: mouthPathLength,
          strokeDasharray: mouthPathLength,
          animation: `drawMouth ${duration}ms linear infinite`,
        }}
        d="M 182.893 305.943 C 185.792 298.708 194.213 290.979 210.61 285.852 C 227.217 280.659 248.204 281.766 275.517 285.543 C 302.623 289.292 313.24 297.92 320.585 311.473"
      >
        <style>
          {`
              @keyframes drawMouth {
                8% {
                  stroke-dashoffset: ${mouthPathLength};
                }
                11% {
                  stroke-dashoffset: 0;
                }
                80% {
                  stroke-dashoffset: 0;
                }
                90% {
                  stroke-dashoffset: ${mouthPathLength};
                }
              }
            `}
        </style>
      </path>
      <path
        style={{
          stroke: "rgb(0, 0, 0)",
          fill: "none",
          strokeWidth: 1,
          strokeLinecap: "round",
          strokeDashoffset: eyeLeftPathLength,
          strokeDasharray: eyeLeftPathLength,
          animation: `drawEyeLeft ${duration}ms linear infinite`,
        }}
        d="M 224.562 245.64 C 212.255 233.873 186.404 218.032 170.207 211.197 C 169.641 212.863 219.739 210.967 234.398 207.01 C 222.56 211.796 189.453 238.196 180.761 249.102 C 188.231 237.382 201.092 204.171 203.687 184.482 C 204.265 195.994 215.851 232.928 224.562 245.64 Z"
      >
        <style>
          {`
              @keyframes drawEyeLeft {
                14% {
                  stroke-dashoffset: ${eyeLeftPathLength};
                }
                22% {
                  stroke-dashoffset: 0;
                }
                80% {
                  stroke-dashoffset: 0;
                }
                90% {
                  stroke-dashoffset: ${eyeLeftPathLength};
                }
              }
            `}
        </style>
      </path>
      <path
        style={{
          stroke: "rgb(0, 0, 0)",
          fill: "none",
          strokeWidth: 1,
          strokeLinecap: "round",
          strokeDashoffset: eyeRightPathLength,
          strokeDasharray: eyeRightPathLength,
          animation: `drawEyeRight ${duration}ms linear infinite`,
        }}
        d="M 311.133 235.093 C 300.993 226.089 279.033 216.749 265.689 211.52 C 265.222 212.794 302.681 212.15 314.758 209.123 C 305.005 212.785 283.06 231.47 275.899 239.814 C 282.053 230.847 291.004 202.177 293.141 187.112 C 293.618 195.92 303.956 225.366 311.133 235.093 Z"
      >
        <style>
          {`
              @keyframes drawEyeRight {
                25% {
                  stroke-dashoffset: ${eyeRightPathLength};
                }
                33% {
                  stroke-dashoffset: 0;
                }
                80% {
                  stroke-dashoffset: 0;
                }
                90% {
                  stroke-dashoffset: ${eyeRightPathLength};
                }
              }
            `}
        </style>
      </path>
    </svg>
  );
};
