import { useEffect, useState } from "react";
import { FILE_API, API_BASE } from "../api";

export default function MemoryGrid() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMemories = async () => {
    try {
      const res = await fetch(FILE_API);
      const data = await res.json();
      setMemories(data);
    } catch (error) {
      console.error("Failed to fetch memories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${FILE_API}/${id}`, {
      method: "DELETE",
    });
    fetchMemories();
  };

  if (loading) return <p>Loading memories...</p>;

  return (
    <div className="grid">
      {memories.map((m) => (
        <div className="card" key={m._id}>
          <img src={`${API_BASE}/uploads/${m.id}`} alt={m.name} />
          <p>{m.name}</p>
          <button onClick={() => handleDelete(m._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
