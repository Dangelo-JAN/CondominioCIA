import { Button } from "@/components/ui/button"
import {
    Card, CardContent, CardDescription,
    CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ChevronsUpDown, Settings, Pencil, Trash2, Building2, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Command, CommandEmpty, CommandGroup,
    CommandInput, CommandItem, CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState, useEffect } from "react"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSelector, useDispatch } from "react-redux"
import { HandleGetHRDepartments } from "../../../redux/Thunks/HRDepartmentPageThunk"
import { Loading } from "../loading.jsx"
import { HeadingBar } from "./ListDesigns.jsx"
import { DepartmentListItems } from "./ListDesigns.jsx"
import { useToast } from "../../../hooks/use-toast.js"
import { EmployeesIDSDialogBox } from "./dialogboxes.jsx"


export const HRDepartmentTabs = () => {
    const { toast } = useToast()
    const HRDepartmentState = useSelector((state) => state.HRDepartmentPageReducer)
    const dispatch = useDispatch()
    const [department, setdepartment] = useState("All Departments")

    const departments = []
    if (HRDepartmentState.data) {
        for (let index = 0; index < HRDepartmentState.data.length; index++) {
            departments.push({
                value: HRDepartmentState.data[index].name,
                label: HRDepartmentState.data[index].name
            })
        }
    }

    useEffect(() => {
        if (HRDepartmentState.fetchData) {
            dispatch(HandleGetHRDepartments({ apiroute: "GETALL" }))
        }
        if (HRDepartmentState.error.status) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: `${HRDepartmentState.error.message}`,
            })
        }
        if (HRDepartmentState.success.status) {
            toast({
                title: <p className="text-xl m-1">Success!</p>,
                description: (
                    <div className="flex justify-center items-center gap-2">
                        <img src="../../src/assets/HR-Dashboard/correct.png" alt="" className="w-6" />
                        <p className="font-bold">{HRDepartmentState.success.message}</p>
                    </div>
                ),
            })
        }
        console.log("test message")
    }, [HRDepartmentState.fetchData, HRDepartmentState.error, HRDepartmentState.success])

    useEffect(() => {
        dispatch(HandleGetHRDepartments({ apiroute: "GETALL" }))
    }, [])

    if (HRDepartmentState.isLoading) {
        return <Loading />
    }

    return (
        <div className="flex flex-col gap-4 rounded-2xl h-full overflow-auto
            bg-indigo-50/50 border border-indigo-100 p-3 sm:p-5
            dark:bg-[rgba(99,102,241,0.04)] dark:border-[rgba(99,102,241,0.1)]">

            {/* Selector + Settings row */}
            <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold hidden sm:block
                        text-gray-500 dark:text-[rgba(255,255,255,0.35)]">
                        Departamento:
                    </span>
                    <ComboDropDown
                        DepartmentData={departments}
                        CurrentDepartment={department}
                        SetCurrentDepartment={setdepartment}
                    />
                </div>

                {department !== "All Departments" && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold
                                text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100
                                dark:text-indigo-300 dark:bg-[rgba(99,102,241,0.1)] dark:border-[rgba(99,102,241,0.2)] dark:hover:bg-[rgba(99,102,241,0.18)]"
                                style={{ background: "none" }}>
                                <Settings className="w-4 h-4" />
                                <span className="hidden sm:inline">Ajustes</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex flex-col gap-1 p-2 rounded-xl
                            bg-white border border-gray-100 shadow-xl
                            dark:bg-[#13131f] dark:border-[rgba(99,102,241,0.15)]">
                            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium
                                text-indigo-600 hover:bg-indigo-50
                                dark:text-indigo-300 dark:hover:bg-[rgba(99,102,241,0.1)]">
                                <Pencil className="w-4 h-4" />
                                Actualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium
                                text-red-500 hover:bg-red-50
                                dark:text-red-400 dark:hover:bg-[rgba(239,68,68,0.08)]">
                                <Trash2 className="w-4 h-4" />
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {/* Main content */}
            <div className="flex flex-col gap-4 h-full">
                {department === "All Departments"
                    ? <AllDepartments DepartmentData={HRDepartmentState} SetCurrentDepartment={setdepartment} />
                    : <DepartmentContent CurrentDepartmentData={
                        HRDepartmentState.data
                            ? HRDepartmentState.data.find((item) => item.name === department)
                            : null
                    } />
                }
            </div>
        </div>
    )
}


export const ComboDropDown = ({ DepartmentData, CurrentDepartment, SetCurrentDepartment }) => {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-auto justify-between gap-2 rounded-xl text-sm font-semibold
                        bg-white border border-gray-200 text-gray-700 hover:bg-gray-50
                        dark:bg-[rgba(255,255,255,0.04)] dark:border-[rgba(99,102,241,0.2)] dark:text-white dark:hover:bg-[rgba(99,102,241,0.08)]"
                >
                    {CurrentDepartment}
                    <ChevronsUpDown className="h-4 w-4 opacity-50 flex-shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-xl shadow-xl
                bg-white border border-gray-100
                dark:bg-[#13131f] dark:border-[rgba(99,102,241,0.15)]">
                <Command className="dark:bg-transparent">
                    <CommandInput placeholder="Buscar departamento..." className="text-sm" />
                    <CommandList>
                        <CommandEmpty className="text-sm text-gray-400 py-3 text-center">
                            No se encontraron departamentos.
                        </CommandEmpty>
                        <CommandGroup>
                            {DepartmentData.map((dept) => (
                                <CommandItem
                                    key={dept.value}
                                    value={dept.value}
                                    onSelect={(currentValue) => {
                                        console.log("this is the current value", currentValue)
                                        SetCurrentDepartment(currentValue === CurrentDepartment ? "All Departments" : currentValue)
                                        setOpen(false)
                                    }}
                                    className="text-sm cursor-pointer rounded-lg
                                        text-gray-700 dark:text-[rgba(255,255,255,0.7)]"
                                >
                                    <Check className={cn(
                                        "mr-2 h-4 w-4 text-indigo-500",
                                        CurrentDepartment === dept.value ? "opacity-100" : "opacity-0"
                                    )} />
                                    {dept.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}


export const DepartmentContent = ({ CurrentDepartmentData }) => {
    const table_headings_employees = ["Full Name", "Email", "Contact Number", "Remove Employee"]
    const table_headings_notice = ["Title", "Audience", "Createdby", "View Notice"]

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Department name + description */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                        bg-indigo-100 dark:bg-[rgba(99,102,241,0.15)]">
                        <Building2 className="w-5 h-5 text-indigo-500 dark:text-indigo-300" />
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight
                        text-gray-900 dark:text-white">
                        {CurrentDepartmentData.name}
                    </h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-[rgba(255,255,255,0.4)] sm:text-start text-center">
                    {CurrentDepartmentData.description}
                </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="account" className="w-full h-full">
                <div className="flex justify-between items-center flex-col-reverse sm:flex-row gap-3 mb-2">
                    <TabsList className="rounded-xl p-1
                        bg-indigo-50 border border-indigo-100
                        dark:bg-[rgba(99,102,241,0.08)] dark:border-[rgba(99,102,241,0.15)]">
                        <TabsTrigger value="account"
                            className="rounded-lg px-4 py-1.5 text-sm font-semibold transition-all
                                text-indigo-400 data-[state=active]:text-indigo-700 data-[state=active]:bg-white data-[state=active]:shadow-sm
                                dark:text-indigo-400 dark:data-[state=active]:text-white dark:data-[state=active]:bg-[rgba(99,102,241,0.25)]">
                            <Users className="w-4 h-4 mr-1.5 inline" />
                            {CurrentDepartmentData.employees.length} Empleados
                        </TabsTrigger>
                        <TabsTrigger value="password"
                            className="rounded-lg px-4 py-1.5 text-sm font-semibold transition-all
                                text-indigo-400 data-[state=active]:text-indigo-700 data-[state=active]:bg-white data-[state=active]:shadow-sm
                                dark:text-indigo-400 dark:data-[state=active]:text-white dark:data-[state=active]:bg-[rgba(99,102,241,0.25)]">
                            {CurrentDepartmentData.notice.length} Avisos
                        </TabsTrigger>
                    </TabsList>
                    <EmployeesIDSDialogBox DepartmentID={CurrentDepartmentData._id} />
                </div>

                <TabsContent value="account"
                    className="rounded-xl overflow-auto p-2 h-[85%]
                        border border-indigo-100 bg-white
                        dark:border-[rgba(99,102,241,0.1)] dark:bg-[rgba(255,255,255,0.02)]">
                    <HeadingBar table_layout={"sm:grid-cols-4"} table_headings={table_headings_employees} />
                    <DepartmentListItems TargetedState={CurrentDepartmentData} />
                </TabsContent>

                <TabsContent value="password"
                    className="rounded-xl overflow-auto p-2 h-[85%]
                        border border-indigo-100 bg-white
                        dark:border-[rgba(99,102,241,0.1)] dark:bg-[rgba(255,255,255,0.02)]">
                    <HeadingBar table_layout={"sm:grid-cols-4"} table_headings={table_headings_notice} />
                </TabsContent>
            </Tabs>
        </div>
    )
}


export const AllDepartments = ({ DepartmentData, SetCurrentDepartment }) => {
    return (
        <div className="flex flex-col gap-3">
            {DepartmentData.data ? DepartmentData.data.map((department) => (
                <div key={department.name}
                    className="flex flex-col gap-3 p-4 rounded-2xl transition-all duration-200
                        bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-md
                        dark:bg-[rgba(255,255,255,0.02)] dark:border-[rgba(99,102,241,0.1)] dark:hover:border-[rgba(99,102,241,0.25)] dark:hover:bg-[rgba(99,102,241,0.05)]">
                    <div className="flex justify-between items-center gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                                bg-indigo-100 dark:bg-[rgba(99,102,241,0.15)]">
                                <Building2 className="w-5 h-5 text-indigo-500 dark:text-indigo-300" />
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold truncate
                                text-gray-900 dark:text-white">
                                {department.name}
                            </h2>
                        </div>
                        <Button
                            onClick={() => SetCurrentDepartment(department.name)}
                            className="flex-shrink-0 px-3 py-1.5 rounded-xl text-sm font-semibold
                                text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100
                                dark:text-indigo-300 dark:bg-[rgba(99,102,241,0.1)] dark:border-[rgba(99,102,241,0.2)] dark:hover:bg-[rgba(99,102,241,0.2)]"
                            style={{ background: "none" }}>
                            Ver
                        </Button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-[rgba(255,255,255,0.4)] sm:text-start text-center">
                        {department.description}
                    </p>
                </div>
            )) : null}
        </div>
    )
}
