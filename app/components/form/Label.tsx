type LabelProps = {
    children: React.ReactNode;
    htmlFor?: string;
};

export default function Label({ children, htmlFor }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-semibold text-white mb-2">
            {children}
        </label>
    );
}