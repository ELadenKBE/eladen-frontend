import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
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

  // Define the GraphQL mutation
  const CREATE_USER_MUTATION = gql`
    mutation CreateUserMutation(
      $address: String
      $email: String
      $firstname: String
      $image: String
      $lastname: String
      $role: Int!
      $sub: String!
      $username: String!
    ) {
      createUser(
        address: $address
        email: $email
        firstname: $firstname
        image: $image
        lastname: $lastname
        role: $role
        sub: $sub
        username: $username
      ) {
        address
        email
        firstname
        image
        lastname
        role
        sub
        username
      }
    }
  `;

  // Use the useMutation hook to execute the mutation
  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    variables: formState,
  });

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createUser();
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
