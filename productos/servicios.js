const numeralesServicios = {
  ingresos: [
    ['1070', 'Venta de petróleo crudo y gas natural de producción nacional', 'Ingreso por venta interna de petróleo crudo y gas natural de producción nacional.'],
    ['1510', 'Gastos de exportación no incluidos en la declaración definitiva', 'Ingreso para cubrir gastos adicionales de exportación, como fletes, seguros o comisiones, no incluidos en la declaración definitiva.'],
    ['1520', 'Servicios portuarios y de aeropuerto', 'Servicios prestados a naves y aeronaves: suministros, cargue, descargue, derechos, aeronavegación, mantenimiento y reparaciones.'],
    ['1530', 'Turismo', 'Ingresos por turismo y servicios prestados a turistas extranjeros o residentes en el exterior. No incluye venta de pasajes.'],
    ['1535', 'Transporte por tubería de petróleo crudo y gas natural', 'Ingreso por el pago del servicio de transporte por tubería.'],
    ['1536', 'Contratos de asociación - ingreso', 'Ingreso por traslados entre las partes vinculadas a contratos de asociación.', 'Uso exclusivo de titulares de cuentas de compensación tradicional.'],
    ['1540', 'Servicios financieros', 'Comisiones por corretaje, asesoramiento, custodia y gestión de activos; incluye ciertos servicios y gastos financieros. No incluye comisiones de endeudamiento externo.', 'No utilizable por titulares de cuentas de compensación.'],
    ['1600', 'Compra a residentes que compran y venden divisas profesionalmente', 'Compra de divisas a residentes que se dedican profesionalmente a comprar y vender divisas.'],
    ['1601', 'Otros conceptos', 'Solo para ingresos no descritos en otro numeral.'],
    ['1631', 'Intereses por bonos en moneda legal colombiana', 'Ingreso destinado al pago de intereses de bonos en moneda legal colombiana.', 'No aplicable a cuentas de compensación.'],
    ['1695', 'Servicios culturales, artísticos y deportivos', 'Ingreso por servicios culturales, artísticos y deportivos prestados por colombianos en el exterior.'],
    ['1696', 'Pasajes', 'Ingreso de divisas por venta de pasajes.'],
    ['1703', 'Servicios de comunicaciones', 'Ingresos por uso de redes para transmitir información, sonido, imagen, voz y datos; incluye ciertos servicios postales y de mensajería.'],
    ['1704', 'Comisiones no financieras', 'Comisiones por representación de empresas, intermediación y corretaje no financiero. No aplica a IMC ni a sociedades de servicios financieros.'],
    ['1706', 'Viajes de negocios, gastos educativos, pagos laborales y seguridad social', 'Ingresos por gastos de negocios de no residentes, educación, pagos laborales a residentes y ciertos pagos de seguridad social.'],
    ['1707', 'Servicios diplomáticos, consulares y organismos internacionales', 'Ingresos relacionados con embajadas, consulados, organismos internacionales y la instalación de sus representantes en Colombia.'],
    ['1708', 'Comercialización de mercancías de usuarios de zona franca', 'Ingreso por venta de mercancías de zona franca que no se consideran exportación según las normas aduaneras.'],
    ['1710', 'Servicios médicos, quirúrgicos y hospitalarios', 'Ingreso por atención médica, quirúrgica y hospitalaria prestada a no residentes, incluidos medicamentos.'],
    ['1711', 'Suscripciones, cuotas de afiliación y aportes periódicos', 'Ingresos por suscripciones, cuotas de afiliación y aportes periódicos por membresía.'],
    ['1712', 'Venta de mercancías no consideradas exportación', 'Ingreso por venta de mercancías que no se consideran exportación según las normas aduaneras.'],
    ['1713', 'Arrendamiento operativo', 'Ingreso por arrendamiento no financiero de naves, aeronaves, maquinaria y otros equipos por residentes en Colombia.'],
    ['1714', 'Servicios de publicidad', 'Ingreso por publicidad comercial, investigación de mercados, encuestas y diseño o comercialización de publicidad.'],
    ['1809', 'Remesas de trabajadores', 'Ingreso por remesas de colombianos que trabajan en el exterior.'],
    ['1810', 'Donaciones y transferencias sin contraprestación', 'Ingreso por donaciones y transferencias que no generan contraprestación para quien las recibe.'],
    ['1811', 'Redención de bonos en moneda legal colombiana', 'Ingreso destinado al pago del capital de bonos en moneda legal colombiana.', 'No aplicable a cuentas de compensación.'],
    ['1812', 'Remesas para adquisición de vivienda', 'Ingreso de trabajadores colombianos en el exterior destinado a vivienda y que no constituye inversión de capitales del exterior.'],
    ['1813', 'Remesas a cuentas de ahorro de trámite simplificado', 'Remesas de personas naturales colombianas no residentes destinadas a estas cuentas.'],
    ['1815', 'Marcas, patentes, regalías y compensaciones', 'Ingresos por uso autorizado de intangibles, propiedad intelectual, licencias y regalías o compensaciones por explotación de recursos.'],
    ['1840', 'Servicios empresariales, profesionales y técnicos', 'Consultoría, asesoría, software, reparación y mantenimiento, entre otros. Incluye honorarios.'],
    ['1980', 'Seguros y reaseguros', 'Ingreso por seguros, reaseguros e indemnizaciones por pérdida total o parcial de bienes.'],
    ['1990', 'Remesas pagadas en moneda legal por servicios postales', 'Pago en moneda legal colombiana de remesas enviadas por concesionarios de servicios de correos.'],
    ['1991', 'Servicios financieros de correos en cuentas de compensación', 'Ingreso de divisas por remesas recibidas mediante concesionarios de servicios de correos.', 'Uso exclusivo de titulares de cuentas de compensación tradicional.'],
    ['5366', 'Compra de saldos de cuentas de compensación de Ecopetrol', 'Ingreso al IMC por compra de saldos de las cuentas de compensación de Ecopetrol.', 'Para Ecopetrol se refleja como egreso en el Formulario 10.'],
    ['5370', 'Compra de saldos de cuentas de compensación de la DTN', 'Ingreso al IMC por compra de saldos de cuentas de compensación de la DTN.', 'Para la DTN se refleja como egreso en el Formulario 10.'],
    ['5375', 'Operaciones de derivados, margen o prima', 'Ingreso de divisas por liquidación de contratos de derivados.'],
    ['5377', 'Transferencias presupuestales DTN-sector público', 'Ingreso por transferencias presupuestales entre las cuentas de compensación de la DTN y entidades públicas.', 'Uso exclusivo de titulares de cuentas de compensación tradicional.'],
    ['5378', 'Traslados entre cuentas del mismo titular', 'Ingreso por traslados entre cuentas de un mismo titular.', 'Uso exclusivo de titulares de cuentas de compensación tradicional.'],
    ['5379', 'Compra de saldos de cuentas de compensación del sector privado', 'Ingreso al IMC por compra de saldos de cuentas de compensación del sector privado.', 'Para el titular de la cuenta se refleja como egreso.'],
    ['5381', 'Compra de saldos en IMC - sector privado', 'Compra de saldos de cuentas de empresas y entidades privadas señaladas por el Anexo 3.', 'No utilizable por titulares de cuentas de compensación.'],
    ['5382', 'Compra de saldos de cuentas en el exterior - sector privado', 'Ingreso por compra de saldos de cuentas privadas en el exterior que no deban registrarse en el Banco de la República.'],
    ['5383', 'Compra de saldos en IMC - sector público', 'Compra de saldos en moneda extranjera de entidades públicas que presten servicios portuarios y aeroportuarios.', 'No utilizable por titulares de cuentas de compensación.'],
    ['5384', 'Compra de saldos de cuentas en el exterior - sector público', 'Ingreso por compra de saldos de cuentas públicas en el exterior que no deban registrarse en el Banco de la República.'],
    ['5385', 'Errores bancarios de cuenta de compensación', 'Ingreso de divisas por errores bancarios.', 'Uso exclusivo de titulares de cuentas de compensación tradicional.'],
    ['5386', 'Traslado entre administradores de activos en el exterior', 'Ingreso por traslado de recursos líquidos entre cuentas de compensación de administradores de activos en el exterior.', 'Uso exclusivo de titulares de cuentas de compensación tradicional.'],
    ['5387', 'Traslado desde cuenta del mercado no regulado', 'Ingreso por traslado desde la cuenta del mercado no regulado a la cuenta de compensación del mismo titular.', 'Uso exclusivo de titulares de cuentas de compensación tradicional.'],
    ['5390', 'Compra de saldos del resto del sector público', 'Ingreso al IMC por compra de saldos de cuentas de compensación del resto del sector público.', 'Para la entidad titular se refleja como egreso.'],
    ['5395', 'Compra de saldos de la Federación Nacional de Cafeteros', 'Ingreso al IMC por compra de saldos de cuentas de compensación de la Federación.', 'Para la Federación se refleja como egreso.'],
    ['5405', 'Operaciones overnight', 'Ingreso a cuentas de compensación del capital de inversiones overnight.', 'Uso exclusivo de titulares de cuentas de compensación tradicional.'],
    ['5450', 'Liquidación de derivados con la DTN', 'Ingreso por liquidación de contratos peso-divisa o divisa-divisa canalizados por cuentas de compensación con la DTN y contrapartes autorizadas.', 'El registro depende del rol de cada parte.'],
    ['5451', 'Liquidación de derivados con Ecopetrol', 'Ingreso por liquidación de contratos de derivados canalizados por cuentas de compensación con Ecopetrol y contrapartes autorizadas.', 'El registro depende del rol de cada parte.'],
    ['5452', 'Liquidación de derivados con la Federación Nacional de Cafeteros', 'Ingreso por liquidación de contratos canalizados por cuentas de compensación con la Federación y contrapartes autorizadas.', 'El registro depende del rol de cada parte.'],
    ['5453', 'Liquidación de derivados - sector privado', 'Ingreso por liquidación de contratos de derivados canalizados por cuentas de compensación con entidades privadas.', 'El registro depende del rol de cada parte.'],
    ['5454', 'Liquidación de derivados - resto del sector público', 'Ingreso por liquidación de contratos de derivados canalizados por cuentas de compensación con entidades públicas.', 'El registro depende del rol de cada parte.'],
    ['5455', 'Compra de divisas a proveedores de cobertura', 'Compra de divisas a agentes del exterior proveedores de cobertura por liquidación de derivados.', 'Uso exclusivo para agentes del exterior proveedores de cobertura.'],
    ['5457', 'Acreditación de cuentas de no residentes para crédito externo', 'Compra de divisas para acreditar cuentas en pesos de no residentes destinadas a crédito externo.', 'No utilizable por titulares de cuentas de compensación.'],
    ['5458', 'Venta de cartera a no residentes', 'Ingreso por venta en moneda extranjera a no residentes de cartera o instrumentos de pago de operaciones internas.'],
    ['5499', 'Redención de depósito en dólares', 'Compra por los IMC de dólares provenientes de la redención del depósito mencionado en el Anexo 3.'],
    ['1648', 'Ejecución de avales o garantías', 'Ingreso por ejecución de avales o garantías en moneda extranjera otorgados por residentes para operaciones diferentes de deuda.', 'Operación exclusiva de cuentas de compensación.'],
    ['3000', 'Cumplimiento de obligaciones derivadas de operaciones internas', 'Ingreso por cumplimiento de obligaciones derivadas de operaciones internas.', 'Operación exclusiva de cuentas de compensación.'],
    ['4063', 'Redención de inversiones constituidas por otras cuentas de compensación', 'Ingreso por liquidación de inversiones financieras constituidas a través de otras cuentas del mismo titular.', 'Operación exclusiva de cuentas de compensación.'],
    ['4064', 'Redención de inversiones constituidas a través de IMC', 'Ingreso por liquidación de inversiones financieras constituidas a través de IMC.', 'Operación exclusiva de cuentas de compensación.'],
    ['5380', 'Compra de divisas a otros titulares de cuentas de compensación', 'Ingreso por compra de divisas entre titulares de cuentas de compensación.', 'Operación exclusiva de cuentas de compensación.'],
    ['5456', 'Redención de depósito en dólares en cuenta de compensación', 'Ingreso de dólares a cuentas de compensación por redención del depósito referido en el Anexo 3.', 'Operación exclusiva de cuentas de compensación.'],
    ['5369', 'Intervención del Banco de la República con la DTN', 'Compra de divisas por el Banco de la República en operaciones de intervención con la DTN.', 'Uso exclusivo de la DTN.'],
    ['5388', 'Transferencias DTN-cuentas del mercado no regulado', 'Transferencias presupuestales entre cuentas de compensación de la DTN y cuentas del mercado no regulado del sector público.', 'Operación exclusiva de cuentas de compensación.']
  ],
  egresos: [
    ['2018', 'Compra de petróleo crudo y gas natural de producción nacional', 'Egreso para compra interna de petróleo crudo y gas natural de producción nacional.'],
    ['2016', 'Gastos de importación o exportación no incluidos en factura o declaración', 'Egreso por gastos adicionales de bienes importados o exportados, como fletes, seguros y comisiones, no incluidos en los documentos de la operación.'],
    ['2030', 'Servicios portuarios y de aeropuerto', 'Pago por servicios a buques y aviones, suministros, cargue, descargue, derechos, aeronavegación, mantenimiento y reparaciones.'],
    ['2040', 'Turismo', 'Egreso por turismo y pagos efectuados por empresas u organizaciones que prestan servicios turísticos. No incluye pasajes.'],
    ['2126', 'Intereses de financiación de importaciones - deuda privada IMC', 'Pago de intereses cuando la importación financiada no requiere informarse al Banco de la República.'],
    ['2136', 'Intereses de financiación de importaciones - proveedores no residentes', 'Pago de intereses de créditos de proveedores u otros no residentes cuando la importación no requiere informarse.'],
    ['2137', 'Intereses de financiación de importaciones - deuda pública', 'Pago de intereses cuando la importación financiada no requiere informarse al Banco de la República.'],
    ['2215', 'Intereses de deuda de la banca comercial', 'Pago de intereses corrientes o de mora de establecimientos de crédito por financiaciones autorizadas en moneda extranjera.', 'No utilizable por titulares de cuentas de compensación.'],
    ['2270', 'Servicios financieros', 'Comisiones por corretaje, asesoramiento, custodia y gestión de activos; incluye ciertos gastos bancarios. Excluye comisiones de endeudamiento externo.'],
    ['2621', 'Contratos de asociación - egreso', 'Egreso por traslados entre partes vinculadas a contratos de asociación.', 'Uso exclusivo de titulares de cuentas de compensación tradicional.'],
    ['2800', 'Servicios de comunicaciones', 'Pago por uso de redes para transmitir información, sonido, imagen, voz y datos; incluye servicios postales y de mensajería.'],
    ['2850', 'Comisiones no financieras', 'Pago por representación de empresas, intermediación y corretaje no financiero. No aplica a IMC ni a sociedades de servicios financieros.'],
    ['2895', 'Servicios culturales, artísticos y deportivos', 'Pago por servicios culturales, artísticos y deportivos prestados por extranjeros en Colombia.'],
    ['2896', 'Pasajes', 'Egreso por compra o venta de pasajes.'],
    ['2900', 'Viajes, educación, pagos laborales y seguridad social', 'Egreso por viajes de negocios, educación, pagos laborales a no residentes y pagos de seguridad social en el exterior.'],
    ['2903', 'Marcas, patentes, regalías y compensaciones', 'Pago por uso de intangibles, propiedad intelectual, licencias, software y regalías o compensaciones por explotación de recursos.'],
    ['2904', 'Otros conceptos', 'Solo para egresos no descritos en otro numeral; incluye algunos gastos de oficinas en el exterior, mudanzas y tarjetas internacionales.'],
    ['2905', 'Venta a residentes que comercian divisas profesionalmente', 'Venta de divisas a residentes que compran y venden divisas de manera profesional.', 'No utilizable por titulares de cuentas de compensación.'],
    ['2906', 'Servicios empresariales, profesionales y técnicos', 'Pago por consultoría, asesoría, software, reparación y mantenimiento, entre otros. Incluye honorarios.'],
    ['2907', 'Servicios diplomáticos, consulares y organismos internacionales', 'Egresos relacionados con embajadas, consulados, organismos internacionales y la instalación de sus representantes.'],
    ['2908', 'Comercialización de mercancías de usuarios de zona franca', 'Egreso para compra de mercancías de zona franca que no se consideran importación según las normas aduaneras.'],
    ['2909', 'Transporte por tubería de petróleo crudo y gas natural', 'Egreso por el pago del servicio de transporte por tubería.'],
    ['2910', 'Donaciones, transferencias y remesas sin contraprestación', 'Egreso por donaciones, transferencias y remesas de trabajadores no residentes que no generan contraprestación.'],
    ['2911', 'Emisión y colocación de bonos en moneda legal colombiana', 'Egreso por emisión y colocación de bonos en moneda legal colombiana.', 'No aplicable a cuentas de compensación.'],
    ['2912', 'Valores extranjeros inscritos en el RNVE', 'Egreso para adquisición por no residentes de valores extranjeros emitidos en el exterior e inscritos en el RNVE.', 'No utilizable por titulares de cuentas de compensación.'],
    ['2913', 'Servicios médicos, quirúrgicos y hospitalarios', 'Egreso por atención médica, quirúrgica u hospitalaria prestada a colombianos por no residentes, incluidos medicamentos.'],
    ['2914', 'Suscripciones, afiliaciones y aportes periódicos', 'Egreso por suscripciones, cuotas de afiliación y aportes periódicos por membresía.'],
    ['2915', 'Compra de mercancías no consideradas importación', 'Egreso por mercancías que no se consideran importación según las normas aduaneras.'],
    ['2916', 'Arrendamiento operativo', 'Pago por arrendamiento no financiero de naves, aeronaves, maquinaria y otros equipos.'],
    ['2917', 'Servicios de publicidad', 'Egreso por publicidad comercial, investigación de mercados, encuestas y diseño o comercialización de publicidad.'],
    ['2918', 'Valores extranjeros inscritos en el RNVE - Decreto 4804', 'Egreso relacionado con valores emitidos por entidades extranjeras e inscritos en el RNVE.'],
    ['2950', 'Seguros y reaseguros', 'Egreso por seguros, reaseguros e indemnizaciones por pérdida total o parcial de bienes.'],
    ['2990', 'Remesas pagadas en moneda legal por servicios postales', 'Egreso de remesas en moneda legal colombiana enviadas por concesionarios de servicios de correos.'],
    ['2991', 'Servicios financieros de correos en cuentas de compensación', 'Egreso de divisas por remesas enviadas mediante concesionarios de servicios de correos.', 'Uso exclusivo de titulares de cuentas de compensación tradicional.'],
    ['2992', 'Reembolso de remesas desde cuentas de ahorro simplificadas', 'Egreso de remesas desde cuentas de ahorro de trámite simplificado de colombianos no residentes.'],
    ['4650', 'Afiliación y cuotas a organismos internacionales', 'Pago de afiliación, inscripción o sostenimiento en organismos multilaterales por la DTN.'],
    ['5896', 'Venta de divisas para cuenta de compensación de Ecopetrol', 'Egreso del IMC para consignar divisas en la cuenta de compensación de Ecopetrol.', 'Para Ecopetrol se refleja como ingreso.'],
    ['5897', 'Venta de divisas para cuenta de la Federación Nacional de Cafeteros', 'Egreso del IMC para consignar divisas en la cuenta de la Federación.', 'Para la Federación se refleja como ingreso.'],
    ['5900', 'Venta de divisas para cuenta de compensación de la DTN', 'Egreso del IMC para consignar divisas en la cuenta de compensación de la DTN.', 'Para la DTN se refleja como ingreso.'],
    ['5908', 'Venta de divisas para cuentas de compensación del sector privado', 'Egreso del IMC para consignar divisas en cuentas de compensación del sector privado.', 'Para el titular se refleja como ingreso.'],
    ['5910', 'Operaciones de derivados, margen o prima', 'Egreso de divisas por liquidación de contratos de derivados.'],
    ['5911', 'Transferencias presupuestales DTN-sector público', 'Egreso por transferencias presupuestales entre cuentas de compensación de la DTN y entidades públicas.', 'Uso exclusivo de titulares de cuentas de compensación.'],
    ['5912', 'Traslados entre cuentas del mismo titular', 'Egreso por traslados entre cuentas de un mismo titular.', 'Uso exclusivo de titulares de cuentas de compensación.'],
    ['5913', 'Depósitos en entidades financieras del exterior - sector privado', 'Egreso para abrir o acreditar cuentas privadas en el exterior que no deban registrarse en el Banco de la República.', 'No utilizable por titulares de cuentas de compensación.'],
    ['5914', 'Traslado entre administradores de activos en el exterior', 'Egreso por traslado de recursos líquidos entre cuentas de compensación de administradores de activos en el exterior.', 'Uso exclusivo de titulares de cuentas de compensación.'],
    ['5915', 'Errores bancarios de cuenta de compensación', 'Egreso de divisas por errores bancarios.', 'Uso exclusivo de titulares de cuentas de compensación.'],
    ['5916', 'Depósitos en entidades financieras del exterior - sector público', 'Egreso para abrir o consignar en cuentas públicas en el exterior que no deban registrarse en el Banco de la República.', 'No utilizable por titulares de cuentas de compensación.'],
    ['5917', 'Traslado a cuenta del mercado no regulado', 'Egreso desde la cuenta de compensación a la cuenta del mercado no regulado del mismo titular.', 'Uso exclusivo de titulares de cuentas de compensación.'],
    ['5920', 'Venta de divisas para cuentas del resto del sector público', 'Egreso del IMC para consignar divisas en cuentas de compensación del resto del sector público.', 'Para la entidad titular se refleja como ingreso.'],
    ['5930', 'Operaciones overnight', 'Egreso de cuentas de compensación para constituir inversiones overnight.', 'Operación exclusiva de cuentas de compensación.'],
    ['5800', 'Liquidación de derivados con la DTN', 'Egreso por liquidación de derivados peso-divisa o divisa-divisa canalizados mediante cuentas de compensación con la DTN.', 'El registro depende del rol de cada parte.'],
    ['5801', 'Liquidación de derivados con Ecopetrol', 'Egreso por liquidación de derivados canalizados mediante cuentas de compensación con Ecopetrol.', 'El registro depende del rol de cada parte.'],
    ['5802', 'Liquidación de derivados con la Federación Nacional de Cafeteros', 'Egreso por liquidación de derivados canalizados mediante cuentas de compensación con la Federación.', 'El registro depende del rol de cada parte.'],
    ['5803', 'Liquidación de derivados - sector privado', 'Egreso por liquidación de derivados canalizados mediante cuentas de compensación con entidades privadas.', 'El registro depende del rol de cada parte.'],
    ['5804', 'Liquidación de derivados - resto del sector público', 'Egreso por liquidación de derivados canalizados mediante cuentas de compensación con entidades públicas.', 'El registro depende del rol de cada parte.'],
    ['5805', 'Venta de divisas a proveedores de cobertura', 'Venta de divisas a agentes del exterior proveedores de cobertura por liquidación de derivados.', 'Uso exclusivo para agentes del exterior proveedores de cobertura.'],
    ['5806', 'Débito de cuentas de no residentes para crédito externo', 'Venta de divisas para debitar cuentas en pesos de no residentes destinadas a operaciones de crédito externo.', 'No utilizable por titulares de cuentas de compensación.'],
    ['5807', 'Pago a no residentes de cartera u otros instrumentos internos', 'Pago en moneda extranjera a no residentes de cartera o instrumentos de pago de operaciones internas.'],
    ['3500', 'Cumplimiento de obligaciones derivadas de operaciones internas', 'Egreso para cumplimiento de obligaciones derivadas de operaciones internas.', 'Operación exclusiva de cuentas de compensación.'],
    ['5909', 'Venta de divisas a otros titulares de cuentas de compensación', 'Egreso por venta de divisas entre titulares de cuentas de compensación.', 'Operación exclusiva de cuentas de compensación.'],
    ['5921', 'Constitución de depósito en dólares', 'Traslado de dólares desde cuentas de compensación al IMC para constituir el depósito referido en el Anexo 3.', 'Operación exclusiva de cuentas de compensación.'],
    ['5899', 'Intervención del Banco de la República con la DTN', 'Venta de divisas al Banco de la República por operaciones de intervención con la DTN.', 'Uso exclusivo de la DTN.'],
    ['5918', 'Transferencias DTN-cuentas del mercado no regulado', 'Transferencias presupuestales entre cuentas de compensación de la DTN y cuentas del mercado no regulado del sector público.', 'Operación exclusiva de cuentas de compensación.']
  ]
};

