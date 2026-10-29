const documentosPorNumeral = {
  '2015': ['BL (documento de transporte)'],
  '2017': ['Factura comercial o proforma'],
  '2022': ['Factura comercial', 'Declaración de importación (DIM)'],
  '2023': ['Factura comercial', 'Declaración de importación (DIM)'],
  '2024': ['Factura comercial', 'Declaración de importación (DIM)'],
  '2025': ['Factura comercial', 'Declaración de importación (DIM)']
};

const nombresCampos = {
  fechaTramite: 'Fecha del trámite',
  tipoIdentificacion: 'Tipo de identificación',
  identificacion: 'Número de identificación',
  nombreImportador: 'Nombre o razón social del importador',
  monedaNegociacion: 'Moneda de negociación',
  valorMonedaNegociacion: 'Valor total en moneda de negociación',
  tipoCambioDolar: 'Tipo de cambio a dólar',
  valorTotalDolares: 'Valor total en dólares',
  numeroDeclaracionFactura: 'Número de DIM y/o factura comercial',
  valorFob: 'Valor FOB en dólares',
  beneficiarioExterior: 'Nombre del beneficiario del giro en el exterior',
  ciudadExterior: 'Ciudad destino del giro',
  paisExterior: 'País destino del giro',
  observaciones: 'Observaciones o instrucciones',
  nombreDeclarante: 'Nombre del declarante'
};

const form = document.getElementById('importacionesForm');
const numeralOperacion = document.getElementById('numeralOperacion');
const detalleNumeral = document.getElementById('detalleNumeral');
const formularioGenerado = document.getElementById('formularioGenerado');
const datosGenerados = document.getElementById('datosGenerados');
const documentosGenerados = document.getElementById('documentosGenerados');

function mostrarDocumentos(numeral) {
  detalleNumeral.replaceChildren();
  const documentos = documentosPorNumeral[numeral];
  if (!documentos) return;

  const heading = document.createElement('strong');
  heading.textContent = `Documentos para el numeral ${numeral}`;
  const list = document.createElement('ul');
  documentos.forEach((documento) => {
    const item = document.createElement('li');
    item.textContent = documento;
    list.appendChild(item);
  });
  detalleNumeral.append(heading, list);
}

numeralOperacion.addEventListener('change', () => {
  mostrarDocumentos(numeralOperacion.value);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const submitButton = document.getElementById('guardarImportaciones');
  const status = document.getElementById('importacionesStatus');
  submitButton.disabled = true;
  status.textContent = 'Guardando la solicitud...';

  try {
    const formValues = new FormData(form);
    await window.ColComexApi.guardarFormulario(
      'formulario-importaciones',
      Object.fromEntries(formValues.entries()),
    );
    const numeral = formValues.get('numeralOperacion');
    const documentos = documentosPorNumeral[numeral];
    const numeralOption = numeralOperacion.selectedOptions[0];
    datosGenerados.replaceChildren();

    Object.entries(nombresCampos).forEach(([name, label]) => {
      const value = formValues.get(name);
      if (!value) return;

      const term = document.createElement('dt');
      term.textContent = label;
      const description = document.createElement('dd');
      description.textContent = value;
      datosGenerados.append(term, description);
    });

    const numeralLabel = document.createElement('dt');
    numeralLabel.textContent = 'Numeral cambiario';
    const numeralValue = document.createElement('dd');
    numeralValue.textContent = numeralOption.textContent;
    datosGenerados.append(numeralLabel, numeralValue);

    documentosGenerados.replaceChildren();
    if (documentos) {
      const documentHeading = document.createElement('strong');
      documentHeading.textContent = 'Documentos que debes adjuntar';
      const documentList = document.createElement('ul');
      documentos.forEach((documento) => {
        const item = document.createElement('li');
        item.textContent = documento;
        documentList.appendChild(item);
      });
      documentosGenerados.append(documentHeading, documentList);
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
