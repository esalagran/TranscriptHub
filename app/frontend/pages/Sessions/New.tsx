"use client";

import { useForm } from "@inertiajs/react";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";

export default function New() {
    const { data, setData, post, processing, errors } = useForm({
        email_address: "",
        password: "",
    });

    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
            post("/login");
        }} validationErrors={errors} className="w-full max-w-md space-y-4">
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
                <FieldError />
            </TextField>

            <Button
                type="submit"
                isDisabled={processing}
            >
                Login
            </Button>
        </Form>
    );
}
