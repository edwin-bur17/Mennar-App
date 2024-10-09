// import { FaHome, FaUser, FaCog, FaEnvelope} from "react-icons/fa"
// import { FaFileInvoice, FaNewspaper  } from "react-icons/fa6";
// import { GiMedicinePills } from "react-icons/gi";
import { TbMedicineSyrup, TbFileInvoice, TbHome, TbUserCircle, TbNews  } from "react-icons/tb"; // entrega


export const sidebarItems = [
    { icon: TbHome, text: "Inicio", path: "/inicio", matchPath: /^\/inicio/ },
    { icon: TbFileInvoice, text: "Direccionamientos", path: "/direccionamientos", matchPath: /^\/direccionamientos/ },
    { icon: TbMedicineSyrup, text: "Entrega", path: "/entrega", matchPath: /^\/entrega/ },
    { icon: TbNews, text: "Novedades", path: "/novedades", matchPath: /^\/novedades/ },
    { icon: TbUserCircle, text: "Perfil", path: "/mi-perfil", matchPath: /^\/mi-perfil/ },
    // { icon: FaEnvelope, text: "Mensajes", path: "/messages", matchPath: /^\/message/ },
    // { icon: FaCog, text: "Configuración", path: "/settings", matchPath: /^\/settings/ }
]