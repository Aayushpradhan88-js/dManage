import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import { ITeacherAuth } from "@/lib/store/auth/auth-type"
import { APITeacherAuth } from "@/lib/store/auth/auth-slice"
import { useAppDispatch } from "@/lib/global/hooks/customHooks"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch();
  const [teacherFormData, setTeacherFormData] = useState<ITeacherAuth>({
    teacherInstitute: "",
    teacherEmail: "",
    teacherPassword: ""
  });

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setTeacherFormData({
      ...teacherFormData,
      [name]: value
    })
  }

  const handleLoginFormSubmission =  async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  await dispatch(APITeacherAuth.teacherLogin(teacherFormData));
  
};

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Teacher Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form
          onSubmit={handleLoginFormSubmission}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Institute Number</FieldLabel>
                <Input
                  id="instituteNumber"
                  type="text"
                  name="teacherInstitute"
                  onChange={handleChange}
                  placeholder="XXXX"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="teacherEmail"
                  onChange={handleChange}
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  name="teacherPassword"
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                  <Button type="submit" variant="signupButton">Login</Button>
                <FieldDescription className="text-center">
                  Continue as a Student? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
