import React from 'react';
import classNames from 'classnames/bind';
import style from './ModalEditProfile.module.scss';
import Modal from '../../ReusedComponent/Modal/Modal';
import { useSelector } from 'react-redux';
import { ModalEditProfileSelector, UserSelector } from '../../../redux/selector';
import { Button } from '../../ReusedComponent';

const cx = classNames.bind(style);
const ModalEditProfile = () => {
    const userLogin = useSelector(UserSelector);
    const isModalEditProfile = useSelector(ModalEditProfileSelector);
    return (
        <>
            {isModalEditProfile ? (
                <Modal>
                    <div className={cx('wrapper-edit')}>
                        <div className={cx('header')}>
                            <h3>Edit profile</h3>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className={cx('body')}>
                            <div className={cx('profilePhoto')}>
                                <div className={cx('title')}>
                                    <h4>Profile photo</h4>
                                </div>
                                <div className={cx('photo-wrapper')}>
                                    <img src={userLogin.photoURL} alt="" />
                                    <div className={cx('wrapper-edit-icon')}>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('userName')}>
                                <div className={cx('title')}>
                                    <h4>UserName</h4>
                                </div>
                                <div className={cx('info-wrap')}>
                                    <input placeholder="UserName" maxLength={24} type="text" />
                                    <p className={cx('link')}>www.tiktok.com/@</p>
                                    <p className={cx('instruction')}>
                                        Usernames can only contain letters, numbers, underscores, and periods. Changing
                                        your username will also change your profile link
                                    </p>
                                </div>
                            </div>
                            <div className={cx('name')}>
                                <div className={cx('title')}>
                                    <h4>Name</h4>
                                </div>
                                <div className={cx('info-wrap')}>
                                    <input placeholder="Name" maxLength={30} type="text" />
                                    <p className={cx('instruction')}>
                                        Your nickname can only be changed once every 7 days
                                    </p>
                                </div>
                            </div>
                            <div className={cx('bio')}>
                                <div className={cx('title')}>
                                    <h4>Bio</h4>
                                </div>
                                <div className={cx('info-wrap')}>
                                    <textarea placeholder="Bio" cols="48" rows="3"></textarea>
                                    <p className={cx('instruction')}>0/80</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('footer')}>
                            <Button className={cx('cancel-button')} basic small>
                                Cancel
                            </Button>
                            <Button className={cx('save-button')} small>
                                Save
                            </Button>
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
