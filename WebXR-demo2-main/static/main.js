import { loadGLTF } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    try {
      // Inicialización de MindAR con múltiples objetivos QR
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: '/static/assets/targets/qr-target.mind', // Archivo único con los 4 QR
      });

      const { renderer, scene, camera } = mindarThree;

      // Añadir luz a la escena
      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      // Crear un contenedor HTML para la información
      const infoDiv = document.createElement('div');
      infoDiv.style.position = 'absolute';
      infoDiv.style.top = '10%';
      infoDiv.style.left = '50%';
      infoDiv.style.transform = 'translate(-50%, 0)';
      infoDiv.style.width = '90%';
      infoDiv.style.height = '80%';
      infoDiv.style.padding = '15px';
      infoDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      infoDiv.style.border = '2px solid #000';
      infoDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      infoDiv.style.visibility = 'hidden'; // Inicialmente oculto
      infoDiv.style.zIndex = '10';
      infoDiv.style.overflowY = 'auto';
      infoDiv.style.fontFamily = 'Arial, sans-serif';
      infoDiv.style.borderRadius = '8px';
      document.body.appendChild(infoDiv);

      // Crear anclas para cada QR y asociar su contenido
      const places = [
        {
          id: 0, // QR 1
          content: `
            <h2 style="text-align: center; color: #333;">Lugar 1: Facultad</h2>
            <p>La Unidad de Investigación fomenta la creación de proyectos científicos...</p>
          `,
        },
        {
          id: 1, // QR 2
          content: `
            <h2 style="text-align: center; color: #333;">Lugar 2:centro de investigacion</h2>
            <p>La Facultad de Ingeniería ofrece programas de calidad en diversas áreas...</p>
          `,
        },
        {
          id: 2, // QR 3
          content: `
            <h2 style="text-align: center; color: #333;">Lugar 3: Biblioteca</h2>
            <p>La Biblioteca Central cuenta con recursos digitales y físicos...</p>
          `,
        },
        {
          id: 3, // QR 4
          content: `
            <h2 style="text-align: center; color: #333;">Lugar 4: Estadistica </h2>
            <p>Laboratorios diseñados para investigación avanzada en ingeniería y ciencias...</p>
          `,
        },
      ];

      // Iterar sobre los lugares y crear anclas para cada QR
      places.forEach(({ id, content }) => {
        const anchor = mindarThree.addAnchor(id);

        // Mostrar contenido específico al detectar el QR
        anchor.onTargetFound = () => {
          infoDiv.innerHTML = content;
          infoDiv.style.visibility = 'visible'; // Mostrar la información
        };

        // Ocultar el contenedor cuando el QR ya no esté visible
        anchor.onTargetLost = () => {
          infoDiv.style.visibility = 'hidden'; // Ocultar la información
        };
      });

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
