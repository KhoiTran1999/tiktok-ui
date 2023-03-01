import { Link } from 'react-router-dom';

function Live({ children }) {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Live">Live</Link>
                </li>
            </ul>
            <h1>Live</h1>
            {children}
        </div>
    );
}

export default Live;
