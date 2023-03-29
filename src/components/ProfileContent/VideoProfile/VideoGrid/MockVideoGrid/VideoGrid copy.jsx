// import React, { useState } from 'react';
// import classNames from 'classnames/bind';
// import style from './VideoGrid.module.scss';
// import videos from '../../../../../assets/videos';
// import VideoItem from '../VideoItem';

// const cx = classNames.bind(style);
// const VideoGrid = () => {
//     const [idVideoPlay, setIdVideoPlay] = useState(1);

//     return (
//         <div className={cx('videoGrid')}>
//             <ul className={'row'}>
//                 {Object.keys(videos).map((key, idx) => {
//                     return (
//                         <VideoItem
//                             idVideoPlay={idVideoPlay}
//                             setIdVideoPlay={setIdVideoPlay}
//                             key={idx}
//                             idVideo={idx + 1}
//                             dataVideo={videos[key]}
//                         />
//                     );
//                 })}
//             </ul>
//         </div>
//     );
// };

// export default VideoGrid;
