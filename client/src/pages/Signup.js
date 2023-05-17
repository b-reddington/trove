import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h2 className="text-center">REGISTER</h2>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label for="username">USERNAME</label>
                <input
                  className="form-input"
                  placeholder="Your username"
                  id="username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <label for="email">EMAIL</label>
                <input
                  className="form-input"
                  placeholder="Your email"
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <label for="password">PASSWORD</label>
                <input
                  className="form-input"
                  placeholder="password"
                  id="password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                  {/* <label for="confirm-password">CONFIRM PASSWORD</label>
                  <input
                    className="form-input"
                    placeholder="re-enter password"
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  /> */}
                <button
                    className="btn btn-block pswd-btn login-btn button"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  REGISTER
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
