"use client";
import AppDialog from "@/components/Dialog";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { createServer } from "@/lib/axios/servers";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

export type FormValues = {
  name: string;
  imageUrl: string;
};

const CreateServerModal = () => {
  const { isOpen, type, onClose } = useModal();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormValues) => {
    const server = await createServer(values);
    if (server) {
      form.reset();
      router.refresh();
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    form.reset();
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  const isModalOpen = isOpen && type === "createServer";

  return (
    <AppDialog
      defaultOpen={isModalOpen}
      header="Create server"
      description="Create as many server as you want to connect with people"
      onOpenChange={handleCloseModal}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8 p-6">
            <div className="border-red-200 text-center">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <AppDialog.DialogFooter className="bg-gray-100 p-4">
            <Button type="submit">Create</Button>
          </AppDialog.DialogFooter>
        </form>
      </Form>
    </AppDialog>
  );
};

export default CreateServerModal;
