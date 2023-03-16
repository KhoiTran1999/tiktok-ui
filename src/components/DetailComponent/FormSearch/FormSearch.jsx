import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import getUser from '../../../services/searchService';
import { useTranslation } from 'react-i18next';
import useDebounce from '../../../hooks/useDebounce';
import '../../../translation/i18n';
import AccountSearch from '../AccountSearch/';
import SubnavWrapper from '../SubnavWrapper/SubnavWrapper';
import style from './FormSearch.module.scss';

const cx = classNames.bind(style);
const FormSearch = () => {
    const [accoutList, setAccountList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    const { t } = useTranslation();

    const Debounce = useDebounce(searchValue, 700);

    useEffect(() => {
        if (!Debounce.trim()) {
            setSearchValue('');
            return;
        }
        setIsLoading(true);

        //{Call Api using Axios}
        const getData = async () => {
            const response = await getUser(Debounce);
            setAccountList(response.data);
            setIsLoading(false);
        };
        getData();
    }, [Debounce]);

    const refFocus = useRef(null);

    const handleOnfocus = () => {
        const form = document.querySelector(`.${cx('search')}`);
        form.style.border = '1px solid rgb(187, 184, 184)';
        setIsFocus(true);
    };

    const handleOnblur = () => {
        const form = document.querySelector(`.${cx('search')}`);
        form.style.border = 'none';
    };

    const handleOnchange = (value) => {
        if (value.startsWith(' ')) return;
        else setSearchValue(value);
    };

    return (
        <div className={cx('search')}>
            <Tippy
                appendTo={document.querySelector(`.${cx('search')}`)}
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
                    onChange={(e) => handleOnchange(e.target.value)}
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
        </div>
    );
};

export default FormSearch;
