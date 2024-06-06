
export default function FormError({ error }) {
    return (
        error && <p className="mb-1 text-red-500 text-center font-semibold">{error.message}</p>
    );
}