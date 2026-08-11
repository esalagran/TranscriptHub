"use client";

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

type Props = {
    token: string;
};

export default function Edit({ token }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        password: "",
        password_confirmation: "",
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        put(`/passwords/${token}`);
    }

    return (
        <>
            <Head title="Reset your password" />

            <div className="min-h-screen flex items-center justify-center px-4">
                <Form
                    className="w-full max-w-md"
                    onSubmit={submit}
                    validationErrors={errors}
                >
                    <Fieldset>
                        <Fieldset.Legend>
                            Update your password
                        </Fieldset.Legend>

                        <p className="text-sm text-default-500">
                            Choose a new password for your account. Your new
                            password must be at least 8 characters long.
                        </p>

                        <FieldGroup>
                            <TextField
                                isRequired
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={(value) =>
                                    setData("password", value)
                                }
                                validate={(value) => {
                                    if (!value) {
                                        return "Password is required.";
                                    }

                                    if (value.length < 8) {
                                        return "Password must be at least 8 characters.";
                                    }

                                    if (value.length > 72) {
                                        return "Password must not exceed 72 characters.";
                                    }

                                    return null;
                                }}
                            >
                                <Label>New password</Label>
                                <Input
                                    placeholder="Enter your new password"
                                    autoComplete="new-password"
                                    maxLength={72}
                                />
                                <FieldError />
                            </TextField>

                            <TextField
                                isRequired
                                name="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(value) =>
                                    setData("password_confirmation", value)
                                }
                                validate={(value) => {
                                    if (!value) {
                                        return "Please confirm your password.";
                                    }

                                    if (value !== data.password) {
                                        return "Passwords do not match.";
                                    }

                                    return null;
                                }}
                            >
                                <Label>Confirm new password</Label>
                                <Input
                                    placeholder="Repeat your new password"
                                    autoComplete="new-password"
                                    maxLength={72}
                                />
                                <FieldError />
                            </TextField>
                        </FieldGroup>

                        <Fieldset.Actions>
                            <Button
                                type="submit"
                                isDisabled={processing}
                            >
                                {processing
                                    ? "Updating..."
                                    : "Update password"}
                            </Button>
                        </Fieldset.Actions>
                    </Fieldset>
                </Form>
            </div>
        </>
    );
}