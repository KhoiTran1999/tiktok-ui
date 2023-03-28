import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import style from './AddDetail.module.scss';
import Select from 'react-select';
import Button from '../../DetailComponent/Button';
import ModalDiscard from '../ModalDiscard/ModalDiscard';
import ModalDiscardSlice from '../ModalDiscard/ModalDiscardSlice';
import { createPortal } from 'react-dom';

const cx = classNames.bind(style);
const AddDetail = ({ videoLink, setVideoLink, thumbnailList }) => {
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCopyrightActive, setIsCopyrightActive] = useState(false);

    const autoSizeTextArea = (e) => {
        setInputValue(e.target.value);

        let textArea = document.getElementById('caption-textArea');
        textArea.style.height = 'auto';
        const height = textArea.scrollHeight;
        console.log(height);
        if (height > 174) {
            console.log('over');
            textArea.style.height = `174px`;
            textArea.style.overflow = 'auto';
            return;
        } else {
            textArea.style.height = `${height}px`;
            textArea.style.overflow = 'hidden';
        }
    };

    const restrictedOption = [
        { value: 'Followers', label: 'Followers' },
        { value: 'Friends', label: 'Friends' },
        { value: 'Private', label: 'Private' },
    ];

    const colourStyles = {
        control: (styles, { isFocused, isDisabled }) => ({
            ...styles,
            border: isFocused ? '1px solid rgba(22, 24, 35, 0.12)' : '1px solid rgba(22, 24, 35, 0.12)',
            boxShadow: 'none',
            width: '300px',
            height: '36px',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            '&:hover': {
                boder: '1px solid rgba(22, 24, 35, 0.12)',
            },
        }),
        indicatorSeparator: (styles) => ({
            color: 'transparent',
        }),

        option: (styles, { isDisabled, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled ? 'white' : 'white',
                backgroundColor: isSelected ? 'rgba(22, 24, 35, 0.06)' : 'white',
                border: 'none',
                color: 'rgba(22, 24, 35, 1)',
                width: '300px',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                '&:hover': {
                    backgroundColor: 'rgba(22, 24, 35, 0.03)',
                },
            };
        },
        menu: (style) => ({ ...style, width: '300px' }),
    };

    return (
        <div className={cx('add-detail')}>
            <div className={cx('form-group')}>
                <div className={cx('caption-wrap')}>
                    <p className={cx('title')}>Caption</p>
                    <span>{inputValue.length} / 2200</span>
                </div>
                <textarea
                    className={cx('caption-textArea')}
                    name="caption"
                    maxLength={2200}
                    id="caption-textArea"
                    rows="1"
                    value={inputValue}
                    onInput={autoSizeTextArea}
                ></textarea>
                <span className={cx('name-tagging')}>@</span>
                <span className={cx('hash-tag')}>#</span>
            </div>
            <div className={cx('thumnail')}>
                <p className={cx('title')}>Cover</p>
                <div className={cx('thumnail-wrapper')}>
                    {thumbnailList.length === 8 ? (
                        <>
                            {thumbnailList.map((val, idx) => {
                                return (
                                    <div key={idx} className={cx('img-wrapper')}>
                                        <img src={val} alt="thumbnail" />
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            <div className={cx('skeleton')}></div>
                        </>
                    )}
                </div>
            </div>

            <div className={cx('restricting-selector')}>
                <p className={cx('title')}>Who can watch this video</p>
                <div className={cx('select')}>
                    <Select
                        defaultValue={restrictedOption[0]}
                        onChange={setSelectedOption}
                        options={restrictedOption}
                        isSearchable={false}
                        styles={colourStyles}
                    />
                </div>
            </div>

            <div className={cx('allow-user')}>
                <p className={cx('title')}>Allow users to:</p>
                <div className={cx('form-group')}>
                    <label htmlFor="comment">
                        <input id="comment" type="checkbox" value="comment" hidden />
                        <span className={cx('checkBox')}>
                            <i className="fa-solid fa-check"></i>
                        </span>
                        <span className={cx('text')}>Comment</span>
                    </label>
                    <label htmlFor="duet">
                        <input id="duet" type="checkbox" value="duet" hidden />
                        <span className={cx('checkBox')}>
                            <i className="fa-solid fa-check"></i>
                        </span>
                        <span className={cx('text')}>Duet</span>
                    </label>
                    <label htmlFor="stitch">
                        <input id="stitch" type="checkbox" value="stitch" hidden />
                        <span className={cx('checkBox')}>
                            <i className="fa-solid fa-check"></i>
                        </span>
                        <span className={cx('text')}>Stitch</span>
                    </label>
                </div>
            </div>

            <div className={cx('copyright-check')}>
                <div className={cx('switch-check')}>
                    <span className={cx('title')}>Run a copyright check</span>
                    <div
                        onClick={() => setIsCopyrightActive(!isCopyrightActive)}
                        className={cx('switch', {
                            active: isCopyrightActive,
                        })}
                    >
                        <span
                            className={cx('switch-inner', {
                                active: isCopyrightActive,
                            })}
                        ></span>
                    </div>
                </div>

                {isCopyrightActive ? (
                    <p className={cx('required-video')}>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <span>Copyright check will not begin until your video is uploaded.</span>
                    </p>
                ) : (
                    <p className={cx('explain')}>
                        We'll check your video for potential copyright infringements on used sounds. If infringements
                        are found, you can edit the video before posting. <a href="">Learn more</a>
                    </p>
                )}
            </div>

            <div className={cx('footer-add-detail')}>
                <Button
                    onClick={() => {
                        dispatch(ModalDiscardSlice.actions.setMadalDiscard(true));
                    }}
                    basic
                    medium
                    className={cx('discard')}
                >
                    Discard
                </Button>
                <Button primary medium className={cx('post')}>
                    Post
                </Button>
            </div>
            {createPortal(<ModalDiscard setVideoLink={setVideoLink} />, document.body)}
        </div>
    );
};

export default AddDetail;
