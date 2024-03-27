import React from 'react'
import './Register.css'
import { useFormik } from 'formik'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {

  const navigate = useNavigate();

  async function handleRegister(user) {
    let send = {
      name: `${user.firstName} ${user.lastName}`, email: user.email,
      password: user.password,
      rePassword: user.confirmPassword,
      phone: user.phone
    }
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', send).then((res) => {
      registerFormik.resetForm();
      if (res.data.message === 'success') {
        toast.success('Account Created Successfully!!', {
          onClose: () => {
            navigate('/login');
          }
        });

      }
    }).catch((error) => {
      if (error.response.status === 409 || error.response.data.message === 'Account Already Exists') {
        toast.error("Account Already Exists!!", {
          onClick: () => {
            navigate('/login');

          }
        });
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
  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: handleRegister,
    validate: function (values) {
      const errors = {};
      if (values.firstName.length < 2 || values.firstName.length > 10) {
        errors.firstName = 'First Name must be between 2 and 10 characters';
      }
      if (values.lastName.length < 2 || values.lastName.length > 10) {
        errors.lastName = 'Last Name must be between 2 and 10 characters';
      }
      if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
        errors.phone = 'Phone Number is not valid';
      }
      if (!values.email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
        errors.email = 'Email is not valid';
      }
      if (values.password.length < 6 || values.password.length > 10) {
        errors.password = 'Password must be between 6 and 10 characters';
      }
      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Confirm Password does not match with Password';
      }

      return errors;
    }
  });


  return (
    <div className='form-v9'>
        <Helmet >
                <title> Register | FreshCart</title>
            </Helmet>
      <div className="page-content">
        <div className="form-v9-content .form-v9-content-bg">
          <form className="form-detail" onSubmit={registerFormik.handleSubmit}>
            <h2 className='osc'>Registration Form</h2>
            <div className="form-row-total">
              <div className="form-row">
                <input value={registerFormik.values.firstName} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="text" name="firstName" id="firstName" className="input-text mb-3 mt-2" placeholder="First Name" />

                {registerFormik.errors.firstName && registerFormik.touched.firstName ? <div className="bg-danger alert mb-0">{registerFormik.errors.firstName}</div> : null}
              </div>
              <div className="form-row">
                <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} value={registerFormik.values.lastName} type="text" name="lastName" id="lastName" className="input-text mb-3 mt-2" placeholder="Last Name" />
                {registerFormik.errors.lastName && registerFormik.touched.lastName ? <div className="bg-danger alert mb-0">{registerFormik.errors.lastName}</div> : null}
              </div>
            </div>
            <div className="form-row-total">
              <div className="form-row w-100">
                <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.email} type="text" name="email" id="email" className="input-text mb-3 mt-2" placeholder="Your Email" />
                {registerFormik.errors.email && registerFormik.touched.email ? <div className="bg-danger alert mb-0">{registerFormik.errors.email}</div> : null}
              </div>
            </div>
            <div className="form-row-total">
              <div className="form-row">
                <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.password} type="password" name="password" id="password" className="input-text mb-3 mt-2" placeholder="Your Password" />
                {registerFormik.errors.password && registerFormik.touched.password ? <div className="bg-danger alert mb-0">{registerFormik.errors.password}</div> : null}
              </div>
              <div className="form-row">
                <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.confirmPassword} type="password" name="confirmPassword" id="confirmPassword" className="input-text mb-3 mt-2" placeholder="Confirm Password" />
                {registerFormik.errors.confirmPassword && registerFormik.touched.confirmPassword ? <div className="bg-danger alert mb-0">{registerFormik.errors.confirmPassword}</div> : null}
              </div>
            </div>
            <div className="form-row-total">
              <div className="form-row w-100 ">
                <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.phone} type="tel" name="phone" id="phone" className="input-text mb-3 mt-2" placeholder="Your Phone Number" />
                {registerFormik.errors.phone && registerFormik.touched.phone ? <div className="bg-danger alert mb-0">{registerFormik.errors.phone}</div> : null}
              </div>
            </div>

            <div className="form-row-last">
              <input type="submit" name="register" className="register" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
