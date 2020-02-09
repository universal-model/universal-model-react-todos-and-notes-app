import store from '@/store/store';

export default function loginUser(loggedInUserName: string): void {
  const { headerState } = store.getState();
  headerState.loggedInUserName = loggedInUserName;
}
