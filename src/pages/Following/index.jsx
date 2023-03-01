import { Link } from 'react-router-dom';

function Following({ children }) {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Following">Following</Link>
                </li>
            </ul>
            {children}
            <input type="text" />
            <button>Click me Folowwing!</button>
        </div>
    );
}

export default Following;
