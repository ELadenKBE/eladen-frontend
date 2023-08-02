import React, { useState } from 'react';
import './Register.scss';

interface FormState {
  address: string;
  firstname: string;
  email: string;
  image: string;
  lastname: string;
  role: number;
  sub: string;
  username: string;
}

interface RegisterProps {
  onRegistrationComplete: () => void;
  subToken: string;
}

const Register: React.FC<RegisterProps> = ({
  onRegistrationComplete,
  subToken,
}: RegisterProps) => {
  // Initialize form state using the FormState interface
  const [formState, setFormState] = useState<FormState>({
    address: '',
    firstname: '',
    email: '',
    image: '',
    lastname: '',
    role: 1,
    sub: `sub ${subToken}`,
    username: '',
  });

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onRegistrationComplete();
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-container">
          <input
            name="address"
            value={formState.address}
            onChange={handleInputChange}
            type="text"
            placeholder="Addresse"
          />
          <input
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            type="text"
            placeholder="Email"
          />
          <input
            name="firstname"
            value={formState.firstname}
            onChange={handleInputChange}
            type="text"
            placeholder="Vorname"
          />
          <input
            name="image"
            value={formState.image}
            onChange={handleInputChange}
            type="text"
            placeholder="Bild"
          />
          <input
            name="lastname"
            value={formState.lastname}
            onChange={handleInputChange}
            type="text"
            placeholder="Nachname"
          />
          <input
            name="username"
            value={formState.username}
            onChange={handleInputChange}
            type="text"
            placeholder="Benutzername"
          />
          <button type="submit">Registrieren</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
