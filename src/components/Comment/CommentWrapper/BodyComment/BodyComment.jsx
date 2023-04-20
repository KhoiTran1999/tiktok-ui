import classNames from 'classnames/bind';
import React from 'react';
import style from './BodyComment.module.scss';
import Commenter from './Commenter/Commenter';
import useFireStore from '../../../../hooks/useFireStore';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);
const BodyComment = ({ video, inputValue, setInputValue, listMention, setListMention, textAreaRef }) => {
    const { t } = useTranslation();

    let newList = [...video.comments];
    if (newList.length > 0) {
        newList.sort((a, b) => {
            return b.createdAt.seconds - a.createdAt.seconds;
        });
    }

    return (
        <div className={cx('bodyComment')}>
            {newList.length > 0 ? (
                <>
                    {newList.map((val) => (
                        <Commenter
                            key={val.id}
                            comment={val}
                            video={video}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            listMention={listMention}
                            setListMention={setListMention}
                            textAreaRef={textAreaRef}
                        />
                    ))}
                </>
            ) : (
                <div className={cx('emptyComment')}>
                    <p>{t('comment.firstComment')}Be the first to comment!</p>
                </div>
            )}
        </div>
    );
};

export default BodyComment;
