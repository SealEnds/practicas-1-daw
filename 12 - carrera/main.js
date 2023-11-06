


function get(id) {
    return document.getElementById(id);
}

function getAll(clase) {
    return document.querySelectorAll('.' + clase);
}

let characters_count = 0;
let charactersArray = [];
let selected_character = 0;
let character_name = get('name');
let img = get('img');
let salida = get('salida');
let altoPantalla = window.screen.availHeight - 200;
let anchoPantalla = window.screen.availWidth;
let intervals = [];
let auto = false;

/* crear objetos de personaje y sumar al identificador 1 */
function newCharacter() {
    var new_character = new Character();
    charactersArray.push(new_character);
    characters_count++;
    console.log(charactersArray);
}

/* colocar personajes en tablero */
function placeCharacters() {
    let character = charactersArray[characters_count - 1];
    let id = character.index;
    let img = character.img;
    let character_name = character.nombre;
    let top = character.y;
    let x = character.x;
    salida.innerHTML += `<div id="div_${id}" class="corredores" style="top: ${top}px" onclick="cambiarEstado(${id});" ><img id="img-${id}" class="img-1" src="${img}" /></div>`;
    // selectInputUpdate(character_name);

    /* solucionar error paran al añadir */
    stopAll();
    if (auto == true) {
        cambiarEstado(id);
    }
}

/* botones elegir equipo. Colcar personaje en equipo 1 o 2 */
let selection_buttons = getAll('selection-button');
selection_buttons.forEach(element => {
    element.addEventListener('click', () => {
        let character_name_input_value = character_name.value;
        /* colocar en array de equipo */
        /* crear personaje */
        added_character = characters_count;
        newCharacter();
        charactersArray[added_character].nombre = character_name_input_value;
        charactersArray[added_character].img = charactersArray[added_character].imgParado;
        /* colocar personaje en tablero */
        placeCharacters();

    });
});

/* Constructor */
function Character() {
    this.index = characters_count;
    this.nombre = null;
    this.img = null;
    this.imgParado = 'assets/img/turtle-still.gif';
    this.imgCorriendo = 'assets/img/turtle-running.gif';
    this.velocidad = 1;
    this.y = setInitialPostion();
    this.x = 10;
    this.corredorCorriendo = false;
}


function setInitialPostion(image) {
    return Math.floor(Math.random() * (altoPantalla - 100) + 100);
}

function clear() {
    select_1.innerHTML = '';
    salida.innerHTML = '';
}

/* Mover personajes al hacer click */

function cambiarEstado(id) {
    let div_id = `div_${id}`;
    let div = get(div_id);
    let corredor = charactersArray[id];
    if (corredor.corredorCorriendo == false) {
        run(div, div_id, corredor);
        corredor.corredorCorriendo = true;
        corredor.img = corredor.imgCorriendo;
        div.innerHTML = `<img id="img-${id}" class="img-2" src="${corredor.img}" />`;
    } else {
        stop(div_id);
        corredor.corredorCorriendo = false;
        corredor.img = corredor.imgParado;
        div.innerHTML = `<img id="img-${id}" class="img-1" src="${corredor.img}" /><p class="coords">X-${corredor.x} Y-${corredor.y}</p>`;
    }
}

function run(div, div_id, corredor) {

    intervals[div_id] = setInterval(() => {
        corredor.x += corredor.velocidad;
        if(corredor.x > anchoPantalla) corredor.x = 10;
        div.style.left = corredor.x + 'px';
    }, 10);
}
function stop(div_id) {
    clearInterval(intervals[div_id]);
}

/* solucionar error al añadir se paran los que se movían */
function stopAll() {
    charactersArray.forEach(element => {
        element.corredorCorriendo = true;
        cambiarEstado(element.index);
        if (element.x > 10 && auto == true) {
            cambiarEstado(element.index);
        }
    });
}

/* Salir todos a la vez */
let todos = get('todos');
let modo_todos = "salir";
todos.addEventListener('click', () => {
    if (modo_todos == "salir") {
        charactersArray.forEach(element => {
            element.corredorCorriendo = false;
            cambiarEstado(element.index);
        });
        todos.value = "Parar todo";
        modo_todos = "parar";
        auto = true;
    } else {
        charactersArray.forEach(element => {
            element.corredorCorriendo = true;
            cambiarEstado(element.index);
        });
        todos.value = "Seguir todo";
        modo_todos = "salir";
        auto = false;
    }
});


/* más velocidad */
let mas_velocidad = get('velocidad');
velocidad.addEventListener('click', () => {
    charactersArray.forEach(element => {
        element.velocidad *= 2;
    });
});
