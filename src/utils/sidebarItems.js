import { FaHome, FaUser, FaCog, FaChartBar, FaEnvelope} from "react-icons/fa"
import { FaFileInvoice, FaFileCircleCheck } from "react-icons/fa6";

export const sidebarItems = [
    { icon: FaHome, text: "Inicio", path: "/", matchPath: /^\/$/ },
    { icon: FaFileInvoice, text: "Direccionamientos", path: "/direccionamiento", matchPath: /^\/direccionamiento/ },
    { icon: FaFileCircleCheck, text: "Programación", path: "/programacion", matchPath: /^\/programacion/ },
    { icon: FaUser, text: "Perfil", path: "/profile", matchPath: /^\/profile/ },
    { icon: FaChartBar, text: "Estadísticas", path: "/stats", matchPath: /^\/stats/ },
    { icon: FaEnvelope, text: "Mensajes", path: "/messages", matchPath: /^\/message/ },
    { icon: FaCog, text: "Configuración", path: "/settings", matchPath: /^\/settings/ }
]