import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getSearchUser } from '../../../services/ApiService';
import { useTranslation } from 'react-i18next';
import useDebounce from '../../../hooks/useDebounce';
import '../../../translation/i18n';
import AccountSearch from '../../ReusedComponent/AccountSearch';
import SubnavWrapper from '../../ReusedComponent/SubnavWrapper';
import style from './FormSearch.module.scss';
import useFireStore from '../../../hooks/useFireStore';

const cx = classNames.bind(style);
const FormSearch = () => {
    const [userMock, setUserMock] = useState([]);
    const [userFireStore, setUserFireStore] = useState([]);
    const [allUserList, setAllUserList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [limitResult, setLimitResult] = useState(3);

    const { t } = useTranslation();

    const Debounce = useDebounce(searchValue, 700);

    const dataFireStoreCondition = useMemo(() => {
        return {
            fieldName: 'keyword',
            operator: 'array-contains',
            compareValue: Debounce,
        };
    }, [Debounce]);
    const dataFireStore = useFireStore('userList', dataFireStoreCondition);
    useEffect(() => {
        setUserFireStore(dataFireStore);
    }, [dataFireStore]);

    useEffect(() => {
        if (!Debounce.trim()) {
            setSearchValue('');
            setLimitResult(3);
            return;
        }
        setIsLoading(true);

        //{Call Api using Axios}
        const getData = async () => {
            try {
                const responseMock = await getSearchUser(Debounce, limitResult);
                setUserMock(responseMock.data);
                setIsLoading(false);
            } catch (error) {
                toast.error('Error when call Search User API', {
                    position: 'top-center',
                    autoClose: 2000,
                    theme: 'light',
                    containerId: 'PuredToast',
                });
            }
        };
        getData();
    }, [Debounce, limitResult]);

    useEffect(() => {
        setAllUserList([...userFireStore, ...userMock]);
    }, [userFireStore, userMock]);

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
                            {allUserList.length > 0 ? (
                                <>
                                    <span className={cx('account-title')}>{t('header.accountSearch')}</span>
                                    <AccountSearch accountList={allUserList} />
                                    {limitResult === 100 ? (
                                        <></>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setLimitResult(100);
                                            }}
                                            className={cx('viewAllResult')}
                                        >
                                            {t('header.viewAllResult')} "{Debounce}"
                                        </button>
                                    )}
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
                            setAllUserList([]);
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
