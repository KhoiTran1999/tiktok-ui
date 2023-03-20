import React from 'react';

function LogoMessageActive({ className, width = '2.5rem', height = '2.5rem' }, ref) {
    return (
        <svg
            ref={ref}
            className={className}
            width={width}
            data-e2e=""
            height={height}
            viewBox="0 0 48 48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M45.7321 7.00001C45.3748 6.3812 44.7146 6 44 6H4.00004C3.20826 6 2.49103 6.4671 2.17085 7.19125C1.85068 7.9154 1.98785 8.76026 2.52068 9.34592L12.9607 20.8209C13.5137 21.4288 14.3824 21.6365 15.1506 21.3445L29.65 15.8336C29.8188 15.7694 29.8953 15.796 29.9287 15.8092C29.9872 15.8325 30.0709 15.8928 30.1366 16.0041C30.2023 16.1154 30.2147 16.2179 30.2068 16.2802C30.2023 16.3159 30.1885 16.3958 30.0509 16.5125L18.1464 26.6098C17.5329 27.1301 17.2908 27.9674 17.5321 28.7348L22.0921 43.2398C22.33 43.9967 22.9928 44.5413 23.7815 44.628C24.5701 44.7147 25.3354 44.3271 25.7321 43.64L45.7321 9.00002C46.0894 8.38122 46.0894 7.61882 45.7321 7.00001Z"
            ></path>
        </svg>
    );
}

export default React.forwardRef(LogoMessageActive);
