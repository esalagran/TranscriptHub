import { Head, useForm } from "@inertiajs/react"
import type { SubmitEvent } from "react"

type Props = {
  token: string
}

export default function Edit({ token }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    password: "",
    password_confirmation: "",
  })

  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    put(`/passwords/${token}`)
  }

  return (
    <>
      <Head title="Update your password" />

      <h1>Update your password</h1>

      <form onSubmit={submit}>
        <input
          type="password"
          name="password"
          required
          autoComplete="new-password"
          placeholder="Enter new password"
          maxLength={72}
          value={data.password}
          onChange={e => setData("password", e.target.value)}
        />

        <br />

        <input
          type="password"
          name="password_confirmation"
          required
          autoComplete="new-password"
          placeholder="Repeat new password"
          maxLength={72}
          value={data.password_confirmation}
          onChange={e =>
            setData("password_confirmation", e.target.value)
          }
        />

        <br />

        <button type="submit" disabled={processing}>
          Save
        </button>

        {errors.password && (
          <div style={{ color: "red" }}>
            {errors.password}
          </div>
        )}
      </form>
    </>
  )
}