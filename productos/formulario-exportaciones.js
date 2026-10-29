const nombresCampos = {
  fechaTramite: 'Fecha del trámite',
  tipoIdentificacion: 'Tipo de identificación',
  identificacion: 'Número de identificación',
  nombreExportador: 'Nombre o razón social del exportador',
  monedaNegociacion: 'Código moneda de negociación',
  valorMonedaNegociacion: 'Valor total en moneda de negociación',
  tasaCambioDolares: 'Tasa de cambio a dólares',
  valorTotalDolares: 'Valor total en dólares',
  numeroDocumento: 'Número de DEX y/o factura',
  numeralCambiario: 'Numeral cambiario',
  valorReintegrado: 'Valor reintegrado DEX/factura en USD',
  totalValorFob: 'Total valor FOB (USD)',
  totalGastosExportacion: 'Total gastos de exportación (USD)',
  deducciones: 'Deducciones (USD)',
  observaciones: 'Observaciones',
  nombreDeclarante: 'Nombre del declarante'
};

const documentosPorNumeral = {
  '1045': ['Factura comercial o proforma'],
  '1050': ['Factura comercial o proforma'],
  '1510': [],
  default: ['Factura comercial', 'Declaración de exportación (DEX)']
};
const avisoNumerales = 'Aviso: Los numerales 1045, 1050 y 1510 no legalizan factura.';
const numeralesConAviso = new Set(['1045', '1050', '1510']);

const form = document.getElementById('exportacionesForm');
const numeralCambiario = document.getElementById('numeralCambiario');
const detalleNumeral = document.getElementById('detalleNumeral');
const reintegroNeto = document.getElementById('reintegroNeto');
const formularioGenerado = document.getElementById('formularioGenerado');
const datosGenerados = document.getElementById('datosGenerados');
const documentosGenerados = document.getElementById('documentosGenerados');
const documentosRequeridosGenerados = document.getElementById('documentosRequeridosGenerados');

function mostrarDocumentos(numeral) {
  detalleNumeral.replaceChildren();
  if (!numeral) {
    detalleNumeral.textContent = 'Selecciona un numeral para consultar los documentos requeridos.';
    return;
  }

  const heading = document.createElement('strong');
  heading.textContent = `Documentos para el numeral ${numeral}`;
  const documents = documentosPorNumeral[numeral] ?? documentosPorNumeral.default;
  const list = document.createElement('ul');
  if (documents.length) {
    documents.forEach((documento) => {
      const item = document.createElement('li');
      item.textContent = documento;
      list.appendChild(item);
    });
  } else {
    const item = document.createElement('li');
    item.textContent = 'No se solicita factura ni DEX para este numeral.';
    list.appendChild(item);
  }

  detalleNumeral.append(heading, list);
  if (numeralesConAviso.has(numeral)) {
    const notice = document.createElement('p');
    notice.className = 'numeral-restriction';
    notice.textContent = avisoNumerales;
    detalleNumeral.appendChild(notice);
  }
}

numeralCambiario.addEventListener('change', () => {
  mostrarDocumentos(numeralCambiario.value);
});

function valorEnCentavos(name) {
  const value = Number(new FormData(form).get(name));
  return Number.isFinite(value) ? Math.round(value * 100) : 0;
}

function actualizarReintegroNeto() {
  const totalCentavos = valorEnCentavos('totalValorFob')
    + valorEnCentavos('totalGastosExportacion')
    - valorEnCentavos('deducciones');
  reintegroNeto.value = `USD ${(totalCentavos / 100).toFixed(2)}`;
  return (totalCentavos / 100).toFixed(2);
}

function agregarCampoGenerado(container, label, value) {
  const term = document.createElement('dt');
  term.textContent = label;
  const description = document.createElement('dd');
  description.textContent = value;
  container.append(term, description);
}

form.addEventListener('input', (event) => {
  if (['totalValorFob', 'totalGastosExportacion', 'deducciones'].includes(event.target.name)) {
    actualizarReintegroNeto();
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const submitButton = document.getElementById('guardarExportaciones');
  const status = document.getElementById('exportacionesStatus');
  submitButton.disabled = true;
  status.textContent = 'Guardando la solicitud...';

  try {
    const formValues = new FormData(form);
    const datos = Object.fromEntries(formValues.entries());
    datos.reintegroNetoCalculado = actualizarReintegroNeto();
    await window.ColComexApi.guardarFormulario('formulario-exportaciones', datos);
    datosGenerados.replaceChildren();
    Object.entries(nombresCampos).forEach(([name, label]) => {
      agregarCampoGenerado(datosGenerados, label, formValues.get(name));
    });
    agregarCampoGenerado(datosGenerados, 'Reintegro neto calculado (USD)', datos.reintegroNetoCalculado);

    documentosGenerados.replaceChildren();
    agregarCampoGenerado(documentosGenerados, 'DEX/factura', formValues.get('numeroDocumento'));
    agregarCampoGenerado(documentosGenerados, 'Valor reintegrado DEX/factura (USD)', formValues.get('valorReintegrado'));
    documentosRequeridosGenerados.replaceChildren();
    const documentos = documentosPorNumeral[numeralCambiario.value] ?? documentosPorNumeral.default;
    const documentHeading = document.createElement('strong');
    documentHeading.textContent = `Documentos requeridos para el numeral ${numeralCambiario.value}`;
    const documentList = document.createElement('ul');
    const listaDocumentos = documentos.length ? documentos : ['No se solicita factura ni DEX para este numeral.'];
    listaDocumentos.forEach((documento) => {
      const item = document.createElement('li');
      item.textContent = documento;
      documentList.appendChild(item);
    });
    documentosRequeridosGenerados.append(documentHeading, documentList);
    if (numeralesConAviso.has(numeralCambiario.value)) {
      const notice = document.createElement('p');
      notice.textContent = avisoNumerales;
      documentosRequeridosGenerados.appendChild(notice);
    }

    status.textContent = 'Solicitud guardada en la base de datos. Ya puedes imprimir o guardar el formulario como PDF.';
    formularioGenerado.hidden = false;
    formularioGenerado.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    status.textContent = error instanceof Error
      ? error.message
      : 'No se pudo guardar la solicitud. Revisa la conexión e inténtalo de nuevo.';
  } finally {
    submitButton.disabled = false;
  }
});

document.getElementById('imprimirFormulario').addEventListener('click', () => window.print());
