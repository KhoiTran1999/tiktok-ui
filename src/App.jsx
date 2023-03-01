import { Link, Route, Routes } from 'react-router-dom';
import './GlobalStyle.scss';
import Following from './pages/Following';
import { publicRoutes } from './routes';

function App() {
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((val, idx) => {
                    let Layout = val.layout;
                    let Component = val.component;
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
        </div>
    );
}

export default App;
