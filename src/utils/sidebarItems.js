import { FaHome, FaUser, FaCog, FaEnvelope} from "react-icons/fa"
import { FaFileInvoice, FaNewspaper  } from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";

export const sidebarItems = [
    { icon: FaHome, text: "Inicio", path: "/inicio", matchPath: /^\/inicio/ },
    { icon: FaFileInvoice, text: "Direccionamientos", path: "/direccionamientos", matchPath: /^\/direccionamientos/ },
    { icon: GiMedicinePills, text: "Entrega", path: "/entrega", matchPath: /^\/entrega/ },
    { icon: FaUser, text: "Perfil", path: "/mi-perfil", matchPath: /^\/mi-perfil/ },
    { icon: FaNewspaper, text: "Novedades", path: "/novedades", matchPath: /^\/novedades/ },
    // { icon: FaEnvelope, text: "Mensajes", path: "/messages", matchPath: /^\/message/ },
    // { icon: FaCog, text: "Configuración", path: "/settings", matchPath: /^\/settings/ }
]