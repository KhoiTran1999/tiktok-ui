import classNames from 'classnames/bind';
import style from './Home.module.scss';

const cx = classNames.bind(style);
function Home({ children }) {
    return <div className={cx('HomePage')}>{children}</div>;
}

export default Home;
