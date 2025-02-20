import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Divider,
  IconButton,
  Badge
} from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import MailIcon from "@mui/icons-material/Mail";
import DraftsIcon from "@mui/icons-material/Drafts";

const Messages = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Support Technique",
      subject: "Problème de connexion résolu",
      content: "Votre problème de connexion a été résolu...",
      timestamp: "2023-09-20 10:30",
      read: false
    },
    {
      id: 2,
      sender: "Équipe Marketing",
      subject: "Nouvelle campagne publicitaire",
      content: "Nous vous présentons notre nouvelle campagne...",
      timestamp: "2023-09-19 15:45",
      read: true
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState({
    to: "",
    subject: "",
    body: ""
  });

  const handleSendMessage = () => {
    if (newMessage.to && newMessage.body) {
      const sentMessage = {
        id: messages.length + 1,
        sender: "Moi",
        subject: newMessage.subject || "(sans objet)",
        content: newMessage.body,
        timestamp: new Date().toLocaleString(),
        read: true
      };
      
      setMessages([sentMessage, ...messages]);
      setNewMessage({ to: "", subject: "", body: "" });
    }
  };

  const MessageList = () => (
    <List sx={{ width: "100%", bgcolor: colors.primary[400] }}>
      {messages.map((message) => (
        <ListItem
          button
          key={message.id}
          onClick={() => setSelectedMessage(message)}
          sx={{
            bgcolor: message.read ? colors.primary[400] : colors.blueAccent[800],
            "&:hover": { bgcolor: colors.blueAccent[700] }
          }}
        >
          <IconButton>
            <Badge color="error" variant="dot" invisible={message.read}>
              {message.read ? <DraftsIcon /> : <MailIcon />}
            </Badge>
          </IconButton>
          <ListItemText
            primary={
              <Typography variant="h6" color={colors.grey[100]}>
                {message.sender}
              </Typography>
            }
            secondary={
              <>
                <Typography variant="body2" sx={{ color: colors.greenAccent[500] }}>
                  {message.subject}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.grey[400] }}>
                  {message.content.substring(0, 40)}...
                </Typography>
              </>
            }
          />
          <Typography variant="caption" sx={{ color: colors.grey[400] }}>
            {message.timestamp}
          </Typography>
        </ListItem>
      ))}
    </List>
  );

  const MessageViewer = () => (
    <Box sx={{ p: 3, bgcolor: colors.primary[400], height: "100%" }}>
      {selectedMessage ? (
        <>
          <Typography variant="h3" sx={{ color: colors.grey[100], mb: 2 }}>
            {selectedMessage.subject}
          </Typography>
          <Typography variant="h5" sx={{ color: colors.greenAccent[400], mb: 2 }}>
            De: {selectedMessage.sender}
          </Typography>
          <Typography variant="body1" sx={{ color: colors.grey[100], whiteSpace: "pre-wrap" }}>
            {selectedMessage.content}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" sx={{ color: colors.grey[100] }}>
          Sélectionnez un message pour le lire
        </Typography>
      )}
    </Box>
  );

  const ComposeForm = () => (
    <Box sx={{ p: 3, bgcolor: colors.primary[400], mt: 2 }}>
      <Typography variant="h4" sx={{ color: colors.grey[100], mb: 2 }}>
        Nouveau Message
      </Typography>
      <TextField
        fullWidth
        label="Destinataire"
        value={newMessage.to}
        onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
        sx={{ mb: 2, bgcolor: colors.primary[900] }}
      />
      <TextField
        fullWidth
        label="Sujet"
        value={newMessage.subject}
        onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
        sx={{ mb: 2, bgcolor: colors.primary[900] }}
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Message"
        value={newMessage.body}
        onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
        sx={{ mb: 2, bgcolor: colors.primary[900] }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={handleSendMessage}
        sx={{
          bgcolor: colors.blueAccent[600],
          "&:hover": { bgcolor: colors.blueAccent[700] }
        }}
      >
        Envoyer
      </Button>
    </Box>
  );

  return (
    <Box m="20px">
      <Header title="MESSAGERIE" subtitle="Boîte de réception et envoi" />
      
      <Box
        sx={{
          display: "flex",
          gap: 2,
          height: "75vh",
          flexDirection: { xs: "column", md: "row" }
        }}
      >
        <Box sx={{ width: { md: "35%" }, height: "100%" }}>
          <MessageList />
        </Box>
        
        <Box sx={{ width: { md: "65%" }, height: "100%" }}>
          <MessageViewer />
        </Box>
      </Box>

      <ComposeForm />
    </Box>
  );
};

export default Messages;