# Instruksi untuk Programmer Web — Integrasi Unity AR + Admin Dashboard

## Ringkasan

Dokumen ini berisi instruksi lengkap untuk programmer web agar web app dan Unity berjalan sinkron. Ada **3 tugas utama**:

1. **Input Nama Pengunjung** → kirim ke Unity
2. **Admin Dashboard** → baca data dari Firestore
3. **Update Firestore Rules** → agar admin bisa baca data

---

## Kredensial & Config yang Dipakai

Semua config ini **sudah hardcoded di Unity**, jadi harus pakai yang sama persis:

| Key | Value |
|-----|-------|
| **Firebase Project ID** | `ar-monumen-mandala` |
| **Firebase API Key** | `AIzaSyDawSueUpF5HTB_Ak-trxjdk6Quml3_qCU` |
| **Firestore Collection** | `sessions` |
| **Admin Username** | `admin` |
| **Admin Password** | `admin` |

---

## Struktur Data di Firestore

Unity mengirim data ke collection `sessions` dengan format berikut:

```
Firestore Database
└── sessions (collection)
    └── {auto-generated-id} (document)
        ├── namaLengkap: "Budi Santoso"         (stringValue)
        ├── sessionDuration: "12m 34s"           (stringValue)
        ├── interactionData: "[{...}]"           (stringValue — JSON string)
        └── timestamp: "2026-09-14T10:25:00Z"    (timestampValue)
```

### Format `interactionData` (JSON string di dalam field)

Ini adalah string JSON yang berisi array. Contoh:

```json
[
  {
    "type": "ar_view",
    "targetId": "Diorama_Pembentukan_Komando_Mandala",
    "timestamp": "2026-09-14T10:05:30.123Z"
  },
  {
    "type": "history_view",
    "targetId": "Diorama_Masa_Transisi_UNTEA",
    "timestamp": "2026-09-14T10:08:15.456Z"
  }
]
```

| `type` | Artinya |
|--------|---------|
| `ar_view` | Pengunjung menekan tombol "Tampilkan AR" untuk melihat diorama 3D |
| `history_view` | Pengunjung menekan tombol "Sejarah" untuk membaca informasi sejarah |

---

## Tugas 1: Input Nama Pengunjung dan Kirim ke Unity

### Alur
1. Web menampilkan form input nama (misal di halaman utama atau popup).
2. Setelah pengunjung isi nama dan klik tombol "Mulai", web mengirim nama ke Unity.
3. Unity menerima nama dan mulai merekam sesi.

### Cara Kirim Data dari Web ke Unity

Unity menggunakan plugin **gree/unity-webview**. Komunikasi dari **web ke Unity** menggunakan fungsi `Unity.call()`:

```javascript
// Kirim nama pengunjung ke Unity
// Format: "SetUserName:NamaOrangnya"
function kirimNamaKeUnity(nama) {
    if (window.Unity) {
        Unity.call('SetUserName:' + nama);
    }
}
```

> **PENTING**: Perubahan di sisi Unity (`WebViewController.cs` dan `ARUIBootstrap.cs`) sudah diurus oleh saya. Lihat bagian "Perubahan Unity" di bawah untuk referensi.

### Contoh Implementasi di Web (HTML + JS)

```html
<!-- Taruh di halaman web yang memuat Unity -->
<div id="form-nama" style="position:fixed; top:0; left:0; right:0; bottom:0; 
    background:rgba(0,0,0,0.8); z-index:9999; display:flex; align-items:center; justify-content:center;">
    <div style="background:#1a1a2e; padding:30px; border-radius:15px; text-align:center; color:white;">
        <h2>Selamat Datang!</h2>
        <p>Masukkan nama Anda untuk memulai</p>
        <input type="text" id="input-nama" placeholder="Nama lengkap..." 
               style="padding:10px; border-radius:8px; border:none; width:250px; font-size:16px;">
        <br><br>
        <button onclick="mulaiSesi()" 
                style="padding:10px 30px; background:#185ba3; color:white; border:none; 
                       border-radius:8px; font-size:16px; cursor:pointer;">
            Mulai Jelajah
        </button>
    </div>
</div>

<script>
function mulaiSesi() {
    var nama = document.getElementById('input-nama').value || 'Anonim';
    
    // Kirim nama ke Unity
    if (window.Unity) {
        Unity.call('SetUserName:' + nama);
    }
    
    // Sembunyikan form
    document.getElementById('form-nama').style.display = 'none';
}
</script>
```

---

## Tugas 2: Update Firestore Security Rules

