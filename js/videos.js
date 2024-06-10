function loadYouTubeVideos() {
    const maxResults = 100;
    const url = `https://www.googleapis.com/youtube/v3/search?key=${config.API_KEY}&channelId=${config.CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const videoList = document.getElementById('video-list');
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const videoElement = document.createElement('div');
                videoElement.classList.add('video-item'); 
                videoElement.innerHTML = `
                    <h3>${title}</h3>
                    <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                `;
                videoList.appendChild(videoElement);
            });
        })
        .catch(error => console.error('Error cargando los videos:', error));
}

if (document.getElementById('video-list')) {
    loadYouTubeVideos();
};