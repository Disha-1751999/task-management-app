import React, { useState } from "react";
import { IsEmpty } from "../../utility/ValidationHelper";
import toast from "react-hot-toast";
import TaskStore from "../../store/TaskStore";

function InputForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { CreateTaskRequest, TaskListRequest } = TaskStore();

  const CreateTask = async () => {
    if (!IsEmpty(title) && !IsEmpty(desc) && !IsEmpty(dueDate)) {
      let res = await CreateTaskRequest({
        title: title,
        desc: desc,
        due_date: dueDate,
      });
      if (res) {
        setTitle("");
        setDesc("");
        setDueDate("");
        await TaskListRequest();
        document.getElementById("my_modal_3").close();
        toast.success("Successful...!");
      }
    }
  };
  return (
    <>
      <div className="text-gray-800 font-semibold text-2xl">
        <h1>Add New Task</h1>
      </div>
      <div className="w-full bg-white p-4 rounded my-5 flex flex-col gap-4">
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          placeholder="Title"
          value={title}
          name="title"
          className="px-3 py-2  w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-800 ring-0 focus:outline-none focus:ring-0 focus:border-2 "
        />
        <textarea
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          name="desc"
          rows={6}
          placeholder="Description"
          className="px-3 py-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   focus:border-gray-800 focus:border-2 ring-0 focus:ring-0 focus:outline-none"
          style={{ resize: "none" }}
          value={desc}
        ></textarea>
        <label className="text-lg font-semibold  ">Due Date</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            datepicker="true"
            id="default-datepicker"
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-gray-800 ring-0 focus:outline-none focus:ring-0 focus:border-2 block w-full ps-10 p-2.5"
            placeholder="Select due date"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
          />
        </div>

        <div className="w-full">
          <button
            className="btn btn-active btn-neutral w-20 float-right "
            onClick={CreateTask}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default InputForm;
