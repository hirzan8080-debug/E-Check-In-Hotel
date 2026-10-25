/**
 * =========================================
 * E-Check In Hotel — script.js
 * Author: IBM Senior Frontend Engineer
 * Stack: Vanilla JavaScript (No Library)
 * =========================================
 */

/* =========================================
   SECTION 1: STATE MANAGEMENT
   Penyimpanan data utama aplikasi (in-memory)
   ========================================= */

/** Data utama: daftar semua tamu / reservasi */
let tamuList = [
  {
    id: 'RES-001',
    nama: 'Budi Santoso',
    telepon: '081234567890',
    email: 'budi@email.com',
    noId: '3201010101010001',
    tipeKamar: 'deluxe',
    nomorKamar: '201',
    tglCheckin: '2024-12-01',
    tglCheckout: '2024-12-04',
    jumlahTamu: 2,
    catatan: 'Non-smoking room',
    status: 'checkin',
    totalBayar: 2400000,
    sudahBayar: true,
    metodeBayar: 'transfer',
    kunci: null,
    verifikasi: true
  },
  {
    id: 'RES-002',
    nama: 'Dewi Lestari',
    telepon: '082345678901',
    email: 'dewi@email.com',
    noId: '3201010101020002',
    tipeKamar: 'suite',
    nomorKamar: '301',
    tglCheckin: '2024-12-02',
    tglCheckout: '2024-12-05',
    jumlahTamu: 2,
    catatan: '',
    status: 'checkin',
    totalBayar: 4500000,
    sudahBayar: true,
    metodeBayar: 'qris',
    kunci: null,
    verifikasi: true
  },
  {
    id: 'RES-003',
    nama: 'Ahmad Fauzi',
    telepon: '083456789012',
    email: 'ahmad@email.com',
    noId: '3201010101030003',
    tipeKamar: 'standard',
    nomorKamar: '102',
    tglCheckin: '2024-12-03',
    tglCheckout: '2024-12-06',
    jumlahTamu: 1,
    catatan: 'Late check-in',
    status: 'reserved',
    totalBayar: 1500000,
    sudahBayar: false,
    metodeBayar: null,
    kunci: null,
    verifikasi: false
  },
  {
    id: 'RES-004',
    nama: 'Siti Rahayu',
    telepon: '084567890123',
    email: 'siti@email.com',
    noId: '3201010101040004',
    tipeKamar: 'president',
    nomorKamar: '401',
    tglCheckin: '2024-11-28',
    tglCheckout: '2024-12-02',
    jumlahTamu: 2,
    catatan: '',
    status: 'checkout',
    totalBayar: 12000000,
    sudahBayar: true,
    metodeBayar: 'credit',
    kunci: null,
    verifikasi: true
  },
  {
    id: 'RES-005',
    nama: 'Rudi Hermawan',
    telepon: '085678901234',
    email: 'rudi@email.com',
    noId: '3201010101050005',
    tipeKamar: 'deluxe',
    nomorKamar: '202',
    tglCheckin: '2024-12-01',
    tglCheckout: '2024-12-03',
    jumlahTamu: 1,
    catatan: '',
    status: 'checkin',
    totalBayar: 1600000,
    sudahBayar: true,
    metodeBayar: 'ewallet',
    kunci: null,
    verifikasi: true
  }
];

/** Data kamar hotel */
const roomsData = [
  // Lantai 1
  { no: '101', lantai: 1, tipe: 'standard', status: 'available', harga: 500000 },
  { no: '102', lantai: 1, tipe: 'standard', status: 'occupied',  harga: 500000 },
  { no: '103', lantai: 1, tipe: 'standard', status: 'available', harga: 500000 },
  { no: '104', lantai: 1, tipe: 'standard', status: 'cleaning',  harga: 500000 },
  { no: '105', lantai: 1, tipe: 'standard', status: 'available', harga: 500000 },
  // Lantai 2
  { no: '201', lantai: 2, tipe: 'deluxe',   status: 'occupied',  harga: 800000 },
  { no: '202', lantai: 2, tipe: 'deluxe',   status: 'occupied',  harga: 800000 },
  { no: '203', lantai: 2, tipe: 'deluxe',   status: 'available', harga: 800000 },
  { no: '204', lantai: 2, tipe: 'deluxe',   status: 'available', harga: 800000 },
  { no: '205', lantai: 2, tipe: 'deluxe',   status: 'cleaning',  harga: 800000 },
  // Lantai 3
  { no: '301', lantai: 3, tipe: 'suite',    status: 'occupied',  harga: 1500000 },
  { no: '302', lantai: 3, tipe: 'suite',    status: 'available', harga: 1500000 },
  { no: '303', lantai: 3, tipe: 'suite',    status: 'available', harga: 1500000 },
  { no: '304', lantai: 3, tipe: 'suite',    status: 'cleaning',  harga: 1500000 },
  // Lantai 4
  { no: '401', lantai: 4, tipe: 'president', status: 'occupied', harga: 3000000 },
  { no: '402', lantai: 4, tipe: 'president', status: 'available', harga: 3000000 },
  { no: '403', lantai: 4, tipe: 'president', status: 'available', harga: 3000000 },
];

/** Harga per tipe kamar per malam */
const hargaKamar = {
  standard:  500000,
  deluxe:    800000,
  suite:     1500000,
  president: 3000000,
};

/** Data notifikasi */
let notifikasiData = [
  { id: 'N001', tipe: 'checkin',   pesan: 'Budi Santoso berhasil melakukan check-in ke kamar 201.',  waktu: '10:32',  tanggal: 'Hari ini',   dibaca: false },
  { id: 'N002', tipe: 'payment',   pesan: 'Pembayaran Rp 4.500.000 dari Dewi Lestari telah diterima.', waktu: '09:15', tanggal: 'Hari ini',   dibaca: false },
  { id: 'N003', tipe: 'key',       pesan: 'Kunci digital kamar 101 telah di-generate untuk Rudi Hermawan.', waktu: '08:45', tanggal: 'Hari ini', dibaca: false },
  { id: 'N004', tipe: 'checkout',  pesan: 'Siti Rahayu telah melakukan check-out dari kamar 401.',   waktu: '14:00',  tanggal: 'Kemarin',    dibaca: true  },
  { id: 'N005', tipe: 'survey',    pesan: 'Review bintang 5 diterima dari tamu Ahmad Fauzi.',         waktu: '11:20',  tanggal: 'Kemarin',    dibaca: true  },
];

