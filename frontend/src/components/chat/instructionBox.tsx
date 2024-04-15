import { Typography, Paper, Avatar, Button } from '@mui/material' 
import { useAuth } from '../../context/AuthContext'

interface BoxProps {
  handleDelete: () => void;
}

const instructionBox:React.FC<BoxProps>  = ({ handleDelete }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const auth = useAuth();
  return (
    <Paper sx={{padding: '40px 20px',textAlign:'center', height: '60vh' }} elevation={3}>
      <Avatar sx={{ margin: 'auto', bgcolor: 'green' }}>N</Avatar>
      <Typography variant="h6" sx={{ marginTop: 2, textTransform:'capitalize' }}>Hey {auth?.user?.name}</Typography>
        <Typography variant="h6" sx={{marginTop: 2}}>Youre taling to Chat Bot</Typography>
        <Typography sx={{marginTop: 4, textAlign:'left'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ad iste quibusdam possimus corporis? Incidunt perferendis soluta recusandae vel quo! Officiis modi ad nam enim culpa deleniti mollitia voluptatibus quas.</Typography>  
        <Button onClick={handleDelete} sx={{marginTop: 14}} variant="contained" color="error">Clear Conversation</Button>
    </Paper>
  )
}

export default instructionBox;