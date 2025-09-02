window.onload = function () {
  // Asegúrate de que html/body/#map tengan altura (en tu CSS global):
  // html, body { height: 100%; margin:0; }
  // #map { height: 100%; }

  // 1) setView OK
  map.setView([-9.2, -75], 5);

  // Utilidad: invalidar tamaño de forma segura y con debounce
  let invTimer = null;
  const invalidate = (delay = 0) => {
    clearTimeout(invTimer);
    invTimer = setTimeout(() => map.invalidateSize({animate:false}), delay);
  };

  // 2) Header
  const header = document.createElement('div');
  header.style.height = '60px';                 // usa 60px reales
  header.style.backgroundColor = '#2a7bf4';
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.padding = '5px 15px';
  header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
  header.style.zIndex = '1000';
  header.style.position = 'relative';
  header.style.opacity = '1';

  const logo = document.createElement('img');
  logo.src = 'static/img/LogoOficialMIDIS.jpg';
  logo.alt = 'Logo del MIDIS';
  logo.style.height = '90%';
  logo.style.marginRight = '2%';

  const title = document.createElement('div');
  title.innerText = 'Visor de las Zonas Prioritarias de Atención de los programas sociales en el marco del desarrollo productivo agropecuario';
  title.style.fontSize = '100%';
  title.style.fontWeight = 'bold';
  title.style.color = '#fefefe';
  title.style.fontFamily = 'sans-serif';
  title.style.textAlign = 'left';

  header.appendChild(logo);
  header.appendChild(title);
  document.body.insertBefore(header, document.getElementById('map'));

  // 3) Ajusta el alto del mapa exactamente al header
  const mapElement = document.getElementById('map');
  mapElement.style.width = '100%';
  mapElement.style.height = 'calc(100% - 60px)'; // antes tenías 50 vs 60 => inconsistencia
  invalidate(0); // invalida inmediatamente tras cambiar el layout

  // 4) Control de capas (con null-check por si no existe todavía)
  const controlLayersElement = document.querySelector('.leaflet-control-layers');
  const toggleControl = document.querySelector('.leaflet-control-layers-toggle');

  if (controlLayersElement && toggleControl) {
    controlLayersElement.style.color = '#fff';

    const headerBar = document.createElement('div');
    headerBar.style.display = 'flex';
    headerBar.style.alignItems = 'center';
    headerBar.style.justifyContent = 'space-between';
    headerBar.style.background = '#2a7bf4';
    headerBar.style.borderBottom = '1px solid #ccc';
    headerBar.style.padding = '6px 8px';
    headerBar.style.fontWeight = 'bold';
    headerBar.style.fontSize = '14px';
    headerBar.style.color = '#fff';
    headerBar.style.width = '100%';
    headerBar.style.boxSizing = 'border-box';
    headerBar.style.opacity = '1';
    headerBar.style.height = '40px';

    const headerText = document.createElement('span');
    headerText.innerText = '🗂 Lista de Capas';
    headerText.style.fontSize = '12px';

    headerBar.appendChild(headerText);
    headerBar.appendChild(toggleControl);
    controlLayersElement.insertBefore(headerBar, controlLayersElement.firstChild);

    // Responsivo
    const setLayersWidth = () => {
      controlLayersElement.style.width = (window.innerWidth < 650) ? '100%' : '80%';
    };
    setLayersWidth();
    window.addEventListener('resize', () => {
      setLayersWidth();
      invalidate(50); // al cambiar el layout por resize, vuelve a invalidar
    });

    // Colapsar/expandir
    let isLayersListExpanded = true;
    toggleControl.addEventListener('click', () => {
      if (isLayersListExpanded) {
        controlLayersElement.classList.remove('leaflet-control-layers-expanded');
        controlLayersElement.style.width = '80%';
      } else {
        controlLayersElement.classList.add('leaflet-control-layers-expanded');
        setLayersWidth();
      }
      isLayersListExpanded = !isLayersListExpanded;
      invalidate(50); // invalida tras animaciones/cambios de ancho
    });
  }

  // 5) Por si hay fuentes/capas que se añaden asíncronamente, re-valida al final del onload
  invalidate(100);
};
