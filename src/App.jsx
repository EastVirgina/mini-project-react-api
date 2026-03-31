import { useState, useEffect } from 'react'

function App() {
  const [posts, setPosts] = useState([]); // Pastikan pakai []
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState("");

const getData = async () => {
  try {
    setLoading(true);
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const hasil = await response.json();
    setPosts(hasil); 
    setLoading(false);
  } catch (error) {
    console.error("Gagal ambil data:", error);
    setLoading(false);
  }
};

useEffect(() => {
    getData();
  }, []);

  // Baris "if (loading) return" SUDAH DIHAPUS

  const filteredPosts = posts.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">Daftar Tugas Hari Ini</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari tugas..."
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center animate-pulse">Memuat daftar tugas...</p>
        ) : (
          <div className="grid gap-4">
            {/* Pakai filteredPosts di sini */}
            {filteredPosts.slice(0, 10).map((item) => (
              <div 
                key={item.id} 
                className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center hover:bg-slate-750 transition"
              >
                <span className="capitalize">{item.title}</span>
                {item.completed ? (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Selesai</span>
                ) : (
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Proses</span>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Pesan jika tidak ada hasil cari */}
        {!loading && filteredPosts.length === 0 && (
          <p className="text-center text-slate-500 italic mt-4">Tugas tidak ditemukan...</p>
        )}

        <button onClick={getData} className="mt-8 block mx-auto bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold">
          Refresh Daftar
        </button>
      </div>
    </div>
  );
}

export default App