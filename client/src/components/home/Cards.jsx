import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import TaskStore from "../../store/TaskStore";
import moment from "moment";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function Cards() {
  const { TaskList, TaskListRequest, RemoveTaskRequest, UpdateTaskRequest } = TaskStore();
  const [taskToEdit, setTaskToEdit] = useState(null); // Task being edited
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState(false);
  
  const [updatedStatus, setUpdatedStatus] = useState("");
  
  const [id, setId] = useState("");

  useEffect(() => {
    (async () => {
      await TaskListRequest();
    })();
  }, []);

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setTitle(task.title);
    setDesc(task.desc);
    setId(task._id)
    setDueDate(moment(task.due_date).format("YYYY-MM-DD")); // Format to input-compatible date
    if(task.status=='Pending'){
      setStatus(false);
    }else{
      setStatus(true);
    }
    
    document.getElementById("edit_modal").showModal();
  };

  const updateTask = async (id) => {
    
    try {
      // if(status){
      //    setUpdatedStatus('Completed');
      // }else{
      //    setUpdatedStatus('Pending');
      // }

      let updatedTask ;
     if(status){
       updatedTask = {
        ...taskToEdit,
        title,
        desc,
        due_date: dueDate,
        status:'Completed',
      };
     }else{
      updatedTask = {
        ...taskToEdit,
        title,
        desc,
        due_date: dueDate,
        status:'Pending',
      };
     }
      
      
      const res = await UpdateTaskRequest(updatedTask,id);

      if (res) {
        toast.success("Task updated successfully!");
        await TaskListRequest();
        closeEditModal();
      }
    } catch (error) {
      toast.error("Failed to update task. Please try again.");
    }
  };

  const closeEditModal = () => {
    setTaskToEdit(null);
    setTitle("");
    setDesc("");
    setDueDate("");
    setStatus(false);
    document.getElementById("edit_modal").close();
  };

  const removeTask = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await RemoveTaskRequest(id);
          if (res) {
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
            await TaskListRequest();
          }
        } catch (error) {
          toast.error("Failed to delete the task. Please try again.");
        }
      }
    });
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {TaskList &&
          TaskList.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-gray-800 rounded-sm p-4"
            >
              <div>
                <h3 className="text-xl font-semibold"> {item.title}</h3>
                <p className="text-gray-300 my-2">{item.desc}</p>
                <p className="text-md font-medium">
                  Due Date: {moment(item.due_date).format("MMM D, YYYY")}
                </p>
                {/* <p
                  className={`text-sm font-semibold ${
                    item.status=="Completed" ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {item.status}
                </p> */}
              </div>
              <div className="mt-4 w-full flex items-center justify-between">
                <button className={`${
                    item.status=="Completed" ? "bg-cyan-400" : "bg-rose-400"
                  } p-2 rounded`}>{item.status}</button>
                <div className="text-white text-2xl w-3/6 p-2 font-semibold flex justify-end gap-5">
                  <button onClick={() => openEditModal(item)}>
                    <FaEdit />
                  </button>
                  <button>
                    <MdDelete
                      onClick={() => {
                        removeTask(item._id);
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        <div
          onClick={() => document.getElementById("my_modal_3").showModal()}
          className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-5xl text-gray-300 hover:bg-gray-400 hover:text-gray-800 hover:cursor-pointer transition-all duration-300"
        >
          <IoMdAddCircle />
          <h2 className="text-3xl mt-4">Add Task</h2>
        </div>
      </div>

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal text-gray-900">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeEditModal}
            >
              ✕
            </button>
          </form>
          <div>
            <div className="text-gray-800 font-semibold text-2xl">
              <h1>Update Task</h1>
            </div>
            <div className="w-full bg-white rounded flex flex-col gap-3 p-3 mt-3">
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
                value={title}
                name="title"
                className="px-3 py-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-800 focus:ring-0 focus:outline-none focus:border-2"
              />
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                name="desc"
                rows={6}
                placeholder="Description"
                className="px-3 py-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-800 focus:ring-0 focus:outline-none focus:border-2"
                value={desc}
                style={{ resize: "none" }}
              ></textarea>
              <label className="text-lg font-semibold">Due Date</label>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-800 focus:ring-0 focus:outline-none focus:border-2 block w-full p-2.5"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="status"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-800"
                />
                <label
                  htmlFor="status"
                  className="text-sm font-semibold text-gray-900"
                >
                  Mark as Completed
                </label>
              </div>
              <button
                className="btn btn-active btn-neutral w-20 float-right"
                onClick={()=>{updateTask(id)}}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Cards;
