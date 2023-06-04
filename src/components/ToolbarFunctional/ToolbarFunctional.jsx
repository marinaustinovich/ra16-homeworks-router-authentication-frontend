import { useContext, Fragment } from "react";
import AuthContext from "../../contexts/AuthContext";
import LandingPage from "../LandingPage/LandingPage";
import Logout from "../Logout/Logout";
import News from "../News/News";

export default function ToolbarFunctional() {
    const {token} =   useContext(AuthContext);
    
    return (
        <Fragment>
        {token && <Fragment>
                <Logout/>
                <News />  
            </Fragment>
        }
        {!token && <LandingPage/>}
        </Fragment>
    )
}

