document.addEventListener('DOMContentLoaded', (event) => {
    let numerosUsados = [];
    const maxNum = 75;


    const generarNumeroBtn = document.getElementById('generarNumero');
    const numeroActualEl = document.getElementById('numeroActual');
    const listaNumerosEl = document.getElementById('listaNumeros');
    const mensajeFinalEl = document.getElementById('mensajeFinal');
    const reiniciarJuegoBtn = document.getElementById('reiniciarJuego');
    const cantarBingoBtn = document.getElementById('cantarBingoButton');
    const finalizarJuegoBtn = document.getElementById('finalizarJuegoButton');
   
    function generarNumeroBingo() {
        if (numerosUsados.length >= maxNum) {
            mensajeFinalEl.textContent = "Todos los números posibles ya han sido generados.";
            return;
        }


        let numero;
        do {
            numero = Math.floor(Math.random() * maxNum) + 1;
        } while (numerosUsados.includes(numero));


        numerosUsados.push(numero);
        numeroActualEl.textContent = `Número del bingo: ${numero}`;
        actualizarListaNumeros();
        speakNumber(numero);
        blinkNumber();
    }


    function actualizarListaNumeros() {
        listaNumerosEl.innerHTML = '';
        numerosUsados.forEach(numero => {
            const li = document.createElement('li');
            li.textContent = numero;
            listaNumerosEl.appendChild(li);
        });
    }


    function reiniciarJuego() {
        if (confirm("¿Desea reiniciar el juego?")) {
            numerosUsados = [];
            numeroActualEl.textContent = 'Número del bingo: 00';
            listaNumerosEl.innerHTML = '';
            mensajeFinalEl.textContent = '';
            speakText("reiniciando juego");
        }
    }


    function getArgentinianVoice() {
        const voices = window.speechSynthesis.getVoices();
        return voices.find(voice => voice.lang === 'es-AR' && voice.name.includes('Male')) || voices.find(voice => voice.lang === 'es-ES' && voice.name.includes('Male'));
    }
    
    function speakText(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoice = getArgentinianVoice();
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.lang = 'es-AR';  // Español argentino
        window.speechSynthesis.speak(utterance);
    }
    
    function speakNumber(number) {
        const fullText = `Ha salido el número ${number}`;
        const utterance = new SpeechSynthesisUtterance(fullText);
        const selectedVoice = getArgentinianVoice();
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.lang = 'es-AR';  // Español argentino
        utterance.onend = () => {
            const composition = number.toString().split('').join(', ');
            speakText(`Composición: ${composition}`);
        };
        window.speechSynthesis.speak(utterance);
    }
    


    function blinkNumber() {
        numeroActualEl.classList.add('blink');
        setTimeout(() => {
            numeroActualEl.classList.remove('blink');
        }, 5000);  // Remove the blink class after 5 seconds
    }


    function confirmarAccion(mensaje, textoVoz) {
        if (confirm(mensaje)) {
            speakText(textoVoz);
        }
    }


    generarNumeroBtn.addEventListener('click', generarNumeroBingo);
    reiniciarJuegoBtn.addEventListener('click', reiniciarJuego);
    cantarBingoBtn.addEventListener('click', () => confirmarAccion("¿Confirma que han cantado Bingo?", "Han cantado Bingo"));
    finalizarJuegoBtn.addEventListener('click', () => confirmarAccion("¿Desea finalizar el juego?", "juego finalizado"));
});
