
import * as yup from 'yup';

const resetPasswordSchema = yup.object({
    email: yup.string().email().required("Email Is Required").min(5, "Minimum Length Is 5"),
    newPassword: yup.string().required("New Password Is Required").min(5, "Minimum Length Is 5"),
    code: yup.string().required("Code Is Required")
})
 
export default resetPasswordSchema;