
import * as yup from 'yup';

const registerSchema = yup.object({
    fullName: yup.string().required("Full Name Is Required").min(5, "Minimum Length Is 5"),
    userName: yup.string().required("User Name Is Required").min(5, "Minimum Length Is 5"),
    email: yup.string().email().required("Email Is Required").min(5, "Minimum Length Is 5"),
    password: yup.string().required("Password Is Required").min(5, "Minimum Length Is 5"),
    phoneNumber: yup.string().required("Phone Number Is Required").min(5, "Minimum Length Is 5")
})
 
export default registerSchema;