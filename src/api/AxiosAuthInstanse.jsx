import axios from "axios";

const AxiosAuthInstanse = axios.create({
    baseURL:`https://kashop1.runasp.net/api/Identity/Account`
});

export default AxiosAuthInstanse;