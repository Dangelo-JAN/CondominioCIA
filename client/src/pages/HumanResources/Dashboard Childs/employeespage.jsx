import { ListWrapper } from "../../../components/common/Dashboard/ListDesigns"
import { HeadingBar } from "../../../components/common/Dashboard/ListDesigns"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHREmployees } from "../../../redux/Thunks/HREmployeesThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { ListItems } from "../../../components/common/Dashboard/ListDesigns"
import { ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { AddEmployeesDialogBox } from "../../../components/common/Dashboard/dialogboxes.jsx"
import { Users } from "lucide-react"

export const HREmployeesPage = () => {
    const dispatch = useDispatch()
    const HREmployeesState = useSelector((state) => state.HREmployeesPageReducer)
    const table_headings = ["Full Name", "Email", "Department", "Contact Number", "Modify Employee"]

    useEffect(() => {
        if (HREmployeesState.fetchData) {
            dispatch(HandleGetHREmployees({ apiroute: "GETALL" }))
        }
    }, [HREmployeesState.fetchData])

    useEffect(() => {
        dispatch(HandleGetHREmployees({ apiroute: "GETALL" }))
    }, [])

    if (HREmployeesState.isLoading) {
        return <Loading />
    }

    const employeeCount = HREmployeesState.data?.length ?? 0

    return (
        <div className="w-full h-full flex flex-col gap-6 px-4 py-6 overflow-y-auto bg-white dark:bg-[#0f0f1a]">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
                        Gestión de personal
                    </p>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl xl:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Empleados
                        </h1>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold
                            bg-indigo-50 text-indigo-600 border border-indigo-100
                            dark:bg-[rgba(99,102,241,0.12)] dark:text-indigo-300 dark:border-[rgba(99,102,241,0.2)]">
                            {employeeCount} total
                        </span>
                    </div>
                </div>
                <AddEmployeesDialogBox />
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gray-100 dark:bg-[rgba(99,102,241,0.08)]" />

            {/* Table */}
            <div className="flex flex-col gap-3 flex-1 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-5"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    {employeeCount === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-3">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-50 dark:bg-[rgba(99,102,241,0.1)]">
                                <Users className="w-6 h-6 text-indigo-300 dark:text-indigo-500" />
                            </div>
                            <p className="text-sm font-medium text-gray-400 dark:text-[rgba(255,255,255,0.3)]">
                                No hay empleados registrados aún
                            </p>
                        </div>
                    ) : (
                        <ListItems TargetedState={HREmployeesState} />
                    )}
                </ListContainer>
            </div>
        </div>
    )
}