Agar admin dashboard bisa membaca data, Firestore rules harus diupdate.

1. Buka **Firebase Console** → **Firestore Database** → tab **"Rules"**
2. **Ganti** isi rules menjadi:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Sessions: siapapun boleh TULIS (dari Unity app), siapapun boleh BACA (dari admin web)
    match /sessions/{sessionId} {
      allow create: if true;
      allow update: if true;
      allow read: if true;
    }
  }
}
```

3. Klik **"Publish"**

> **Catatan**: Untuk skripsi ini cukup aman. Untuk produksi nyata, gunakan Firebase Auth agar hanya admin yang bisa read.

---

## Tugas 3: Buat Halaman Admin Dashboard

### Spesifikasi
- **URL**: `/admin.html` (atau halaman terpisah)
- **Login**: Username `admin`, Password `admin` (simple client-side check)
- **Fitur**: Tabel yang menampilkan semua sesi pengunjung dari Firestore
- **Data yang ditampilkan**: Nama, Waktu, Durasi, dan Log Aktivitas

### Halaman Admin Lengkap (Copy-Paste Langsung)

Buat file `admin.html` dan isi dengan kode berikut:

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard — AR Monumen Mandala</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #0f0f1a;
            color: #e0e0e0;
            min-height: 100vh;
        }

        /* LOGIN */
        .login-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.92);
            display: flex; align-items: center; justify-content: center;
            z-index: 100;
        }
        .login-box {
            background: #1a1a2e;
            padding: 40px;
            border-radius: 16px;
            text-align: center;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .login-box h2 { margin-bottom: 20px; color: #42bff5; }
        .login-box input {
            display: block;
            width: 260px;
            padding: 12px 16px;
            margin: 10px auto;
            border-radius: 8px;
            border: 1px solid rgba(255,255,255,0.2);
            background: #0f0f1a;
            color: white;
            font-size: 15px;
        }
        .login-box button {
            margin-top: 16px;
            padding: 12px 40px;
            background: #185ba3;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
        }
        .login-box button:hover { background: #2e72be; }
        .login-error { color: #ff6b6b; margin-top: 10px; font-size: 14px; }

        /* DASHBOARD */
        .dashboard { display: none; padding: 24px; max-width: 1200px; margin: 0 auto; }
        .dashboard.active { display: block; }
        .dashboard h1 { color: #42bff5; margin-bottom: 8px; }
        .dashboard .subtitle { color: rgba(255,255,255,0.5); margin-bottom: 24px; }

        .stats-row {
            display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;
        }
        .stat-card {
            flex: 1; min-width: 180px;
            background: #1a1a2e;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            padding: 20px;
        }
        .stat-card .label { font-size: 13px; color: rgba(255,255,255,0.5); }
        .stat-card .value { font-size: 28px; font-weight: bold; color: #42bff5; margin-top: 4px; }

        .btn-refresh {
            padding: 10px 24px;
            background: #185ba3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            margin-bottom: 16px;
            font-size: 14px;
        }
        .btn-refresh:hover { background: #2e72be; }

        table {
            width: 100%;
            border-collapse: collapse;
            background: #1a1a2e;
            border-radius: 12px;
            overflow: hidden;
        }
        th {
            background: #185ba3;
            padding: 14px 16px;
            text-align: left;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        td {
            padding: 12px 16px;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            font-size: 14px;
        }
        tr:hover td { background: rgba(66, 191, 245, 0.05); }

        .badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
        }
        .badge-ar { background: rgba(66, 191, 245, 0.2); color: #42bff5; }
        .badge-history { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }

        .log-list { list-style: none; padding: 0; }
        .log-list li {
            padding: 4px 0;
            font-size: 13px;
            color: rgba(255,255,255,0.7);
        }
        .log-list li .log-time {
            color: rgba(255,255,255,0.4);
            font-size: 11px;
            margin-left: 8px;
        }

        .empty-msg {
            text-align: center;
            padding: 40px;
            color: rgba(255,255,255,0.3);
            font-size: 16px;
        }
        .loading { text-align: center; padding: 40px; color: #42bff5; }
    </style>
</head>
<body>

<!-- ============ LOGIN ============ -->
<div class="login-overlay" id="login-overlay">
    <div class="login-box">
        <h2>Admin Login</h2>
        <input type="text" id="login-user" placeholder="Username">
        <input type="password" id="login-pass" placeholder="Password" 
               onkeypress="if(event.key==='Enter') doLogin()">
        <button onclick="doLogin()">Masuk</button>
        <div class="login-error" id="login-error"></div>
    </div>
</div>

<!-- ============ DASHBOARD ============ -->
<div class="dashboard" id="dashboard">
    <h1>Admin Dashboard</h1>
    <p class="subtitle">AR Monumen Mandala — Data Pengunjung</p>

    <div class="stats-row">
        <div class="stat-card">
            <div class="label">Total Pengunjung</div>
            <div class="value" id="stat-total">-</div>
        </div>
        <div class="stat-card">
            <div class="label">Total Klik AR</div>
            <div class="value" id="stat-ar">-</div>
        </div>
        <div class="stat-card">
            <div class="label">Total Klik Sejarah</div>
            <div class="value" id="stat-history">-</div>
        </div>
    </div>

    <button class="btn-refresh" onclick="loadData()">Refresh Data</button>

    <div id="table-container">
        <div class="loading">Memuat data...</div>
    </div>
</div>

<script>
    // ============ CONFIG (HARUS SAMA DENGAN UNITY) ============
    const FIREBASE_PROJECT_ID = 'ar-monumen-mandala';
    const FIREBASE_API_KEY = 'AIzaSyDawSueUpF5HTB_Ak-trxjdk6Quml3_qCU';
    const FIRESTORE_BASE = 'https://firestore.googleapis.com/v1/projects/' 
        + FIREBASE_PROJECT_ID + '/databases/(default)/documents';

    // ============ LOGIN ============
    function doLogin() {
        var user = document.getElementById('login-user').value;
        var pass = document.getElementById('login-pass').value;
        
        if (user === 'admin' && pass === 'admin') {
            document.getElementById('login-overlay').style.display = 'none';
            document.getElementById('dashboard').classList.add('active');
            loadData();
        } else {
            document.getElementById('login-error').textContent = 'Username atau password salah!';
        }
    }

    // ============ FETCH DATA DARI FIRESTORE ============
    function loadData() {
        var container = document.getElementById('table-container');
        container.innerHTML = '<div class="loading">Memuat data...</div>';

        var url = FIRESTORE_BASE + '/sessions?key=' + FIREBASE_API_KEY + '&pageSize=200';
        
        fetch(url)
            .then(function(response) { return response.json(); })
            .then(function(data) {
                if (!data.documents || data.documents.length === 0) {
                    container.innerHTML = '<div class="empty-msg">Belum ada data pengunjung.</div>';
                    updateStats(0, 0, 0);
                    return;
                }

                var totalAR = 0;
                var totalHistory = 0;
                var rows = '';

                // Urutkan berdasarkan timestamp (terbaru dulu)
                data.documents.sort(function(a, b) {
                    var tA = a.fields.timestamp ? a.fields.timestamp.timestampValue : '';
                    var tB = b.fields.timestamp ? b.fields.timestamp.timestampValue : '';
                    return tB.localeCompare(tA);
                });

                data.documents.forEach(function(doc, index) {
                    var fields = doc.fields;
                    var nama = (fields.namaLengkap && fields.namaLengkap.stringValue) || 'Anonim';
                    var durasi = (fields.sessionDuration && fields.sessionDuration.stringValue) || '-';
                    var ts = (fields.timestamp && fields.timestamp.timestampValue) || '';
                    var waktu = ts ? new Date(ts).toLocaleString('id-ID') : '-';

                    // Parse interaction data
                    var interactions = [];
                    try {
                        var raw = (fields.interactionData && fields.interactionData.stringValue) || '[]';
                        interactions = JSON.parse(raw);
                    } catch(e) { }

                    // Count stats
                    interactions.forEach(function(i) {
                        if (i.type === 'ar_view') totalAR++;
                        if (i.type === 'history_view') totalHistory++;
                    });

                    // Build log HTML
                    var logHtml = '';
                    if (interactions.length > 0) {
                        logHtml = '<ul class="log-list">';
                        interactions.forEach(function(i) {
                            var badge = i.type === 'ar_view' 
                                ? '<span class="badge badge-ar">AR</span>' 
                                : '<span class="badge badge-history">Sejarah</span>';
                            var logTime = i.timestamp 
                                ? new Date(i.timestamp).toLocaleTimeString('id-ID') 
                                : '';
                            var targetName = (i.targetId || '').replace(/_/g, ' ');
                            logHtml += '<li>' + badge + ' ' + targetName + ' <span class="log-time">' + logTime + '</span></li>';
                        });
                        logHtml += '</ul>';
                    } else {
                        logHtml = '<span style="color:rgba(255,255,255,0.3)">Tidak ada aktivitas</span>';
                    }

                    rows += '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td><strong>' + nama + '</strong></td>' +
                        '<td>' + waktu + '</td>' +
                        '<td>' + durasi + '</td>' +
                        '<td>' + interactions.length + '</td>' +
                        '<td>' + logHtml + '</td>' +
                        '</tr>';
                });

                container.innerHTML = 
                    '<table>' +
                    '<thead><tr>' +
                    '<th>#</th>' +
                    '<th>Nama Pengunjung</th>' +
                    '<th>Waktu</th>' +
                    '<th>Durasi</th>' +
                    '<th>Jumlah Interaksi</th>' +
                    '<th>Log Aktivitas</th>' +
                    '</tr></thead>' +
                    '<tbody>' + rows + '</tbody>' +
                    '</table>';

                updateStats(data.documents.length, totalAR, totalHistory);
            })
            .catch(function(error) {
                container.innerHTML = '<div class="empty-msg">Gagal memuat data: ' + error.message + '</div>';
                console.error('Fetch error:', error);
            });
    }

    function updateStats(total, ar, history) {
        document.getElementById('stat-total').textContent = total;
        document.getElementById('stat-ar').textContent = ar;
        document.getElementById('stat-history').textContent = history;
    }
</script>

</body>
</html>
```

