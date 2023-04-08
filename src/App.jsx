import { Route, Routes } from 'react-router-dom';
import './GlobalStyle.scss';
import { publicRoutes } from './routes';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthUser from './firebase/AuthUser';
import { createPortal } from 'react-dom';
import ModalWelcome from './components/Header/ModalWelcome/ModalWelcome';
import Notification from './components/ReusedComponent/Notification/Notification';

function App() {
    return (
        <div className="App">
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
            </Routes>
            <AuthUser />
            <Notification />
            <ToastContainer limit={6} transition={Slide} />
            {createPortal(<ModalWelcome />, document.body)}
        </div>
    );
}

export default App;
