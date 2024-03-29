import React from 'react';

function ShareLogo({ className, width = '3.2rem', height = '3.2rem' }, ref) {
    return (
        <svg
            className={className}
            width={width}
            data-e2e=""
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12.5546 8.35111L13.3171 8.16468V7.37972V3.50006L21.4998 12.0001L13.3171 20.5001V16.3738V15.3664L12.3098 15.3738C8.838 15.3994 5.4275 17.0466 2.49983 19.5882C2.54612 19.2536 2.67769 18.641 2.94391 17.8329C3.3786 16.5132 4.01326 15.1988 4.88691 13.971C6.71045 11.4083 9.24414 9.16046 12.5546 8.35111Z"
                stroke="#161823"
                strokeWidth="2"
            ></path>
        </svg>
    );
}

export default React.forwardRef(ShareLogo);