---

## Checklist Programmer Web

- [ ] **Tambahkan form input nama** di halaman web yang memuat Unity
- [ ] **Panggil `Unity.call('SetUserName:NamaPengunjung')`** setelah user isi nama
- [ ] **Update Firestore Rules** agar `allow read: if true` pada collection `sessions`
- [ ] **Buat file `admin.html`** menggunakan kode di atas
- [ ] **Test**: Buka app → isi nama → gunakan AR/Sejarah → buka admin.html → cek data muncul

---

## Diagram Alur Data

```
┌──────────────┐     Unity.call('SetUserName:Budi')     ┌──────────────────┐
│   Web App    │ ──────────────────────────────────────► │  Unity (WebView) │
│  (HTML/JS)   │                                        │                  │
│              │     Pengunjung pakai AR / Sejarah       │  SessionManager  │
│  Form Nama   │                                        │  LogInteraction  │
└──────────────┘                                        └────────┬─────────┘
                                                                 │
                                                   EndAndUploadSession()
                                                                 │
                                                    POST ke Firestore REST API
                                                                 │
                                                                 ▼
                                                    ┌──────────────────────┐
                                                    │   Firebase Firestore │
                                                    │   Collection:        │
                                                    │   "sessions"         │
                                                    └──────────┬───────────┘
                                                               │
                                                    GET (Firestore REST API)
                                                               │
                                                               ▼
                                                    ┌──────────────────────┐
                                                    │   admin.html         │
                                                    │   Dashboard Admin    │
                                                    │   (Baca data sesi)   │
                                                    └──────────────────────┘
```

