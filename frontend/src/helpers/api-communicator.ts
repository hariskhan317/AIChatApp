import axios from "axios";

export const LoginUser = async (email: string, password: string) => {
  const res = await axios.post('/user/login', { email, password })
  try{
    if (res.status !== 200) {
      throw new Error("unable to Login")
    }
    const data = res.data;
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
  const data = res.data;
  return data;
}
