"use client";

import PasswordsController from "@/routes/PasswordsController";
import {
    Button,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { Head, useForm } from "@inertiajs/react";

export default function New() {
    const { data, setData, post, processing, errors } = useForm({
        email_address: "",
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(PasswordsController.create().url);
    }

    return (
        <>
            <Head title="Forgot your password?" />

            <div className="min-h-screen flex items-center justify-center px-4">
                <Form
                    className="w-full max-w-md"
                    onSubmit={submit}
                    validationErrors={errors}
                >
                    <Fieldset>
                        <Fieldset.Legend>
                            Forgot your password?
                        </Fieldset.Legend>

                        <p className="text-sm text-default-500">
                            Enter the email address associated with your
                            account and we'll send you instructions to reset
                            your password.
                        </p>

                        <FieldGroup>
                            <TextField
                                isRequired
                                name="email_address"
                                type="email"
                                value={data.email_address}
                                onChange={(value) =>
                                    setData("email_address", value)
                                }
                                autoFocus
                                autoComplete="username"
                                validate={(value) => {
                                    if (!value) {
                                        return "Email is required.";
                                    }

                                    if (
                                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                            value,
                                        )
                                    ) {
                                        return "Please enter a valid email address.";
                                    }

                                    return null;
                                }}
                            >
                                <Label>Email</Label>
                                <Input placeholder="you@example.com" />
                                <FieldError />
                            </TextField>
                        </FieldGroup>

                        <Fieldset.Actions>
                            <Button
                                type="submit"
                                isDisabled={processing}
                            >
                                {processing
                                    ? "Sending..."
                                    : "Email reset instructions"}
                            </Button>
                        </Fieldset.Actions>
                    </Fieldset>
                </Form>
            </div>
        </>
    );
}