import { useForm } from "@inertiajs/react";

export default function New({ flash, email_address }) {
  const { data, setData, post, processing } = useForm({
    email_address: email_address || "",
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/session");
  };

  return (
    <>
      {flash?.alert && (
        <div style={{ color: "red" }}>
          {flash.alert}
        </div>
      )}

      {flash?.notice && (
        <div style={{ color: "green" }}>
          {flash.notice}
        </div>
      )}

      <form onSubmit={submit}>
        <input
          type="email"
          required
          autoFocus
          autoComplete="username"
          placeholder="Enter your email address"
          value={data.email_address}
          onChange={(e) => setData("email_address", e.target.value)}
        />
        <br />

        <input
          type="password"
          required
          autoComplete="current-password"
          placeholder="Enter your password"
          maxLength="72"
          value={data.password}
          onChange={(e) => setData("password", e.target.value)}
        />
        <br />

        <button type="submit" disabled={processing}>
          Sign in
        </button>
      </form>

      <br />

      <a href="/passwords/new">
        Forgot password?
      </a>
    </>
  );
}