import * as React from 'react';
import store from '@/store/store';
import loginUser from '@/header/model/actions/loginUser';
import logoutUser from '@/header/model/actions/logoutUser';

export default () => {
  const { headerState: state } = store.getState();
  store.useState([state]);

  return (
    <div>
      <h1>
        {state.loggedInUserName} {state.loggedInUserName ? '´s' : ''} Todos and Notes
      </h1>
      {state.loggedInUserName === '' ? (
        <button onClick={() => loginUser('John')}>Login</button>
      ) : (
        <button onClick={() => logoutUser()}>Logout</button>
      )}
    </div>
  );
};
