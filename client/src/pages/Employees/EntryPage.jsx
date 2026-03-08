import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight, ShieldCheck, Users, Zap } from "lucide-react"

export const EntryPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Navbar Simple */}
            <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                        <Zap className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-gray-900">EMS<span className="text-purple-600">.</span></span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                    <a href="#" className="hover:text-purple-600 transition-colors">Plataforma</a>
                    <a href="#" className="hover:text-purple-600 transition-colors">Soluciones</a>
                    <a href="#" className="hover:text-purple-600 transition-colors">Precios</a>
                </div>
                <Link to="/auth/HR/signup">
                    <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                        Probar Demo
                    </Button>
                </Link>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-12 gap-12">
                
                {/* Texto a la izquierda */}
                <div className="flex-1 space-y-8 max-w-2xl text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                        <ShieldCheck className="w-4 h-4" />
                        Sistema de Gestión Empresarial N°1
                    </div>
                    
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                        Gestiona tu equipo de forma <span className="text-purple-600 italic">inteligente.</span>
                    </h1>
                    
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Optimiza el control de asistencia, nómina y comunicación interna en una sola plataforma. Diseñada para equipos modernos que buscan eficiencia y transparencia.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <Link to={"/auth/HR/signup"} className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-7 text-lg rounded-xl shadow-lg shadow-purple-200 transition-all hover:scale-105">
                                Empezar como HR-Admin
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link to={"/auth/employee/login"} className="w-full sm:w-auto">
                            <Button variant="ghost" className="w-full sm:w-auto text-gray-600 px-8 py-7 text-lg hover:bg-gray-50 underline decoration-purple-300">
                                Acceso Empleados
                            </Button>
                        </Link>
                    </div>

                    {/* Social Proof / Stats */}
                    <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-gray-100">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">+10k</p>
                            <p className="text-sm text-gray-500 font-medium italic">Usuarios activos</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">99.9%</p>
                            <p className="text-sm text-gray-500 font-medium italic">Uptime garantizado</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="text-purple-400 w-5 h-5" />
                            <p className="text-sm text-gray-500 font-medium italic">Soporte 24/7</p>
                        </div>
                    </div>
                </div>

                {/* Imagen a la derecha */}
                <div className="flex-1 relative w-full max-w-xl lg:max-w-none">
                    <div className="absolute -top-10 -left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
                    
                    <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden transform hover:-rotate-1 transition-transform duration-500">
                        {/* Mockup de la App */}
                        <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        </div>
                        <img 
                            src="../../src/assets/Welcome.png" 
                            alt="Dashboard Preview" 
                            className="w-full object-cover p-4"
                        />
                    </div>
                </div>
            </main>

            {/* Footer Simple */}
            <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-50">
                &copy; {new Date().getFullYear()} Employee Management System. Todos los derechos reservados.
            </footer>
        </div>
    )
}
