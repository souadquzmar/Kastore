
import * as yup from 'yup';

const loginSchema = yup.object({
    email: yup.string().email().required("Email Is Required").min(5, "Minimum Length Is 5"),
    password: yup.string().required("Password Is Required").min(5, "Minimum Length Is 5"),
})
 
export default loginSchema;