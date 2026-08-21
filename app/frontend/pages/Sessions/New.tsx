"use client";

import SessionsController from "@/routes/SessionsController";
import {
  Button,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  Link,
  TextField,
} from "@heroui/react";
import { useForm, router } from "@inertiajs/react";

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email_address: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(SessionsController.create().url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Form
        className="w-full max-w-md"
        onSubmit={handleSubmit}
        validationErrors={errors}
      >
        <Fieldset>
          <Fieldset.Legend>Welcome back</Fieldset.Legend>

          <p className="text-sm text-default-500">Sign in to your account.</p>

          <FieldGroup>
            <TextField
              isRequired
              name="email_address"
              type="email"
              value={data.email_address}
              onChange={(value) => setData("email_address", value)}
            >
              <Label>Email</Label>
              <Input placeholder="you@example.com" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
              value={data.password}
              onChange={(value) => setData("password", value)}
            >
              <Label>Password</Label>
              <Input placeholder="********" />
              <div className="flex justify-end">
                <Link href="/passwords/new">Forgot password?</Link>
              </div>
              <FieldError />
            </TextField>
          </FieldGroup>

          <Fieldset.Actions>
            <Button type="submit" isDisabled={processing}>
              {processing ? "Logging in..." : "Login"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onPress={() => router.visit("/signup")}
            >
              Register
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
}
