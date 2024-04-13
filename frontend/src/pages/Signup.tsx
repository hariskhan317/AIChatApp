import {
  Paper,
  TextField,
  Box,
  Grid,
  Button,
  Typography
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Signup() {
  const auth = useAuth();
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      //toast.loading('Loading!');
      await auth?.signup(name, email, password);
      toast.success('User signed up successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Error signing up user!');
    }

  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}>
      <Paper sx={{ width: 1 / 3, marginTop: '100px' }} elevation={3}>
        <form onSubmit={handleSubmit}>
          <Box
            component="div"
            style={{
              padding: '40px 50px', 
            }} 
          >
            <Box> 
              <Typography
                variant='h4' 
                sx={{
                  textAlign: 'center',
                  color: '#1976d2',
                  fontWeight: '600'
                }}>INTELLECTRA</Typography>
            </Box>
            <Box>
              <TextField
                required
                name="userName"
                sx={{ width: '100%', marginTop: '30px' }} 
                label="User Name"
                type="text"
                variant="outlined"
              /> 
            </Box>
            <Box>
              <TextField
                required
                name="email"
                sx={{ width: '100%', marginTop: '30px' }} 
                label="Email"
                type="email"
                variant="outlined"
              /> 
            </Box>
            <Box>
              <TextField
                required
                name="password"
                sx={{ width: '100%', marginTop: '30px' }} 
                label="Password"
                type="password"
                variant="outlined" /> 
            </Box>

            <Button sx={{ width: '100%', marginTop: '30px' }} type="submit" variant="contained" size="large">Sign in</Button>
          </Box>
        </form> 
      </Paper>
    </Grid>
  )
}