---

## Perubahan Unity yang Harus Dilakukan (Dikerjakan Programmer Unity)

> Bagian ini **dikerjakan oleh programmer Unity**, bukan programmer web.
> Dicantumkan di sini agar programmer web tahu apa yang terjadi di sisi Unity.

### 1. Update `WebViewController.cs` — Tangkap Nama dari Web

```csharp
cb: (msg) =>
{
    Debug.Log(string.Format("CallFromJS[{0}]", msg));
    
    if (msg.StartsWith("SetUserName:"))
    {
        string nama = msg.Substring("SetUserName:".Length);
        PlayerPrefs.SetString("NamaPengunjung", nama);
        PlayerPrefs.Save();
        Debug.Log("[WebView] Nama pengunjung diterima: " + nama);
    }
    
    if (msg == "LoadVirtualTourScene")
    {
        TutupWebViewDanPindahScene();
    }
},
```

### 2. Update `ARUIBootstrap.cs` — Baca Nama dari PlayerPrefs

```csharp
private void InitializeAnalytics()
{
    if (GameObject.Find("AnalyticsManagers") == null)
    {
        GameObject analyticsObj = new GameObject("AnalyticsManagers");
        var sessionManager = analyticsObj.AddComponent<Analytics.SessionManager>();
        analyticsObj.AddComponent<Analytics.IdleTimeoutManager>();
        
        string nama = PlayerPrefs.GetString("NamaPengunjung", "Anonim");
        sessionManager.StartSession(nama);
        
        Debug.Log("[AR UI] AnalyticsManagers dibuat. Nama: " + nama);
    }
}
```
