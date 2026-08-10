import { useForm } from "@inertiajs/react";
import { SubmitEvent } from "react";


export default function New() {
  const { data, setData, post, processing, errors } = useForm({
    user: {
      email_address: "",
      password: "",
      password_confirmation: "",
    },
  });

  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    post("/registration");
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={data.user.email_address}
          onChange={(e) => setData("user", { ...data.user, email_address: e.target.value })}
        />
        {errors["user.email_address"] && <div>{errors["user.email_address"]}</div>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={data.user.password}
          onChange={(e) => setData("user", { ...data.user, password: e.target.value })}
        />
        {errors["user.password"] && <div>{errors["user.password"]}</div>}
      </div>

      <div>
        <label>Confirm password</label>
        <input
          type="password"
          value={data.user.password_confirmation}
          onChange={(e) =>
            setData("user", { ...data.user, password_confirmation: e.target.value } )
          }
        />
        {errors["user.password_confirmation"] && (
          <div>{errors["user.password_confirmation"]}</div>
        )}
      </div>

      <button disabled={processing}>Create account</button>
    </form>
  );
}
