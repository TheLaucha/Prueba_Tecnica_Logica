const prompt = require("prompt-sync")()

const FILAS = 10
const ASIENTOS = 10
const FINALIZAR = "si"

let mapaDeAsientos = []

function cargarMapaDeAsientos() {
  for (let i = 0; i < FILAS; i++) {
    let fila = []
    for (let j = 0; j < ASIENTOS; j++) {
      fila.push("L")
    }
    mapaDeAsientos.push(fila)
  }
}

cargarMapaDeAsientos()

function mostrarMapaDeAsientos() {
  for (let i = 0; i < FILAS; i++) {
    let str = "FILA #" + `${i + 1}` + ": "
    for (let j = 0; j < ASIENTOS; j++) {
      str += mapaDeAsientos[i][j] + " "
    }
    console.log(str)
  }
}

console.log("==== BIENVENID@ AL SISTEMA DE RESERVAS ====")

let sigo = true
do {
  let msj = prompt("Desea ver los asientos disponibles ? S: Si. Cualquier otra tecla: No")

  if (msj.toLowerCase() == "s") {
    mostrarMapaDeAsientos()
  }

  solicitar()

  sigo = deseaContinuar()
} while (sigo)

function solicitar() {
  let fila = solicitarFila() - 1
  let asiento = solicitarAsiento() - 1

  let estaLibre = validarSiEstaLibre(fila, asiento)

  if (estaLibre) {
    mapaDeAsientos[fila][asiento] = "X"
    console.log("Asiento reservado exitosamente!")
  } else {
    console.log("ESE ASIENTO YA SE ENCUENTRA RESERVADO, POR FAVOR SELECCIONE OTRO.")
  }
}

function solicitarFila() {
  let fila = parseInt(prompt("Ingrese una fila entre 1 y " + FILAS + ": "))

  if (isNaN(fila) || fila < 1 || fila > FILAS) {
    console.log("Fila invalida, Ingrese una fila entre 1 y " + FILAS + ": ")
    return solicitarFila()
  }

  return fila
}

function solicitarAsiento() {
  let asiento = parseInt(prompt("Ingrese un asiento entre 1 y " + ASIENTOS + ": "))

  if (isNaN(asiento) || asiento < 1 || asiento > ASIENTOS) {
    console.log("Asiento invalido, Ingrese un asiento entre 1 y " + ASIENTOS + ": ")
    return solicitarAsiento()
  }

  return asiento
}

function validarSiEstaLibre(fila, asiento) {
  let libre = false
  if (mapaDeAsientos[fila][asiento] == "L") {
    libre = true
  }

  return libre
}

function deseaContinuar() {
  let continuo = true

  let consulta = prompt(
    "Desde realizar otra reserva ? S: si. Cualquier otra letra: No "
  ).toLowerCase()

  if (consulta !== "s") {
    continuo = false
  }

  return continuo
}
