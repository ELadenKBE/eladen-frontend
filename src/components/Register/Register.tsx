import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

interface RegisterProps {
  onRegistrationComplete: any;
  subToken: string;
}

const Register = ({ onRegistrationComplete, subToken }: RegisterProps) => {
  const [formState, setFormState] = useState({
    address: '',
    firstname: '',
    email: '',
    image: '',
    lastname: '',
    role: 1,
    sub: `sub ${subToken}`,
    username: '',
  });

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
  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    variables: {
      address: formState.address,
      email: formState.email,
      firstname: formState.firstname,
      image: formState.image,
      lastname: formState.lastname,
      role: formState.role,
      sub: formState.sub,
      username: formState.username,
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
          onRegistrationComplete();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.address}
            onChange={(e) =>
              setFormState({
                ...formState,
                address: e.target.value,
              })
            }
            type="text"
            placeholder="Address"
          />
          <input
            className="mb2"
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value,
              })
            }
            type="text"
            placeholder="Email"
          />
          <input
            className="mb2"
            value={formState.firstname}
            onChange={(e) =>
              setFormState({
                ...formState,
                firstname: e.target.value,
              })
            }
            type="text"
            placeholder="Firstname"
          />
          <input
            className="mb2"
            value={formState.image}
            onChange={(e) =>
              setFormState({
                ...formState,
                image: e.target.value,
              })
            }
            type="text"
            placeholder="Image"
          />
          <input
            className="mb2"
            value={formState.lastname}
            onChange={(e) =>
              setFormState({
                ...formState,
                lastname: e.target.value,
              })
            }
            type="text"
            placeholder="Lastname"
          />
          <input
            className="mb2"
            value={formState.username}
            onChange={(e) =>
              setFormState({
                ...formState,
                username: e.target.value,
              })
            }
            type="text"
            placeholder="Username"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
