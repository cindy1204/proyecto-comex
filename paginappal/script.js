const questionsByType = {
  importaciones: [
    { name: 'productoImportar', label: '¿Qué producto desea importar?', type: 'text', placeholder: 'Ej. maquinaria, textiles, alimentos...' },
    { name: 'paisOrigen', label: '¿Desde qué país proviene?', type: 'text', placeholder: 'Ej. China, India, México...' },
    { name: 'volumenImportacion', label: '¿Cuál es el volumen estimado?', type: 'text', placeholder: 'Ej. 500 unidades / 10 contenedores' },
    { name: 'apoyoAduana', label: '¿Requiere apoyo en procesos aduaneros?', type: 'select', options: ['Sí', 'No', 'No estoy seguro'] },
    { name: 'detalleImportacion', label: 'Describa brevemente su necesidad', type: 'textarea', placeholder: 'Ej. tiempos de entrega, manejo documental, transporte o cumplimiento regulatorio.' }
  ],
  exportaciones: [
    { name: 'productoExportar', label: '¿Qué producto desea exportar?', type: 'text', placeholder: 'Ej. café, muebles, textiles...' },
    { name: 'mercadoDestino', label: '¿Cuál es el mercado de destino?', type: 'text', placeholder: 'Ej. Estados Unidos, Europa, Asia...' },
    { name: 'incoterm', label: '¿Cuál Incoterm maneja?', type: 'select', options: ['FOB', 'CIF', 'EXW', 'DAP', 'No sé'] },
    { name: 'documentacion', label: '¿Necesita soporte documental?', type: 'select', options: ['Sí', 'No', 'No estoy seguro'] },
    { name: 'detalleExportacion', label: 'Cuéntenos más sobre el envío', type: 'textarea', placeholder: 'Ej. volumen, fechas, embarque, requisitos del cliente extranjero.' }
  ],
  deudaExterna: [
    { name: 'montoSolicitado', label: '¿Cuánto monto desea consultar?', type: 'text', placeholder: 'Ej. $50.000.000' },
    { name: 'plazo', label: '¿Qué plazo necesita?', type: 'text', placeholder: 'Ej. 12, 24 o 36 meses' },
    { name: 'objetivo', label: '¿Cuál es el objetivo del financiamiento?', type: 'select', options: ['Capital de trabajo', 'Inversión', 'Refinanciamiento', 'Otros'] },
    { name: 'sector', label: '¿En qué sector opera la empresa?', type: 'text', placeholder: 'Ej. logística, manufactura, comercio...' },
    { name: 'detalleDeuda', label: 'Información adicional', type: 'textarea', placeholder: 'Describa su situación financiera o lo que necesita asesoría.' }
  ],
  inversiones: [
    { name: 'capitalDisponible', label: '¿Cuál es el capital disponible?', type: 'text', placeholder: 'Ej. $100.000.000' },
    { name: 'horizonte', label: '¿Cuál es el horizonte de inversión?', type: 'text', placeholder: 'Ej. 1 año, 3 años, 5 años' },
    { name: 'paisInteres', label: '¿Qué país o región le interesa?', type: 'text', placeholder: 'Ej. Estados Unidos, Europa, LATAM' },
    { name: 'perfil', label: '¿Qué perfil busca?', type: 'select', options: ['Bajo riesgo', 'Moderado', 'Alto crecimiento', 'No lo sé'] },
    { name: 'detalleInversion', label: 'Coméntanos tu objetivo', type: 'textarea', placeholder: 'Ej. diversificación, rentabilidad, entrada a nuevos mercados.' }
  ],
  servicios: [
    { name: 'tipoServicio', label: '¿Qué servicio requiere?', type: 'text', placeholder: 'Ej. asesoría aduanera, cumplimiento, logística...' },
    { name: 'empresa', label: '¿Qué tipo de empresa es?', type: 'text', placeholder: 'Ej. importadora, exportadora, pymes, start-up' },
    { name: 'periodicidad', label: '¿Con qué frecuencia lo necesita?', type: 'select', options: ['Evento puntual', 'Mensual', 'Trimestral', 'Continuo'] },
    { name: 'objetivoServicio', label: '¿Cuál es el objetivo principal?', type: 'textarea', placeholder: 'Ej. reducción de tiempos, cumplimiento regulatorio, optimización de procesos.' }
  ]
};

const tipoProducto = document.getElementById('tipoProducto');
const preguntasContainer = document.getElementById('preguntasContainer');
const form = document.getElementById('clientForm');
const resultado = document.getElementById('resultado');

function renderQuestions(productKey) {
  const questions = questionsByType[productKey] || [];

  if (!preguntasContainer) return;

  preguntasContainer.innerHTML = '';

  questions.forEach((question) => {
    const fieldWrap = document.createElement('div');
    fieldWrap.className = 'field';

    const label = document.createElement('label');
    label.textContent = question.label;
    label.setAttribute('for', question.name);

    let input;

    if (question.type === 'select') {
      input = document.createElement('select');
      input.name = question.name;
      input.id = question.name;
      input.required = true;

      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Seleccione una opción';
      input.appendChild(defaultOption);

      question.options.forEach((optionText) => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        input.appendChild(option);
      });
    } else if (question.type === 'textarea') {
      input = document.createElement('textarea');
      input.name = question.name;
      input.id = question.name;
      input.rows = 4;
      input.placeholder = question.placeholder || '';
      input.required = true;
    } else {
      input = document.createElement('input');
      input.type = question.type;
      input.name = question.name;
      input.id = question.name;
      input.placeholder = question.placeholder || '';
      input.required = true;
    }

    fieldWrap.appendChild(label);
    fieldWrap.appendChild(input);
    preguntasContainer.appendChild(fieldWrap);
  });
}

function validarFormulario() {
  if (!form) return true;

  const campos = form.querySelectorAll('input, select, textarea');
  let valido = true;

  campos.forEach((campo) => {
    if (!campo.checkValidity()) {
      campo.reportValidity();
      valido = false;
      return;
    }
  });

  return valido;
}

if (tipoProducto) {
  tipoProducto.addEventListener('change', (event) => {
    renderQuestions(event.target.value);
  });

  const requestedType = new URLSearchParams(window.location.search).get('tipoProducto');
  if ([...tipoProducto.options].some((option) => option.value === requestedType)) {
    tipoProducto.value = requestedType;
  }
  renderQuestions(tipoProducto.value);
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    resultado.textContent = 'Solicitud enviada con éxito.\n\n' + JSON.stringify(data, null, 2);
    resultado.style.display = 'block';
    resultado.classList.add('success');
    form.reset();
    renderQuestions(tipoProducto.value);
  });
}
