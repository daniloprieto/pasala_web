fetch('/html/nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-container').innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el menú de navegación:', error)
);

// Definir el elemento de audio
var audio = new Audio(config.STREAM_URL);

// Función para reproducir o pausar el audio
function toggleAudio() {
    if (audio.paused) {
        audio.play()
            .then(() => {
                document.getElementById('playButtonText').textContent = 'Pausa';
            })
            .catch(error => {
                console.error('Error al intentar reproducir el audio:', error);
                alert('El streaming no está disponible en este momento. Por favor, inténtalo más tarde.');
            });
    } else {
        audio.pause();
        document.getElementById('playButtonText').textContent = 'En Vivo';
    }
}