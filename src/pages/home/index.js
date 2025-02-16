import { useEffect, useState } from "react";
import NavBar from "../../components/navbar";
import NoteModel from "../../components/model";
import axios from "axios";
import NoteCard from "../../components/note-card";
import { Box, Grid } from "@mui/system";
import { circleButtonStyle } from "./styles.js";
import { toast } from "react-toastify";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null); // editing a note

  const [filteredNotes, setFilteredNotes] = useState(null);
  const [query, setQuery] = useState("");

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/note", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error, "error on fetching notes");
    }
  };

  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log(error, "error >>> 1");
    }
  };

  const onEdit = (note) => {
    setModalOpen(true);
    setCurrentNote(note);
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log(error, "error >>> 1");
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("note deleted!");
        fetchNotes();
      }
    } catch (error) {
      console.log(error, "error >>> 1");
    }
  };

  return (
    <div>
      <NavBar setQuery={setQuery} />
      <Box sx={{ px: 4, minHeight: "100vh", marginTop: 4, gap: 2 }}>
        <Grid container spacing={3}>
          {filteredNotes?.length > 0 ? (
            filteredNotes?.map((note) => (
              <Grid item xs={12} md={5} key={note.id}>
                {/* 1 column on small screens, 3 on medium+ */}
                <NoteCard note={note} onEdit={onEdit} deleteNote={deleteNote} />
              </Grid>
            ))
          ) : (
            <div>
              <p>No notes found!</p>
            </div>
          )}
        </Grid>
      </Box>
      <button
        style={circleButtonStyle}
        onClick={() => setModalOpen(true)}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        onMouseDown={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
      >
        +
      </button>
      {isModalOpen && (
        <NoteModel
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
