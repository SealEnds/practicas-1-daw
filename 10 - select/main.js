


function get(id) {
    return document.getElementById(id);
}

function getAll(clase) {
    return document.querySelectorAll('.' + clase);
}

let characters_count = 0;
let charactersArray = [];
let characters_team1 = ['wargreymon', 'valkyrimon', 'kabuterimon', 'saberleomon', 'phoenixmon', 'seraphimon'];
let characters_team2 = ['piedmon', 'ancientvolcmon', 'myotismon', 'mugendramon', 'plesiomon'];
let selected_character = 0;
let character_name = get('name');
let img = get('img');
let equipo_1_div = get('equipo-1');
let equipo_2_div = get('equipo-2');
let select_1 = get('list-1');
let select_2 = get('list-2');
let mover_a_1 = get('mover-a-1');
let mover_a_2 = get('mover-a-2');

/* crear objetos de personaje y sumar al identificador 1 */
function newCharacter() {
    var new_character = new Character();
    charactersArray.push(new_character);
    characters_count++;
    console.log(charactersArray);
}

function assignCharacters(element, team) {
     //asignar al objeto el valor de nombre guardado en el array en esta iteracion del forEach, la imagen y el equipo
    selected_character = characters_count; 
    newCharacter();
    charactersArray[selected_character].setName(element);
    charactersArray[selected_character].setImg('assets/img/digimon-' + element + '.gif');
    charactersArray[selected_character].setTeam(team);
    /* colocar en tablero */
    placeCharacters();
}

function selectInput() {
    /* Volver a reiniciar array al cambiar un personaje de equipo. */
    charactersArray = [];
    characters_count = 0;
    characters_team1.forEach(element => {
        let team = 1;
        assignCharacters(element, team);
    });
    characters_team2.forEach(element => {
        let team = 2;
        assignCharacters(element, team);
    });
}
selectInput();
/* colocar las opciones en en select */
function selectInputUpdate(team_select, character_name) {
    if (team_select == 1) {
        select_1.innerHTML += `<option value="${character_name}">${character_name}</option>`;
    } else if (team_select == 2) {
        select_2.innerHTML += `<option value="${character_name}">${character_name}</option>`;
    }
}
/* colocar personajes en tablero */
function placeCharacters() {
    let team = charactersArray[characters_count - 1].getTeam();
    let img = charactersArray[characters_count - 1].getImg();
    let character_name = charactersArray[characters_count - 1].getName();
    if (team == 1) {
        equipo_1_div.innerHTML += `<div><img class="img-1" src="${img}" /></div>`;
        selectInputUpdate(team, character_name);
    } else if (team == 2) {
        equipo_2_div.innerHTML += `<div><img class="img-2" src="${img}" /></div>`;
        selectInputUpdate(team, character_name);
    }
}

/* botones elegir equipo. Colcar personaje en equipo 1 o 2 */
let selection_buttons = getAll('selection-button');
selection_buttons.forEach(element => {
    element.addEventListener('click', () => {
        let team = element.id.split('-')[1];
        let character_name_input_value = character_name.value;
        /* colocar en array de equipo */
        if (team == 1) {
            characters_team1.push(character_name_input_value);
        } else if (team == 2) {
            characters_team2.push(character_name_input_value);
        }
        /* crear personaje */
        selected_character = characters_count;
        newCharacter();
        charactersArray[selected_character].setName(character_name_input_value);
        charactersArray[selected_character].setImg('assets/img/digimon-' + character_name_input_value + '.gif');
        charactersArray[selected_character].setTeam(team);
        /* colocar personaje en tablero */
        placeCharacters();
    });
});

/* Constructor */
function Character() {
    this.index = characters_count;
    this.nombre = null;
    this.img = null;
    this.team = null;
    this.setName = setName;
    this.setImg = setImg;
    this.setTeam = setTeam;
    this.getName = getName;
    this.getImg = getImg;
    this.getTeam = getTeam;
}

/* Getter y Setter */
function setName(character) { this.nombre = character; }
function getName() { return this.nombre }

function setImg(image) { this.img = image; }
function getImg() { return this.img; }

function setTeam(team) { this.team = team; }
function getTeam() { return this.team; }


/* Mover personajes de equipo */
mover_a_1.addEventListener('click', () => {
    console.log(select_2.value);
    if (select_2.value != 'undefined' && select_2.value != '') {
        characters_team1.push(select_2.value);
        characters_team2.splice(characters_team2.indexOf(select_2.value), 1);
        clear(); //borrar innerHTML de personajes y select
        selectInput();
    }

});
mover_a_2.addEventListener('click', () => {
    console.log(select_1.value);
    if (select_1.value != 'undefined' && select_1.value != '') {
        console.log("hola");
        characters_team2.push(select_1.value);
        characters_team1.splice(characters_team1.indexOf(select_1.value), 1);
        clear();
        selectInput();
    }
});


function clear() {
    select_1.innerHTML = '';
    select_2.innerHTML = '';
    equipo_1_div.innerHTML = '';
    equipo_2_div.innerHTML = '';
}


/* reproducir música */
let play = true;
let audio = get('audio');
document.addEventListener('click', () => {
    if(play = true){
        audio.play();
        play = false;
    }
});