import { useState } from "react";
import { FILE_API } from "../api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    setLoading(true);
    await fetch(`${FILE_API}/upload`, {
      method: "POST",
      body: formData,
    });
    setLoading(false);
    setFile(null);
    window.location.reload();
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <button disabled={loading}>
        {loading ? "Uploading..." : "Add Memory"}
      </button>
    </form>
  );
}
