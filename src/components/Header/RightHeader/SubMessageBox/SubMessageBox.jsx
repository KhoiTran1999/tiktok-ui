import classNames from 'classnames/bind';
import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../../../../redux/selector';
import style from './SubMessageBox.module.scss';

const cx = classNames.bind(style);
const SubMessageBox = () => {
    const userLogin = useSelector(UserSelector);

    const [select, setSelect] = useState('all');
    const [commentList, setCommentList] = useState([]);
    const [mentionList, setMentionList] = useState([]);
    const [followersList, setFollowersList] = useState([]);

    const formatDate = (seconds) => {
        let formattedDate = '';
        if (seconds) {
            formattedDate = formatDistance(new Date(seconds * 1000), new Date());
        }
        return formattedDate;
    };

    const CommentComp = ({ comment }) => (
        <div className={cx('noti-wrap')}>
            <div style={{ display: 'flex' }}>
                <div className={cx('avatar')}>
                    <img src={comment.photoURL} alt="avatar" />
                </div>
                <div className={cx('infor')}>
                    <h4 className={cx('nickName')}>{comment.nickName}</h4>
                    <p className={cx('content')}>comment your video: {comment.text}</p>
                    <span className={cx('createdAt')}>{formatDate(comment.createdAt.seconds)}</span>
                </div>
            </div>
            <div className={cx('thumbnail')}>
                <img src={comment.thumbnail} alt="thumbnail" />
            </div>
        </div>
    );

    const MentionComp = ({ mention }) => (
        <div className={cx('noti-wrap')}>
            <div style={{ display: 'flex' }}>
                <div className={cx('avatar')}>
                    <img src={mention.photoURL} alt="avatar" />
                </div>
                <div className={cx('infor')}>
                    <h4 className={cx('nickName')}>{mention.nickName}</h4>
                    <p className={cx('content')}>
                        mentioned you in a {mention.taggedPlace}: {mention.text}
                    </p>
                    <span className={cx('createdAt')}>{formatDate(mention.createdAt.seconds)}</span>
                </div>
            </div>
            <div className={cx('thumbnail')}>
                <img src={mention.thumbnail} alt="thumbnail" />
            </div>
        </div>
    );

    const FollowComp = ({ follow }) => (
        <div className={cx('noti-wrap')} style={{ justifyContent: 'flex-start' }}>
            <div className={cx('avatar')}>
                <img src={follow.photoURL} alt="avatar" />
            </div>
            <div className={cx('infor')}>
                <h4 className={cx('nickName')}>{follow.nickName}</h4>
                <p className={cx('content')}>{follow.status} you</p>
                <span className={cx('createdAt')}>{formatDate(follow.createdAt.seconds)}</span>
            </div>
        </div>
    );

    //sort notification box depending on createdAt
    useEffect(() => {
        let sortedCommentList = [...userLogin.notification.comments];
        sortedCommentList.sort((a, b) => {
            return b.createdAt.seconds - a.createdAt.seconds;
        });
        setCommentList(sortedCommentList);

        let sortedMentionList = [...userLogin.notification.mentions];
        sortedMentionList.sort((a, b) => {
            return b.createdAt.seconds - a.createdAt.seconds;
        });
        setMentionList(sortedMentionList);

        let sortedFollowers = [...userLogin.notification.followers];
        sortedFollowers.sort((a, b) => {
            return b.createdAt.seconds - a.createdAt.seconds;
        });
        setFollowersList(sortedFollowers);
    }, [userLogin.notification.comments, userLogin.notification.mentions, userLogin.notification.followers]);

    return (
        <div className={cx('sub-messagesBox')}>
            <div className={cx('header')}>
                <h2>Notifications</h2>
                <div className={cx('nav-wrap')}>
                    <span
                        className={cx({
                            active: select === 'all',
                        })}
                        onClick={() => setSelect('all')}
                    >
                        All activity
                    </span>
                    <span
                        className={cx({
                            active: select === 'comment',
                        })}
                        onClick={() => setSelect('comment')}
                    >
                        Comments
                    </span>
                    <span
                        className={cx({
                            active: select === 'mention',
                        })}
                        onClick={() => setSelect('mention')}
                    >
                        Mentions and tags
                    </span>
                    <span
                        className={cx({
                            active: select === 'follow',
                        })}
                        onClick={() => setSelect('follow')}
                    >
                        Followers
                    </span>
                </div>
            </div>

            <div className={cx('body')}>
                <p className={cx('time')}>Previous</p>

                {commentList.map((comment) => {
                    if (select === 'comment' || select === 'all') return <CommentComp comment={comment} />;
                })}
                {mentionList.map((mention) => {
                    if (select === 'mention' || select === 'all') return <MentionComp mention={mention} />;
                })}
                {followersList.map((follow) => {
                    if (select === 'follow' || select === 'all') return <FollowComp follow={follow} />;
                })}
            </div>
        </div>
    );
};

export default SubMessageBox;