const listaNumerales = document.getElementById('listaNumerales');
const numeralCount = document.getElementById('numeralCount');
const buscarNumeral = document.getElementById('buscarNumeral');
const direccionOperacion = document.getElementById('direccionOperacion');
const numeralOperacion = document.getElementById('numeralOperacion');
const detalleNumeral = document.getElementById('detalleNumeral');
const serviceForm = document.getElementById('serviceForm');
const formularioGenerado = document.getElementById('formularioGenerado');
const datosGenerados = document.getElementById('datosGenerados');
let direccionCatalogo = 'ingresos';

function renderNumerales() {
  if (!listaNumerales || !numeralCount || !buscarNumeral) return;

  const search = buscarNumeral.value.trim().toLocaleLowerCase('es');
  const filtered = numeralesServicios[direccionCatalogo].filter((item) =>
    item.join(' ').toLocaleLowerCase('es').includes(search)
  );

  listaNumerales.replaceChildren();
  numeralCount.textContent = `${filtered.length} numerales de ${direccionCatalogo}.`;

  filtered.forEach(([codigo, titulo, descripcion, nota]) => {
    const article = document.createElement('article');
    article.className = 'numeral-item';
    const heading = document.createElement('h3');
    heading.textContent = `${codigo} · ${titulo}`;
    const description = document.createElement('p');
    description.textContent = descripcion;
    article.append(heading, description);

    if (nota) {
      const note = document.createElement('p');
      note.className = 'numeral-restriction';
      note.textContent = nota;
      article.appendChild(note);
    }

    listaNumerales.appendChild(article);
  });

  if (!filtered.length) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'empty-results';
    emptyMessage.textContent = 'No hay resultados para esa búsqueda.';
    listaNumerales.appendChild(emptyMessage);
  }
}

