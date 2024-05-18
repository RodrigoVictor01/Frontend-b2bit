// I created this view in case the user tries to access a route that doesn't exist. Then, error 404 will be displayed, a message about the error and a button to redirect to the login page.


import { useNavigate } from "react-router-dom";
import "../css/PageNotFound.css";


const PageNotFound = () => {

    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    }


    return (
        <div className="container-pageNotFound">

            <div className="error-icon">
                <h1>?</h1>
            </div>

            <div className="error-title"><h1>Page Not Found</h1></div>

            <div className="error-description">
                Oops! We couldn't find the page that you're looking for <br />
                Please check the address and try again.
            </div>

            <button onClick={goHome}>Home</button>

        </div>
    );
};

export default PageNotFound;