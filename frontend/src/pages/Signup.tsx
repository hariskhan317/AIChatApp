import {
  Paper,
  TextField,
  Box,
  Grid,
  Button,
  Typography
} from '@mui/material'  
export default function Signup() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log('name', name);
    console.log('email', email);
    console.log('password', password);
  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}>
      <Paper sx={{width: 1/3, marginTop:'100px'}} elevation={3}>
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

            <Button sx={{ width: '100%', marginTop: '30px' }} type="submit" variant="contained" size="large">Login</Button>
          </Box>
        </form>
      </Paper>
    </Grid>
  )
}
