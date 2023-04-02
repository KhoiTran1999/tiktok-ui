import classNames from 'classnames/bind';
import React from 'react';
import style from './BodyComment.module.scss';
import Commenter from './Commenter/Commenter';
import useFireStore from '../../../../hooks/useFireStore';

const cx = classNames.bind(style);
const BodyComment = ({ video }) => {
    return (
        <div className={cx('bodyComment')}>
            {video.comments.length > 0 ? (
                <>
                    {video.comments.map((val) => (
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
