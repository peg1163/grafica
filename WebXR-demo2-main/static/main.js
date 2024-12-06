import { loadGLTF } from "./libs/loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    try {
      console.log("Inicializando MindAR...");

      // Inicialización de MindAR
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: '/static/assets/targets/qr-target.mind',  // Archivo de referencia del QR
      });

      const { renderer, scene, camera } = mindarThree;

      // Añadir luz a la escena
      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      // Crear un contenedor para el iframe
      const iframeContainer = document.createElement('div');
      iframeContainer.style.position = 'absolute';
      iframeContainer.style.top = '50%';
      iframeContainer.style.left = '50%';
      iframeContainer.style.transform = 'translate(-50%, -50%)';
      iframeContainer.style.width = '80%';
      iframeContainer.style.height = '80%';
      iframeContainer.style.overflow = 'auto';
      iframeContainer.style.border = '2px solid #000';
      iframeContainer.style.visibility = 'hidden'; // Inicialmente oculto
      iframeContainer.style.zIndex = '10'; // Asegurar que esté visible sobre otros elementos

      // Crear el iframe
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.src = "https://www.bibliotecacentral.uni.edu.pe/quienes-somos.html";

      // Añadir el iframe al contenedor
      iframeContainer.appendChild(iframe);
      document.body.appendChild(iframeContainer);

      // Crear un ancla en la escena de AR para el QR detectado
      const anchor = mindarThree.addAnchor(0);
      console.log("Ancla creada para la detección del QR.");

      // Agregar una función al ancla para mostrar el contenedor del iframe cuando el QR sea detectado
      anchor.onTargetFound = () => {
        console.log("Marcador encontrado, mostrando iframe.");
        iframeContainer.style.visibility = 'visible';  // Mostrar el iframe cuando se detecte el QR
      };

      // Agregar una función para ocultar el contenedor del iframe cuando el QR ya no esté visible
      anchor.onTargetLost = () => {
        console.log("Marcador perdido, ocultando iframe.");
        iframeContainer.style.visibility = 'hidden';  // Ocultar el iframe cuando el QR se pierda
      };

      // Iniciar MindAR
      await mindarThree.start();
      console.log("MindAR ha comenzado y la cámara debería estar activa.");

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
