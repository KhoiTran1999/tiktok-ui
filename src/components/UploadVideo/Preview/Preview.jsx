import React from 'react';
import classNames from 'classnames/bind';
import style from './Preview.module.scss';
import { Button } from '../../DetailComponent';

const cx = classNames.bind(style);
const Preview = () => {
    return (
        <div className={cx('preview')}>
            <i className="fa-solid fa-cloud-arrow-up"></i>
            <h4>Select video to upload</h4>
            <h5>Or drag and drop a file</h5>
            <p>MP4 or WebM</p>
            <p>720x1280 resolution or higher</p>
            <p>Up to 30 minutes</p>
            <p>Less than 2 GB</p>

            <Button primary medium>
                Select file
            </Button>
        </div>
    );
};

export default Preview;
