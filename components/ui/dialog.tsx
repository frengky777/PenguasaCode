"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-800 bg-gray-950 p-6 shadow-lg",
        className
      )}
      {...props}
    />
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ children }: React.PropsWithChildren) => (
  <div className="mb-4">{children}</div>
);
const DialogTitle = ({ children }: React.PropsWithChildren) => (
  <h2 className="text-lg font-semibold text-white">{children}</h2>
);
const DialogFooter = ({ children }: React.PropsWithChildren) => (
  <div className="mt-6 flex justify-end gap-2">{children}</div>
);

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
};
