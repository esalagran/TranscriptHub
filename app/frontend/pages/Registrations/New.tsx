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
import { useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        user: {
            email_address: "",
            password: "",
            password_confirmation: "",
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post("/signup");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Form
                className="w-full max-w-md"
                onSubmit={handleSubmit}
                validationErrors={errors}
            >
                <Fieldset>
                    <Fieldset.Legend>Create your account</Fieldset.Legend>

                    <p className="text-sm text-default-500">
                        Sign up to create your account.
                    </p>

                    <FieldGroup>
                        <TextField
                            isRequired
                            name="user.email_address"
                            type="email"
                            value={data.user.email_address}
                            onChange={(value) =>
                                setData("user", {
                                    ...data.user,
                                    email_address: value,
                                })
                            }
                            validate={(value) => {
                                if (!value) {
                                    return "Email is required.";
                                }

                                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                                    return "Please enter a valid email address.";
                                }

                                return null;
                            }}
                        >
                            <Label>Email</Label>
                            <Input placeholder="you@example.com" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="user.password"
                            type="password"
                            value={data.user.password}
                            onChange={(value) =>
                                setData("user", {
                                    ...data.user,
                                    password: value,
                                })
                            }
                            validate={(value) => {
                                if (!value) {
                                    return "Password is required.";
                                }

                                if (value.length < 8) {
                                    return "Password must be at least 8 characters.";
                                }

                                return null;
                            }}
                        >
                            <Label>Password</Label>
                            <Input placeholder="********" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="user.password_confirmation"
                            type="password"
                            value={data.user.password_confirmation}
                            onChange={(value) =>
                                setData("user", {
                                    ...data.user,
                                    password_confirmation: value,
                                })
                            }
                            validate={(value) => {
                                if (!value) {
                                    return "Please confirm your password.";
                                }

                                if (value !== data.user.password) {
                                    return "Passwords do not match.";
                                }

                                return null;
                            }}
                        >
                            <Label>Confirm password</Label>
                            <Input placeholder="********" />
                            <FieldError />
                        </TextField>
                    </FieldGroup>

                    <Fieldset.Actions>
                        <Button
                            type="submit"
                            isDisabled={processing}
                        >
                            {processing
                                ? "Creating account..."
                                : "Create account"}
                        </Button>
                    </Fieldset.Actions>
                </Fieldset>
            </Form>
        </div>
    );
}