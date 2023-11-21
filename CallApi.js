    import axios from 'axios';
    const URL='http://127.0.0.1:8000'
    export const userRegistration =async(data)=> {
        try {
            console.log(data);
          const response = await axios.post(`${URL}/add`, data)
          console.log(response);
          return response;
        } catch (error) {
            console.log(`Occured error while Registration :- ${error}`);
        }
}
    export const loginUser =async(data)=> {
        try {
           const response= await axios.post(`${URL}/login`, data)
            const token = response.data.user;
            console.log(token);
            localStorage.setItem('token', token)
            return data;
        
        } catch (error) {
            console.log(`Occured error while Logining :- ${error}`);
        }
}
export const getUserInfo = async (data) => {
    try {
        const response = await axios.post(`${URL}/info`, { data })
        console.log('xxxxxxxxxxxxxxxxxxx',response.data.user);
        const info=response.data.user
          return info;
        } catch (error) {
          console.log(`Error while collecting information ${error}`);
        }
}
export const getUser = async (id) => {
        try {
            return await axios.get(`${URL}/${id}`)
        } catch (error) {
            console.log(`Occured error while reciving user data :- ${error}`);
        }
}
    export const editUserInfo = async (users, id) => {
  try {
     // Check the data you are sending
    const response = await axios.post(`${URL}/${id}`, users);
    console.log('xxxxxxxxxxxxxx',response.data);
    return response.data; // Return the response if needed
  } catch (error) {
    console.log(`Error while making the API call: ${error}`);
    throw error; // Rethrow the error or handle it as needed
  }
}
export const deleteUser = async(id) => {
  try {
    
    return await axios.delete(`${URL}/${id}`)
  } catch (error) {
    console.log(`Occured error while deleting User :- ${error}`);
  }
}
