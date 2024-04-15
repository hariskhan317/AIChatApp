import axios from "axios";

export const LoginUser = async (email: string, password: string) => {
  const res = await axios.post('/user/login', { email, password })
  try{
    if (res.status !== 200) {
      throw new Error("unable to Login")
    }
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error); 
  }
} 

export const signupUser = async(name: string, email: string, password: string) => {
    try {
      const res = await axios.post('/user/signup', { name, email, password }) 
      if (res.status !== 201) {
        throw new Error("unable to signup")
      }
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error); 
    }
}

export const checkAuthStatus = async () => {
  const res = await axios.get('/user/auth-status');
  const data = await res.data;
  return data;
}


export const sendChatRequest = async (message: string) => {
  const res = await axios.post('/chat/new', { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat")
  }
  const data = await res.data;
  return data;
};


export const getAllChats = async () => {
  const res = await axios.get('/chat/all-chats');
  if (res.status !== 200) {
    throw new Error("Unable to get chats")
  }
  const data = await res.data;
  return data;
};

export const deleteAllChats = async () => {
  const res = await axios.delete('/chat/delete');
  if (res.status !== 200) {
    throw new Error("Unable to delete chats")
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get('/user/logout');
  if (res.status !== 200) {
    throw new Error("Unable to logout")
  }
  const data = await res.data;
  return data;
}