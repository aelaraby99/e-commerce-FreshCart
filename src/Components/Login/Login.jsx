import React, { useContext } from 'react'
import '../Resgister/Register.css'
import { useFormik } from 'formik'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { authenticationContext } from '../../Contexts/Authentication';
import { Helmet } from 'react-helmet';

export default function Login() {


  const navigate = useNavigate();
  const {setToken} = useContext(authenticationContext)

  async function handleLogin(user) {
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', user).then((res) => {
      if (res.status===200 && res.data.message === 'success') {
        localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            navigate('/home');
      }else{
        console.log(res);
      }
    }).catch((error) => {
      if (error.response.status === 401 || error.response.data.statusMsg === 'fail') {
        toast.error(`${error.response.data.message}`);
      }
      else {
        toast.error(`Something Went Wrong!! ${error.response.data.message}`);
      }
    });
  }
  let user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  };
  const loginFormik = useFormik({
    initialValues: user,
    onSubmit: handleLogin,
    validate: function (values) {
      const errors = {};
      if (!values.email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
        errors.email = 'Email is not valid';
      }
      if (values.password.length < 6 || values.password.length > 10) {
        errors.password = 'Password must be between 6 and 10 characters';
      }
      return errors;
    }
  });


  return (
    <div className='form-v9'>
        <Helmet >
                <title> Login | FreshCart</title>
            </Helmet>
      <div className="page-content">
        <div className="form-v9-content .form-v9-content-bg">
          <form className="form-detail" onSubmit={loginFormik.handleSubmit}>
            <h2 className='osc'>SignIn</h2>
            <div className="form-row-total">
              <div className="form-row w-100">
                <input onBlur={loginFormik.handleBlur} onChange={loginFormik.handleChange} value={loginFormik.values.email} type="text" name="email" id="email" className="input-text mb-3 mt-2" placeholder="Your Email" />
                {loginFormik.errors.email && loginFormik.touched.email ? <div className="bg-danger alert mb-0">{loginFormik.errors.email}</div> : null}
              </div>
            </div>
            <div className="form-row-total">
              <div className="form-row w-100">
                <input onBlur={loginFormik.handleBlur} onChange={loginFormik.handleChange} value={loginFormik.values.password} type="password" name="password" id="password" className="input-text  mb-3 mt-2" placeholder="Your Password" />
                {loginFormik.errors.password && loginFormik.touched.password ? <div className="bg-danger alert mb-0">{loginFormik.errors.password}</div> : null}
              </div>
            </div>
            <div className="form-row-last">
              <input type="submit" name="Login" className="login" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
