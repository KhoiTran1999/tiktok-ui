import classNames from 'classnames/bind';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDocument } from '../../../../../firebase/services';
import { MessagesOfRoomSelector, SelectedRoomSelector } from '../../../../../redux/selector';
import choosedUserSlice from '../choosedUserSlice';
import SelectedRoomSlice from '../selectedRoomSlice';
import style from './ToolList.module.scss';

const cx = classNames.bind(style);
const ToolList = () => {
    const dispatch = useDispatch();
    const selectedRoomId = useSelector(SelectedRoomSelector);
    const messagesOfRoom = useSelector(MessagesOfRoomSelector);

    const deleteRoom = () => {
        if (messagesOfRoom.length > 0) {
            messagesOfRoom.map((val) => {
                if (val.roomId === selectedRoomId) {
                    deleteDocument('messages', val.id);
                }
            });
        }
        deleteDocument('rooms', selectedRoomId);
        dispatch(SelectedRoomSlice.actions.setSelectedRoom(''));
        dispatch(choosedUserSlice.actions.setChoosedUser(''));
    };
    return (
        <div className={cx('toolList')}>
            <ul>
                <li>
                    <i className="fa-regular fa-bell-slash"></i>
                    <span>Mute</span>
                </li>
                <li onClick={deleteRoom}>
                    <i className="fa-regular fa-trash-can"></i>
                    <span>Delete</span>
                </li>
                <li>
                    <i className="fa-solid fa-thumbtack"></i>
                    <span>Pin to top</span>
                </li>
                <li>
                    <i className="fa-regular fa-flag"></i>
                    <span>Report</span>
                </li>
                <li>
                    <i className="fa-solid fa-ban"></i>
                    <span>Block</span>
                </li>
            </ul>
        </div>
    );
};

export default ToolList;
