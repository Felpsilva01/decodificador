let entradaDeTexto = document.querySelector('.entradaTexto');
let saidaDeTexto = document.querySelector('.saidaTexto');

function alterarAreaTextoCriptografado() {
    document.querySelector('.conteudo__direita__textoVazio').setAttribute('style', 'display: flex');
    document.querySelector('.conteudo__direita__texto').setAttribute('style', 'display: none');
};

function limparEntradaDeTexto() {
    document.querySelector(".conteudo__direita__textoVazio").setAttribute("style", "display: none");
    document.querySelector(".conteudo__direita__texto").setAttribute("style", "display:flex");
    entradaDeTexto.value = '';
};

function verificarLetraMaiuscula(texto) {
    if(Boolean(texto.match(/[A-Z]/))){
        return true;
    }else{
        return false;
    }
}

function verificarCaractereEspecial(texto) {
    const caracteresEspeciais = /[!@#$%^&*(),.?":;{}|<>]/;
    const caracteresAcentuados = /[À-ÖØ-öø-ÿ]/; 
    const contemNumeros = /\d/;
    return caracteresEspeciais.test(texto) || caracteresAcentuados.test(texto) || contemNumeros.test(texto);
}

function criptografarTexto() {
    let texto = entradaDeTexto.value.toLowerCase().replace(/[^a-z\s]/g, ''); // Converte para minúsculas e remove caracteres não alfabéticos
    if (verificarLetraMaiuscula(texto) || verificarCaractereEspecial(texto)) {
        alert('A palavra não pode ter caracteres especiais ou letras maiúsculas.');
        limparEntradaDeTexto();
        alterarAreaTextoCriptografado();
        return;
    }
    
    let textoCriptografado = '';

    for (let i = 0; i < texto.length; i++) {
        if (texto[i] === ' ') {
            textoCriptografado += ' '; // Ignora espaços
            continue;
        }
        let charCode = texto.charCodeAt(i);
        // Recuar uma posição no alfabeto (assumindo que estamos usando caracteres ASCII)
        charCode = (charCode - 97 - 1 + 26) % 26 + 97;
        textoCriptografado += String.fromCharCode(charCode);
    }

    saidaDeTexto.value = textoCriptografado;
    alterarAreaTextoCriptografado();
    limparEntradaDeTexto();
}

function descriptografarTexto() {
    let textoCriptografado = entradaDeTexto.value.toLowerCase(); // Converte para minúsculas
    let textoDescriptografado = '';

    for (let i = 0; i < textoCriptografado.length; i++) {
        if (textoCriptografado[i] === ' ') {
            textoDescriptografado += ' '; // Mantém espaços
            continue;
        }
        let charCode = textoCriptografado.charCodeAt(i);
        // Avançar uma posição no alfabeto (assumindo que estamos usando caracteres ASCII)
        charCode = (charCode - 97 + 1) % 26 + 97;
        textoDescriptografado += String.fromCharCode(charCode);
    }

    saidaDeTexto.value = textoDescriptografado;
    alterarAreaTextoCriptografado();
    limparEntradaDeTexto();
}

async function copiarTextoCriptografado() {
    let textoCriptografado = document.querySelector('.saidaTexto').value;
    try {
        await navigator.clipboard.writeText(textoCriptografado);
        alert('Texto copiado para a área de transferência!!!');
    } catch (erro) {
        console.error('Falha ao copiar o texto criptografado: ', erro);
        alert('Falha ao copiar o texto criptografado. Verifique o console para mais detalhes.');
    }
}
