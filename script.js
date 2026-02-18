// script.js

const searchBtn = document.getElementById('searchBtn');
const musicQuery = document.getElementById('musicQuery');
const resultContainer = document.getElementById('resultContainer');
const loader = document.getElementById('loader');

// Fungsi utama memanggil API
async function playMusicYoutube(query, apikey) {
    try {
        const response = await fetch(`https://anabot.my.id/api/download/playmusic?query=${encodeURIComponent(query)}&apikey=${encodeURIComponent(apikey)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

// Fungsi menjalankan pencarian
const startSearch = async () => {
    const query = musicQuery.value.trim();
    const apikey = 'freeApikey'; // Gunakan apikey Anda

    if (!query) {
        alert("Masukkan judul lagu!");
        return;
    }

    // Tampilkan Loading
    loader.style.display = 'block';
    resultContainer.innerHTML = '';

    try {
        const data = await playMusicYoutube(query, apikey);
        
        loader.style.display = 'none';

        if (data.status === 200 && data.result) {
            const music = data.result;
            
            // Render hasil ke HTML
            resultContainer.innerHTML = `
                <div class="music-info">
                    <img src="${music.thumb}" alt="Cover">
                    <h3>${music.title}</h3>
                    <p>${music.channel}</p>
                    <audio controls autoplay>
                        <source src="${music.url}" type="audio/mpeg">
                        Browser Anda tidak mendukung pemutar audio.
                    </audio>
                    <div style="margin-top: 20px;">
                        <a href="${music.url}" target="_blank" style="color: #ff0000; text-decoration: none; font-size: 12px; font-weight: bold;">
                            📥 DOWNLOAD MP3
                        </a>
                    </div>
                </div>
            `;
        } else {
            resultContainer.innerHTML = `<p style="color: #ff4d4d;">Musik tidak ditemukan.</p>`;
        }
    } catch (err) {
        loader.style.display = 'none';
        resultContainer.innerHTML = `<p style="color: #ff4d4d;">Terjadi kesalahan sistem.</p>`;
    }
};

// Event klik tombol
searchBtn.addEventListener('click', startSearch);

// Event tekan Enter
musicQuery.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startSearch();
});
