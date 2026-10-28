import {Link} from 'react-router';
import {SquareX} from 'lucide-react';
import "./NotFound.css"
function NotFound(){
    return(
        <div className='not-found'>
            <SquareX />
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>
                Sorry,the page you are looking for does not exist or may have been moved.
            </p>
            <Link to="/" className="home-button">
             Back to Home
            </Link>
        </div>
    );
}

export default NotFound;