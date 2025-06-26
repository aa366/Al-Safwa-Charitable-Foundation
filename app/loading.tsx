
import { FaSpinner } from "react-icons/fa";

const loading = () => {
  return (
    <div className="fixed flex h-[100vh] w-full justify-center items-center">
        <FaSpinner className="animate-spin text-9xl text-black "/>

    </div>
  )
}

export default loading