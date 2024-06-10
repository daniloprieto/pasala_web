function loadCSS(filename) {
    const file = document.createElement('link');
    file.rel = 'stylesheet';
    file.href = filename;
    document.head.appendChild(file);
}

function loadJS(filename) {
    const script = document.createElement('script');
    script.src = filename;
    document.body.appendChild(script);
}
    
function loadContent(page, cssFile = null, scriptUrl = null) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content-container').innerHTML = data;

            if (cssFile) {
                loadCSS(cssFile);
            }

            if(scriptUrl){
                loadJS(scriptUrl);
            }

        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

let config;

fetch('config.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar la configuración');
        }

        return response.json()

    })
    .then(conf => {
        config = conf;

        loadJS('/js/nav.js');
        loadJS('/js/footer.js');
        loadJS('/js/publicidad.js');
        loadContent('/html/inicio.html', null, '/js/inicio.js');
    })
    .catch(error => console.error('Error al cargar la configuración:', error));






