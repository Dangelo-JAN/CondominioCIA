import { SignUP } from "../../components/common/sign-up"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { HandlePostEmployees, HandleGetEmployees } from "../../redux/Thunks/EmployeeThunk.js"
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom'
import { CommonStateHandler } from "../../utils/commonhandler.js"
import { HandlePostHumanResources, HandleGetHumanResources } from "../../redux/Thunks/HRThunk.js"

export const HRSignupPage = () => {
    const HRState = useSelector((state) => state.HRReducer)
    const [errorpopup, seterrorpopup] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingbar = useRef(null)
    const [signupform, set_signuform] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contactnumber: "",
        password: "",
        textpassword: "",
        name : "", 
        description : "", 
        OrganizationURL : "", 
        OrganizationMail : ""
    })

    const handlesignupform = (event) => {
        CommonStateHandler(signupform, set_signuform, event)
    }

    // 1. Usa encadenamiento opcional (?.) en el submit
    const handlesubmitform = (event) => {
        event.preventDefault(); // Ponlo al inicio siempre
        if (signupform.textpassword === signupform.password) {
            seterrorpopup(false);
            loadingbar.current?.continuousStart(); // El '?' evita el crash
            dispatch(HandlePostHumanResources({ apiroute: "SIGNUP", data: signupform }));
        } else {
            seterrorpopup(true);
        }
    };

    // 3. Usa un useEffect para manejar el error de la barra de carga
    useEffect(() => {
        if (HRState.error?.status) {
            loadingbar.current?.complete();
        }
    }, [HRState.error]);

    useEffect(() => {
        if (!HRState.isAuthenticated && !HRState.isVerified) {
            dispatch(HandleGetHumanResources({ apiroute: "CHECKLOGIN" }))
            dispatch(HandleGetHumanResources({ apiroute: "CHECK_VERIFY_EMAIL" }))
        }

        if (HRState.isAuthenticated) {
            loadingbar.current?.complete();
            const target = HRState.isVerified ? "/HR/dashboard/dashboard-data" : "/auth/HR/verify-email";
            navigate(target);
        }
    }, [HRState.isAuthenticated, HRState.isVerified])

    // console.log(signupform)
    // console.log(HRState)

    return (
        <div className="HRsignup-page-container h-screen flex justify-center min-[900px]:justify-center min-[900px]:items-center">
            <LoadingBar ref={loadingbar} />
            <SignUP stateformdata={signupform} handlesignupform={handlesignupform} handlesubmitform={handlesubmitform} errorpopup={errorpopup} />
        </div>
    )
}