import store from '@/store/store';

export default function logoutUser(): void {
  const { headerState } = store.getState();
  headerState.loggedInUserName = '';
}
