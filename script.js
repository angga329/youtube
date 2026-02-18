const convertBtn = document.getElementById('convertBtn');
const ytUrl = document.getElementById('ytUrl');
const resultContainer = document.getElementById('resultContainer');
const loading = document.getElementById('loading');

convertBtn.addEventListener('click', async () => {
    const url = ytUrl.value.trim();

    if (!url) return alert("Tempel link YouTube-nya dulu!");

    // UI Reset
    loading.style.display = 'block';
    resultContainer.innerHTML = '';

    try {
        // Panggil API Deline
        const response = await fetch(`https://api.deline.web.id/downloader/ytmp3?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        loading.style.display = 'none';

        // Sesuaikan dengan response API Deline (biasanya di data.result atau langsung data)
        const result = data.result || data;

        if (result && result.url) {
            resultContainer.innerHTML = `
                <div class="download-card">
                    <img src="${result.thumbnail || ''}" alt="Thumbnail">
                    <h4>${result.title || 'Musik Ditemukan'}</h4>
                    <a href="${result.url}" class="dl-link" download>📥 Download MP3</a>
                </div>
            `;
        } else {
            resultContainer.innerHTML = `<p style="color:#f87171">Gagal mengambil link download.</p>`;
        }

    } catch (error) {
        loading.style.display = 'none';
        resultContainer.innerHTML = `<p style="color:#f87171">Terjadi kesalahan koneksi.</p>`;
        console.error(error);
    }
});
