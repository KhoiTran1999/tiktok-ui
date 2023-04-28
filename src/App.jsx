import { Route, Routes } from 'react-router-dom';
import './GlobalStyle.scss';
import { publicRoutes } from './routes';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthUser from './firebase/AuthUser';
import { createPortal } from 'react-dom';
import ModalWelcome from './components/Header/ModalWelcome/ModalWelcome';
import Notification from './components/ReusedComponent/Notification/Notification';
import DarkModeSlice from './components/Header/RightHeader/DarkModeSlice';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NotFound from './components/NotFound/NotFound';

function App() {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();

    //Handle Language when reload in any page
    useEffect(() => {
        const language = JSON.parse(localStorage.getItem('language'));
        i18n.changeLanguage(language);
    }, []);

    //Handle Dark mode when reload in any page
    useEffect(() => {
        const darkModeLocalStorage = JSON.parse(localStorage.getItem('darkMode'));
        dispatch(DarkModeSlice.actions.setDarkMode(darkModeLocalStorage));
        let root = document.documentElement;
        if (darkModeLocalStorage) {
            root.style.setProperty('--background-color', 'rgb(18, 18, 18)');
            root.style.setProperty('--background-color-subnav', 'rgb(37, 37, 37)');
            root.style.setProperty('--background-color-search', 'rgb(37, 37, 37)');
            root.style.setProperty('--line', 'rgba(255, 255, 255, 0.2)');
            root.style.setProperty('--text', 'rgba(255, 255, 255, 0.9)');
        } else {
            root.style.setProperty('--background-color', 'white');
            root.style.setProperty('--background-color-subnav', 'white');
            root.style.setProperty('--background-color-search', '#F1F1F2');
            root.style.setProperty('--line', 'rgb(235, 234, 234)');
            root.style.setProperty('--text', 'rgba(22, 24, 35, 1)');
        }
    }, []);

    return (
        <div className="App">
            <div className="app">
                <Routes>
                    {publicRoutes.map((val, idx) => {
                        let Layout = val.layout;
                        let Component = val.page;
                        return (
                            <Route
                                path={val.path}
                                element={
                                    <Component>
                                        <Layout />
                                    </Component>
                                }
                                key={idx}
                            />
                        );
                    })}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <AuthUser />
                <Notification />
                <ToastContainer
                    limit={6}
                    transition={Slide}
                    style={{ padding: '0', width: 'auto', height: 'auto' }}
                    toastStyle={{ padding: '0', backgroundColor: ' white' }}
                    bodyStyle={{ padding: '0', margin: '0px' }}
                    enableMultiContainer
                    containerId={'ConfiguredToast'}
                />
                <ToastContainer
                    enableMultiContainer
                    containerId={'PuredToast'}
                    transition={Slide}
                    autoClose={2000}
                    position={'top-center'}
                />
            </div>
            {createPortal(<ModalWelcome />, document.body)}
        </div>
    );
}

export default App;
