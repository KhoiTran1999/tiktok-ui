import React from 'react';

function LogoEffect({ className, width = '3.2rem', height = '3.2rem' }, ref) {
    return (
        <svg
            ref={ref}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 22 22"
            width={width}
            height={height}
        >
            <path
                fill="black"
                d="M0 22V11C0 4.925 4.925 0 11 0s11 4.925 11 11v11H0zm19.25-2.75V11A8.25 8.25 0 007.055 3.753a8.243 8.243 0 018.09 3.632A5.479 5.479 0 0116.5 11v8.25h2.75zM7.946 6.425a5.5 5.5 0 00-5.196 5.492v7.333H5.5V11c0-1.908.971-3.589 2.446-4.575zm5.008 2.64A2.75 2.75 0 008.25 11v8.25h5.5v-7.333c0-1.044-.291-2.02-.796-2.852z"
            ></path>
            <path
                fill="url(#eh-header-logo_svg__paint0_linear_1104_31608)"
                d="M0 22V11C0 4.925 4.925 0 11 0s11 4.925 11 11v11H0zm19.25-2.75V11A8.25 8.25 0 007.055 3.753a8.243 8.243 0 018.09 3.632A5.479 5.479 0 0116.5 11v8.25h2.75zM7.946 6.425a5.5 5.5 0 00-5.196 5.492v7.333H5.5V11c0-1.908.971-3.589 2.446-4.575zm5.008 2.64A2.75 2.75 0 008.25 11v8.25h5.5v-7.333c0-1.044-.291-2.02-.796-2.852z"
            ></path>
            <path
                fill="url(#eh-header-logo_svg__paint1_radial_1104_31608)"
                fillOpacity="0.6"
                d="M0 22V11C0 4.925 4.925 0 11 0s11 4.925 11 11v11H0zm19.25-2.75V11A8.25 8.25 0 007.055 3.753a8.243 8.243 0 018.09 3.632A5.479 5.479 0 0116.5 11v8.25h2.75zM7.946 6.425a5.5 5.5 0 00-5.196 5.492v7.333H5.5V11c0-1.908.971-3.589 2.446-4.575zm5.008 2.64A2.75 2.75 0 008.25 11v8.25h5.5v-7.333c0-1.044-.291-2.02-.796-2.852z"
            ></path>
            <path
                fill="url(#eh-header-logo_svg__paint2_radial_1104_31608)"
                fillOpacity="0.6"
                d="M0 22V11C0 4.925 4.925 0 11 0s11 4.925 11 11v11H0zm19.25-2.75V11A8.25 8.25 0 007.055 3.753a8.243 8.243 0 018.09 3.632A5.479 5.479 0 0116.5 11v8.25h2.75zM7.946 6.425a5.5 5.5 0 00-5.196 5.492v7.333H5.5V11c0-1.908.971-3.589 2.446-4.575zm5.008 2.64A2.75 2.75 0 008.25 11v8.25h5.5v-7.333c0-1.044-.291-2.02-.796-2.852z"
            ></path>
            <defs>
                <radialGradient
                    id="eh-header-logo_svg__paint1_radial_1104_31608"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientTransform="rotate(137.121 8.563 5.382) scale(19.105)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FF00E5"></stop>
                    <stop offset="1" stopColor="#FF00E5" stopOpacity="0"></stop>
                </radialGradient>
                <radialGradient
                    id="eh-header-logo_svg__paint2_radial_1104_31608"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientTransform="rotate(-40.03 25.148 1.387) scale(16.3248)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#00FFFF"></stop>
                    <stop offset="1" stopColor="#000AFF" stopOpacity="0"></stop>
                </radialGradient>
                <linearGradient
                    id="eh-header-logo_svg__paint0_linear_1104_31608"
                    x1="0"
                    x2="22"
                    y1="0"
                    y2="22"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FF698D" stopOpacity="0.806"></stop>
                    <stop offset="0.318" stopColor="#926BFF"></stop>
                    <stop offset="0.538" stopColor="#294FFF" stopOpacity="0.85"></stop>
                    <stop offset="0.807" stopColor="#0075FF"></stop>
                    <stop offset="1" stopColor="#00D1FF"></stop>
                </linearGradient>
            </defs>
        </svg>
    );
}

export default React.forwardRef(LogoEffect);
