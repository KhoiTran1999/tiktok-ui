import React from 'react';
import VideoThumbnail from 'react-video-thumbnail';

const GenerateThumbnail = ({ videoLink, duration, setThumbnailList }) => {
    return (
        <>
            <VideoThumbnail
                videoUrl={videoLink}
                width={0}
                height={0}
                renderThumbnail={false}
                snapshotAtTime={duration / 8}
                thumbnailHandler={(thumbnail) => {
                    setThumbnailList((prev) => [...prev, thumbnail]);
                }}
            />
            <VideoThumbnail
                videoUrl={videoLink}
                width={0}
                height={0}
                renderThumbnail={false}
                snapshotAtTime={duration / 7}
                thumbnailHandler={(thumbnail) => {
                    setThumbnailList((prev) => [...prev, thumbnail]);
                }}
            />
            <VideoThumbnail
                videoUrl={videoLink}
                width={0}
                height={0}
                renderThumbnail={false}
                snapshotAtTime={duration / 6}
                thumbnailHandler={(thumbnail) => {
                    setThumbnailList((prev) => [...prev, thumbnail]);
                }}
            />
            <VideoThumbnail
                videoUrl={videoLink}
                width={0}
                height={0}
                renderThumbnail={false}
                snapshotAtTime={duration / 5}
                thumbnailHandler={(thumbnail) => {
                    setThumbnailList((prev) => [...prev, thumbnail]);
                }}
            />
            <VideoThumbnail
                videoUrl={videoLink}
                width={0}
                height={0}
                renderThumbnail={false}
                snapshotAtTime={duration / 4}
                thumbnailHandler={(thumbnail) => {
                    setThumbnailList((prev) => [...prev, thumbnail]);
                }}
            />
            <VideoThumbnail
                videoUrl={videoLink}
                width={0}
                height={0}
                renderThumbnail={false}
                snapshotAtTime={duration / 3}
                thumbnailHandler={(thumbnail) => {
                    setThumbnailList((prev) => [...prev, thumbnail]);
                }}
            />
            <VideoThumbnail
                videoUrl={videoLink}
                width={0}
                height={0}
                renderThumbnail={false}
                snapshotAtTime={duration / 2}
                thumbnailHandler={(thumbnail) => {
                    setThumbnailList((prev) => [...prev, thumbnail]);
                }}
            />
            <VideoThumbnail
                videoUrl={videoLink}
                width={0}
                height={0}
                renderThumbnail={false}
                snapshotAtTime={duration}
                thumbnailHandler={(thumbnail) => {
                    setThumbnailList((prev) => [...prev, thumbnail]);
                }}
            />
        </>
    );
};

export default GenerateThumbnail;
