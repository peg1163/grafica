import { loadGLTF } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    try {
      // Inicialización de MindAR
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: '/static/assets/targets/qr-target.mind',  // Archivo de referencia del QR
      });

      const { renderer, scene, camera } = mindarThree;

      // Añadir luz a la escena
      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      // Crear un contenedor HTML para la información que se mostrará al detectar el QR
      const infoDiv = document.createElement('div');
      infoDiv.style.position = 'absolute';
      infoDiv.style.top = '10%'; // Ajustado para pantallas pequeñas
      infoDiv.style.left = '50%';
      infoDiv.style.transform = 'translate(-50%, 0)';
      infoDiv.style.width = '90%'; // Limitar ancho
      infoDiv.style.height = '80%'; // Limitar altura
      infoDiv.style.padding = '15px';
      infoDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      infoDiv.style.border = '2px solid #000';
      infoDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      infoDiv.style.visibility = 'hidden'; // Inicialmente oculto
      infoDiv.style.zIndex = '10';
      infoDiv.style.overflowY = 'auto'; // Habilitar desplazamiento vertical
      infoDiv.style.overflowX = 'hidden'; // Evitar desplazamiento horizontal innecesario
      infoDiv.style.fontFamily = 'Arial, sans-serif';
      infoDiv.style.borderRadius = '8px'; // Esquinas redondeadas
      infoDiv.innerHTML = `
        <h2 style="text-align: center; color: #333;">Unidad de Investigación</h2>
        <p><strong>Portada » Investigación » Unidad de Investigación</strong></p>
        <p>
          Cada Facultad de la Universidad Nacional de Ingeniería posee una Unidad de Investigación formada por un director y un Comité Consultivo de Investigación. 
          El Comité Consultivo está integrado por el director de la Unidad de Investigación y dos docentes investigadores de la facultad.
        </p>
        <h3>Funciones</h3>
        <ul>
          <li>Someter toda propuesta de investigación al Comité Consultivo de Investigación para su aprobación.</li>
          <li>Verificar el cumplimiento de los requisitos formales según los reglamentos vigentes.</li>
        </ul>
        <h3>Procedimiento para otorgar subvenciones</h3>
        <ol>
          <li>Propuestas de bases para concursos son aprobadas en el Consejo de Facultad.</li>
          <li>Postulaciones realizadas a través del Vicerrectorado de Investigación (VRI).</li>
          <li>Evaluaciones por jurados externos determinan el ranking de proyectos.</li>
          <li>Resultados enviados por el VRI permiten determinar los proyectos financiados.</li>
        </ol>
        <h3>Requisitos para los proyectos financiados</h3>
        <ul>
          <li>Contar con un Investigador Principal responsable de la formulación, ejecución y manejo económico.</li>
          <li>Presentar informes técnicos y económicos al finalizar el proyecto.</li>
          <li>Inventario valorizado de equipos adquiridos con fondos asignados.</li>
        </ul>
        <h3>Fuentes de financiamiento</h3>
        <p>
          Los proyectos pueden financiarse con recursos ordinarios, directamente recaudados, donaciones u otras fuentes. 
          El monto de la subvención se establece según las bases del concurso.
        </p>
      `;
      document.body.appendChild(infoDiv);

      // Crear un ancla en la escena de AR para el QR detectado
      const anchor = mindarThree.addAnchor(0);

      // Agregar una función al ancla para mostrar el contenedor cuando el QR sea detectado
      anchor.onTargetFound = () => {
        infoDiv.style.visibility = 'visible'; // Mostrar la información cuando se detecte el QR
      };

      // Agregar una función para ocultar el contenedor cuando el QR ya no esté visible
      anchor.onTargetLost = () => {
        infoDiv.style.visibility = 'hidden'; // Ocultar la información cuando el QR se pierda
      };

      // Iniciar MindAR
      await mindarThree.start();

      // Bucle de animación para renderizar la escena
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });

    } catch (error) {
      console.error("Error al iniciar MindAR:", error);
    }
  };

  start();
});
