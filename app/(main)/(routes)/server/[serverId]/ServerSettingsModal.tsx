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
import { createServer, updateServerData } from "@/lib/axios/servers";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

export type FormValues = {
  name: string;
  imageUrl: string;
};

const ServerSettingsModal = () => {
  const {
    isOpen,
    type,
    onClose,
    data: { server },
  } = useModal();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (server) {
      form.setValue("name", server.name);
      form.setValue("imageUrl", server.imageUrl);
    }
  }, [isOpen]);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormValues) => {
    if (!server?.id) {
      return;
    }
    const updatedServer = await updateServerData(server.id, values);
    if (updatedServer) {
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

  const isModalOpen = isOpen && type === "serverSettings";

  return (
    <AppDialog
      defaultOpen={isModalOpen}
      header="Edit server"
      description="Edit server settings"
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
                      Edit Server Name
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
            <Button type="submit">Save</Button>
          </AppDialog.DialogFooter>
        </form>
      </Form>
    </AppDialog>
  );
};

export default ServerSettingsModal;
