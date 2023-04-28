import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './UploadVideo.module.scss';
import { SubnavWrapper } from '../ReusedComponent';
import Preview from './Preview/Preview';
import AddDetail from './AddDetail/AddDetail';
import Footer from '../ReusedComponent/Footer/Footer';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);
const UploadVideo = () => {
    const { t } = useTranslation();

    const [videoLink, setVideoLink] = useState();
    const [videoFile, setVideoFile] = useState();
    const [thumbnailList, setThumbnailList] = useState([]);
    //------- Upload Video State -----------
    const [percentageLoading, setPercentageLoading] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isCancel, setIsCancel] = useState(false);

    useEffect(() => {
        if (!videoLink) setThumbnailList([]);
    }, [videoLink]);

    return (
        <div className={cx('uploadVideo')}>
            <div className={cx('container')}>
                <div className={cx('upload-wrapper')}>
                    <SubnavWrapper scrollAction="visible" maxHeight="fit-content">
                        <div className={cx('upload-content')}>
                            <div
                                className={cx('upload-header', {
                                    'upload-header-ui': videoLink,
                                })}
                            >
                                <h3>{t('upload.Upload video')}</h3>
                                <h4>{t('upload.PostVideo')}</h4>
                            </div>

                            <div
                                className={cx('upload-body', {
                                    'upload-body-ui': !videoLink,
                                })}
                            >
                                <Preview
                                    videoLink={videoLink}
                                    setVideoLink={setVideoLink}
                                    setThumbnailList={setThumbnailList}
                                    setVideoFile={setVideoFile}
                                    percentageLoading={percentageLoading}
                                    isRunning={isRunning}
                                    setIsCancel={setIsCancel}
                                />
                                <AddDetail
                                    videoLink={videoLink}
                                    setVideoLink={setVideoLink}
                                    thumbnailList={thumbnailList}
                                    videoFile={videoFile}
                                    setPercentageLoading={setPercentageLoading}
                                    isRunning={isRunning}
                                    setIsRunning={setIsRunning}
                                    isCancel={isCancel}
                                    setIsCancel={setIsCancel}
                                />
                            </div>
                        </div>
                    </SubnavWrapper>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('container')}>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default UploadVideo;
