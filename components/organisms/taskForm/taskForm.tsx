'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/form';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { api } from '@/src/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';

export interface TaskFormProps {
  storyID: number;
  variant: 'create' | 'edit';
  taskID?: string;
  description?: string;
  flag?: boolean;
}

type TaskForm = Omit<TaskFormProps, 'storyID'>;

export default function TaskForm({
  storyID,
  taskID,
  variant,
  description,
  flag,
}: TaskFormProps) {
  const form = useForm<TaskForm>({
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        description: z
          .string()
          .min(1, { message: '할일을 작성해야 제출할 수 있습니다.' }),
        flag: z.boolean().default(false),
      }),
    ),
    defaultValues: {
      description: description ?? '',
      flag: flag ?? false,
    },
  });

  const onSubmit = async (data: TaskForm) => {
    if (variant === 'create') {
      await api.fetchData(`/task/${storyID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else if (variant === 'edit') {
      await api.fetchData(`/task/${storyID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else {
      throw Error('invalid data');
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2"
        data-testid="task-form"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel aria-labelledby="description">Description</FormLabel>
                <FormControl>
                  <Input
                    id="description"
                    placeholder=""
                    data-testid="description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Flag</FormLabel>
                <Select
                  name={field.name}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="False" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">done</SelectItem>
                      <SelectItem value="false">ongoing</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          data-testid="task-submit"
        >
          submit
        </Button>
      </form>
    </Form>
  );
}
