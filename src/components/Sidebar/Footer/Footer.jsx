import React from 'react';
import { Button } from '../../ReusedComponent';
import style from './Footer.module.scss';
import classNames from 'classnames/bind';
import DirectedLink from './DirectedLink';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);
const Footer = () => {
    const { t } = useTranslation();
    const LinkList = [
        [
            {
                title: t('sidebar.About'),
                to: '/',
            },
            {
                title: t('sidebar.Newsroom'),
                to: '/',
            },
            {
                title: t('sidebar.Contact'),
                to: '/',
            },
            {
                title: t('sidebar.Carrers'),
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
                title: t('sidebar.Advertise'),
                to: '/',
            },
            {
                title: 'Developers',
                to: '/',
            },
            {
                title: t('sidebar.Transparency'),
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
                title: t('sidebar.Help'),
                to: '/',
            },
            {
                title: t('sidebar.Safety'),
                to: '/',
            },
            {
                title: t('sidebar.Terms'),
                to: '/',
            },
            {
                title: t('sidebar.Privacy'),
                to: '/',
            },
            {
                title: t('sidebar.Creator Portal'),
                to: '/',
            },
            {
                title: t('sidebar.CommunityGuidelines'),
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
