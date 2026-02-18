// script.js

const convertBtn = document.getElementById('convertBtn');
const ytUrlInput = document.getElementById('ytUrl');
const resultArea = document.getElementById('resultArea');
const loader = document.getElementById('loader');

// Fungsi utama memanggil API YTMP3
async function downloadYTMP3(url, apikey) {
    try {
        const response = await fetch(`https://anabot.my.id/api/download/ytmp3?url=${encodeURIComponent(url)}&apikey=${encodeURIComponent(apikey)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error API:", error);
        return null;
    }
}

// Handler saat tombol diklik
convertBtn.addEventListener('click', async () => {
    const url = ytUrlInput.value.trim();
    const apikey = 'DhW5wSr5PB'; // Pastikan API Key benar

    if (!url) {
        alert("Harap masukkan URL YouTube!");
        return;
    }

    // Tampilkan loader & bersihkan hasil lama
    loader.style.display = 'block';
    resultArea.innerHTML = '';

    const res = await downloadYTMP3(url, apikey);

    loader.style.display = 'none';

    if (res && res.status === 200) {
        const item = res.result;
        
        resultArea.innerHTML = `
            <div class="download-box">
                <h4>${item.title || 'Musik Berhasil Dikonversi'}</h4>
                <p style="color: #888; font-size: 12px; margin-bottom: 15px;">Ukuran: ${item.size || 'N/A'}</p>
                <a href="${item.url}" class="btn-download" download>Download Sekarang</a>
            </div>
        `;
    } else {
        resultArea.innerHTML = `<p style="color: #ff4d4d; margin-top: 20px;">Gagal mengonversi. Pastikan URL benar atau API aktif.</p>`;
    }
});