/** Data survey */
let surveyData = [
  { nama: 'Budi Santoso', kamar: '201', kebersihan: 5, pelayanan: 4, fasilitas: 5, aplikasi: 5, komentar: 'Pelayanan sangat memuaskan! Kamar bersih.', tanggal: '2024-12-02' },
  { nama: 'Dewi Lestari',  kamar: '301', kebersihan: 4, pelayanan: 5, fasilitas: 4, aplikasi: 5, komentar: 'Aplikasi E-Check In sangat mudah digunakan.',  tanggal: '2024-12-03' },
  { nama: 'Siti Rahayu',   kamar: '401', kebersihan: 5, pelayanan: 5, fasilitas: 5, aplikasi: 4, komentar: 'Presidential suite luar biasa!',              tanggal: '2024-12-01' },
];

/** Data riwayat kunci digital yang sudah di-generate */
let kunciHistory = [];

/** Tamu aktif yang sedang dalam proses check-in (lintas page) */
let activeTamu = null;

/** Filter kamar yang aktif */
let activeRoomFilter = 'all';

/** Rating state untuk form survey */
const surveyRatings = {
  kebersihan: 0,
  pelayanan:  0,
  fasilitas:  0,
  aplikasi:   0,
};


/* =========================================
   SECTION 2: ROUTING / NAVIGASI
   Mengelola tampilan page yang aktif
   ========================================= */

/**
 * Navigasi ke halaman tertentu
 * @param {string} pageId - ID page yang dituju
 */
function navigateTo(pageId) {
  // Sembunyikan semua page section
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.add('hidden');
  });

  // Tampilkan page yang dituju
  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.remove('hidden');
  }

  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.page === pageId) {
      item.classList.add('active');
    }
  });

  // Update header title
  const titles = {
    dashboard:   { title: 'Dashboard',              subtitle: 'Selamat datang di sistem E-Check In Hotel' },
    reservasi:   { title: 'Reservasi & Input Data', subtitle: 'Isi data tamu untuk proses check-in' },
    verifikasi:  { title: 'Verifikasi Identitas',   subtitle: 'Verifikasi KTP atau paspor tamu' },
    kamar:       { title: 'Pemilihan Kamar',         subtitle: 'Pilih dan kelola kamar hotel' },
    kunci:       { title: 'Kunci Digital',           subtitle: 'Generate dan kirim kunci digital' },
    pembayaran:  { title: 'Pembayaran Online',       subtitle: 'Proses dan riwayat pembayaran tamu' },
    pms:         { title: 'Property Management',     subtitle: 'Kelola seluruh data tamu dan reservasi' },
    notifikasi:  { title: 'Notifikasi & Konfirmasi', subtitle: 'Log aktivitas dan konfirmasi tamu' },
    survey:      { title: 'Survey Kepuasan',         subtitle: 'Lihat dan isi survey kepuasan tamu' },
  };

  if (titles[pageId]) {
    document.getElementById('pageTitle').textContent    = titles[pageId].title;
    document.getElementById('pageSubtitle').textContent = titles[pageId].subtitle;
  }

  // Tutup sidebar di mobile
  if (window.innerWidth < 1024) closeSidebar();

  // Inisialisasi page yang dituju
  initPage(pageId);
}

/**
 * Inisialisasi konten untuk setiap page
 * @param {string} pageId
 */
function initPage(pageId) {
  switch (pageId) {
    case 'dashboard':   initDashboard();   break;
    case 'reservasi':   initReservasi();   break;
    case 'verifikasi':  initVerifikasi();  break;
    case 'kamar':       initRoomGrid();    break;
    case 'kunci':       initKunci();       break;
    case 'pembayaran':  initPembayaran();  break;
    case 'pms':         initPMS();         break;
    case 'notifikasi':  initNotifikasi();  break;
    case 'survey':      initSurvey();      break;
  }
}


/* =========================================
   SECTION 3: SIDEBAR (MOBILE)
   ========================================= */

function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const isOpen   = sidebar.classList.contains('open');
  if (isOpen) {
    closeSidebar();
  } else {
    sidebar.classList.add('open');
    overlay.classList.remove('hidden');
  }
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.add('hidden');
}


/* =========================================
   SECTION 4: DATE & TIME CLOCK
   Update jam dan tanggal secara real-time
   ========================================= */

function updateClock() {
  const now  = new Date();
  const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const el = document.getElementById('currentTime');
  const el2 = document.getElementById('currentDate');
  if (el)  el.textContent  = time;
  if (el2) el2.textContent = date;
}


/* =========================================
   SECTION 5: DASHBOARD
   ========================================= */

function initDashboard() {
  updateStatCards();
  renderRecentCheckins();
  renderRoomStatusChart();
}

/** Update angka pada kartu statistik */
function updateStatCards() {
  const available = roomsData.filter(r => r.status === 'available').length;
  const active    = tamuList.filter(t => t.status === 'checkin').length;
  const pendapatan = tamuList.filter(t => t.sudahBayar).reduce((sum, t) => sum + t.totalBayar, 0);

  // Hitung rata-rata rating survey
  const avgRating = surveyData.length > 0
    ? (surveyData.reduce((sum, s) => sum + ((s.kebersihan + s.pelayanan + s.fasilitas + s.aplikasi) / 4), 0) / surveyData.length).toFixed(1)
    : '0.0';

  document.getElementById('statKamarTersedia').textContent = available;
  document.getElementById('statTamuAktif').textContent     = active;
  document.getElementById('statPendapatan').textContent    = 'Rp ' + formatRupiah(pendapatan);
  document.getElementById('statRating').textContent        = avgRating;
}

/** Render daftar check-in terbaru di dashboard */
function renderRecentCheckins() {
  const container = document.getElementById('recentCheckins');
  const recent    = [...tamuList].reverse().slice(0, 5);

  container.innerHTML = recent.map(t => `
    <div class="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition cursor-pointer" onclick="navigateTo('pms')">
      <div class="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        ${t.nama.charAt(0)}
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-sm text-gray-800 truncate">${t.nama}</p>
        <p class="text-xs text-gray-400">Kamar ${t.nomorKamar} · ${formatTipe(t.tipeKamar)}</p>
      </div>
      <span class="${getBadgeClass(t.status)}">${getStatusLabel(t.status)}</span>
    </div>
  `).join('');
}

