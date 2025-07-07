
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="fixed flex h-[100vh] w-full justify-center items-center">
        <FaSpinner className="animate-spin text-9xl text-black "/>

    </div>
  )
}

export default Loading