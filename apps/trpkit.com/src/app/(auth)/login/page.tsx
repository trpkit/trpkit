import { Divider } from "@/components/ui/Divider";
import { Heading } from "@/components/ui/Heading";
import { Text, TextLink } from "@/components/ui/Text";
import { Field } from "@/components/ui/fieldset/Field";
import { FieldGroup } from "@/components/ui/fieldset/FieldGroup";
import { Label } from "@/components/ui/fieldset/Label";
import { Input } from "@/components/ui/input/Input";

export default function AuthLoginPage() {
  return (
    <>
      <img src="/branding/icon.svg" alt="Trpkit Icon" className="size-12 mb-6" />
      <Heading>Login to Trpkit</Heading>
      <Text>
        Don't have an account yet? <TextLink href="/register">Create an account</TextLink>
      </Text>
      <form className="mt-8">
        <FieldGroup>
          <Field>
            <Label>Email</Label>
            <Input name="email" type="email" autoComplete="email" />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input name="password" type="password" autoComplete="current-password" />
          </Field>
        </FieldGroup>
      </form>
      <Divider className="my-6" />
      <Text>
        Forgot password? <TextLink href="#">Recover your account</TextLink>
      </Text>
    </>
  );
}
