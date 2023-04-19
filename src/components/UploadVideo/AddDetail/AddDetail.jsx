import classNames from 'classnames/bind';
import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { addDocument, updateDocument, uploadFile, uploadPoster } from '../../../firebase/services';
import { UserListSelector, UserSelector } from '../../../redux/selector';
import Button from '../../ReusedComponent/Button';
import Mentions from '../../ReusedComponent/Metions/Mentions';
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
    const userList = useSelector(UserListSelector);

    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCopyrightActive, setIsCopyrightActive] = useState(false);
    const [downloadURL, setDownloadURL] = useState();
    const [uuid, setUuid] = useState(uuidv4());
    const [isSuccessedUpload, setIsSuccessedUpload] = useState(false);
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [poster, setPoster] = useState('');
    const [imgIdx, setImgIdx] = useState();
    const [listMention, setListMention] = useState([]);

    const uploadTaskRef = useRef();
    const textAreaRef = useRef();

    //is used for caption element
    const autoSizeTextArea = (e) => {
        if (inputValue.length === 0 && e.target.value === ' ') return;
        setInputValue(e.target.value);

        let textArea = document.getElementById('caption-textArea');
        textArea.style.height = 'auto';
        const height = textArea.scrollHeight;
        if (height > 174) {
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
            border: '1px solid var(--line)',
            backgroundColor: 'var(--background-color-subnav)',
            color: 'var(--text)',
            boxShadow: 'none',
            width: '300px',
            height: '36px',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            '&:hover': {
                boder: '1px solid rgba(22, 24, 35, 0.12)',
            },
        }),
        singleValue: (styles) => ({
            ...styles,
            color: 'var(--text)',
        }),
        indicatorSeparator: (styles) => ({
            color: 'transparent',
        }),

        option: (styles, { isDisabled, isSelected }) => {
            return {
                ...styles,
                backgroundColor: 'var(--background-color-subnav)',
                color: 'var(--text)',
                width: '298px',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                overflow: 'hidden',
                '&:hover': {
                    backgroundColor: 'var(--line)',
                },
            };
        },
        menu: (style) => ({
            ...style,
            width: '300px',
            backgroundColor: 'var(--background-color-subnav)',
            border: '1px solid var(--line)',
            overflow: 'hidden',
        }),
    };

    const handlePostVideo = () => {
        try {
            uploadPoster(`thumnail/${uuidv4()}`, thumbnailURL).then((url) => setPoster(url));
            uploadFile(
                `video/${userLogin.uid}/${inputValue.trim()}/${uuid}`,
                videoFile,
                setDownloadURL,
                uploadTaskRef,
                setVideoLink,
                setPercentageLoading,
                setIsRunning,
                setIsSuccessedUpload,
            );
        } catch (error) {
            toast.warn(`Something Wrong`, {
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

            //add data to notification box

            listMention.map((user) => {
                const newMention = [
                    ...user.notification.mentions,
                    {
                        nickName: userLogin.nickName,
                        photoURL: userLogin.photoURL,
                        text: inputValue.trim(),
                        thumbnail: poster,
                        createdAt: Timestamp.fromDate(new Date()),
                        taggedPlace: 'caption',
                    },
                ];
                updateDocument('userList', user.id, {
                    'notification.mentions': newMention,
                    'notification.status': true,
                });
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

    //get user who is mentioned from Mention Component
    const getSelectedUser = (selectedUser) => {
        textAreaRef.current.focus();
        setListMention([...listMention, selectedUser]);
    };

    useEffect(() => {
        const newListMention = listMention.filter((val) => inputValue.includes(`"${val.nickName}"`));
        setListMention(newListMention);
    }, [inputValue]);
    //-----------------------------------------------------

    return (
        <div
            className={cx('add-detail', {
                'add-detail-ui': videoLink,
            })}
        >
            <div className={cx('form-group')}>
                <div className={cx('caption-wrap')}>
                    <p className={cx('title')}>Caption</p>
                    <span>{inputValue.length} / 2200</span>
                </div>
                <textarea
                    ref={textAreaRef}
                    className={cx('caption-textArea')}
                    name="caption"
                    maxLength={2200}
                    id="caption-textArea"
                    rows="1"
                    value={inputValue}
                    onInput={autoSizeTextArea}
                ></textarea>
                <Mentions
                    data={userList}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    getSelectedUser={getSelectedUser}
                    positionTop={'28px'}
                    limit={2200}
                />
                <span
                    className={cx('name-tagging')}
                    onClick={() => {
                        if (inputValue.length < 2200) {
                            setInputValue(inputValue + '@');
                        } else {
                            toast.warn(`Over letter litmit`, {
                                toastId: 122,
                                containerId: 'PuredToast',
                            });
                        }
                    }}
                >
                    @
                </span>
            </div>
            <div className={cx('thumnail')}>
                <p className={cx('title')}>Cover</p>
                <div className={cx('wrap')}>
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
                        {videoLink && thumbnailURL ? (
                            <Button onClick={handlePostVideo} primary medium className={cx('post')}>
                                Post
                            </Button>
                        ) : (
                            <Button
                                title={'Must choose a cover to post'}
                                primary
                                medium
                                className={cx('restricted-post')}
                            >
                                Post
                            </Button>
                        )}
                    </>
                )}
            </div>
            {createPortal(
                <ModalDiscard
                    setVideoLink={setVideoLink}
                    setThumbnailURL={setThumbnailURL}
                    setImgIdx={setImgIdx}
                    isSuccessedUpload={isSuccessedUpload}
                    setIsSuccessedUpload={setIsSuccessedUpload}
                />,
                document.body,
            )}
        </div>
    );
};

export default AddDetail;
