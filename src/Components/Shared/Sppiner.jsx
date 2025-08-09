import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spinner = () => {
    return (
        <div>
            <div className="flex flex-col min-h-screen justify-center items-center">
                <AiOutlineLoading3Quarters size={80} className="animate-spin text-center text-2xl" />
            </div>

        </div>
    );
};

export default Spinner;