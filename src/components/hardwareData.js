
import cpuImg from '../IMG/cpu.png';
import gpuImg from '../IMG/gpu.png';
import ramImg from '../IMG/ram.png';
import placaImg from '../IMG/placa.png';
import fuenteImg from '../IMG/fuente.png';
import memoriasImg from '../IMG/memorias.png';

const hardwareData =[
    {
        key: 'cpu',
        label: 'CPU ',
        image: cpuImg,
        description: " El cerebro ejecutivo de todo el sistema computacional, diseñado para interpretar y procesar billones de instrucciones por segundo. Cada acción que realizas, desde escribir un documento hasta ejecutar software complejo, es coordinada meticulosamente por este componente. Su arquitectura interna incluye múltiples núcleos de procesamiento que trabajan en conjunto, cachés inteligentes que anticipan tus necesidades y unidades especializadas para diferentes tipos de cálculos.",
    },
        {
        key: 'gpu',
        label: 'GPU',
        image: gpuImg,
        description: `El motor de renderizado especializado en procesamiento paralelo masivo, fundamental para transformar datos matemáticos en experiencias visuales inmersivas. Mientras el CPU se especializa en tareas secuenciales, la GPU excela en ejecutar miles de operaciones simultáneamente, haciendo posible desde interfaces fluidas hasta mundos virtuales fotorealistas. Su arquitectura está optimizada específicamente para manipular gráficos, procesar texturas y calcular iluminación en tiempo real.`,
      },
      {
        key: 'ram',
        label: 'RAM',
        image: ramImg,
        description: `El espacio de trabajo de alta velocidad donde el sistema almacena temporalmente los datos activos y las instrucciones en ejecución. A diferencia del almacenamiento permanente, la RAM ofrece tiempos de acceso medidos en nanosegundos, permitiendo que el procesador recupere información casi instantáneamente. Cada aplicación abierta, cada pestaña del navegador y cada proceso del sistema operativo reside aquí mientras está en uso, creando un ecosistema digital dinámico y responsive.`,
      },
      {
        key: 'placa',
        label: 'Placa Base - Motherboard',
        image: placaImg,
        description: `El sistema nervioso central que interconecta todos los componentes del computador, proporcionando la infraestructura física y lógica para su comunicación. Esta compleja red de circuitos impresos, controladores y conectores no solo aloja los componentes, sino que gestiona el flujo de datos entre ellos, distribuye energía de manera eficiente y proporciona interfaces para expansión futura. Su diseño determina las capacidades del sistema, los límites de actualización y la estabilidad general.`,
      },
      {
        key: 'fuente',
        label: 'Fuente de Alimentación',
        image: fuenteImg,
        description: `El sistema de gestión energética que convierte, regula y distribuye potencia eléctrica con precisión milimétrica a cada componente. Más que un simple transformador, es un dispositivo inteligente que monitorea consumo en tiempo real, ajusta voltajes según demanda y protege contra irregularidades de la red eléctrica. Su eficiencia determina no solo el consumo eléctrico, sino también la estabilidad del sistema y la longevidad de los componentes conectados.`,
      },
      {
        key: 'memorias',
        label: 'Sistemas de Almacenamiento',
        image: memoriasImg,
        description: `La biblioteca digital permanente donde reside todo tu universo informático, desde el sistema operativo hasta tus archivos más preciados. Los avances en tecnología de almacenamiento han evolucionado desde discos magnéticos giratorios hasta memorias flash de estado sólido, revolucionando los tiempos de acceso y la confiabilidad. Esta jerarquía de almacenamiento gestiona inteligentemente los datos entre caché, memoria principal y almacenamiento masivo para optimizar el rendimiento del sistema.`,
      }
    ];

export default hardwareData;