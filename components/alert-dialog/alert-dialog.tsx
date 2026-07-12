"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

function AlertDialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Backdrop>) {
	return (
		<AlertDialogPrimitive.Backdrop
			data-slot="alert-dialog-overlay"
			className={(state) =>
				cn(
					"fixed inset-0 z-50 bg-black/80 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
					typeof className === "function" ? className(state) : className,
				)
			}
			{...props}
		/>
	);
}

function AlertDialogContent({
	className,
	size = "default",
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Popup> & {
	size?: "default" | "sm";
}) {
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<AlertDialogPrimitive.Popup
				data-slot="alert-dialog-content"
				data-size={size}
				className={(state) =>
					cn(
						"group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
						typeof className === "function" ? className(state) : className,
					)
				}
				{...props}
			/>
		</AlertDialogPortal>
	);
}

const AlertDialogHeader = ({
	className,
	...props
}: React.ComponentProps<"div">) => (
	<div
		data-slot="alert-dialog-header"
		className={cn(
			"grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
			className,
		)}
		{...props}
	/>
);

const AlertDialogFooter = ({
	className,
	...props
}: React.ComponentProps<"div">) => (
	<div
		data-slot="alert-dialog-footer"
		className={cn(
			"-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
			className,
		)}
		{...props}
	/>
);

const AlertDialogMedia = ({
	className,
	...props
}: React.ComponentProps<"div">) => (
	<div
		data-slot="alert-dialog-media"
		className={cn(
			"mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
			className,
		)}
		{...props}
	/>
);

const AlertDialogTitle = ({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) => (
	<AlertDialogPrimitive.Title
		data-slot="alert-dialog-title"
		className={(state) =>
			cn(
				"font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
				typeof className === "function" ? className(state) : className,
			)
		}
		{...props}
	/>
);

const AlertDialogDescription = ({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) => (
	<AlertDialogPrimitive.Description
		data-slot="alert-dialog-description"
		className={(state) =>
			cn(
				"text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
				typeof className === "function" ? className(state) : className,
			)
		}
		{...props}
	/>
);

function AlertDialogAction({
	className,
	variant = "default",
	size = "default",
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Close> & ButtonProps) {
	return (
		<AlertDialogPrimitive.Close
			data-slot="alert-dialog-action"
			render={<Button className={className} variant={variant} size={size} />}
			{...props}
		/>
	);
}

function AlertDialogCancel({
	className,
	variant = "outline",
	size = "default",
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Close> & ButtonProps) {
	return (
		<AlertDialogPrimitive.Close
			data-slot="alert-dialog-cancel"
			render={<Button className={className} variant={variant} size={size} />}
			{...props}
		/>
	);
}

export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
};