/** Render donut/bar chart status kamar */
function renderRoomStatusChart() {
  const available = roomsData.filter(r => r.status === 'available').length;
  const occupied  = roomsData.filter(r => r.status === 'occupied').length;
  const cleaning  = roomsData.filter(r => r.status === 'cleaning').length;
  const total     = roomsData.length;

  const items = [
    { label: 'Tersedia',  count: available, color: '#16a34a', bg: '#dcfce7' },
    { label: 'Terisi',    count: occupied,  color: '#E94F37', bg: '#fee2e2' },
    { label: 'Cleaning',  count: cleaning,  color: '#d97706', bg: '#fef3c7' },
  ];

  document.getElementById('roomStatusChart').innerHTML = items.map(item => `
    <div>
      <div class="flex justify-between text-sm mb-1">
        <span class="font-medium text-gray-700">${item.label}</span>
        <span class="font-bold" style="color:${item.color}">${item.count} / ${total}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${(item.count/total*100).toFixed(0)}%; background:${item.color}"></div>
      </div>
    </div>
  `).join('');
}


/* =========================================
   SECTION 6: RESERVASI FORM
   ========================================= */

function initReservasi() {
  // Set tanggal minimum hari ini
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('tglCheckin').min  = today;
  document.getElementById('tglCheckout').min = today;
}

/** Hitung estimasi biaya saat tipe kamar atau tanggal berubah */
function hitungEstimasi() {
  const tipe    = document.getElementById('tipeKamar').value;
  const checkin = document.getElementById('tglCheckin').value;
  const checkout = document.getElementById('tglCheckout').value;

  if (!tipe || !checkin || !checkout) return;

  const malam  = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
  const harga  = hargaKamar[tipe] || 0;
  const total  = malam * harga;

  if (malam > 0) {
    document.getElementById('estimasiBiaya').classList.remove('hidden');
    document.getElementById('estimasiBiayaText').textContent =
      `Rp ${formatRupiah(total)} (${malam} malam × Rp ${formatRupiah(harga)})`;
  }
}

/** Handle submit form reservasi */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservasiForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitReservasi();
    });
  }

  // Bind estimasi biaya otomatis
  ['tipeKamar', 'tglCheckin', 'tglCheckout'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', hitungEstimasi);
  });
});

/** Proses submit form reservasi */
function submitReservasi() {
  const nama    = document.getElementById('namaLengkap').value.trim();
  const telp    = document.getElementById('noTelepon').value.trim();
  const email   = document.getElementById('emailTamu').value.trim();
  const noId    = document.getElementById('noIdentitas').value.trim();
  const checkin = document.getElementById('tglCheckin').value;
  const checkout= document.getElementById('tglCheckout').value;
  const jumlah  = document.getElementById('jumlahTamu').value;
  const tipe    = document.getElementById('tipeKamar').value;
  const catatan = document.getElementById('catatanTamu').value.trim();

  // Validasi tanggal
  if (new Date(checkout) <= new Date(checkin)) {
    showToast('Tanggal check-out harus setelah check-in!', 'error');
    return;
  }

  // Cari kamar tersedia sesuai tipe
  const kamarTersedia = roomsData.find(r => r.tipe === tipe && r.status === 'available');
  if (!kamarTersedia) {
    showToast(`Tidak ada kamar ${formatTipe(tipe)} yang tersedia!`, 'error');
    return;
  }

  // Hitung total biaya
  const malam  = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
  const total  = malam * hargaKamar[tipe];

  // Buat ID reservasi unik
  const newId = 'RES-' + String(tamuList.length + 1).padStart(3, '0');

  // Buat objek tamu baru
  const tamuBaru = {
    id: newId,
    nama, telepon: telp, email, noId,
    tipeKamar: tipe, nomorKamar: kamarTersedia.no,
    tglCheckin: checkin, tglCheckout: checkout,
    jumlahTamu: parseInt(jumlah), catatan,
    status: 'reserved',
    totalBayar: total, sudahBayar: false,
    metodeBayar: null, kunci: null, verifikasi: false,
  };

  // Tandai kamar sebagai occupied
  kamarTersedia.status = 'occupied';

  // Tambahkan ke list
  tamuList.push(tamuBaru);

  // Set sebagai tamu aktif untuk lanjut ke verifikasi
  activeTamu = tamuBaru;

  // Tambah notifikasi
  addNotifikasi('checkin', `Reservasi baru: ${nama} untuk kamar ${kamarTersedia.no} (${formatTipe(tipe)}).`);

  showToast(`Reservasi ${newId} berhasil dibuat! 🎉`, 'success');

  // Reset form
  document.getElementById('reservasiForm').reset();
  document.getElementById('estimasiBiaya').classList.add('hidden');

  // Lanjut ke verifikasi
  setTimeout(() => navigateTo('verifikasi'), 800);
}


/* =========================================
   SECTION 7: VERIFIKASI IDENTITAS
   ========================================= */

function initVerifikasi() {
  // Tampilkan info tamu aktif jika ada
  if (activeTamu) {
    document.getElementById('verifikasiNama').textContent  = activeTamu.nama;
    document.getElementById('verifikasiNoId').textContent  = `No. ID: ${activeTamu.noId}`;
  } else {
    document.getElementById('verifikasiNama').textContent  = 'Pilih tamu dari PMS atau reservasi baru';
    document.getElementById('verifikasiNoId').textContent  = '';
  }
}

/**
 * Preview file yang diupload ke area upload
 * @param {HTMLInputElement} input - input file
 * @param {string} previewId - ID elemen preview
 * @param {string} statusId - ID elemen status
 */
function previewFile(input, previewId, statusId) {
  if (!input.files || !input.files[0]) return;

  const file    = input.files[0];
  const preview = document.getElementById(previewId);
  const status  = document.getElementById(statusId);

  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.innerHTML = `<img src="${e.target.result}" class="max-h-32 mx-auto rounded-lg object-contain" alt="Preview" />
        <p class="text-xs text-gray-500 mt-2">${file.name}</p>`;
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = `<span class="text-3xl">📄</span><p class="text-sm text-gray-600 mt-2">${file.name}</p>`;
  }

  status.classList.remove('hidden');
  showToast('File berhasil diupload', 'success');
}

