import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const UserService = {
  getAllUser: async () => {
    return await axios.get(`${API_BASE_URL}/user`).then((res) => {
      return res.data;
    });
  },

  addUser: async (data) => {
    let response = await axios
      .post(`${API_BASE_URL}/user`, data, {
        headers: {
          "content-type": "application/json",
          "Accept": "application/json",
        },
      })
      return response
  },

  getUserById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/user/${id}`,{
      headers: {
        "content-type": "application/json",
        "Accept": "application/json",
      },
    })
    return response
  },

  updateUser: async (id,data) => {
    const response = await axios.put(`${API_BASE_URL}/user/${id}`,data,{
      headers: {
        "content-type": "application/json",
        "Accept": "application/json",
      },
    })
    return response
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/user/${id}`,{
      headers: {
        "content-type": "application/json",
        "Accept": "application/json",
      },
    })
    return response
  },
};

export default UserService;
