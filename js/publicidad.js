function loadRandomAdvertisement() {
    const adsContainers = document.querySelectorAll('.ads');
    adsContainers.forEach(container => {
        fetch('./publicidad/')
            .then(response => response.text())
            .then(text => {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(text, 'text/html');
                const links = htmlDocument.querySelectorAll('a');
                const imagePaths = Array.from(links)
                    .filter(link => /\.(jpg|jpeg|png|gif)$/i.test(link.getAttribute('href')))
                    .map(link => './publicidad/' + link.getAttribute('href'));

                if (imagePaths.length > 0) {
                    container.innerHTML = ''; // Limpiar cualquier contenido anterior

                    // Mostrar hasta 4 imágenes aleatorias en la columna
                    const maxImages = Math.min(6, imagePaths.length);
                    const randomIndexes = getRandomIndexes(imagePaths.length, maxImages);
                    randomIndexes.forEach(index => {
                        const img = new Image();
                        img.src = imagePaths[index];
                        img.alt = "Publicidad";
                        container.appendChild(img);
                    });
                }
            })
            .catch(error => console.error('Error cargando la publicidad:', error));
    });
}

// Función para obtener índices aleatorios sin repetición
function getRandomIndexes(max, count) {
    const indexes = [];
    while (indexes.length < count) {
        const randomIndex = Math.floor(Math.random() * max);
        if (!indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
    }
    return indexes;
}

loadRandomAdvertisement();