/** Proses verifikasi identitas */
function prosesVerifikasi() {
  const ktpFile    = document.getElementById('ktpFile');
  const selfieFile = document.getElementById('selfieFile');

  if (!ktpFile.files || !ktpFile.files[0]) {
    showToast('Upload foto KTP/Paspor terlebih dahulu!', 'error');
    return;
  }
  if (!selfieFile.files || !selfieFile.files[0]) {
    showToast('Upload selfie dengan identitas terlebih dahulu!', 'error');
    return;
  }

  // Simulasikan proses verifikasi (loading state)
  const btn = document.querySelector('#page-verifikasi .btn-primary');
  btn.textContent = '⏳ Memverifikasi...';
  btn.disabled = true;

  setTimeout(() => {
    // Tandai tamu sebagai terverifikasi
    if (activeTamu) {
      const idx = tamuList.findIndex(t => t.id === activeTamu.id);
      if (idx !== -1) {
        tamuList[idx].verifikasi = true;
        tamuList[idx].status     = 'checkin';
        activeTamu = tamuList[idx];
      }
    }

    // Tampilkan hasil
    const result = document.getElementById('verifikasiResult');
    result.classList.remove('hidden');
    result.className = 'rounded-xl p-4 border bg-green-50 border-green-200';
    document.getElementById('verifikasiResultText').innerHTML =
      '<span class="text-green-700">✅ Identitas berhasil diverifikasi! Tamu telah terdaftar sebagai check-in aktif.</span>';

    btn.textContent = '✅ Terverifikasi';
    btn.style.background = '#16a34a';

    addNotifikasi('checkin', `Identitas ${activeTamu?.nama || 'tamu'} berhasil diverifikasi.`);
    showToast('Verifikasi berhasil! ✅', 'success');

    // Lanjut ke pemilihan kamar
    setTimeout(() => navigateTo('kamar'), 1200);
  }, 1800);
}


/* =========================================
   SECTION 8: ROOM GRID (PEMILIHAN KAMAR)
   ========================================= */

function initRoomGrid() {
  renderRooms();
  bindFilterButtons();
}

