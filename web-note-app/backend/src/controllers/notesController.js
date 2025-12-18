import { Note } from "../model/Note.js";

export async function getNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getNotes controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getNoteById(req, res) {
  try {
    const idNote = await Note.findById(req.params.id);
    res.status(200).json(idNote);
    if (!idNote)
      return res.status(404).json({
        message: "Note Not Found",
      });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function updateNote(req, res) {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body is empty",
      });
    }
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({
        message: "Note Not Found",
      });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({
        message: "Note Not Found",
      });
    }
    res.status(200).json({ message: "Note Deleted Successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
