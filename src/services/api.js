import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.rawg.io/api',
})

export default api;

//apikey? b595dd94557c46f7be447fb4efa796ddL