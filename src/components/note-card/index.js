import { FaEdit, FaTrash } from "react-icons/fa";
import { Card, CardContent, Typography, IconButton } from "@mui/material";

const NoteCard = ({ note , onEdit, deleteNote}) => {
  return (
    <Card
      sx={{
        backgroundColor: "white",
        boxShadow: 2,
        borderRadius: 2,
        padding: 2,
        minWidth: 275,
        maxWidth: 350,
        margin: "10px",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {note.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {note.description}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
            gap: "8px",
          }}
        >
          <IconButton color="primary" onClick={() => onEdit(note)}>
            <FaEdit />
          </IconButton>
          <IconButton color="error" onClick={() => deleteNote(note._id)}>
            <FaTrash />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
