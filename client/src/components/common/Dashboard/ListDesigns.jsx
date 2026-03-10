import { EmployeeDetailsDialogBox } from "./dialogboxes.jsx"
import { DeleteEmployeeDialogBox } from "./dialogboxes.jsx"
import { RemoveEmployeeFromDepartmentDialogBox } from "./dialogboxes.jsx"

export const ListWrapper = ({ children }) => {
    return (
        <div className="w-full rounded-xl overflow-hidden
            border border-indigo-100 bg-indigo-50
            dark:border-[rgba(99,102,241,0.15)] dark:bg-[rgba(99,102,241,0.05)]">
            {children}
        </div>
    )
}

export const HeadingBar = ({ table_layout, table_headings }) => {
    return (
        <div className={`grid min-[250px]:grid-cols-2 sm:${table_layout ?? "grid-cols-5"} gap-2 px-3 py-2`}>
            {table_headings.map((item) => (
                <div
                    key={item}
                    className={`text-xs font-bold uppercase tracking-wider text-center px-2 py-1.5 rounded-lg
                        text-indigo-600 dark:text-indigo-300
                        ${["Email", "Department", "Contact Number"].includes(item)
                            ? "min-[250px]:hidden sm:flex sm:justify-center sm:items-center"
                            : "flex justify-center items-center"
                        }`}
                >
                    {item}
                </div>
            ))}
        </div>
    )
}

export const ListContainer = ({ children }) => {
    return (
        <div className="w-full rounded-xl overflow-hidden
            border border-gray-100 bg-white
            dark:border-[rgba(99,102,241,0.1)] dark:bg-[rgba(255,255,255,0.02)]">
            {children}
        </div>
    )
}

export const ListItems = ({ TargetedState }) => {
    return (
        <>
            {TargetedState.data ? TargetedState.data.map((item, index) => (
                <div
                    key={item._id ?? index}
                    className="grid min-[250px]:grid-cols-2 sm:grid-cols-5 gap-2 px-3 py-3 items-center
                        border-b last:border-b-0
                        border-gray-100 hover:bg-indigo-50/50 transition-colors duration-150
                        dark:border-[rgba(99,102,241,0.08)] dark:hover:bg-[rgba(99,102,241,0.04)]"
                >
                    {/* Full Name */}
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold
                            bg-indigo-100 text-indigo-600
                            dark:bg-[rgba(99,102,241,0.15)] dark:text-indigo-300">
                            {item.firstname?.slice(0,1).toUpperCase()}{item.lastname?.slice(0,1).toUpperCase()}
                        </div>
                        <p className="text-sm font-semibold truncate text-gray-800 dark:text-white">
                            {`${item.firstname} ${item.lastname}`}
                        </p>
                    </div>

                    {/* Email */}
                    <div className="min-[250px]:hidden sm:flex sm:justify-center sm:items-center min-w-0">
                        <p className="text-sm truncate text-gray-500 dark:text-[rgba(255,255,255,0.4)]">
                            {item.email}
                        </p>
                    </div>

                    {/* Department */}
                    <div className="min-[250px]:hidden sm:flex sm:justify-center">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full truncate max-w-[120px]
                            ${item.department
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-[rgba(16,185,129,0.1)] dark:text-emerald-400 dark:border-[rgba(16,185,129,0.2)]"
                                : "bg-gray-100 text-gray-400 border border-gray-200 dark:bg-[rgba(255,255,255,0.05)] dark:text-[rgba(255,255,255,0.3)] dark:border-[rgba(255,255,255,0.08)]"
                            }`}>
                            {item.department ? item.department.name : "Sin asignar"}
                        </span>
                    </div>

                    {/* Contact */}
                    <div className="min-[250px]:hidden sm:block text-center">
                        <p className="text-sm text-gray-500 dark:text-[rgba(255,255,255,0.4)]">
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

export const DepartmentListItems = ({ TargetedState }) => {
    return (
        <>
            {TargetedState ? TargetedState.employees.map((item, index) => (
                <div
                    key={item._id ?? index}
                    className="grid min-[250px]:grid-cols-2 sm:grid-cols-4 gap-2 px-3 py-3 items-center
                        border-b last:border-b-0
                        border-gray-100 hover:bg-indigo-50/50 transition-colors duration-150
                        dark:border-[rgba(99,102,241,0.08)] dark:hover:bg-[rgba(99,102,241,0.04)]"
                >
                    {/* Full Name */}
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold
                            bg-indigo-100 text-indigo-600
                            dark:bg-[rgba(99,102,241,0.15)] dark:text-indigo-300">
                            {item.firstname?.slice(0,1).toUpperCase()}{item.lastname?.slice(0,1).toUpperCase()}
                        </div>
                        <p className="text-sm font-semibold truncate text-gray-800 dark:text-white">
                            {`${item.firstname} ${item.lastname}`}
                        </p>
                    </div>

                    {/* Email */}
                    <div className="min-[250px]:hidden sm:flex sm:justify-center sm:items-center min-w-0">
                        <p className="text-sm truncate text-gray-500 dark:text-[rgba(255,255,255,0.4)]">
                            {item.email}
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="min-[250px]:hidden sm:block text-center">
                        <p className="text-sm text-gray-500 dark:text-[rgba(255,255,255,0.4)]">
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
