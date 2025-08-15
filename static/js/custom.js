window.onload = function() {
    
    // Asumiendo que 'map' es el objeto del mapa creado con Leaflet
    // Ajusta la vista inicial a las coordenadas deseadas y el nivel de zoom
    map.setView([-10,-75], 5);  // Coordenadas de Perú y nivel de zoom de 6

    // Si prefieres usar un zoom más cercano o más lejano, ajusta el número del zoom (por ejemplo, 10, 5, etc.)
    // map.setView([-9.19, -75.0152], 5);  // Menor número = zoom más alejado

    // Crear barra de encabezado con toggle y texto alineados
    const controlLayersElement = document.querySelector('.leaflet-control-layers');
    const toggleControl = document.querySelector('.leaflet-control-layers-toggle');

    // Crear contenedor combinado
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

    // Crear texto
    const headerText = document.createElement('span');
    headerText.innerText = '🗂 Lista de Capas';

    // Mover el botón toggle dentro del header
    headerBar.appendChild(headerText);
    headerBar.appendChild(toggleControl);

    // Insertar al principio del control
    controlLayersElement.insertBefore(headerBar, controlLayersElement.firstChild);

    // Crear encabezado de la página
    const header = document.createElement('div');
    header.style.height = '50px';
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
    logo.style.height = '40px';
    logo.style.marginRight = '15px';

    const title = document.createElement('div');
    title.innerText = 'Visor de las Zonas geográficas prioritarias de atención de los programas sociales en el marco del desarrollo productivo agropecuario';
    title.style.fontSize = '16px';
    title.style.fontWeight = 'bold';
    title.style.color = '#fefefe';
    title.style.fontFamily = 'sans-serif';
    title.style.textAlign = 'center';  // Asegura que el título se vea centrado

    header.appendChild(logo);
    header.appendChild(title);
    document.body.insertBefore(header, document.getElementById('map'));

    // Personalizar mapa para que respete el espacio para el encabezado
    const mapElement = document.getElementById('map');
    mapElement.style.width = '100%';
    mapElement.style.height = 'calc(100% - 60px)';  // Deja espacio para el encabezado
};
