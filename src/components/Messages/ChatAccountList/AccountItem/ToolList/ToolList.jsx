import React from 'react';
import classNames from 'classnames/bind';
import style from './ToolList.module.scss';

const cx = classNames.bind(style);
const ToolList = () => {
    return (
        <div className={cx('toolList')}>
            <ul>
                <li>
                    <i className="fa-regular fa-bell-slash"></i>
                    <span>Mute</span>
                </li>
                <li>
                    <i className="fa-regular fa-trash-can"></i>
                    <span>Delete</span>
                </li>
                <li>
                    <i className="fa-solid fa-thumbtack"></i>
                    <span>Pin to top</span>
                </li>
                <li>
                    <i className="fa-regular fa-flag"></i>
                    <span>Report</span>
                </li>
                <li>
                    <i className="fa-solid fa-ban"></i>
                    <span>Block</span>
                </li>
            </ul>
        </div>
    );
};

export default ToolList;
