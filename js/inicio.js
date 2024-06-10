function loadYouTubeVideosCarousel() {
    const maxResults = 2;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${config.API_KEY}&channelId=${config.CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const carouselContent = document.getElementById('carousel-content');

                if(data.error){
                    throw data.error.status
                }

                data.items.forEach(item => {

                    const videoId = item.id.videoId;
                    const videoElement = document.createElement('div');
                    videoElement.classList.add('carousel-item');
                    videoElement.innerHTML = `
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                `;
                carouselContent.appendChild(videoElement);
                });
            })
            .catch(error => console.error(`Error cargando los videos de YouTube: ${error}`));
    }

function loadNews() {
    const rssUrl = "https://www.clarin.com/rss/buena-vida/";
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            const newsList = document.getElementById('news-list');
            newsList.innerHTML = ''; // Limpiar el contenido anterior

            data.items.forEach(item => {
                const newsElement = document.createElement('li');

                newsElement.innerHTML = `
                    <div class="news-item">
                        <img src="${item.enclosure.link}" alt="${item.title}" class="news-image">
                        <h3 class="news-title"><a class="news-title-a" href="${item.link}" target="_blank">${item.title}</a></h3>
                    </div>`;
                newsList.appendChild(newsElement);
            });
        })
        .catch(error => console.error('Error cargando las noticias:', error));
}

loadYouTubeVideosCarousel();
loadNews();

