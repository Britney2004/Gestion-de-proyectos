import osImg from '../IMG/SistemaOp.jpg';
import officeImg from '../IMG/office.jpg';
import browserImg from '../IMG/navegador.jpg';
import antivirusImg from '../IMG/antivirus.jpg';
import ideImg from '../IMG/IDE.jpg';
import utilImg from '../IMG/auxiliar.jpg';

const softwareData = [
  {
    key: 'os',
    label: 'Sistema Operativo',
    image: osImg,
    description: "El software fundamental que gestiona los recursos del hardware y provee servicios esenciales para la ejecución de otros programas. Ejemplos: Windows, macOS, Linux. Permite la interacción entre el usuario y la computadora, administra archivos, memoria y dispositivos.",
  },
  {
    key: 'office',
    label: 'Suite Ofimática',
    image: officeImg,
    description: "Conjunto de aplicaciones diseñadas para la productividad, como procesadores de texto, hojas de cálculo y presentaciones. Ejemplos: Microsoft Office, LibreOffice, Google Workspace. Facilitan la creación, edición y gestión de documentos digitales.",
  },
  {
    key: 'browser',
    label: 'Navegador Web',
    image: browserImg,
    description: "Aplicación que permite acceder y navegar por páginas web en Internet. Ejemplos: Google Chrome, Mozilla Firefox, Microsoft Edge. Interpreta el código HTML, CSS y JavaScript para mostrar sitios web al usuario.",
  },
  {
    key: 'antivirus',
    label: 'Antivirus',
    image: antivirusImg,
    description: "Programa de seguridad que detecta, previene y elimina software malicioso (malware) del sistema. Ejemplos: Avast, Norton, Windows Defender. Protege la información y la integridad del sistema frente a amenazas externas.",
  },
  {
    key: 'ide',
    label: 'Entorno de Desarrollo (IDE)',
    image: ideImg,
    description: "Aplicación que integra herramientas para programar, como editor de código, depurador y compilador. Ejemplos: Visual Studio Code, Eclipse, IntelliJ IDEA. Facilita el desarrollo de software eficiente y organizado.",
  },
  {
    key: 'util',
    label: 'Utilidades',
    image: utilImg,
    description: "Programas auxiliares que realizan tareas específicas para el mantenimiento y optimización del sistema. Ejemplos: WinRAR, CCleaner, administradores de archivos. Mejoran la experiencia y el rendimiento del usuario.",
  }
];

export default softwareData;