const form = document.getElementById('serviceForm');
const direccionOperacion = document.getElementById('direccionOperacion');
const informacionDian = document.getElementById('informacionDian');
const numeralOperacion = document.getElementById('numeralOperacion');
const formularioGenerado = document.getElementById('formularioGenerado');
const datosGenerados = document.getElementById('datosGenerados');

const numeralesPorDireccion = {
  ingresos: [
    { code: '4100', title: '4100 · Servicios de transportes internacionales' },
    { code: '4110', title: '4110 · Servicios de seguros' },
    { code: '4120', title: '4120 · Servicios de viaje y turismo' },
    { code: '4200', title: '4200 · Servicios de comunicaciones' },
    { code: '4210', title: '4210 · Servicios financieros y de seguros auxiliares' },
    { code: '4220', title: '4220 · Servicios de información' },
    { code: '4230', title: '4230 · Servicios de consultoría y otros servicios profesionales' },
    { code: '4240', title: '4240 · Servicios técnicos y de ingeniería' },
    { code: '4250', title: '4250 · Otros servicios' },
    { code: '4300', title: '4300 · Ingresos por cánones, regalías y afines' },
    { code: '4400', title: '4400 · Ingresos por venta de bienes intangibles' },
    { code: '4500', title: '4500 · Transferencias corrientes' },
    { code: '4600', title: '4600 · Transferencias de capital' },
  ],
  egresos: [
    { code: '3110', title: '3110 · Servicios de transportes internacionales' },
    { code: '3120', title: '3120 · Servicios de viaje y turismo' },
    { code: '3130', title: '3130 · Servicios de comunicaciones' },
    { code: '3140', title: '3140 · Servicios financieros' },
    { code: '3150', title: '3150 · Servicios de información' },
    { code: '3160', title: '3160 · Servicios técnicos y de ingeniería' },
    { code: '3170', title: '3170 · Otros servicios empresariales' },
    { code: '3180', title: '3180 · Pagos de cánones, regalías y afines' },
    { code: '3190', title: '3190 · Otros pagos' },
    { code: '3200', title: '3200 · Transferencias corrientes' },
    { code: '3300', title: '3300 · Transferencias de capital' },
  ],
};

function actualizarValorNumeralUsd() {
  const tipoCambio = Number(document.getElementById('tipoCambioDolar').value) || 0;
  const valorMoneda = Number(document.getElementById('valorMonedaGiro').value) || 0;
  const resultado = tipoCambio * valorMoneda;
  document.getElementById('valorNumeralUsd').value = resultado > 0 ? resultado.toFixed(2) : '';
}

function actualizarNumerales() {
  const direccion = direccionOperacion.value;
  const numerales = numeralesPorDireccion[direccion] || [];
  
  informacionDian.hidden = direccion !== 'egresos';
  numeralOperacion.disabled = !direccion;
  numeralOperacion.innerHTML = '<option value="">Selecciona un numeral</option>';
  
  numerales.forEach((numeral) => {
    const option = document.createElement('option');
    option.value = numeral.code;
    option.textContent = numeral.title;
    numeralOperacion.appendChild(option);
  });
}

direccionOperacion.addEventListener('change', actualizarNumerales);

form.addEventListener('input', (event) => {
  if (['tipoCambioDolar', 'valorMonedaGiro'].includes(event.target.name)) {
    actualizarValorNumeralUsd();
  }
});

function agregarCampoGenerado(container, label, value) {
  const term = document.createElement('dt');
  term.textContent = label;
  const description = document.createElement('dd');
  description.textContent = value;
  container.append(term, description);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const status = document.createElement('p');
  status.id = 'serviciosStatus';
  status.className = 'form-message';
  const previousStatus = form.querySelector('#serviciosStatus');
  if (previousStatus) previousStatus.remove();
  form.parentElement?.insertBefore(status, formularioGenerado);
  
  submitButton.disabled = true;
  status.textContent = 'Guardando la solicitud...';

  try {
    const formValues = new FormData(form);
    const datos = Object.fromEntries(formValues.entries());
    
    // Call API if available
    if (typeof window.ColComexApi !== 'undefined' && window.ColComexApi.guardarFormulario) {
      await window.ColComexApi.guardarFormulario('formulario-servicios', datos);
    }
    
    datosGenerados.replaceChildren();
    Object.entries(datos).forEach(([name, value]) => {
      if (value) {
        agregarCampoGenerado(datosGenerados, name, String(value));
      }
    });

    status.textContent = 'Solicitud guardada. Ya puedes imprimir o guardar el formulario como PDF.';
    status.className = 'form-message form-message-success';
    formularioGenerado.hidden = false;
    formularioGenerado.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    status.textContent = error instanceof Error
      ? error.message
      : 'No se pudo guardar la solicitud. Revisa la conexión e inténtalo de nuevo.';
    status.className = 'form-message form-message-error';
  } finally {
    submitButton.disabled = false;
  }
});

document.getElementById('imprimirFormulario')?.addEventListener('click', () => window.print());
