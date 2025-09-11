
import * as yup from 'yup';

const forgetPasswordSchema = yup.object({
    email: yup.string().email().required("Email Is Required").min(5, "Minimum Length Is 5"),
})
 
export default forgetPasswordSchema;