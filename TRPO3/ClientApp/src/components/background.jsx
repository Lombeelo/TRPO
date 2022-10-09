import React from 'react';


function Background(props) {
    return (
        <svg
            width={1920}
            height={1080}
            fill="full"
            //xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path fill="#AFF" fillOpacity={0.21} d="M0 0h1920v1080H0z" />
        </svg>
    );
}

export default Background;