function updateNumeralOptions() {
  const direction = direccionOperacion.value;
  numeralOperacion.replaceChildren();
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = direction ? 'Seleccione el numeral' : 'Primero seleccione ingreso o egreso';
  numeralOperacion.appendChild(placeholder);
  numeralOperacion.disabled = !direction;

  (numeralesServicios[direction] || []).forEach(([codigo, titulo]) => {
    const option = document.createElement('option');
    option.value = codigo;
    option.textContent = `${codigo} · ${titulo}`;
    numeralOperacion.appendChild(option);
  });

  const isExpense = direction === 'egresos';
  const informacionDian = document.getElementById('informacionDian');
  if (informacionDian) informacionDian.hidden = !isExpense;
  ['beneficiarioExterior', 'ciudadExterior', 'paisExterior'].forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) field.required = isExpense;
  });
  detalleNumeral.textContent = 'Al seleccionar un numeral aparecerá aquí su descripción.';
}

document.querySelectorAll('.direction-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    direccionCatalogo = tab.dataset.direction;
    document.querySelectorAll('.direction-tab').forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    renderNumerales();
  });
});

if (buscarNumeral) {
  buscarNumeral.addEventListener('input', renderNumerales);
}

if (listaNumerales) {
  renderNumerales();
}

if (direccionOperacion) {
  direccionOperacion.addEventListener('change', updateNumeralOptions);
  const params = new URLSearchParams(window.location.search);
  const initialDirection = params.get('direccion');
  if (['ingresos', 'egresos'].includes(initialDirection)) {
    direccionOperacion.value = initialDirection;
    updateNumeralOptions();
    const initialNumeral = params.get('numeral');
    if ((numeralesServicios[initialDirection] || []).some(([codigo]) => codigo === initialNumeral)) {
      numeralOperacion.value = initialNumeral;
      numeralOperacion.dispatchEvent(new Event('change'));
    }
  }
}