/** Render grid kamar */
function renderRooms() {
  const grid       = document.getElementById('roomGrid');
  const filterFloor = document.getElementById('floorFilter').value;

  let filtered = [...roomsData];
  if (activeRoomFilter !== 'all') filtered = filtered.filter(r => r.status === activeRoomFilter);
  if (filterFloor !== 'all')      filtered = filtered.filter(r => r.lantai === parseInt(filterFloor));

  const statusIcon  = { available: '🟢', occupied: '🔴', cleaning: '🟡' };
  const statusLabel = { available: 'Tersedia', occupied: 'Terisi', cleaning: 'Cleaning' };
  const tipeLabel   = { standard: 'STD', deluxe: 'DLX', suite: 'STE', president: 'PRE' };

  grid.innerHTML = filtered.map(room => `
    <div class="room-card ${room.status}" onclick="selectRoom('${room.no}')">
      <div class="flex justify-between items-start mb-2">
        <span class="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">${tipeLabel[room.tipe] || room.tipe}</span>
        <span class="text-xs">${statusIcon[room.status]}</span>
      </div>
      <p class="text-2xl font-bold text-gray-800 mb-1">${room.no}</p>
      <p class="text-xs text-gray-500 mb-2">Lantai ${room.lantai}</p>
      <p class="text-xs font-semibold" style="color: ${room.status === 'available' ? '#16a34a' : room.status === 'cleaning' ? '#d97706' : '#E94F37'}">
        ${statusLabel[room.status]}
      </p>
      <p class="text-xs text-gray-400 mt-1">Rp ${formatRupiah(room.harga)}/malam</p>
    </div>
  `).join('');

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400">
      <p class="text-3xl mb-2">🔍</p><p>Tidak ada kamar ditemukan</p></div>`;
  }
}

/** Bind filter button click events */
function bindFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeRoomFilter = btn.dataset.filter || 'all';
      renderRooms();
    });
  });
}

/** Filter kamar berdasarkan lantai */
function filterRooms() {
  renderRooms();
}

/**
 * Handle klik pada kartu kamar
 * @param {string} nomorKamar
 */
function selectRoom(nomorKamar) {
  const room = roomsData.find(r => r.no === nomorKamar);
  if (!room || room.status !== 'available') {
    showToast(`Kamar ${nomorKamar} tidak tersedia`, 'warning');
    return;
  }

  // Tampilkan modal detail kamar
  showModal(`
    <div class="text-center">
      <div class="text-5xl mb-3">🛏</div>
      <h3 class="text-xl font-bold text-gray-800 mb-1">Kamar ${room.no}</h3>
      <p class="text-gray-500 text-sm mb-4">Lantai ${room.lantai} · ${formatTipe(room.tipe)}</p>
      <div class="bg-cream rounded-xl p-4 mb-4 text-left space-y-2">
        <div class="flex justify-between text-sm"><span class="text-gray-500">Harga/malam:</span><span class="font-bold text-primary">Rp ${formatRupiah(room.harga)}</span></div>
        <div class="flex justify-between text-sm"><span class="text-gray-500">Status:</span><span class="text-green-600 font-semibold">🟢 Tersedia</span></div>
        <div class="flex justify-between text-sm"><span class="text-gray-500">Fasilitas:</span><span class="font-semibold">AC, WiFi, TV, Minibar</span></div>
      </div>
      <button onclick="konfirmasiPilihKamar('${room.no}'); closeModal();" class="btn-primary">
        ✅ Pilih Kamar Ini
      </button>
    </div>
  `);
}

/**
 * Konfirmasi pemilihan kamar
 * @param {string} nomorKamar
 */
function konfirmasiPilihKamar(nomorKamar) {
  if (!activeTamu) {
    showToast('Silakan buat reservasi terlebih dahulu!', 'warning');
    navigateTo('reservasi');
    return;
  }

  // Update kamar di data tamu aktif
  const idx = tamuList.findIndex(t => t.id === activeTamu.id);
  if (idx !== -1) {
    tamuList[idx].nomorKamar = nomorKamar;
    activeTamu = tamuList[idx];
  }

  // Tandai kamar sebagai occupied
  const room = roomsData.find(r => r.no === nomorKamar);
  if (room) room.status = 'occupied';

  showToast(`Kamar ${nomorKamar} berhasil dipilih untuk ${activeTamu.nama}! 🛏`, 'success');
  addNotifikasi('checkin', `Kamar ${nomorKamar} dialokasikan untuk ${activeTamu.nama}.`);

  setTimeout(() => navigateTo('pembayaran'), 800);
}


/* =========================================
   SECTION 9: KUNCI DIGITAL
   ========================================= */

function initKunci() {
  // Populate dropdown tamu aktif
  const select = document.getElementById('selectTamuKunci');
  const aktif  = tamuList.filter(t => t.status === 'checkin');

  select.innerHTML = '<option value="">-- Pilih tamu aktif --</option>' +
    aktif.map(t => `<option value="${t.id}">${t.nama} — Kamar ${t.nomorKamar}</option>`).join('');

  renderRiwayatKunci();
}

/** Generate kunci digital baru */
function generateKunci() {
  const selectEl = document.getElementById('selectTamuKunci');
  const tamuId   = selectEl.value;

  if (!tamuId) {
    showToast('Pilih tamu terlebih dahulu!', 'warning');
    return;
  }

  const tamu = tamuList.find(t => t.id === tamuId);
  if (!tamu) return;

  // Generate kode acak 6 digit
  const kode = Math.random().toString(36).toUpperCase().slice(2, 8);
  tamu.kunci = kode;

  // Simpan ke history
  const entry = {
    id:       'KEY-' + Date.now(),
    tamuId:   tamu.id,
    nama:     tamu.nama,
    kamar:    tamu.nomorKamar,
    kode,
    berlaku:  tamu.tglCheckout,
    waktu:    new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
  };
  kunciHistory.unshift(entry);

  // Tampilkan display kunci
  document.getElementById('kunciDisplay').classList.remove('hidden');
  document.getElementById('kunciKamarNo').textContent  = tamu.nomorKamar;
  document.getElementById('kunciCode').textContent     = kode;
  document.getElementById('kunciNama').textContent     = tamu.nama;
  document.getElementById('kunciExp').textContent      = formatDate(tamu.tglCheckout);
  document.getElementById('kunciValid').textContent    = `Berlaku hingga: ${formatDate(tamu.tglCheckout)}`;

  // Render QR placeholder
  document.getElementById('kunciQR').innerHTML = renderQRPlaceholder(kode);

  addNotifikasi('key', `Kunci digital kamar ${tamu.nomorKamar} (${kode}) berhasil di-generate untuk ${tamu.nama}.`);
  showToast(`Kunci digital ${kode} berhasil dibuat! 🔑`, 'success');

  renderRiwayatKunci();
}

/** Render tabel riwayat kunci */
function renderRiwayatKunci() {
  const container = document.getElementById('riwayatKunci');
  if (kunciHistory.length === 0) {
    container.innerHTML = `<p class="text-sm text-gray-400 text-center py-3">Belum ada kunci yang di-generate</p>`;
    return;
  }

  container.innerHTML = kunciHistory.slice(0, 6).map(k => `
    <div class="flex items-center justify-between p-3 bg-cream rounded-xl border border-light">
      <div>
        <p class="text-sm font-semibold text-gray-800">${k.nama}</p>
        <p class="text-xs text-gray-500">Kamar ${k.kamar} · ${k.waktu}</p>
      </div>
      <div class="text-right">
        <p class="font-mono font-bold text-primary text-sm">${k.kode}</p>
        <p class="text-xs text-gray-400">s/d ${formatDate(k.berlaku)}</p>
      </div>
    </div>
  `).join('');
}

/** Salin kode kunci ke clipboard */
function copyKunci() {
  const kode = document.getElementById('kunciCode').textContent;
  if (!kode) return;

  // Gunakan Clipboard API jika tersedia, fallback ke execCommand
  if (navigator.clipboard) {
    navigator.clipboard.writeText(kode).then(() => {
      showToast('Kode kunci disalin! 📋', 'success');
    });
  } else {
    const el = document.createElement('textarea');
    el.value = kode;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast('Kode kunci disalin! 📋', 'success');
  }
}

/** Simulasi kirim kunci ke tamu */
function kirimKunci() {
  const nama = document.getElementById('kunciNama').textContent;
  const kode = document.getElementById('kunciCode').textContent;
  showToast(`Kunci ${kode} telah dikirim ke ${nama} via SMS & Email! 📤`, 'info');
  addNotifikasi('key', `Kunci digital ${kode} berhasil dikirim ke ${nama}.`);
}

/**
 * Render QR code sederhana dengan SVG pattern
 * @param {string} text
 * @returns {string} HTML string
 */
function renderQRPlaceholder(text) {
  // Membuat grid QR code sederhana menggunakan SVG
  const size = 80;
  const cell = 8;
  const cols = Math.floor(size / cell);
  let rects  = '';

  // Seed berdasarkan teks untuk konsistensi
  let seed = text.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = () => { seed = (seed * 1664525 + 1013904223) & 0xFFFFFFFF; return (seed >>> 0) / 0xFFFFFFFF; };

  for (let row = 0; row < cols; row++) {
    for (let col = 0; col < cols; col++) {
      // Pola tetap di sudut
      if ((row < 2 && col < 2) || (row < 2 && col >= cols - 2) || (row >= cols - 2 && col < 2)) {
        rects += `<rect x="${col * cell}" y="${row * cell}" width="${cell}" height="${cell}" fill="white" />`;
        continue;
      }
      if (rand() > 0.5) {
        rects += `<rect x="${col * cell}" y="${row * cell}" width="${cell}" height="${cell}" fill="white" />`;
      }
    }
  }

  return `<svg width="${size}" height="${size}" style="border-radius:6px;background:#1f2328">
    ${rects}
  </svg>`;
}


/* =========================================
   SECTION 10: PEMBAYARAN
   ========================================= */

function initPembayaran() {
  // Populate dropdown reservasi yang belum bayar + yang sudah (untuk riwayat)
  const select   = document.getElementById('selectReservasiPembayaran');
  const unpaid   = tamuList.filter(t => !t.sudahBayar);

  select.innerHTML = '<option value="">-- Pilih reservasi --</option>' +
    unpaid.map(t => `<option value="${t.id}">${t.id} — ${t.nama} (${formatTipe(t.tipeKamar)})</option>`).join('');

  // Bind payment method buttons
  document.querySelectorAll('.payment-method-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.payment-method-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      btn.querySelector('input[type="radio"]').checked = true;
    });
  });

  renderRiwayatPembayaran();
}

/** Tampilkan info tagihan saat reservasi dipilih */
function loadBiayaReservasi() {
  const id   = document.getElementById('selectReservasiPembayaran').value;
  const area = document.getElementById('infoTagihanArea');

  if (!id) { area.classList.add('hidden'); return; }

  const tamu = tamuList.find(t => t.id === id);
  if (!tamu) return;

  const malam = Math.ceil((new Date(tamu.tglCheckout) - new Date(tamu.tglCheckin)) / (1000 * 60 * 60 * 24));

  area.classList.remove('hidden');
  document.getElementById('tagihanNama').textContent   = tamu.nama;
  document.getElementById('tagihanKamar').textContent  = `${tamu.nomorKamar} (${formatTipe(tamu.tipeKamar)})`;
  document.getElementById('tagihanDurasi').textContent = `${malam} malam`;
  document.getElementById('tagihanTotal').textContent  = `Rp ${formatRupiah(tamu.totalBayar)}`;
}

/** Proses pembayaran */
function prosesPembayaran(e) {
  e.preventDefault();

  const id     = document.getElementById('selectReservasiPembayaran').value;
  const metode = document.querySelector('input[name="metodePembayaran"]:checked');

  if (!id)    { showToast('Pilih reservasi terlebih dahulu!', 'error'); return; }
  if (!metode){ showToast('Pilih metode pembayaran!', 'error'); return; }

  const tamu = tamuList.find(t => t.id === id);
  if (!tamu) return;

  // Simulasi loading
  const btn = document.querySelector('#pembayaranForm button[type="submit"]');
  btn.textContent = '⏳ Memproses...';
  btn.disabled = true;

  setTimeout(() => {
    // Update data tamu
    tamu.sudahBayar    = true;
    tamu.metodeBayar   = metode.value;
    if (tamu.status === 'reserved') tamu.status = 'checkin';

    addNotifikasi('payment', `Pembayaran Rp ${formatRupiah(tamu.totalBayar)} dari ${tamu.nama} telah diterima via ${metode.value}.`);
    showToast(`Pembayaran Rp ${formatRupiah(tamu.totalBayar)} berhasil! 🎉`, 'success');

    btn.textContent = '✅ Proses Pembayaran';
    btn.disabled    = false;

    // Reset form & reload
    document.getElementById('selectReservasiPembayaran').value = '';
    document.getElementById('infoTagihanArea').classList.add('hidden');
    document.querySelectorAll('.payment-method-btn').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('input[name="metodePembayaran"]').forEach(r => r.checked = false);

    renderRiwayatPembayaran();
    initPembayaran();
  }, 1500);
}

/** Render riwayat pembayaran */
function renderRiwayatPembayaran() {
  const container = document.getElementById('riwayatPembayaran');
  const paid      = tamuList.filter(t => t.sudahBayar);

  document.getElementById('totalPembayaranBadge').textContent = `${paid.length} transaksi`;

  if (paid.length === 0) {
    container.innerHTML = `<p class="text-sm text-gray-400 text-center py-8">Belum ada transaksi</p>`;
    return;
  }

  const metodeIcon = {
    transfer: '🏦', qris: '📱', credit: '💳',
    debit: '💰', ewallet: '📲', tunai: '💵'
  };

  container.innerHTML = [...paid].reverse().map(t => `
    <div class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-cream transition">
      <div class="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-lg flex-shrink-0">
        ${metodeIcon[t.metodeBayar] || '💳'}
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-sm text-gray-800 truncate">${t.nama}</p>
        <p class="text-xs text-gray-400">Kamar ${t.nomorKamar} · ${t.id}</p>
      </div>
      <div class="text-right">
        <p class="font-bold text-sm text-green-600">Rp ${formatRupiah(t.totalBayar)}</p>
        <p class="text-xs text-gray-400">${t.metodeBayar || '-'}</p>
      </div>
    </div>
  `).join('');
}


/* =========================================
   SECTION 11: PROPERTY MANAGEMENT SYSTEM
   ========================================= */

function initPMS() {
  renderTamuTable(tamuList);
}

/** Filter tamu berdasarkan search & status */
function filterTamu() {
  const query  = document.getElementById('searchTamu').value.toLowerCase();
  const status = document.getElementById('statusFilter').value;

  let filtered = [...tamuList];
  if (status !== 'all') filtered = filtered.filter(t => t.status === status);
  if (query)            filtered = filtered.filter(t =>
    t.nama.toLowerCase().includes(query)       ||
    t.nomorKamar.includes(query)               ||
    t.id.toLowerCase().includes(query)
  );

  renderTamuTable(filtered);
}

/** Render tabel tamu */
function renderTamuTable(data) {
  const tbody = document.getElementById('tamuTableBody');

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-10 text-gray-400">
      <div class="text-3xl mb-2">🔍</div>Data tidak ditemukan</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(t => `
    <tr class="border-b border-gray-50">
      <td class="px-4 py-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            ${t.nama.charAt(0)}
          </div>
          <div>
            <p class="font-semibold text-gray-800 text-sm">${t.nama}</p>
            <p class="text-xs text-gray-400">${t.email}</p>
          </div>
        </div>
      </td>
      <td class="px-4 py-3">
        <p class="font-semibold text-sm">${t.nomorKamar}</p>
        <p class="text-xs text-gray-400">${formatTipe(t.tipeKamar)}</p>
      </td>
      <td class="px-4 py-3 text-sm text-gray-600">${formatDate(t.tglCheckin)}</td>
      <td class="px-4 py-3 text-sm text-gray-600">${formatDate(t.tglCheckout)}</td>
      <td class="px-4 py-3">
        <span class="${getBadgeClass(t.status)}">${getStatusLabel(t.status)}</span>
      </td>
      <td class="px-4 py-3">
        <div class="flex gap-1">
          <button onclick="viewTamuDetail('${t.id}')" class="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 text-sm" title="Detail">👁</button>
          <button onclick="checkoutTamu('${t.id}')" class="p-1.5 rounded-lg hover:bg-red-50 text-red-600 text-sm" title="Check-out" ${t.status === 'checkout' ? 'disabled' : ''}>🚪</button>
        </div>
      </td>
    </tr>
  `).join('');
}

/**
 * Tampilkan detail tamu dalam modal
 * @param {string} tamuId
 */
function viewTamuDetail(tamuId) {
  const t = tamuList.find(t => t.id === tamuId);
  if (!t) return;

  const malam = Math.ceil((new Date(t.tglCheckout) - new Date(t.tglCheckin)) / (1000 * 60 * 60 * 24));

  showModal(`
    <div>
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">${t.nama.charAt(0)}</div>
        <div>
          <h3 class="font-bold text-gray-800">${t.nama}</h3>
          <p class="text-sm text-gray-500">${t.id} · ${t.email}</p>
        </div>
        <span class="${getBadgeClass(t.status)} ml-auto">${getStatusLabel(t.status)}</span>
      </div>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">No. Telepon</span><span class="font-semibold">${t.telepon}</span></div>
        <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">No. Identitas</span><span class="font-semibold">${t.noId}</span></div>
        <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Kamar</span><span class="font-semibold">${t.nomorKamar} (${formatTipe(t.tipeKamar)})</span></div>
        <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Durasi Menginap</span><span class="font-semibold">${malam} malam</span></div>
        <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Check-in</span><span class="font-semibold">${formatDate(t.tglCheckin)}</span></div>
        <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Check-out</span><span class="font-semibold">${formatDate(t.tglCheckout)}</span></div>
        <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Total Bayar</span><span class="font-bold text-primary">Rp ${formatRupiah(t.totalBayar)}</span></div>
        <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Status Bayar</span><span class="${t.sudahBayar ? 'text-green-600' : 'text-red-500'} font-semibold">${t.sudahBayar ? '✅ Lunas' : '⏳ Belum'}</span></div>
        <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Verifikasi ID</span><span class="${t.verifikasi ? 'text-green-600' : 'text-yellow-600'} font-semibold">${t.verifikasi ? '✅ Terverifikasi' : '⏳ Belum'}</span></div>
        ${t.catatan ? `<div class="flex justify-between py-2"><span class="text-gray-500">Catatan</span><span class="font-semibold text-right max-w-[200px]">${t.catatan}</span></div>` : ''}
      </div>
    </div>
  `);
}

/**
 * Proses check-out tamu
 * @param {string} tamuId
 */
function checkoutTamu(tamuId) {
  const t = tamuList.find(t => t.id === tamuId);
  if (!t || t.status === 'checkout') return;

  if (!t.sudahBayar) {
    showToast(`${t.nama} belum melakukan pembayaran!`, 'error');
    navigateTo('pembayaran');
    return;
  }

  // Konfirmasi via modal
  showModal(`
    <div class="text-center">
      <span class="text-4xl">🚪</span>
      <h3 class="font-bold text-gray-800 mt-3 mb-2">Konfirmasi Check-Out</h3>
      <p class="text-sm text-gray-500 mb-4">${t.nama} dari kamar ${t.nomorKamar}?</p>
      <button onclick="konfirmasiCheckout('${tamuId}'); closeModal();" class="btn-primary">
        ✅ Ya, Check-Out Sekarang
      </button>
    </div>
  `);
}

/**
 * Konfirmasi dan proses check-out
 * @param {string} tamuId
 */
function konfirmasiCheckout(tamuId) {
  const t = tamuList.find(t => t.id === tamuId);
  if (!t) return;

  t.status = 'checkout';

  // Bebaskan kamar
  const room = roomsData.find(r => r.no === t.nomorKamar);
  if (room) room.status = 'cleaning';

  addNotifikasi('checkout', `${t.nama} telah check-out dari kamar ${t.nomorKamar}.`);
  showToast(`${t.nama} berhasil check-out! Kamar ${t.nomorKamar} dalam proses cleaning. 🧹`, 'success');

  initPMS();
}


/* =========================================
   SECTION 12: NOTIFIKASI
   ========================================= */

function initNotifikasi() {
  renderNotifikasi();
  updateNotifBadge();
}

/** Render daftar notifikasi */
function renderNotifikasi() {
  const container = document.getElementById('notifikasiList');
  document.getElementById('totalNotif').textContent = notifikasiData.length;

  if (notifikasiData.length === 0) {
    container.innerHTML = `<div class="text-center py-16 text-gray-400">
      <p class="text-4xl mb-3">🔔</p><p>Tidak ada notifikasi</p></div>`;
    return;
  }

  const icons = {
    checkin:  '🏨', checkout: '🚪', payment: '💳',
    key:      '🔑', survey:   '⭐', system:  'ℹ️'
  };

  container.innerHTML = notifikasiData.map(n => `
    <div class="notif-item ${n.dibaca ? '' : 'unread'}" onclick="markRead('${n.id}')">
      <div class="flex items-start gap-3">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
             style="background:${n.dibaca ? '#f3f4f6' : '#FFF2E7'}">
          ${icons[n.tipe] || 'ℹ️'}
        </div>
        <div class="flex-1">
          <p class="text-sm ${n.dibaca ? 'text-gray-600' : 'text-gray-800 font-medium'}">${n.pesan}</p>
          <p class="text-xs text-gray-400 mt-1">${n.tanggal} · ${n.waktu}</p>
        </div>
        ${!n.dibaca ? '<span class="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>' : ''}
      </div>
    </div>
  `).join('');
}

/**
 * Tandai notifikasi sebagai dibaca
 * @param {string} id
 */
function markRead(id) {
  const n = notifikasiData.find(n => n.id === id);
  if (n) {
    n.dibaca = true;
    renderNotifikasi();
    updateNotifBadge();
  }
}

/** Hapus semua notifikasi */
function clearAllNotif() {
  notifikasiData = [];
  renderNotifikasi();
  updateNotifBadge();
  showToast('Semua notifikasi dihapus', 'info');
}

/** Update badge count di header dan sidebar */
function updateNotifBadge() {
  const unread = notifikasiData.filter(n => !n.dibaca).length;
  const badge  = document.getElementById('notifBadge');
  if (badge) {
    badge.textContent = unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';
  }
}

/**
 * Tambah notifikasi baru
 * @param {string} tipe
 * @param {string} pesan
 */
function addNotifikasi(tipe, pesan) {
  const now   = new Date();
  const waktu = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  notifikasiData.unshift({
    id:      'N' + Date.now(),
    tipe,
    pesan,
    waktu,
    tanggal: 'Hari ini',
    dibaca:  false,
  });

  updateNotifBadge();
}


/* =========================================
   SECTION 13: SURVEY KEPUASAN
   ========================================= */

function initSurvey() {
  initStarRatings();
  renderSurveyResults();
}

/** Inisialisasi komponen bintang rating */
function initStarRatings() {
  document.querySelectorAll('.star-rating').forEach(container => {
    const key = container.dataset.key;
    container.innerHTML = '';

    for (let i = 1; i <= 5; i++) {
      const btn = document.createElement('button');
      btn.type      = 'button';
      btn.className = 'star-btn';
      btn.textContent = '★';
      btn.dataset.value = i;

      btn.addEventListener('click', () => {
        surveyRatings[key] = i;
        updateStarDisplay(container, i);
      });

      btn.addEventListener('mouseover', () => updateStarDisplay(container, i));
      btn.addEventListener('mouseout',  () => updateStarDisplay(container, surveyRatings[key] || 0));

      container.appendChild(btn);
    }
  });
}

/**
 * Update tampilan bintang
 * @param {HTMLElement} container
 * @param {number} value - 0-5
 */
function updateStarDisplay(container, value) {
  container.querySelectorAll('.star-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx < value);
  });
}

/** Submit survey */
function submitSurvey(e) {
  e.preventDefault();

  const nama   = document.getElementById('surveyNama').value.trim();
  const kamar  = document.getElementById('surveyKamar').value.trim();
  const koment = document.getElementById('surveyKomentar').value.trim();

  // Validasi semua rating diisi
  const keys = ['kebersihan', 'pelayanan', 'fasilitas', 'aplikasi'];
  for (const k of keys) {
    if (!surveyRatings[k]) {
      showToast(`Isi rating "${k}" terlebih dahulu!`, 'warning');
      return;
    }
  }

  // Buat entry baru
  const entry = {
    nama, kamar,
    kebersihan: surveyRatings.kebersihan,
    pelayanan:  surveyRatings.pelayanan,
    fasilitas:  surveyRatings.fasilitas,
    aplikasi:   surveyRatings.aplikasi,
    komentar:   koment,
    tanggal:    new Date().toISOString().split('T')[0],
  };

  surveyData.unshift(entry);

  addNotifikasi('survey', `Survey bintang ${Math.round((entry.kebersihan+entry.pelayanan+entry.fasilitas+entry.aplikasi)/4)} diterima dari ${nama} (Kamar ${kamar}).`);
  showToast('Survey berhasil dikirim! Terima kasih 🌟', 'success');

  // Reset form
  document.getElementById('surveyForm').reset();
  keys.forEach(k => {
    surveyRatings[k] = 0;
    const container = document.querySelector(`.star-rating[data-key="${k}"]`);
    if (container) updateStarDisplay(container, 0);
  });

  renderSurveyResults();
  updateStatCards();
}

/** Render hasil survey */
function renderSurveyResults() {
  const total = surveyData.length;
  document.getElementById('totalSurveyBadge').textContent = `${total} responden`;

  if (total === 0) {
    document.getElementById('avgRatingDisplay').textContent = '0.0';
    document.getElementById('avgStarsDisplay').innerHTML    = '';
    document.getElementById('surveyBars').innerHTML         = '';
    document.getElementById('recentSurveys').innerHTML      = `<p class="text-sm text-gray-400 text-center py-4">Belum ada survey</p>`;
    return;
  }

  // Hitung rata-rata per kategori
  const avgs = {
    kebersihan: average(surveyData.map(s => s.kebersihan)),
    pelayanan:  average(surveyData.map(s => s.pelayanan)),
    fasilitas:  average(surveyData.map(s => s.fasilitas)),
    aplikasi:   average(surveyData.map(s => s.aplikasi)),
  };

  const overallAvg = average(Object.values(avgs));
  document.getElementById('avgRatingDisplay').textContent = overallAvg.toFixed(1);

  // Render bintang rata-rata
  document.getElementById('avgStarsDisplay').innerHTML = renderStarHTML(overallAvg);

  // Render progress bar per kategori
  const labelMap = { kebersihan: '🧹 Kebersihan', pelayanan: '👤 Pelayanan Staff', fasilitas: '🏨 Fasilitas', aplikasi: '📱 Aplikasi E-Check In' };
  document.getElementById('surveyBars').innerHTML = Object.entries(avgs).map(([k, v]) => `
    <div>
      <div class="flex justify-between text-sm mb-1">
        <span class="text-gray-600">${labelMap[k]}</span>
        <span class="font-semibold text-gray-800">${v.toFixed(1)}</span>
      </div>
      <div class="progress-bar">
        <div class="survey-bar-fill" style="width:${(v / 5 * 100).toFixed(0)}%"></div>
      </div>
    </div>
  `).join('');

  // Render ulasan terbaru
  document.getElementById('recentSurveys').innerHTML = surveyData.slice(0, 5).map(s => `
    <div class="bg-cream rounded-xl p-3 border border-light">
      <div class="flex justify-between items-start mb-1">
        <p class="font-semibold text-sm text-gray-800">${s.nama} · Kamar ${s.kamar}</p>
        <span class="text-xs text-yellow-500">${renderStarHTML((s.kebersihan+s.pelayanan+s.fasilitas+s.aplikasi)/4)}</span>
      </div>
      ${s.komentar ? `<p class="text-xs text-gray-500 italic">"${s.komentar}"</p>` : ''}
      <p class="text-xs text-gray-400 mt-1">${formatDate(s.tanggal)}</p>
    </div>
  `).join('');
}

/**
 * Render HTML bintang berdasarkan nilai
 * @param {number} value
 * @returns {string}
 */
function renderStarHTML(value) {
  const full  = Math.floor(value);
  const half  = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}


/* =========================================
   SECTION 14: MODAL
   ========================================= */

/**
 * Tampilkan modal dengan konten HTML
 * @param {string} html
 */
function showModal(html) {
  document.getElementById('modalContent').innerHTML = html;
  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

/** Tutup modal */
function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// Tutup modal saat klik di luar
document.getElementById('modal').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});


/* =========================================
   SECTION 15: TOAST NOTIFICATION
   ========================================= */

/**
 * Tampilkan toast notification
 * @param {string} message
 * @param {'success'|'error'|'warning'|'info'} type
 * @param {number} duration - durasi dalam ms (default 3500)
 */
function showToast(message, type = 'info', duration = 3500) {
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const container = document.getElementById('toastContainer');

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="text-base flex-shrink-0">${icons[type] || 'ℹ️'}</span>
    <span class="flex-1">${message}</span>
    <button onclick="this.parentElement.remove()" class="text-white/70 hover:text-white text-base leading-none ml-1">×</button>
  `;

  container.appendChild(toast);

  // Auto-remove setelah durasi
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}


