import React from "react";
import Cards from "../home/Cards";
import { IoMdAddCircle } from "react-icons/io";
import InputForm from "../home/InputForm";
import { ImMenu } from "react-icons/im";
import ToggleStore from "../../store/ToggleStore";

function Tasks() {
     const {toggleOpen}= ToggleStore()
  
  return (
    <>
      <div>
        <div className="w-full flex justify-between px-4 py-2 ">
          <button>
          <ImMenu onClick={toggleOpen} className="text-4xl text-white cursor-pointer hover:text-gray-100 transition-all duration-300 md:hidden" />
          </button>
          <button>
            <IoMdAddCircle
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="text-4xl text-gray-400 cursor-pointer hover:text-gray-100 transition-all duration-300"
            />
          </button>
        </div>

        <div>
          <Cards />
        </div>
      </div>
      <dialog id="my_modal_3" className="modal text-gray-900">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <InputForm />
          </div>
        </div>
      </dialog>
     
    </>
  );
}

export default Tasks;
