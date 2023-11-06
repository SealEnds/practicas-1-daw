
window.onload = () => {
    let propiedades = {
        'color': {
            'value': 'black',
            'min': '0',
            'max': '255'
        },
        'fontFamily': {
            'value': 'sans-serif',
            'radio': ['sans-serif', 'arial', 'Franklin Gothic Medium', 'Trebuchet MS', 'Felona']
        },
        'fontSize': {
            'value': '20px',
            'min': '1',
            'max': '60',
            'um': 'px'
        },
        'fontWeight': {
            'value': '600',
            'min': '100',
            'max': '900',
            'um': ''
        },
        'fontStyle': {
            'value': 'italic',
            'radio': ['italic', 'normal']
        },
        'fontVariant': {
            'value': 'normal',
            'radio': ['normal', 'small-caps']
        },
        'textAlign': {
            'value': 'left',
            'radio': ['left', 'center', 'right', 'justify']
        },
        'lineHeight': {
            'value': '20px',
            'min': '1',
            'max': '100',
            'um': 'px'
        },
        'textDecoration': {
            'value': 'underline',
            'radio': ['underline', 'overline', 'none']
        },
        'textTransform': {
            'value': 'uppercase',
            'radio': ['uppercase', 'lowercase', 'capitalize']
        },
        'verticalAlign': {
            'value': 'bottom',
            'radio': ['bottom', 'center', 'top']
        },
        'textIndent': {
            'value': '20px',
            'min': '1',
            'max': '500',
            'um': 'px'
        },
        'letterSpacing': {
            'value': '5px',
            'min': '1',
            'max': '30',
            'um': 'px'
        },
        'wordSpacing': {
            'value': '20px',
            'min': '1',
            'max': '50',
            'um': 'px'
        },
        'whiteSpace': {
            'value': 'normal',
            'radio': ['normal', 'nowrap']
        }
    }

    let min_inicial = '';
    let max_inicial = '';

    let contenedor = document.getElementById('main');
    let aside = document.getElementById('aside');

    function writeHTML(propiedad, control, value, min, max) {
        let control_html = '';
        if (control == 'range') {
            control_html = '<input type="range" name="range" class="range" id="' + propiedad + '-range" min="' + min + '" max="' + max + '" /><span id="' + propiedad + '-span">' + value + '</span>';
            if (propiedad != 'fontWeight') {
                control_html += '<span id="' + propiedad + '-um" style="margin-left: 10px;">px</span><input class="um" type="radio" name="' + propiedad + '-um-radio" id="' + propiedad + '-um-px" checked />';
                control_html += '<span id="' + propiedad + '-um">%</span><input class="um" type="radio" name="' + propiedad + '-um-radio" id="' + propiedad + '-um-%" />';
            }
        } else if (control == 'radio') {
            for (opcion in propiedades[propiedad]['radio']) {

                if (opcion == 0) {
                    control_html += '<label for="' + propiedad + '-' + propiedades[propiedad]['radio'][opcion] + '-radio">' + propiedades[propiedad]['radio'][opcion] + '</label><input type="radio" name="' + propiedad + '-radio" class="radio" id="' + propiedad + '-' + propiedades[propiedad]['radio'][opcion] + '-radio" checked />';
                } else {
                    control_html += '<label for="' + propiedad + '-' + propiedades[propiedad]['radio'][opcion] + '-radio" >' + propiedades[propiedad]['radio'][opcion] + '</label><input type="radio" name="' + propiedad + '-radio" class="radio" id="' + propiedad + '-' + propiedades[propiedad]['radio'][opcion] + '-radio" />';
                }

            }
        } else if (control = 'color') {
            control_html = '<input type="color" name="color" class="color" id="' + propiedad + '-color" />';
        }
        let html = [
            '<div class="propiedades">',
            '<h3 id="' + propiedad + '-title">' + propiedad + '</h3>',
            '<div class="controller">' + control_html + '</div>',
            '<div class="p"><p id="' + propiedad + '-texto" class="texto">Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut varius ullamcorper interdum. Fusce sit amet erat eu justo dapibus pretium. Fusce sollicitudin massa eu venenatis ullamcorper. Cras sagittis augue nisi, id tincidunt quam fringilla in. Nam ante odio, cursus vitae nibh ac, dignissim placerat velit. Donec non orci sit amet risus porta aliquam. Nam euismod convallis ante non iaculis. Nulla vel nulla erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam ut ante orci. Sed lacus felis, facilisis eget suscipit non, ullamcorper at sem.</p></div>',
            '</div>',
            '<div style="clear:both;"></div>'
        ]
        return html;
    }
    function writeAside(propiedad) {
        let aside = '<h4 id="' + propiedad + '-title-aside"><a class="a" href="#' + propiedad + '-title">' + propiedad + '</a></h3>';
        return aside;
    }



    function applyStyles(propiedad, value, min, max) {
        let text = document.getElementById(propiedad + '-texto');
        //console.log(text);
        text.style[propiedad] = value;
    }
    function applyStyles2(propiedad, value, min, max) {
        let text = document.getElementById(propiedad + '-texto');
        //console.log(propiedad+'-range');
        let range = document.getElementById(propiedad+'-range');
        range.min = min;
        range.max = max;
        //console.log(min);
        //console.log(max);
        text.style[propiedad] = value;
    }

    for (propiedad in propiedades) {
        let control = '';
        let min = '';
        let max = '';
        let um = '';
        if (propiedades[propiedad]['radio'] != undefined) {
            control = 'radio';
        } else if (propiedades[propiedad]['um'] != undefined) {
            control = 'range';
            min = propiedades[propiedad]['min'];
            min_inicial = min;
            max = propiedades[propiedad]['max'];
            max_inicial = max;
            um = propiedades[propiedad]['um'];
        } else {
            control = 'color';
        }
        let value = propiedades[propiedad]['value'];
        let p = writeHTML(propiedad, control, value, min, max);
        p.forEach(element => {
            contenedor.innerHTML += element;
        });
        let write_aside = writeAside(propiedad);
        aside.innerHTML += write_aside;

        applyStyles(propiedad, value);
        //console.log(propiedades[propiedad]['value']);
    }

    let range = document.querySelectorAll('.range');
    range.forEach(element => {
        element.addEventListener('input', () => {
            //console.log(element);
            //console.log(element.value);
            //console.log(propiedades[element.id.split('-')[0]]['value']);
            let propiedad = element.id.split('-')[0];
            let value = propiedades[propiedad]['value'];
            let um = propiedades[propiedad]['um'];
            value = element.value + um;
            let min = '';
            let max = '';
            
            if(um == '%'){
                min = '1';
                max = '200';
            }else if(um == 'px'){
                min = min_inicial;
                max = max_inicial;
            }else if(um == ''){
                min = '100';
                max = '900';
            }
            applyStyles2(propiedad, value, min, max);
            let span = document.getElementById(propiedad + '-span');
            //console.log(span);
            span.innerHTML = value;
        });

    });

    let um_radios = document.querySelectorAll('.um');
    um_radios.forEach(element => {
        element.addEventListener('click', () => {
            let propiedad = element.id.split('-')[0];
            propiedades[propiedad]['um'] = element.id.split('-')[2];
            //console.log(propiedad, element.id.split('-')[2]);
        });
    });

    let radio = document.querySelectorAll('.radio');
    radio.forEach(element => {
        element.addEventListener('change', () => {
            let propiedad = element.id.split('-')[0];
            let value = element.id.split('-')[1];
            propiedades[propiedad]['value'] = value;
            applyStyles(propiedad, value);

            //console.log(element, propiedad, value);
        });
    })
    let color = document.getElementById('color-color');
    //console.log(color);
    color.addEventListener('input', () => {
        applyStyles('color', color.value);
    });


    let anclas = document.querySelectorAll('a');
    anclas.forEach(element => {
        let enviar_a = document.getElementById(element.href.split('#')[1]);
        element.addEventListener('click', (e) => {
            e.preventDefault();
            enviar_a.scrollIntoView({ behavior: 'smooth' });
        });
    });
    //console.log(propiedades);
}   



