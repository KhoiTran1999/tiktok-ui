import Tippy from '@tippyjs/react/headless';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import style from './FormSearch.module.scss';
import classNames from 'classnames/bind';
import SubnavWrapper from '../SubnavWrapper';
import AccountSearch from '../AccountSearch';

const cx = classNames.bind(style);
const FormSearch = () => {
    const [accoutList, setAccountList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isClear, setIsClear] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const refFocus = useRef(null);

    useEffect(() => {
        console.log(searchValue);
    }, [searchValue]);

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
                            <span className={cx('account-title')}>Tài khoản</span>
                            <AccountSearch />
                            <AccountSearch />
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
                    placeholder="Tìm kiếm tài khoản và video"
                />
            </Tippy>
            {!!searchValue && (
                <div className={cx('clear')}>
                    <i
                        className="fa-solid fa-circle-xmark"
                        onClick={() => {
                            setSearchValue('');
                            refFocus.current.focus();
                        }}
                    ></i>
                </div>
            )}
            <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    );
};

export default FormSearch;
