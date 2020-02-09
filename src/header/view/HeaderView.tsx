import * as React from 'react';
import store from '@/store/store';
import loginUser from '@/header/model/actions/loginUser';
import logoutUser from '@/header/model/actions/logoutUser';

const HeaderView = () => {
  const { headerState: $ } = store.getState();
  store.useState([$]);

  return (
    <div>
      <h1>
        {$.loggedInUserName || ''} {$.loggedInUserName ? '´s' : ''} Todos and Notes
      </h1>
      {$.loggedInUserName === '' ? (
        <button onClick={() => loginUser('John')}>Login</button>
      ) : (
        <button onClick={() => logoutUser()}>Logout</button>
      )}
    </div>
  );
};

export default HeaderView;