if (numeralOperacion) numeralOperacion.addEventListener('change', () => {
  const selected = (numeralesServicios[direccionOperacion.value] || []).find(([codigo]) => codigo === numeralOperacion.value);
  if (!selected) {
    detalleNumeral.textContent = 'Al seleccionar un numeral aparecerá aquí su descripción.';
    return;
  }

  const [, titulo, descripcion, nota] = selected;
  detalleNumeral.replaceChildren();
  const heading = document.createElement('strong');
  heading.textContent = `${numeralOperacion.value} · ${titulo}`;
  const detail = document.createElement('span');
  detail.textContent = descripcion;
  detalleNumeral.append(heading, detail);
  if (nota) {
    const note = document.createElement('span');
    note.className = 'numeral-restriction';
    note.textContent = nota;
    detalleNumeral.appendChild(note);
  }
});

if (serviceForm) serviceForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!serviceForm.reportValidity()) return;

  const formValues = new FormData(serviceForm);
  const selected = (numeralesServicios[direccionOperacion.value] || []).find(([codigo]) => codigo === numeralOperacion.value);
  const labels = {
    direccionOperacion: 'Operación de',
    fechaOperacion: 'Fecha de la operación',
    tipoIdentificacion: 'Tipo de identificación',
    identificacion: 'Identificación',
    nombreCliente: 'Nombre',
    telefonoCliente: 'Teléfono',
    direccionCliente: 'Dirección',
    ciudadCliente: 'Ciudad',
    codigoMonedaGiro: 'Código de moneda giro/reintegro',
    valorMonedaGiro: 'Valor en moneda de giro/reintegro',
    valorNumeralUsd: 'Valor USD',
    tipoCambioDolar: 'Tipo de cambio a dólar',
    beneficiarioExterior: 'Nombre de quien gira o recibe divisas en el exterior',
    ciudadExterior: 'Ciudad de origen o destino de divisas',
    paisExterior: 'País de origen o destino de divisas',
    observaciones: 'Observaciones',
    nombreDeclarante: 'Nombre del declarante'
  };

  datosGenerados.replaceChildren();
  Object.entries(labels).forEach(([name, label]) => {
    const value = formValues.get(name);
    if (!value) return;
    const term = document.createElement('dt');
    term.textContent = label;
    const description = document.createElement('dd');
    description.textContent = value;
    datosGenerados.append(term, description);
  });

  const [codigo, titulo, descripcion, nota] = selected;
  const term = document.createElement('dt');
  term.textContent = 'Numeral cambiario';
  const value = document.createElement('dd');
  value.textContent = `${codigo} · ${titulo}. ${descripcion}${nota ? ` Nota: ${nota}` : ''}`;
  datosGenerados.append(term, value);
  formularioGenerado.hidden = false;
  formularioGenerado.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const imprimirFormulario = document.getElementById('imprimirFormulario');
if (imprimirFormulario) imprimirFormulario.addEventListener('click', () => window.print());
