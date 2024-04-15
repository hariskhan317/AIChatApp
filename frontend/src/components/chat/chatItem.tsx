import { Box, Typography, Avatar } from '@mui/material' 

const chatItem = ({ content, role }: {
    content: string;
    role: "user" | "assistant"
}) => {

    return role === "assistant" ? (
        <Box sx={{display: 'flex', background:'', padding: '15px 20px'}}>
            <Avatar sx={{ bgcolor: '#1e88e5', height:'50px', width:'50px'  }}>A</Avatar> 
            <Box>
                <Typography sx={{fontWeight: '600', padding: '0px 0px 0px 15px', textAlign:'left', textTransform: 'capitalize'}}>{role}</Typography> 
                <Typography sx={{ padding: '3px 0px 0px 15px', textAlign:'left' }}>{content}</Typography> 
            </Box>
        </Box>
    ) : (
        <Box sx={{display: 'flex', background:'', padding: '15px 20px'}}> 
            <Avatar sx={{ bgcolor: 'green', height:'50px', width:'50px' }}>U</Avatar> 
            <Box>
                <Typography sx={{fontWeight: '600' ,padding: '0px 0px 0px 15px', textAlign:'left', textTransform: 'capitalize'}}>{role}</Typography> 
                <Typography sx={{ padding: '3px 0px 0px 15px', textAlign:'left' }}>{content}</Typography> 
            </Box>
        </Box>
     )
}

export default chatItem;