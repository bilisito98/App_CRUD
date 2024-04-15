// Lista de docentes (inicialmente vacía)
let docentes = [];

// Función para agregar un docente a la lista
function agregarDocente(docente) {
  docentes.push(docente);
  mostrarDocentes();
}

// Función para actualizar un docente en la lista
function actualizarDocente(index, nuevoDocente) {
  docentes[index] = nuevoDocente;
  mostrarDocentes();
}

// Función para eliminar un docente de la lista
function eliminarDocente(index) {
  docentes.splice(index, 1);
  mostrarDocentes();
}

// Función para mostrar la lista de docentes en la interfaz
function mostrarDocentes() {
  const listaDocentes = document.getElementById('docentes-list');
  listaDocentes.innerHTML = '';
  docentes.forEach((docente, index) => {
    const item = document.createElement('div');
    item.classList.add('docente-item');
    item.innerHTML = `
      <p>${docente.nombre} ${docente.apellido}</p>
      <p>Tipo Documento: ${docente.tipoDocumento}</p>
      <p>Fecha Nacimiento: ${docente.fechaNacimiento}</p>
      <p>Salario: ${docente.salario}</p>
      <button onclick="editarDocente(${index})">Editar</button>
      <button onclick="eliminarDocente(${index})">Eliminar</button>
    `;
    listaDocentes.appendChild(item);
  });
}

// Función para limpiar el formulario
function limpiarFormulario() {
  document.getElementById('docente-form').reset();
}

// Función para manejar el envío del formulario (agregar o actualizar docente)
document.getElementById('docente-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const tipoDocumento = document.getElementById('tipoDocumento').value;
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const fechaNacimiento = document.getElementById('fechaNacimiento').value;
  const nivelEstudios = document.getElementById('nivelEstudios').value;
  const areaPertenencia = document.getElementById('areaPertenencia').value;
  const grado = document.getElementById('grado').value;
  const eps = document.getElementById('eps').value;
  const salario = document.getElementById('salario').value;

  const docente = {
    tipoDocumento,
    nombre,
    apellido,
    fechaNacimiento,
    nivelEstudios,
    areaPertenencia,
    grado,
    eps,
    salario
  };

  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn.innerText === 'Agregar/Actualizar Docente') {
    agregarDocente(docente);
  } else {
    const docenteIndex = submitBtn.dataset.index;
    actualizarDocente(docenteIndex, docente);
    submitBtn.innerText = 'Agregar/Actualizar Docente';
    submitBtn.removeAttribute('data-index');
  }
  
  limpiarFormulario();
});

// Función para editar un docente
function editarDocente(index) {
  const docente = docentes[index];
  document.getElementById('tipoDocumento').value = docente.tipoDocumento;
  document.getElementById('nombre').value = docente.nombre;
  document.getElementById('apellido').value = docente.apellido;
  document.getElementById('fechaNacimiento').value = docente.fechaNacimiento;
  document.getElementById('nivelEstudios').value = docente.nivelEstudios;
  document.getElementById('areaPertenencia').value = docente.areaPertenencia;
  document.getElementById('grado').value = docente.grado;
  document.getElementById('eps').value = docente.eps;
  document.getElementById('salario').value = docente.salario;

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.innerText = 'Actualizar Docente';
  submitBtn.dataset.index = index;
}

// Mostrar docentes al cargar la página
mostrarDocentes();
