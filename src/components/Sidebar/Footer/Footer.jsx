import React from 'react';
import { Button } from '../../DetailComponent';
import style from './Footer.module.scss';
import classNames from 'classnames/bind';
import DirectedLink from './DirectedLink';

const cx = classNames.bind(style);
const Footer = () => {
    const LinkList = [
        [
            {
                title: 'About',
                to: '/',
            },
            {
                title: 'Newsroom',
                to: '/',
            },
            {
                title: 'Contact',
                to: '/',
            },
            {
                title: 'Careers',
                to: '/',
            },
            {
                title: 'ByteDance',
                to: '/',
            },
        ],
        [
            {
                title: 'TikTok for Good',
                to: '/',
            },
            {
                title: 'Advertise',
                to: '/',
            },
            {
                title: 'Developers',
                to: '/',
            },
            {
                title: 'Transparency',
                to: '/',
            },
            {
                title: 'TikTok Rewards',
                to: '/',
            },
            {
                title: 'TikTok Browse',
                to: '/',
            },
            {
                title: 'TikTok Embeds',
                to: '/',
            },
        ],
        [
            {
                title: 'Help',
                to: '/',
            },
            {
                title: 'Safety',
                to: '/',
            },
            {
                title: 'Terms',
                to: '/',
            },
            {
                title: 'Privacy',
                to: '/',
            },
            {
                title: 'Creator Portal',
                to: '/',
            },
            {
                title: 'Community Guidelines',
                to: '/',
            },
        ],
    ];
    return (
        <div className={cx('footer')}>
            <DirectedLink data={LinkList} />
            <span className={cx('copy-right')}>© 2023 TikTok</span>
        </div>
    );
};

export default Footer;
