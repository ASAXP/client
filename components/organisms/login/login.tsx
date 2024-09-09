'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/atoms/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/atoms/input';

const loginSchema = z.object({
  id: z.string(),
  password: z.string(),
});

type TLoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const form = useForm<TLoginForm>({
    mode: 'onChange',
    defaultValues: {
      id: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginForm) => {
    console.log('submit', data);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          로그인
          {/* <Button>로그인</Button> */}
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>로그인 모달</DialogTitle>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
