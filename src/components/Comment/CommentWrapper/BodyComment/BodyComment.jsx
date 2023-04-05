import classNames from 'classnames/bind';
import React from 'react';
import style from './BodyComment.module.scss';
import Commenter from './Commenter/Commenter';
import useFireStore from '../../../../hooks/useFireStore';

const cx = classNames.bind(style);
const BodyComment = ({ video }) => {
    let newList = [...video.comments];
    if (newList.length > 0) {
        newList.sort((a, b) => {
            return a.createdAt.seconds - b.createdAt.seconds;
        });
    }

    return (
        <div className={cx('bodyComment')}>
            {newList.length > 0 ? (
                <>
                    {newList.map((val) => (
                        <Commenter key={val.id} comment={val} video={video} />
                    ))}
                </>
            ) : (
                <div className={cx('emptyComment')}>
                    <p>Be the first to comment!</p>
                </div>
            )}
        </div>
    );
};

export default BodyComment;
