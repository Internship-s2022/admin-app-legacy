import React from 'react';

export interface Props {
  shouldRemember: boolean;
  onUsernameChange: (username: string) => void;
  onPasswordChange: (password: string) => void;
  onRememberChange: (remember: boolean) => void;
  onSubmit: (username: string, password: string) => void;
}

const LoginForm = (props: Props) => {
  const { shouldRemember, onUsernameChange, onPasswordChange, onRememberChange, onSubmit } = props;

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(shouldRemember);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
    onUsernameChange(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    onPasswordChange(value);
  };

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setRemember(checked);
    onRememberChange(checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form data-testid="login-form" onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        data-testid="username"
        type="text"
        name="username"
        value={username}
        onChange={handleUsernameChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        data-testid="password"
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <label>
        <input
          data-testid="remember"
          name="remember"
          type="checkbox"
          checked={remember}
          onChange={handleRememberChange}
        />
        Remember me?
      </label>
      <button type="submit" data-testid="submit">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
