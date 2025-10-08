import { Button } from "../ui/button";

const loggedIn: boolean = true;

const LoginButton = () => {
  return <Button>Login</Button>;
};

const LogoutButton = () => {
  return <Button>Logout</Button>;
};

const AuthButton = () => {
  return loggedIn ? <LogoutButton /> : <LoginButton />;
};
const InviteButton = () => {
  return loggedIn ? (
    <Button className="mr-2 hidden sm:flex" variant="secondary">
      Invite
    </Button>
  ) : null;
};
const AuthButtons = () => {
  return (
    <>
      <InviteButton />
      <AuthButton />
    </>
  );
};

export default AuthButtons;
