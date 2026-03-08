import { ErrorPopup } from "./error-popup"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


export const SignUP = ({ handlesignupform, handlesubmitform, stateformdata, errorpopup }) => {
    const employeestate = useSelector((state) => state.HRReducer)
    return (
        <>
            {employeestate.error.status ? <ErrorPopup error={employeestate.error.message} /> : null}
            {errorpopup ? <ErrorPopup error={"Password does not match, Please try again"} /> : null}
            <div className="HR-form-content justify-center items-center min-[250px]:w-[90%] 2xl:w-[80%] grid grid-cols-1 min-[900px]:grid-cols-2 mx-auto">

                <div className="form-img mx-auto">
                    <img src="../../src/assets/Employee-Welcome.jpg" alt="Your Company" className=" min-[250px]:max-w-[15rem] min-[600px]:max-w-sm min-[900px]:max-w-sm 2xl:max-w-md" />
                </div>

                <div className="form-button-group w-full grid grid-cols-1 gap-5">

                    <div className="form-container grid min-[250px]:grid-cols-1 sm:grid-cols-2 w-full min-[250px]:gap-3 sm:gap-10 justify-center items-center">

                        <div className="form-group-1 w-full flex flex-col gap-3">
                            <div className="label-field-pair flex flex-col ">
                                <label htmlFor="firstname">
                                    First Name
                                </label>
                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    required
                                    autoComplete="text"
                                    value={stateformdata.firstname}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="lastname">
                                    last Name
                                </label>
                                <input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    required
                                    autoComplete="lastname"
                                    value={stateformdata.lastname}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={stateformdata.email}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="textpassword">
                                    Password
                                </label>
                                <input
                                    id="textpassword"
                                    name="textpassword"
                                    type="text"
                                    required
                                    autoComplete="textpassword"
                                    value={stateformdata.textpassword}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="password">
                                    Confirm Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="password"
                                    value={stateformdata.password}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                        </div>

                        <div className="form-group-2 w-full flex flex-col gap-3">
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="contactnumber">
                                    Contact Number
                                </label>
                                <input
                                    id="contactnumber"
                                    name="contactnumber"
                                    type="number"
                                    required
                                    autoComplete="text"
                                    value={stateformdata.contactnumber}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="name">
                                    Organization Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="text"
                                    value={stateformdata.name}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="description">
                                    Organization Description
                                </label>
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    required
                                    autoComplete="text"
                                    value={stateformdata.description}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="OrganizationURL">
                                    Organization URL
                                </label>
                                <input
                                    id="OrganizationURL"
                                    name="OrganizationURL"
                                    type="text"
                                    required
                                    autoComplete="text"
                                    value={stateformdata.OrganizationURL}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="OrganizationMail">
                                    Organization Mail
                                </label>
                                <input
                                    id="OrganizationMail"
                                    name="OrganizationMail"
                                    type="text"
                                    required
                                    autoComplete="text"
                                    value={stateformdata.OrganizationMail}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>

                        </div>
                    </div>

                    <div className="buttons w-full flex justify-between">
                        <Button className="min-[250px]:text-xs min-[250px]:px-2 min-[250px]:py-1 sm:px-4 sm:py-2 sm:text-sm md:text-md  px-4 py-2 bg-purple-700 border-2 border-purple-700 text-white font-bold rounded-lg hover:bg-white hover:text-purple-700 hover:cursor-pointer" onClick={handlesubmitform}>Sign Up</Button>
                        <div className="sing-in flex justify-center items-center gap-2">
                            <p className="min-[250px]:text-xs sm:text-sm">Already Have an Account?</p>
                            <Link to={"/auth/HR/login"}>
                                <Button className="min-[250px]:text-xs min-[250px]:px-2 min-[250px]:py-1 sm:px-4 sm:py-2 sm:text-sm md:text-md px-4 py-2 bg-purple-700 border-2 border-purple-700 text-white font-bold rounded-lg hover:bg-white hover:text-purple-700 hover:cursor-pointer">Sign In</Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}