"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUsersActionsContext } from "@/features/users/context";
import { userSchema, userSchemaKeys } from "@/features/users/schemas";
import type { User } from "@/features/users/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";

type EditUserFormProps = {
  onOk: () => void;
  onCancel: () => void;
  initialValues: Partial<User>;
};

export const EditUserForm = ({
  onOk,
  onCancel,
  initialValues,
}: EditUserFormProps) => {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  const { isValid } = useFormState({ control: form.control });

  const { editUser } = useUsersActionsContext();

  const handleSubmit = (values: User) => {
    editUser(values.id, values);
    onOk();
  };

  return (
    <Form<User> {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-[20px] px-[24px] pt-[10px] pb-[20px]">
          <FormField
            control={form.control}
            name={userSchemaKeys.name}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel required>이름</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="이름을 입력해주세요" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name={userSchemaKeys.address}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>주소</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="주소를 입력해주세요" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name={userSchemaKeys.memo}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>메모</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="주소를 입력해주세요" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name={userSchemaKeys.registerDate}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel required>가입일</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="날짜를 입력해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name={userSchemaKeys.job}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>직업</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="직업을 선택해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="개발자">개발자</SelectItem>
                      <SelectItem value="PO">PO</SelectItem>
                      <SelectItem value="디자이너">디자이너</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name={userSchemaKeys.hasAgreedToEmailReceive}
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col gap-y-2">
                  <FormLabel>이메일 수신 동의</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex h-[56px] items-center justify-end gap-[8px] border-[rgba(0,0,0,0.02)] bg-[rgba(0,0,0,0.02)] px-[16px] py-[12px]">
          <Button type="button" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit" disabled={!isValid}>
            저장
          </Button>
        </div>
      </form>
    </Form>
  );
};
