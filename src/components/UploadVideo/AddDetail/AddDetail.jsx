import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { addDocument, uploadFile, uploadPoster } from '../../../firebase/services';
import { UserSelector } from '../../../redux/selector';
import Button from '../../ReusedComponent/Button';
import ModalDiscard from '../ModalDiscard/ModalDiscard';
import ModalDiscardSlice from '../ModalDiscard/ModalDiscardSlice';
import style from './AddDetail.module.scss';

const cx = classNames.bind(style);
const AddDetail = ({
    videoLink,
    setVideoLink,
    thumbnailList,
    videoFile,
    setPercentageLoading,
    isRunning,
    setIsRunning,
    isCancel,
    setIsCancel,
}) => {
    const dispatch = useDispatch();
    const userLogin = useSelector(UserSelector);

    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCopyrightActive, setIsCopyrightActive] = useState(false);
    const [downloadURL, setDownloadURL] = useState();
    const [uuid, setUuid] = useState(uuidv4());
    const [isSuccessedUpload, setIsSuccessedUpload] = useState(false);
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [poster, setPoster] = useState('');
    const [imgIdx, setImgIdx] = useState();

    const uploadTaskRef = useRef();

    //is used for caption element
    const autoSizeTextArea = (e) => {
        if (inputValue.length === 0 && e.target.value === ' ') return;
        setInputValue(e.target.value);

        let textArea = document.getElementById('caption-textArea');
        textArea.style.height = 'auto';
        const height = textArea.scrollHeight;
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

    //is used for select element
    const restrictedOption = [
        { value: 'Followers', label: 'Followers' },
        { value: 'Friends', label: 'Friends' },
        { value: 'Private', label: 'Private' },
    ];

    //is used for select element
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

    const handlePostVideo = () => {
        try {
            uploadPoster(`thumnail/${uuidv4()}`, thumbnailURL).then((url) => setPoster(url));
            uploadFile(
                `video/${uuid}`,
                videoFile,
                setDownloadURL,
                uploadTaskRef,
                setVideoLink,
                setPercentageLoading,
                setIsRunning,
                setIsSuccessedUpload,
            );
        } catch (error) {
            toast.warn(`Please choose one Cover`, {
                position: 'top-center',
                autoClose: 2000,
                theme: 'light',
                containerId: 'PuredToast',
            });
        }
    };

    useEffect(() => {
        if (isSuccessedUpload) {
            addDocument('videoList', {
                uid: userLogin.uid,
                videoURL: downloadURL,
                thumbnail: poster,
                caption: inputValue.trim(),
                likes: [],
                comments: [],
                views: 0,
                shares: 0,
                notification: true,
            });
        }
    }, [isSuccessedUpload]);

    //Reset state after upload finished
    useEffect(() => {
        if (isSuccessedUpload) {
            dispatch(ModalDiscardSlice.actions.setMadalDiscard(true));
            setUuid(uuidv4());
            setImgIdx(null);
            setPoster('');
            setThumbnailURL('');
            setInputValue('');
        }
    }, [isSuccessedUpload]);

    useEffect(() => {
        if (isCancel) {
            uploadTaskRef.current.cancel();
            setIsCancel(false);
        }
    }, [isCancel]);

    const handleOnClickThumbnail = (val, idx) => {
        setThumbnailURL(val);
        setImgIdx(idx);
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
                                    <div
                                        key={idx}
                                        onClick={() => handleOnClickThumbnail(val, idx)}
                                        className={cx('img-wrapper', {
                                            active: imgIdx === idx,
                                        })}
                                    >
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
                    <>
                        {videoLink ? (
                            <>
                                <p className={cx('no-issues')}>
                                    <i className="fa-solid fa-check"></i>
                                    <span>No issues detected.</span>
                                </p>
                                <p className={cx('explain')}>
                                    Note: Results of copyright checks aren't final. For instance, future changes of the
                                    copyright holder's authorization to the sound may impact your video may impact your
                                    video. <a href="">Learn more</a>
                                </p>
                            </>
                        ) : (
                            <p className={cx('required-video')}>
                                <i className="fa-solid fa-circle-exclamation"></i>
                                <span>Copyright check will not begin until your video is uploaded.</span>
                            </p>
                        )}
                    </>
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

                {isRunning ? (
                    <Button primary medium className={cx('loading')}>
                        <i className="fa-solid fa-spinner"></i>
                    </Button>
                ) : (
                    <>
                        {videoLink ? (
                            <Button onClick={handlePostVideo} primary medium className={cx('post')}>
                                Post
                            </Button>
                        ) : (
                            <Button primary medium className={cx('restricted-post')}>
                                Post
                            </Button>
                        )}
                    </>
                )}
            </div>
            {createPortal(
                <ModalDiscard
                    setVideoLink={setVideoLink}
                    isSuccessedUpload={isSuccessedUpload}
                    setIsSuccessedUpload={setIsSuccessedUpload}
                />,
                document.body,
            )}
        </div>
    );
};

export default AddDetail;
