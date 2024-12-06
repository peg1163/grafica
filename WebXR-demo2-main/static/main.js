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
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; margin: 10px; max-width: 600px;">
              <h2 style="text-align: center; color: #2c3e50;">Facultad de Ciencias</h2>
              <p style="text-align: center;">
                <img src="./static/img/FC.jpg" alt="Facultad de Ciencias" style="max-width: 100%; border-radius: 10px; margin-bottom: 20px;">
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                El 06 de agosto de 1960, promulgada la Ley Universitaria No. 13417, se creó la Facultad de Ciencias Físicas y Matemáticas en la 
                Universidad Nacional de Ingeniería, a partir de la entonces Facultad de Ciencias Básicas y Nucleares.
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                La Facultad de Ciencias de la Universidad Nacional de Ingeniería (UNI) es uno de los principales centros de enseñanza e investigación 
                en ciencias básicas del Perú. Está ubicado en el distrito del Rímac de la ciudad de Lima, Perú. Fundada el 6 de agosto de 1960 con la 
                visión de ser siempre pionera en impulsar el estudio y desarrollo de la ciencia en el país, hoy ofrece programas académicos de 
                pregrado y/o posgrado en las áreas de ciencias de la computación, física, ingeniería física, matemática y química.
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                En los últimos años, nuestra facultad ha experimentado un crecimiento y expansión en su producción científica, consolidándose como un 
                referente en la formación científica y tecnológica en las ciencias básicas, con la mayor cantidad de producción científica de nuestra 
                universidad, y dos centros de investigación asociados a la facultad: el Instituto de Matemáticas y Ciencias Afines (IMCA), que cuenta 
                con la colaboración del Instituto de Matemática Pura y Aplicada (IMPA) de Río de Janeiro, Brasil, y el Centro de Desarrollo de 
                Materiales Avanzados y Nanotecnología (CEMAT-UNI).
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                Parte esencial de la Facultad de Ciencias es su Sección de Posgrado que otorga los Grados de Maestría en Ciencias con mención en Física, 
                Química, Física Médica, Matemática Aplicada, Energía Nuclear, Economía Matemática y los Grados de Doctor en Física, en Matemáticas y en Química; 
                así como el Título de Especialista en Energía Solar (Segunda Especialización Profesional) y en Protección Radiológica.
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                Asimismo, las diferentes generaciones de nuestra facultad han mantenido su compromiso con la divulgación y divulgación científica a 
                través de diferentes actividades de responsabilidad social como Expociencia, nuestra feria de experimentos gratuita para colegios y eventos 
                organizados por asociaciones de estudiantes.
              </p>
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://fc.uni.edu.pe" target="_blank" style="text-decoration: none; color: white; background-color: #3498db; padding: 10px 20px; border-radius: 5px; font-size: 16px; margin-right: 10px;">
                  Visitar página web
                </a>
                <a href="https://3dwarehouse.sketchup.com/ar-view/20fcaee059ff460219593fbe28ad6e81" target="_blank" style="text-decoration: none; color: white; background-color: #e74c3c; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
                  Estructura 3D
                </a>
              </div>
            </div>
          `,
        }
        
        ,
        {
          id: 3, // QR 2
          content: `
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; margin: 10px; max-width: 600px;">
              <h2 style="text-align: center; color: #2c3e50;">Comedor Universitario</h2>
              <p style="text-align: center;">
                <img src="./static/img/comedor.jpg" alt="Comedor Universitario" style="max-width: 100%; border-radius: 10px; margin-bottom: 20px;">
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                El Comedor Universitario de la Universidad Nacional de Ingeniería (UNI) ofrece servicios alimentarios a toda la comunidad universitaria, brindando un espacio cómodo y accesible para los estudiantes y personal docente. 
                Su objetivo principal es promover una alimentación saludable y equilibrada para apoyar el rendimiento académico y físico de los estudiantes.
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                En el Comedor Universitario, se sirven menús variados, adecuados a diferentes necesidades dietéticas, como menús vegetarianos, veganos, y opciones sin gluten. Además, se garantiza que los alimentos sean frescos y preparados con ingredientes de alta calidad.
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                El Comedor es un lugar de encuentro, no solo para disfrutar de una comida, sino también para socializar con otros estudiantes y profesores. Está diseñado para ofrecer un ambiente cómodo y moderno que fomente el bienestar de la comunidad universitaria.
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                La gestión del Comedor Universitario está a cargo de Bienestar Universitario, que se asegura de ofrecer una experiencia agradable para todos los usuarios.
              </p>
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://bienestaruniversitario.uni.edu.pe/index.php/servicios/comedor-universitario/" target="_blank" style="text-decoration: none; color: white; background-color: #3498db; padding: 10px 20px; border-radius: 5px; font-size: 16px; margin-right: 10px;">
                  Visitar página web
                </a>
                <a href="https://3dwarehouse.sketchup.com/ar-view/f9d17eadcfe7c8068c0727b3430a9e6" target="_blank" style="text-decoration: none; color: white; background-color: #e74c3c; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
                  Estructura 3D
                </a>
              </div>
            </div>
          `,
        }
        ,
        {
          id: 1, // QR 3
          content: `
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; margin: 10px; max-width: 600px;">
              <h2 style="text-align: center; color: #2c3e50;">Centro Médico UNI</h2>
              <p style="text-align: center;">
                <img src="./static/img/medico.JPEG" alt="Centro Médico UNI" style="max-width: 100%; border-radius: 10px; margin-bottom: 20px;">
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                La Universidad Nacional de Ingeniería realizó la ceremonia de entrega de obra y develación de la placa del Centro Médico UNI, que mejorará la capacidad y calidad en la atención y asistencia médica para toda la comunidad universitaria.
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                El Centro Médico UNI abarca un área total de 2 mil 489.97 m2, que cuenta con los principales servicios y ambientes como Consultorio General, Odontología, Psicología, Área de Medicina Física y Rehabilitación, así como Salas de Rayos X, Ecografía, y Endoscopia.
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                Para la moderna infraestructura, así como su equipamiento y mobiliario, se tuvo una inversión de S/. 8’356,202.00, la cual cubrirá las necesidades de los estudiantes, docentes, personal administrativo y operativo de nuestra universidad, cumpliendo adecuadamente con los servicios y requerimientos de un Establecimiento de Salud Tipo I -3.
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                En su discurso, el rector de la UNI, Dr. Alfonso López Chau Nava, renovó su compromiso con la salud y el bienestar de la comunidad universitaria a través de la implementación de un buen servicio médico, y aprovechó la ocasión para expresar su agradecimiento a las autoridades de las anteriores gestiones que hicieron posible la construcción de este moderno centro.
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                También estuvieron presentes en el evento realizado el 24 de marzo la vicerrectora Académica, Dra. Shirley Chilet Cama; el vicerrector de Investigación, Dr. Arturo Talledo Coronado; así como el jefe del Centro de Infraestructura Universitaria, Ing. Sabino Basualdo Montes; y la jefa de la Unidad del Servicio de Salud, Méd. Marina Valverde Aranda; entre otras autoridades.
              </p>
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://bienestaruniversitario.uni.edu.pe/index.php/unidades/unidad-de-centro-medico-uni/" target="_blank" style="text-decoration: none; color: white; background-color: #3498db; padding: 10px 20px; border-radius: 5px; font-size: 16px; margin-right: 10px;">
                  Visitar página web
                </a>
                <a href="https://3dwarehouse.sketchup.com/ar-view/c46dbec158b4476bc749a60a2f891a22" target="_blank" style="text-decoration: none; color: white; background-color: #e74c3c; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
                  Estructura 3D
                </a>
              </div>
            </div>
          `,
        }
        ,
        {
          id: 2, // QR 5
          content: `
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; margin: 10px; max-width: 600px;">
              <h2 style="text-align: center; color: #2c3e50;">Residencia Universitaria UNI</h2>
              <p style="text-align: center;">
                <img src="./static/img/residencia.jpg" alt="Residencia Universitaria UNI" style="max-width: 100%; border-radius: 10px; margin-bottom: 20px;">
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                La Residencia Universitaria UNI está encargada de asistir con alojamiento, vivienda y servicios complementarios básicos a los estudiantes, previa evaluación socioeconómica, psicológica y académica. Los postulantes que deseen acceder a este servicio deberán tener un aceptable desempeño académico, estar carentes de vivienda, ser de procedencia del interior del país y/o no contar con recursos económicos para sostenerse durante su periodo estudiantil.
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                Los seleccionados deberán cumplir con las normas que se encuentran establecidas en el Reglamento de la Residencia Universitaria, aprobado por RR N.º 0455 del 21 de abril del 2017.
              </p>
              <p style="text-align: justify; color: #34495e; font-size: 16px; line-height: 1.6;">
                La Residencia Universitaria cuenta con servicios como comedor, gimnasio, lavandería y centros de cómputo. Los alumnos pueden hacer uso de estas instalaciones para mejorar su calidad de vida durante su permanencia en la universidad.
              </p>
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://bienestaruniversitario.uni.edu.pe/index.php/servicios/residencia-universitaria/" target="_blank" style="text-decoration: none; color: white; background-color: #3498db; padding: 10px 20px; border-radius: 5px; font-size: 16px; margin-right: 10px;">
                  Visitar página web
                </a>
                <a href="https://3dwarehouse.sketchup.com/ar-view/28426e547230fbdce29e0153ea2cd929" target="_blank" style="text-decoration: none; color: white; background-color: #e74c3c; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
                  Estructura 3D
                </a>
              </div>
            </div>
          `,
        }
        ,
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