/* =========================================
   SECTION 16: UTILITY FUNCTIONS
   Fungsi helper yang dipakai di berbagai tempat
   ========================================= */

/**
 * Format angka ke format Rupiah singkat
 * @param {number} num
 * @returns {string}
 */
function formatRupiah(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace('.0', '') + ' jt';
  if (num >= 1000)    return (num / 1000).toFixed(0) + '.000';
  return num.toString();
}

/**
 * Format tanggal ke format Indonesia
 * @param {string} dateStr - format YYYY-MM-DD
 * @returns {string}
 */
function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Format nama tipe kamar
 * @param {string} tipe
 * @returns {string}
 */
function formatTipe(tipe) {
  const map = { standard: 'Standard', deluxe: 'Deluxe', suite: 'Suite', president: 'Presidential' };
  return map[tipe] || tipe;
}

/**
 * Dapatkan class CSS badge berdasarkan status
 * @param {string} status
 * @returns {string}
 */
function getBadgeClass(status) {
  const map = { checkin: 'badge-checkin', checkout: 'badge-checkout', reserved: 'badge-reserved' };
  return map[status] || 'badge-reserved';
}

/**
 * Dapatkan label teks status
 * @param {string} status
 * @returns {string}
 */
function getStatusLabel(status) {
  const map = { checkin: '● Check-in', checkout: '● Check-out', reserved: '● Reserved' };
  return map[status] || status;
}

/**
 * Hitung rata-rata array angka
 * @param {number[]} arr
 * @returns {number}
 */
function average(arr) {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}


/* =========================================
   SECTION 17: INIT (ENTRY POINT)
   Dijalankan saat DOM siap
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Bind nav menu
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(item.dataset.page);
    });
  });

  // Start clock
  updateClock();
  setInterval(updateClock, 1000);

  // Inisialisasi halaman pertama
  initDashboard();

  // Inisialisasi form reservasi
  initReservasi();

  console.log('✅ E-Check In Hotel berhasil dimuat!');
});
