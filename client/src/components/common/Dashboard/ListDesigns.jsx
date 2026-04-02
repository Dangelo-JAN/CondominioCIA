import { EmployeeDetailsDialogBox } from "./dialogboxes.jsx"
import { DeleteEmployeeDialogBox } from "./dialogboxes.jsx"
import { RemoveEmployeeFromDepartmentDialogBox } from "./dialogboxes.jsx"

// ── ListWrapper — contenedor del HeadingBar ───────────────────────────────
// Claro:  bg #e0e7ff  |  border #a5b4fc
// Oscuro: bg rgba(99,102,241,0.15)  |  border rgba(99,102,241,0.35)
export const ListWrapper = ({ children }) => {
    return (
        <div className="w-full rounded-xl overflow-hidden
            bg-[#e0e7ff] border border-[#a5b4fc]
            dark:bg-[rgba(99,102,241,0.15)] dark:border-[rgba(99,102,241,0.35)]">
            {children}
        </div>
    )
}

export const HeadingBar = ({ table_layout, table_headings }) => {
    const gridClass = table_layout ?? "sm:grid-cols-5"
    return (
        <div className={`grid grid-cols-2 ${gridClass} gap-2 px-3 py-2`}>
            {table_headings.map((item) => (
                <div
                    key={item}
                    className={`text-xs font-bold uppercase tracking-wider text-center px-2 py-1.5 rounded-lg
                        text-indigo-700 dark:text-indigo-300
                        ${["Email", "Department", "Contact Number"].includes(item)
                            ? "hidden sm:flex sm:justify-center sm:items-center"
                            : "flex justify-center items-center"
                        }`}
                >
                    {item}
                </div>
            ))}
        </div>
    )
}

// ── ListContainer — contenedor de filas ──────────────────────────────────
// Claro:  bg #f5f7ff  |  border #c7d2fe
// Oscuro: bg rgba(255,255,255,0.04)  |  border rgba(255,255,255,0.12)
export const ListContainer = ({ children }) => {
    return (
        <div className="w-full rounded-xl overflow-hidden
            border border-[#c7d2fe] bg-[#f5f7ff]
            dark:border-[rgba(255,255,255,0.12)] dark:bg-[rgba(255,255,255,0.04)]">
            {children}
        </div>
    )
}

// ── ListItems — filas de empleados ────────────────────────────────────────
export const ListItems = ({ TargetedState }) => {
    return (
        <>
            {TargetedState.data ? TargetedState.data.map((item, index) => (
                <div
                    key={item._id ?? index}
                    className="grid min-[250px]:grid-cols-2 sm:grid-cols-5 gap-2 px-3 py-3 items-center
                        border-b last:border-b-0 transition-colors duration-150
                        border-[#dde5ff] dark:border-[rgba(255,255,255,0.08)]
                        hover:bg-[#eef2ff] dark:hover:bg-[rgba(99,102,241,0.08)]"
                >
                    {/* Full Name */}
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold
                            bg-indigo-100 text-indigo-700
                            dark:bg-[rgba(99,102,241,0.25)] dark:text-indigo-300
                            border border-indigo-200 dark:border-[rgba(99,102,241,0.4)]">
                            {item.firstname?.slice(0, 1).toUpperCase()}{item.lastname?.slice(0, 1).toUpperCase()}
                        </div>
                        <p className="text-sm font-semibold truncate text-gray-900 dark:text-white">
                            {`${item.firstname} ${item.lastname}`}
                        </p>
                    </div>

                    {/* Email */}
                    <div className="min-[250px]:hidden sm:flex sm:justify-center sm:items-center min-w-0">
                        <p className="text-sm truncate text-gray-600 dark:text-[rgba(255,255,255,0.55)]">
                            {item.email}
                        </p>
                    </div>

                    {/* Department */}
                    <div className="hidden sm:flex sm:justify-center">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full truncate max-w-[120px]
                            ${item.department
                                ? "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-[rgba(16,185,129,0.15)] dark:text-emerald-400 dark:border-[rgba(16,185,129,0.3)]"
                                : "bg-gray-100 text-gray-500 border border-gray-200 dark:bg-[rgba(255,255,255,0.07)] dark:text-[rgba(255,255,255,0.4)] dark:border-[rgba(255,255,255,0.12)]"
                            }`}>
                            {item.department ? item.department.name : "Sin asignar"}
                        </span>
                    </div>

                    {/* Contact */}
                    <div className="hidden sm:block text-center">
                        <p className="text-sm font-medium text-gray-600 dark:text-[rgba(255,255,255,0.55)]">
                            {item.contactnumber}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center items-center gap-2">
                        <EmployeeDetailsDialogBox EmployeeID={item._id} />
                        <DeleteEmployeeDialogBox EmployeeID={item._id} />
                    </div>
                </div>
            )) : null}
        </>
    )
}

// ── DepartmentListItems — filas de empleados en departamento ──────────────
export const DepartmentListItems = ({ TargetedState }) => {
    return (
        <>
            {TargetedState ? TargetedState.employees.map((item, index) => (
                <div
                    key={item._id ?? index}
                    className="grid min-[250px]:grid-cols-2 sm:grid-cols-4 gap-2 px-3 py-3 items-center
                        border-b last:border-b-0 transition-colors duration-150
                        border-[#dde5ff] dark:border-[rgba(255,255,255,0.08)]
                        hover:bg-[#eef2ff] dark:hover:bg-[rgba(99,102,241,0.08)]"
                >
                    {/* Full Name */}
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold
                            bg-indigo-100 text-indigo-700
                            dark:bg-[rgba(99,102,241,0.25)] dark:text-indigo-300
                            border border-indigo-200 dark:border-[rgba(99,102,241,0.4)]">
                            {item.firstname?.slice(0, 1).toUpperCase()}{item.lastname?.slice(0, 1).toUpperCase()}
                        </div>
                        <p className="text-sm font-semibold truncate text-gray-900 dark:text-white">
                            {`${item.firstname} ${item.lastname}`}
                        </p>
                    </div>

                    {/* Email */}
                    <div className="min-[250px]:hidden sm:flex sm:justify-center sm:items-center min-w-0">
                        <p className="text-sm truncate text-gray-600 dark:text-[rgba(255,255,255,0.55)]">
                            {item.email}
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="hidden sm:block text-center">
                        <p className="text-sm font-medium text-gray-600 dark:text-[rgba(255,255,255,0.55)]">
                            {item.contactnumber}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center items-center gap-2">
                        <RemoveEmployeeFromDepartmentDialogBox
                            DepartmentName={TargetedState.name}
                            DepartmentID={TargetedState._id}
                            EmployeeID={item._id}
                        />
                    </div>
                </div>
            )) : null}
        </>
    )
}
