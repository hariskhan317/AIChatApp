import InstructionBox from '../components/chat/instructionBox'
import ChatItem from '../components/chat/chatItem'
import { Paper, Grid, Box, Button } from '@mui/material' 
import { MdSend } from "react-icons/md";
import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { sendChatRequest, getAllChats, deleteAllChats } from '../helpers/api-communicator'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type Messages = {
  role: "user" | "assistant",
  content: string,
}

export default function Chat() {
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Messages[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleInput = async () => { 
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    const newMessage: Messages = { role: "user", content }
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDelete = async () => {
    try {
      await deleteAllChats();
      setChatMessages([]);
    } catch (error) {
      console.log(error)
    }
  }

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      getAllChats().then((data) => setChatMessages(data.chats)).catch((error) => console.log(error))
    }
  }, [auth])

  useEffect(() => {
    if (!auth?.user) {
      return navigate('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auth])
  
  return (
    <Grid container sx={{marginTop:'100px', padding: '0px 30px',}} spacing={5}>
      <Grid item xs={3} >
        <InstructionBox handleDelete={handleDelete} />
      </Grid> 
      <Grid item xs={9}>
        <Paper sx={{ padding: '25px 20px', textAlign: 'center' }} elevation={3}>
          <Box sx={{height: '51vh', overflowY: 'scroll'}}>
          {chatMessages.map((chatMessage, index) => (
              <ChatItem key={index} content={chatMessage.content} role={chatMessage.role} />
          ))}
          </Box>
          <Box sx={{position: 'relative', width: '100%', }}>
            <input ref={inputRef} type="text" style={{ width: '100%', padding: '10px 20px', border: '2px solid #bdbdbd', borderRadius: '10px', outline: 'none' }} />
            <Button onClick={handleInput} sx={{position: 'absolute', right:'0%', marginTop: '1px'}}>
              <MdSend size={25} />
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
