import AppBar from '@mui/material/AppBar';
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Button
} from '@mui/material';
import NavigationLink from './SharedComponents/NavigationLink';
import {useAuth} from '../context/AuthContext'

interface HeaderProps {
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({handleLogout}) => { 
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
            <Typography style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              textDecoration: 'none'
            }}>INTELLECTRA</Typography>
          </Typography>
          <Box style={{ display: 'flex', gap: '40px' }}>
            {auth?.isLoggedIn ? (
              <>
                <Button onClick={handleLogout} sx={{ background:'transparent', border:'1px solid #fff', padding: '7px 25px', color: '#fff'}} >Logout</Button>
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
export default Header;