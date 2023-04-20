import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import style from './ModalEditProfile.module.scss';
import Modal from '../../ReusedComponent/Modal/Modal';
import ModalEditProfileSlice from './ModalEditProfileSlice';
import { AllUserListSelector, ModalEditProfileSelector, UserListSelector, UserSelector } from '../../../redux/selector';
import { Button } from '../../ReusedComponent';
import { deleteFileStorage, updateDocument, uploadPoster } from '../../../firebase/services';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import generateKey from '../../../services/generaterKey';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);
const ModalEditProfile = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(UserSelector);
    const allUserList = useSelector(AllUserListSelector);
    const isModalEditProfile = useSelector(ModalEditProfileSelector);

    const [preview, setPreview] = useState(userLogin.photoURL);
    const fileRef = useRef();

    const [inputUserName, setInputUserName] = useState(userLogin.nickName);
    const [atLeastError, setAtLeastError] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);
    const [isExceedUserName, setIsExceedUserName] = useState(false);

    const [inputName, setInputName] = useState(userLogin.displayName);
    const [isExceedName, setIsExceedName] = useState(false);

    const [inputBio, setInputBio] = useState('');
    const [isExceedBio, setIsExceedBio] = useState(false);

    const [isSaveButton, setIsSaveButton] = useState(false);

    useEffect(() => {
        setPreview(userLogin.photoURL);
        setInputUserName(userLogin.nickName);
        setInputName(userLogin.displayName);
        setInputBio(userLogin.bio);
    }, [userLogin]);

    const handleCancel = () => {
        dispatch(ModalEditProfileSlice.actions.setModalEditProfile(false));

        //reset
        fileRef.current = null;
        setPreview(userLogin.photoURL);
        setInputUserName(userLogin.nickName);
        setInputName(userLogin.displayName);
        setInputBio(userLogin.bio);
        setIsExceedUserName(false);
        setAtLeastError(false);
        setIsAvailable(true);
    };

    const handleSetInputAvatar = (e) => {
        fileRef.current = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(fileRef.current.type)) {
            toast.warn('Invalid file type. Only JPEG, PNG images are allowed.', {
                position: 'top-center',
                autoClose: 2000,
                theme: 'light',
                containerId: 'PuredToast',
            });
            return;
        }
        setPreview(URL.createObjectURL(fileRef.current));
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleSetInputUserName = (e) => {
        if (inputUserName.length === 0 && e.target.value === ' ') return;
        if (e.target.value.length < 2) {
            setIsExceedUserName(false);
            setAtLeastError(true);
            e.target.style.border = '1px solid red';
        } else if (e.target.value.length >= 2 && e.target.value.length < 24) {
            setIsExceedUserName(false);
            setAtLeastError(false);
            e.target.style.border = '1px solid rgba(22, 24, 35, 0.2)';
            const sameNickname = allUserList.filter((val) => {
                return val.nickName !== userLogin.nickName && val.nickName === e.target.value;
            });

            if (sameNickname.length > 0) {
                setIsAvailable(false);
                e.target.style.border = '1px solid red';
            } else setIsAvailable(true);
        } else if (e.target.value.length === 24) {
            setIsExceedUserName(true);
            e.target.style.border = '1px solid red';
        }

        setInputUserName(e.target.value);
    };

    const handleSetInputName = (e) => {
        if (inputName.length === 0 && e.target.value === ' ') return;
        else if (e.target.value.length === 30) {
            setIsExceedName(true);
            e.target.style.border = '1px solid red';
        } else {
            setIsExceedName(false);
            e.target.style.border = '1px solid rgba(22, 24, 35, 0.2)';
        }
        setInputName(e.target.value);
    };

    const handleSetBio = (e) => {
        if (inputBio.length === 0 && e.target.value === ' ') return;
        else if (e.target.value.length === 80) {
            setIsExceedBio(true);
            e.target.style.border = '1px solid red';
        } else {
            setIsExceedBio(false);
            e.target.style.border = '1px solid rgba(22, 24, 35, 0.2)';
        }
        setInputBio(e.target.value);
    };

    useEffect(() => {
        if (
            (preview !== userLogin.photoURL ||
                inputUserName !== userLogin.nickName ||
                inputName !== userLogin.displayName ||
                inputBio !== userLogin.bio) &&
            !atLeastError &&
            isAvailable
        ) {
            setIsSaveButton(true);
        } else setIsSaveButton(false);
    }, [preview, inputUserName, inputName, inputBio]);

    const handleSave = () => {
        //upload new avatar to storage and get avatar url link back
        if (fileRef.current) {
            const reader = new FileReader();
            reader.readAsDataURL(fileRef.current);
            reader.onload = () => {
                const dataUrl = reader.result;
                //Upload avatar then escape
                uploadPoster(`avatar/${uuidv4()}`, dataUrl).then((url) => {
                    if (userLogin.photoURL) deleteFileStorage(userLogin.photoURL);

                    updateDocument('userList', userLogin.id, {
                        photoURL: url,
                        nickName: inputUserName,
                        displayName: inputName,
                        keyword: generateKey(inputUserName),
                        bio: inputBio,
                    });
                });
                deleteFileStorage(userLogin.photoURL);
            };
        } else {
            updateDocument('userList', userLogin.id, {
                ...userLogin,
                nickName: inputUserName,
                displayName: inputName,
                keyword: generateKey(inputUserName),
                bio: inputBio,
            });
        }
        dispatch(ModalEditProfileSlice.actions.setModalEditProfile(false));
        navigate(`/profile/${inputUserName}`);
        fileRef.current = null;
        setPreview(userLogin.photoURL);
        setInputUserName(userLogin.nickName);
        setInputName(userLogin.displayName);
        setInputBio(userLogin.bio);
        setIsExceedUserName(false);
        setAtLeastError(false);
        setIsAvailable(true);
        toast.success('Profile have been updated', {
            position: 'top-center',
            autoClose: 2000,
            theme: 'light',
            containerId: 'PuredToast',
        });
    };

    return (
        <>
            {isModalEditProfile ? (
                <Modal overflow="auto">
                    <div className={cx('wrapper-edit')}>
                        <div className={cx('header')}>
                            <h3>{t('followStatus.EditProfile')}</h3>
                            <i onClick={handleCancel} className="fa-solid fa-xmark"></i>
                        </div>
                        <div className={cx('body')}>
                            <div className={cx('profilePhoto')}>
                                <div className={cx('title')}>
                                    <h4>{t('editProfile.profilePhoto')}</h4>
                                </div>
                                <div className={cx('photo-wrapper')}>
                                    <img src={preview} alt="" />
                                    <div className={cx('wrapper-edit-icon')}>
                                        <input
                                            onChange={handleSetInputAvatar}
                                            accept="image/*"
                                            type="file"
                                            id="avatar"
                                            hidden
                                        />
                                        <label htmlFor="avatar">
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('userName')}>
                                <div className={cx('title')}>
                                    <h4>{t('editProfile.UserName')}</h4>
                                </div>
                                <div className={cx('info-wrap')}>
                                    <input
                                        value={inputUserName}
                                        onChange={handleSetInputUserName}
                                        placeholder={t('editProfile.UserName')}
                                        maxLength={24}
                                        type="text"
                                        onFocus={(e) => (e.target.style.border = '1px solid rgba(22, 24, 35, 0.2)')}
                                        onBlur={(e) => (e.target.style.border = '1px solid transparent')}
                                    />
                                    {atLeastError ? (
                                        <p style={{ fontSize: '11px', color: 'red', marginTop: '5px' }}>
                                            {t('editProfile.atleast')}
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                    {isAvailable ? (
                                        <></>
                                    ) : (
                                        <p style={{ fontSize: '11px', color: 'red', marginTop: '5px' }}>
                                            {t('editProfile.available')}
                                        </p>
                                    )}
                                    {isExceedUserName ? (
                                        <p style={{ fontSize: '11px', color: 'red', marginTop: '5px' }}>
                                            {t('editProfile.maximum1')}
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                    <p className={cx('link')}>
                                        https://tiktok-clone-khoitran.web.app/profile/{encodeURI(inputUserName)}
                                    </p>
                                    <p className={cx('instruction')}>{t('editProfile.explain1')}</p>
                                </div>
                            </div>
                            <div className={cx('name')}>
                                <div className={cx('title')}>
                                    <h4>{t('editProfile.Name')}</h4>
                                </div>
                                <div className={cx('info-wrap')}>
                                    <input
                                        value={inputName}
                                        onChange={handleSetInputName}
                                        onFocus={(e) => (e.target.style.border = '1px solid rgba(22, 24, 35, 0.2)')}
                                        onBlur={(e) => (e.target.style.border = '1px solid transparent')}
                                        placeholder={t('editProfile.Name')}
                                        maxLength={30}
                                        type="text"
                                    />
                                    {isExceedName ? (
                                        <p style={{ fontSize: '11px', color: 'red', marginTop: '5px' }}>
                                            {t('editProfile.maximum2')}
                                        </p>
                                    ) : (
                                        <p className={cx('instruction')}>{t('editProfile.explain2')}</p>
                                    )}
                                </div>
                            </div>
                            <div className={cx('bio')}>
                                <div className={cx('title')}>
                                    <h4>{t('editProfile.Bio')}</h4>
                                </div>
                                <div className={cx('info-wrap')}>
                                    <textarea
                                        value={inputBio}
                                        onChange={handleSetBio}
                                        placeholder={t('editProfile.Bio')}
                                        cols="48"
                                        rows="3"
                                        maxLength={80}
                                    ></textarea>
                                    {isExceedBio ? (
                                        <p className={cx('instruction')}>
                                            <span style={{ color: 'red' }}>{inputBio.length}</span>/80
                                        </p>
                                    ) : (
                                        <p className={cx('instruction')}>{inputBio.length}/80</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={cx('footer')}>
                            <Button onClick={handleCancel} className={cx('cancel-button')} basic small>
                                {t('message.Cancel')}
                            </Button>
                            {isSaveButton ? (
                                <Button
                                    onClick={handleSave}
                                    style={{ width: '96px', height: '36px', fontWeight: '400' }}
                                    primary
                                    small
                                >
                                    {t('message.Save')}
                                </Button>
                            ) : (
                                <Button className={cx('save-button')} small>
                                    {t('message.Save')}
                                </Button>
                            )}
                        </div>
                    </div>
                </Modal>
            ) : (
                <></>
            )}
        </>
    );
};

export default ModalEditProfile;
