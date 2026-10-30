const tipoProducto = document.getElementById('tipoProducto');
const form = document.getElementById('clientForm');
const resultado = document.getElementById('resultado');

if (tipoProducto && form) {
  const requestedType = new URLSearchParams(window.location.search).get('tipoProducto');
  if ([...tipoProducto.options].some((option) => option.value === requestedType)) {
    tipoProducto.value = requestedType;
  }
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const submitButton = document.getElementById('sendContactRequest');
    submitButton.disabled = true;
    resultado.textContent = 'Enviando solicitud...';
    resultado.style.display = 'block';
    resultado.classList.remove('success');

    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const hasSession = window.ColComexApi.tieneSesion();
      await window.ColComexApi.enviarContacto(data);
      resultado.textContent = hasSession
        ? 'Solicitud enviada y guardada correctamente. Puedes consultarla en Mis solicitudes.'
        : 'Solicitud enviada y guardada correctamente. Inicia sesión antes de enviar futuras solicitudes para consultarlas en Mis solicitudes.';
      resultado.classList.add('success');
      form.reset();
    } catch (error) {
      resultado.textContent = error instanceof Error
        ? error.message
        : 'No se pudo enviar la solicitud. Revisa tu conexión e inténtalo de nuevo.';
    } finally {
      submitButton.disabled = false;
    }
  });
}
