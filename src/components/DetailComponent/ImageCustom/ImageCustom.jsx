import React, { useState } from 'react';
import images from '../../../assets/images';

const ImageCustom = ({ src = '', alt, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };

    return <img src={fallback || src} onError={handleError} alt={alt} ref={ref} {...props} />;
};

export default React.forwardRef(ImageCustom);
