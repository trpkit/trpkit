import { Heading } from "@/components/ui/Heading";
import { Text, TextLink } from "@/components/ui/Text";
import { Field } from "@/components/ui/fieldset/Field";
import { FieldGroup } from "@/components/ui/fieldset/FieldGroup";
import { Label } from "@/components/ui/fieldset/Label";
import { Input } from "@/components/ui/input/Input";

export default function AuthRegisterPage() {
  return (
    <>
      <img src="/branding/icon.svg" alt="Trpkit Icon" className="size-12 mb-6" />
      <Heading>Create your Trpkit account</Heading>
      <Text>
        Have an account? <TextLink href="/login">Log in</TextLink>
      </Text>
      <form className="mt-8">
        <FieldGroup>
          <Field>
            <Label>Email</Label>
            <Input name="email" type="email" autoComplete="email" />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input name="password" type="password" autoComplete="new-password" />
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input name="confirm-password" type="password" autoComplete="new-password" />
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
