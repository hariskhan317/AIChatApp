import {
  Paper,
  TextField,
  Box,
  Grid,
  Button,
  Typography
} from '@mui/material' 

export default function Login() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            component="form"
            sx={{
              padding: '40px 50px',
              '& > *': {
                marginBottom: '40px' // Adding marginBottom to each direct child element
              }
            }}
            noValidate
            autoComplete="off"
          >
            <Box> 
              <Typography variant='h4' sx={{textAlign:'center', color: '#1976d2', fontWeight:'600'}}>INTELLECTRA</Typography>
            </Box>
            <Box>
              <TextField
                required
                sx={{ width: '100%' }}
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
              /> 
            </Box>
            <Box>
              <TextField
                required
                sx={{ width: '100%' }}
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
              /> 
            </Box>

            <Button variant="contained" size="large">Signup</Button>
          </Box>
        </form>
      </Paper>
    </Grid>
  )
}
