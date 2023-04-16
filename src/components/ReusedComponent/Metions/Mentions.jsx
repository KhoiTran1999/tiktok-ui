import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';
import style from './Mentions.module.scss';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { UserSelector } from '../../../redux/selector';

const cx = classNames.bind(style);
const Mentions = ({
    data = [],
    inputValue = '',
    setInputValue,
    getSelectedUser,
    positionTop,
    positionLeft,
    positionBottom,
    limit,
}) => {
    const [showOption, setShowOption] = useState(false);
    const [showMenu, setShowMenu] = useState(true);
    const [restrictedOption, setRestrictedOption] = useState([]);

    const userLogin = useSelector(UserSelector);

    useEffect(() => {
        if (inputValue.includes('@')) {
            setShowOption(true);
        } else setShowOption(false);
    }, [inputValue]);

    //-----------------Select option----------------------

    useEffect(() => {
        let options = [
            {
                label: 'User',
                options: [],
            },
        ];
        data.map((val) => {
            if (userLogin.uid !== val.uid) {
                options[0].options.push({ value: val, label: val.nickName });
            }
        });
        setRestrictedOption(options);
    }, [data]);

    //is used for select element
    const colourStyles = {
        control: (styles, { isFocused, isDisabled }) => ({
            // display: 'none',
            ...styles,
            border: isFocused ? '1px solid rgba(22, 24, 35, 0.12)' : '1px solid rgba(22, 24, 35, 0.12)',
            boxShadow: 'none',
            width: '101%',
            height: '47px',
            paddingRight: '30px',
            cursor: isDisabled ? 'not-allowed' : 'default',
            caretColor: 'rgba(254, 44, 85, 1)',
            '& input': {
                backgroundColor: 'red',
            },
            '&:hover': {
                boder: '1px solid rgba(22, 24, 35, 0.12)',
            },
        }),

        ValueContainer: (styles) => ({
            ...styles,
            backgroundColor: 'red',
        }),

        indicatorSeparator: (styles) => ({
            color: 'transparent',
        }),
        singleValue: (styles) => ({
            div: {
                display: 'none',
                color: 'transparent',
            },
        }),
        option: (styles, { isDisabled, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled ? 'white' : 'white',
                backgroundColor: isSelected ? 'rgba(22, 24, 35, 0.06)' : 'white',
                border: 'none',
                color: 'rgba(22, 24, 35, 1)',
                width: '100%',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                '&:hover': {
                    backgroundColor: 'rgba(22, 24, 35, 0.03)',
                },
            };
        },
        menu: (style) => ({ ...style, width: '100%', zIndex: '100' }),
    };

    const animatedComponents = makeAnimated();

    const customOptionUI = ({ value, label }) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <div>
                    <img
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginRight: '10px',
                        }}
                        src={value.photoURL}
                        alt="avatar"
                    />
                </div>
                <div>
                    <p
                        style={{
                            fontSize: '16px',
                            color: 'rgb(22, 24, 35)',
                            fontWeight: '600',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {label}
                    </p>
                    <span
                        style={{
                            fontSize: '14px',
                            color: 'rgba(22, 24, 35, 0.5)',
                            fontWeight: '400',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {value.displayName}
                    </span>
                </div>
            </div>
        );
    };

    const EscapeIcon = () => (
        <i
            style={{ cursor: 'pointer' }}
            onClick={() => {
                setInputValue(inputValue.replace('@', ''));
                setShowOption(false);
            }}
            className="fa-solid fa-x"
        ></i>
    );

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <EscapeIcon />
            </components.DropdownIndicator>
        );
    };

    //------------------------------------------------------

    const handleInputChange = ({ value }) => {
        const preValue = inputValue + ` "${value.nickName}" `;
        if (preValue.length > limit) {
            setShowOption(false);
            setInputValue(inputValue.replace('@', ''));
            toast.warning('Over letter limit', {
                toastId: 1,
                containerId: 'PuredToast',
            });
            return;
        } else if (inputValue.includes(`"${value.nickName}"`)) {
            setShowOption(false);
            setInputValue(inputValue.replace('@', ''));
            toast.warning('Can not mention twice at the same user', {
                toastId: 1,
                containerId: 'PuredToast',
            });
            return;
        }
        setInputValue(inputValue.replace('@', ` "${value.nickName}" `));
        getSelectedUser(value);
        setShowOption(false);
    };

    return (
        <div className={cx('select')} style={{ top: positionTop, left: positionLeft, bottom: positionBottom }}>
            {showOption && (
                <Select
                    defaultValue={null}
                    onChange={handleInputChange}
                    options={restrictedOption}
                    styles={colourStyles}
                    noOptionsMessage={() => 'No one to tag'}
                    placeholder="Tag your friends here"
                    isSearchable={true}
                    autoFocus
                    menuIsOpen={showMenu}
                    onBlur={() => setShowMenu(false)}
                    onFocus={() => setShowMenu(true)}
                    className={cx('select')}
                    components={(animatedComponents, { DropdownIndicator })}
                    formatOptionLabel={customOptionUI}
                    menuPlacement="auto"
                />
            )}
        </div>
    );
};

export default Mentions;
