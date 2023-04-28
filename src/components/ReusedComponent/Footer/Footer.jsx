import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Footer.module.scss';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);
const Footer = () => {
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState(null);

    const restrictedOption = [
        { value: 'English', label: 'English' },
        { value: 'Vietnamese', label: 'Vietnamese' },
    ];

    const colourStyles = {
        control: (styles, { isFocused, isDisabled }) => ({
            ...styles,
            border: '1px solid #8a8b91',
            color: 'white',
            boxShadow: 'none',
            backgroundColor: 'black',
            width: '170px',
            height: '34px',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            '&:hover': {
                boder: '1px solid rgba(22, 24, 35, 0.12)',
            },
        }),
        singleValue: (styles) => {
            return {
                ...styles,
                color: 'white',
                fontSize: '14px',
                fontWeight: '400',
            };
        },
        indicatorSeparator: (styles) => ({
            ...styles,
            display: 'none',
        }),

        option: (styles, { isDisabled, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled ? 'white' : 'white',
                backgroundColor: isSelected ? 'rgba(22, 24, 35, 0.06)' : 'white',
                border: 'none',
                color: 'rgba(22, 24, 35, 1)',
                width: '170px',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                '&:hover': {
                    backgroundColor: 'rgba(22, 24, 35, 0.03)',
                },
            };
        },
        menu: (style) => ({ ...style, width: '170px' }),
    };

    return (
        <div className={cx('footer')}>
            <div className={cx('header-wrapper')}>
                <div className={cx('logo')}>
                    <img
                        src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/logo-7328701c910ebbccb5670085d243fc12.svg"
                        alt="logo Tiktok"
                    />
                    <img
                        src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/logotext-9b4d14640f93065ec36dab71c806e135.svg"
                        alt="logo Tiktok"
                    />
                </div>
                <div className={cx('content')}>
                    <ul>
                        <li>Company</li>
                        <li>{t('sidebar.About')}</li>
                        <li>{t('sidebar.Newsroom')}</li>
                        <li>{t('sidebar.Contact')}</li>
                        <li>{t('sidebar.Careers')}</li>
                        <li>ByteDance</li>
                    </ul>
                    <ul>
                        <li>Programs</li>
                        <li>TikTok for Good</li>
                        <li>{t('sidebar.Advertise')}</li>
                        <li>Developers</li>
                        <li>TikTok Rewards</li>
                        <li>TikTok Browse</li>
                        <li>TikTok Embeds</li>
                    </ul>
                    <ul>
                        <li>Support</li>
                        <li>{t('sidebar.Help')}</li>
                        <li>{t('sidebar.Safety')}</li>
                        <li>{t('sidebar.Creator Portal')}</li>
                        <li>{t('sidebar.CommunityGuidelines')}</li>
                        <li>{t('sidebar.Transparency')}</li>
                        <li>Accessibility</li>
                    </ul>
                    <ul>
                        <li>Legal</li>
                        <li>{t('sidebar.Terms')}</li>
                        <li>{t('sidebar.Privacy')}</li>
                    </ul>
                </div>
            </div>
            <div className={cx('footer-wrapper')}>
                <div className={cx('select')}>
                    <Select
                        defaultValue={restrictedOption[0]}
                        onChange={setSelectedOption}
                        options={restrictedOption}
                        isSearchable={false}
                        styles={colourStyles}
                        menuPlacement="auto"
                    />
                </div>
                <div className={cx('copyright')}>
                    <span>© 2023 TikTok</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
