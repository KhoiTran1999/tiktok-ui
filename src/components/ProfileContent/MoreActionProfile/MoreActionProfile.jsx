import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './MoreActionProfile.module.scss';
import Tippy from '@tippyjs/react/headless';
import ShareLogo from '../../../assets/icon/ShareLogo';
import { Menu } from '../../DetailComponent';
import { SubnavWrapper } from '../../DetailComponent';
import { useSelector } from 'react-redux';
import { CurrentRoomsSelector, UserSelector } from '../../../redux/selector';
import { useNavigate, useParams } from 'react-router-dom';
import { addDocument } from '../../../firebase/services';
import routes from '../../../config/routes';

const cx = classNames.bind(style);
const MoreActionProfile = ({ allUserList }) => {
    const MenuShare = [
        {
            icon: <i className="fa-solid fa-code"></i>,
            title: 'Embed',
        },
        {
            icon: <i className="fa-solid fa-paper-plane"></i>,
            title: 'Send to friends',
        },
        {
            icon: <i className="fa-brands fa-facebook"></i>,
            title: 'Share to Facebook',
        },
        {
            icon: <i className="fa-brands fa-whatsapp"></i>,
            title: 'Share to WhatsApp',
        },
        {
            icon: <i className="fa-solid fa-link"></i>,
            title: 'Copy link',
        },
        {
            dropDown: <i className="fa-solid fa-angle-down"></i>,
            children: {
                list: [
                    {
                        icon: <i className="fa-solid fa-code"></i>,
                        title: 'Embed',
                    },
                    {
                        icon: <i className="fa-solid fa-paper-plane"></i>,
                        title: 'Send to friends',
                    },
                    {
                        icon: <i className="fa-brands fa-facebook"></i>,
                        title: 'Share to Facebook',
                    },
                    {
                        icon: <i className="fa-brands fa-whatsapp"></i>,
                        title: 'Share to WhatsApp',
                    },
                    {
                        icon: <i className="fa-solid fa-link"></i>,
                        title: 'Copy link',
                    },
                    {
                        icon: <i className="fa-brands fa-twitter"></i>,
                        title: 'Share to Twitter',
                    },
                    {
                        icon: <i className="fa-brands fa-linkedin-in"></i>,
                        title: 'Share to Linkedln',
                    },
                    {
                        icon: <i className="fa-brands fa-reddit-alien"></i>,
                        title: 'Share to Reddit',
                    },
                    {
                        icon: <i className="fa-brands fa-telegram"></i>,
                        title: 'Share to Telegram',
                    },
                    {
                        icon: <i className="fa-solid fa-envelope"></i>,
                        title: 'Share to Email',
                    },
                    {
                        icon: <i className="fa-brands fa-line"></i>,
                        title: 'Share to Line',
                    },
                    {
                        icon: <i className="fa-brands fa-pinterest"></i>,
                        title: 'Share to Pinterest',
                    },
                ],
            },
        },
    ];

    const userLogin = useSelector(UserSelector);
    const curRoomList = useSelector(CurrentRoomsSelector);
    const [isResetMenu, setIsResetMenu] = useState(false);

    const linkName = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        allUserList.map((val) => {
            if (val.nickName === linkName.userName) {
                setUser(val);
            }
        });
    });

    const sendMessage = () => {
        const existingRoom = curRoomList.filter((valRoom) => {
            return valRoom.members.includes(userLogin.uid) && valRoom.members.includes(user.uid);
        });

        if (existingRoom.length === 0) {
            addDocument('rooms', {
                members: [userLogin.uid, user.uid],
            });
        }
        navigate(routes.messages);
    };

    return (
        <div className={cx('moreAction')}>
            <Tippy
                delay={[0, 500]}
                interactive
                placement="bottom-end"
                onHide={() => {
                    setIsResetMenu(true);
                }}
                onShow={() => {
                    setIsResetMenu(false);
                }}
                render={(attrs) => <Menu data={MenuShare} isResetMenu={isResetMenu} />}
            >
                <div>
                    <ShareLogo />
                </div>
            </Tippy>
            <Tippy
                delay={[0, 500]}
                interactive
                placement="bottom-end"
                render={(attrs) => (
                    <SubnavWrapper>
                        <div className={cx('report-block')}>
                            <ul>
                                {userLogin.uid !== user.uid && userLogin.login ? (
                                    <li onClick={sendMessage}>
                                        <i className="fa-regular fa-paper-plane"></i>
                                        <span>Send Message</span>
                                    </li>
                                ) : (
                                    <></>
                                )}
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
                    </SubnavWrapper>
                )}
            >
                <i className="fa-solid fa-ellipsis"></i>
            </Tippy>
        </div>
    );
};

export default MoreActionProfile;
