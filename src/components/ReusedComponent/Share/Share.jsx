import React from 'react';
import {
    EmailShareButton,
    FacebookShareButton,
    LineShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from 'react-share';

const Share = ({ title, url, children, mediaLink, style }) => {
    if (title?.includes('Facebook'))
        return (
            <FacebookShareButton style={style} url={url}>
                {children}
            </FacebookShareButton>
        );
    else if (title?.includes('WhatsApp'))
        return (
            <WhatsappShareButton style={style} url={url}>
                {children}
            </WhatsappShareButton>
        );
    else if (title?.includes('Twitter'))
        return (
            <TwitterShareButton style={style} url={url}>
                {children}
            </TwitterShareButton>
        );
    else if (title?.includes('Email'))
        return (
            <EmailShareButton style={style} url={url}>
                {children}
            </EmailShareButton>
        );
    else if (title?.includes('LinkedIn'))
        return (
            <LinkedinShareButton style={style} url={url}>
                {children}
            </LinkedinShareButton>
        );
    else if (title?.includes('Reddit'))
        return (
            <RedditShareButton style={style} url={url}>
                {children}
            </RedditShareButton>
        );
    else if (title?.includes('Telegram'))
        return (
            <TelegramShareButton style={style} url={url}>
                {children}
            </TelegramShareButton>
        );
    else if (title?.includes('Line'))
        return (
            <LineShareButton style={style} url={url}>
                {children}
            </LineShareButton>
        );
    else if (title?.includes('Pinterest'))
        return (
            <PinterestShareButton style={style} media={mediaLink} url={url}>
                {children}
            </PinterestShareButton>
        );
    else return <>{children}</>;
};

export default Share;
