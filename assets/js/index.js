const listaTareas = document.querySelector(".tareas__lista");
const inputTarea = document.querySelector(".form__input");
const addTarea = document.querySelector(".form__add");
const totalTareas = document.querySelector(".resumen__total");
const totalDone = document.querySelector(".resumen__done");
const tareas = [];

function updateResumen() {
  updateTotal();
  updateRealizadas();
}

function updateTotal() {
  totalTareas.innerHTML = `Total : ${tareas.length}`;
}

function updateRealizadas() {
  const tareasDone = tareas.filter((ele) => {
    return ele.estado === true;
  });
  totalDone.innerHTML = `Realizadas: ${tareasDone.length}`;
}

//Valores iniciales en nuestro resumen
updateResumen();

function borrar(id) {
  const index = tareas.findIndex((ele) => ele.id == id);
  tareas.splice(index, 1);
  /* Actualizamos la información en el HTML */
  renderTareas();
  updateResumen();
}

function update(id) {
  //Busco el elemento de mi arreglo a través del índice
  const index = tareas.findIndex((ele) => ele.id == id);
  tareas[index].estado = !tareas[index].estado;
  updateRealizadas();
  renderTareas();
}

function renderTareas() {
  let html = "";
  for (let tarea of tareas) {
    let estado = tarea.estado;
    if (estado) {
      html += `<li>${tarea.nombre} <input checked type="checkbox" onclick="update(${tarea.id})"}> <button onclick="borrar(${tarea.id})"> x </button></li>`;
    } else {
      html += `<li>${tarea.nombre} <input type="checkbox" onclick="update(${tarea.id})"}> <button onclick="borrar(${tarea.id})"> x </button></li>`;
    }
  }
  listaTareas.innerHTML = html;
}

addTarea.addEventListener("click", () => {
  const nuevaTarea = {
    id: Date.now(),
    nombre: inputTarea.value,
    estado: false,
  };
  tareas.push(nuevaTarea);
  inputTarea.value = "";

  renderTareas();
  updateResumen();
});
