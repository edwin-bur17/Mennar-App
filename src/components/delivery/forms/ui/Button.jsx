import Spinner from "@/components/Spinner"
const Button = ({ isLoading, title }) => {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg w-full bg-sky-default text-lg mt-4 py-3 px-3 font-semibold text-white hover:bg-sky-500"
        >
            {isLoading ? (
                <Spinner text="Enviando ..." />
            ) : title}
        </button>
    )
}
export default Button