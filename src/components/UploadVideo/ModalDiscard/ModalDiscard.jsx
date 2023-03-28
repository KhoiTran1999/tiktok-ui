import React from 'react';
import classNames from 'classnames/bind';
import style from './ModalDiscard.module.scss';
import Button from '../../DetailComponent/Button';
import Modal from '../../DetailComponent/Modal';
import { useDispatch, useSelector } from 'react-redux';
import ModalDiscardSlice from '../ModalDiscard/ModalDiscardSlice';
import { ModalDiscardSelector } from '../../../redux/selector';

const cx = classNames.bind(style);
const ModalDiscard = ({ setVideoLink }) => {
    const dispatch = useDispatch();
    const isModalDiscardPopup = useSelector(ModalDiscardSelector);
    return (
        <Modal>
            <div
                className={cx('modalDiscard', {
                    active: isModalDiscardPopup,
                })}
            >
                <h2>Discard this post?</h2>
                <p>The video and all edits will be discarded.</p>
                <Button
                    onClick={() => {
                        dispatch(ModalDiscardSlice.actions.setMadalDiscard(false));
                        setVideoLink(null);
                    }}
                    primary
                    large
                    className={cx('discard')}
                >
                    Discard
                </Button>
                <Button
                    onClick={() => dispatch(ModalDiscardSlice.actions.setMadalDiscard(false))}
                    basic
                    large
                    className={cx('editing')}
                >
                    Continue editing
                </Button>
            </div>
        </Modal>
    );
};

export default ModalDiscard;
