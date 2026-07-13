"use client";

import {
    CircleCheckIcon,
    InfoIcon,
    Loader2Icon,
    OctagonXIcon,
    TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
    // Explicitly set theme to "light"
    const theme = "light";

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            icons={{
                success: <CircleCheckIcon className="size-4" />,
                info: <InfoIcon className="size-4" />,
                warning: <TriangleAlertIcon className="size-4" />,
                error: <OctagonXIcon className="size-4" />,
                loading: <Loader2Icon className="size-4 animate-spin" />,
            }}
            style={
                {
                    // You can keep these as CSS variables if your light theme 
                    // is defined globally, or replace them with explicit colors
                    "--normal-bg": "#ffffff",
                    "--normal-text": "#171717",
                    "--normal-border": "#e5e7eb",
                    "--border-radius": "8px",
                } as React.CSSProperties
            }
            toastOptions={{
                classNames: {
                    // Forced light mode styling using utility classes
                    toast:
                        "group toast bg-white text-gray-900 border-gray-200 shadow-lg font-mono",
                    description: "text-gray-500",
                    actionButton: "bg-gray-900 text-white",
                    cancelButton: "bg-gray-100 text-gray-600",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };