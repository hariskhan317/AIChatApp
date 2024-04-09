import AppBar from '@mui/material/AppBar';
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Button
} from '@mui/material';
import NavigationLink from './NavigationLink';
import {useAuth} from '../context/AuthContext'

export default function Header() { 
  const auth = useAuth();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar> 
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <NavigationLink pathName={"/"} name={"INTELLECTRA"} />
          </Typography>
          <Box style={{ display: 'flex', gap: '40px' }}>
            {auth?.isLoggedIn ? (
              <>
                <Box sx={{marginTop:'6px'}}> 
                  <NavigationLink pathName={"/chat"} name={"chat"} />
                </Box>
                <Button sx={{ background:'transparent', border:'1px solid #fff', padding: '7px 25px', color: '#fff'}} >Logout</Button>
              </>
            ) : (
                <>
                  <NavigationLink pathName={"/login"} name={"Login"} /> 
                  <NavigationLink pathName={"/signup"} name={"signup"} />
                </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}