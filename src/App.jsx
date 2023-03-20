import { Route, Routes } from 'react-router-dom';
import './GlobalStyle.scss';
import { publicRoutes } from './routes';

import AuthUser from './firebase/AuthUser';

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
        </div>
    );
}

export default App;
