import { useToast } from "@/hooks/use-toast"
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
    variantIcon,
} from "@/components/ui/toast"

export function Toaster() {
    const { toasts } = useToast()

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, action, variant, ...props }) {
                return (
                    <Toast key={id} variant={variant} {...props}>
                        {/* Icon */}
                        {variantIcon[variant] ?? variantIcon.default}

                        {/* Content */}
                        <div className="flex-1 grid gap-0.5 pr-4">
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && <ToastDescription>{description}</ToastDescription>}
                        </div>

                        {action}
                        <ToastClose />
                    </Toast>
                )
            })}
            <ToastViewport />
        </ToastProvider>
    )
}
