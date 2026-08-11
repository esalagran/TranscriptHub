import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { useForm } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email_address: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Form
                className="w-full max-w-md space-y-6 rounded-xl border border-default-200 bg-content1 p-8 shadow-lg"
                onSubmit={handleSubmit}
                validationErrors={errors}
            >
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold">
                        Welcome back
                    </h1>

                    <p className="text-sm text-default-500">
                        Sign in to your account
                    </p>
                </div>

                <TextField
                    isRequired
                    name="email_address"
                    type="email"
                    value={data.email_address}
                    onChange={(value) =>
                        setData("email_address", value)
                    }
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
                    onChange={(value) =>
                        setData("password", value)
                    }
                >
                    <Label>Password</Label>
                    <Input placeholder="********" />
                    <FieldError />
                </TextField>

                <Button
                    type="submit"
                    color="primary"
                    isDisabled={processing}
                    className="w-full"
                >
                    {processing ? "Logging in..." : "Login"}
                </Button>
            </Form>
        </div>
    );
}