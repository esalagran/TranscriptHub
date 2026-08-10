import { Head, useForm } from "@inertiajs/react"

export default function New() {
  const { data, setData, post, processing, errors } = useForm({
    email_address: "",
  })

  function submit(e: React.SubmitEvent) {
    e.preventDefault()

    post("/passwords")
  }

  return (
    <>
      <Head title="Forgot your password?" />

      <h1>Forgot your password?</h1>

      {errors.email_address && (
        <div style={{ color: "red" }}>
          {errors.email_address}
        </div>
      )}

      <form onSubmit={submit}>
        <input
          type="email"
          name="email_address"
          required
          autoFocus
          autoComplete="username"
          placeholder="Enter your email address"
          value={data.email_address}
          onChange={e => setData("email_address", e.target.value)}
        />

        <br />

        <button type="submit" disabled={processing}>
          Email reset instructions
        </button>
      </form>
    </>
  )
}
