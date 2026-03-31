import { useState, useEffect } from 'react'

function App() {
  const [post, setPost] = useState(null) // Untuk simpan data
  const [loading, setLoading] = useState(true) // Untuk status loading

  const getData = async () => {
  try {
    setLoading(true);
    // Kita buat angka acak antara 1 sampai 100
    const randomId = Math.floor(Math.random() * 100) + 1; 
    
    // Gunakan template literal (backtick `) untuk memasukkan ID ke URL
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${randomId}`);
    const hasil = await response.json();
    
    setPost(hasil);
    setLoading(false);
  } catch (error) {
    console.error("Gagal ambil data:", error);
    setLoading(false);
  }
};

  useEffect(() => {
    getData()
  }, [])

  if (loading) return <h1 className="p-10 text-center">Sabar, lagi loading...</h1>

  return (
  <div className="min-h-screen bg-slate-900 text-white p-10 flex flex-col items-center">
    <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 text-center max-w-sm">
      <h1 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2">Task Monitor</h1>
      
      {/* Judul Post */}
      <h2 className="text-2xl font-semibold mb-4 leading-tight italic">
        "{post?.title}"
      </h2>

      {/* Badge Status */}
      <div className={`inline-block px-4 py-1 rounded-full text-sm mb-6 ${post?.completed ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
        {post?.completed ? '● Selesai' : '○ Sedang Berjalan'}
      </div>

      <button 
        onClick={getData}
        className="block w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-all transform active:scale-95"
      >
        Ambil Tugas Acak
      </button>
    </div>
  </div>
  
);
}

export default App