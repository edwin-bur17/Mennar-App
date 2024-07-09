import Spinner from "@/components/Spinner"
const Button = ({ isLoading }) => {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg w-full bg-sky-600 text-lg py-3 px-3 font-semibold text-white hover:bg-sky-500"
        >
            {isLoading ? (
                <Spinner text="Enviando ..." />
            ) : ("Entrega")}
        </button>
    )
}

export default Button