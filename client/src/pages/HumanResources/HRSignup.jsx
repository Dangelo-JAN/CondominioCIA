import { SignUP } from "../../components/common/sign-up"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
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

    const handlesubmitform = (event) => {
        event.preventDefault(); 
        if (signupform.textpassword === signupform.password) {
            seterrorpopup(false);
            loadingbar.current?.continuousStart(); 
            dispatch(HandlePostHumanResources({ apiroute: "SIGNUP", data: signupform }));
        } else {
            seterrorpopup(true);
        }
    };

    // EFECTO 1: Manejo del error para detener la barra
    useEffect(() => {
        // Corregido: Se eliminó el '?' del array de dependencias que causaba error de sintaxis
        if (HRState.error?.status) {
            loadingbar.current?.complete();
        }
    }, [HRState.error]);

    // EFECTO 2: Verificación de login y navegación
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
    }, [HRState.isAuthenticated, HRState.isVerified, navigate, dispatch]);

    // EFECTO 3: Limpieza al desmontar el componente (Previene crash n.current null)
    useEffect(() => {
        return () => loadingbar.current?.complete();
    }, []);

    return (
        <div className="HRsignup-page-container h-screen flex justify-center min-[900px]:justify-center min-[900px]:items-center">
            {/* Se recomienda color para visibilidad */}
            <LoadingBar color='#f11946' ref={loadingbar} />
            <SignUP 
                stateformdata={signupform} 
                handlesignupform={handlesignupform} 
                handlesubmitform={handlesubmitform} 
                errorpopup={errorpopup} 
            />
        </div>
    )
}
