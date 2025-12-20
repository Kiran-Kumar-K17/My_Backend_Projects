import Upload from "./components/Upload";
import MemoryGrid from "./components/MemoryGrid";

export default function App() {
  return (
    <div className="container">
      <h1>🧠 Memory Board</h1>
      <Upload />
      <MemoryGrid />
    </div>
  );
}
