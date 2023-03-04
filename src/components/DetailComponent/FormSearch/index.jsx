import Tippy from '@tippyjs/react/headless';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import style from './FormSearch.module.scss';
import classNames from 'classnames/bind';
import SubnavWrapper from '../SubnavWrapper';
import AccountSearch from '../AccountSearch';
import '../../../translation/i18n';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '../../../hooks';

const cx = classNames.bind(style);
const FormSearch = () => {
    const [accoutList, setAccountList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    const { t } = useTranslation();

    const deBoundValue = useDebounce(searchValue, 700);

    useEffect(() => {
        if (!deBoundValue) return;
        setIsLoading(true);
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(deBoundValue)}&type=less`)
            .then((response) => response.json())
            .then((res) => {
                setAccountList(res.data);
                setIsLoading(false);
            });
    }, [deBoundValue]);

    const refFocus = useRef(null);

    const handleOnfocus = () => {
        const form = document.querySelector('form');
        form.style.border = '1px solid rgb(187, 184, 184)';
        setIsFocus(true);
    };

    const handleOnblur = () => {
        const form = document.querySelector('form');
        form.style.border = 'none';
    };

    return (
        <form action="search">
            <Tippy
                placement="bottom-start"
                interactive={true}
                onClickOutside={() => setIsFocus(false)}
                visible={isFocus && searchValue.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <SubnavWrapper>
                            {accoutList.length > 0 ? (
                                <>
                                    <span className={cx('account-title')}>{t('header.accountSearch')}</span>
                                    <AccountSearch data={accoutList} />
                                </>
                            ) : (
                                <h4 style={{ textAlign: 'center', padding: '20px 0px' }}>{t('header.no result')}</h4>
                            )}
                        </SubnavWrapper>
                    </div>
                )}
            >
                <input
                    value={searchValue}
                    ref={refFocus}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onBlur={handleOnblur}
                    onFocus={handleOnfocus}
                    id={cx('search')}
                    autoComplete={'off'}
                    type="text"
                    required
                    placeholder={t('header.placeHolder')}
                />
            </Tippy>
            {!!searchValue && !isloading && (
                <div className={cx('clear')}>
                    <i
                        className="fa-solid fa-circle-xmark"
                        onClick={() => {
                            setSearchValue('');
                            setAccountList([]);
                            refFocus.current.focus();
                        }}
                    ></i>
                </div>
            )}
            {!!isloading && (
                <div className={cx('loading')}>
                    <i className="fa-solid fa-rotate"></i>
                </div>
            )}
            <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    );
};

export default FormSearch;
