import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADDTODO, TOGGLECHECKED } from "../Redux/actions";
import { DeleteTask, GetTasks, SetTasks, UpdateTask } from "../API/tasks";


export default function TODOLIST() {
  const [TodoValue, setTodoValue] = useState("");
  // const [auth , setAuth] = useState(false);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.Todos);

  const signup = useSelector((store) => store.LOGUP)
  console.log(signup)


  ////////// we get data from this function ////////////////
  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await GetTasks();
            console.log("local", data); 
            dispatch(ADDTODO(data));
        } catch (error) {
            console.error('Error fetching todo list:', error);
        }
    };
    fetchData();
}, [TodoValue, dispatch]);



  const HANDLECHANGEADDTODO = (e) => {
    setTodoValue(e.target.value);
  };


  ////////////////// handleClick  ////////////
  const handleClick = () => {
    if (TodoValue.trim() !== "") {
      SetTasks(TodoValue );
      setTodoValue("");
      document.querySelector("#inpuTodo").value = "";
    } else {
      console.error("Field should not be empty");
    }
  };


  ////////////// handleClickDelete /////////
  const handleClickDelete = async (id) => {
    console.log(id);
    DeleteTask(id)
    const data = await GetTasks();
    dispatch(ADDTODO(data));
  };

  ////////////// HandleCheckBoxUpdate /////////
  const HandleCheckedUpdate = async (id, event) => {
      const checked = event.target.checked;
      console.log(id, checked);
      UpdateTask(id, checked)
      dispatch(TOGGLECHECKED(id));

      const data = await GetTasks();
      dispatch(ADDTODO(data));
  };


  const displayDefaultList = () => {
    return todos.map((todo) => {
      return (
        <>
          <div
            className={
              !todo.isCompleted
                ? "bg-blue-100  px-2 border-blue-300 lg:w-10/12 w-full flex justify-between items-center rounded shadow-md m-auto my-4 "
                : "bg-red-50 lg:w-10/12 w-full flex justify-between items-center rounded shadow-md m-auto my-4 opacity-75 border border-red-400 "
            }
          >
            <div className="w-9/12 p-3">
              <p
                className={
                  !todo.isCompleted
                    ? "text-xl py-1"
                    : "text-xl py-1 text-red-400 line-through"
                }
              >
                {todo.item}
              </p>
              <span className="text-gray-400 text-sm">{todo.updated_at.slice(0, 10)} || { todo.updated_at.slice(11, 16)}</span>
              {/* <span className="text-gray-400 text-sm"> # {todo.user_id}</span> */}
            </div>
            {todo.isCompleted ? (
              <div className="w-2/12  flex justify-end">
                <button
                  onClick={() => handleClickDelete(todo.id)}
                  className=" bg-red-300 text-white p-2 "
                >
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="w-1/12 text-right p-3">
              <input
                className=""
                onChange={(event) => HandleCheckedUpdate(todo.id, event)}
                checked={todo.isCompleted}
                type="checkbox"
              />
            </div>
          </div>
        </>
      );
    });
  };

  
  ////// MAIN RETURN //////

  return (
    <>
      <div className="font-bold w-full h-auto p-4 flex flex-col items-center mt-4">
        <div className="w-10/12 flex flex-col items-center p-4  border-b-2 border-gray-400">
          <div className="bg-slate-100 lg:w-5/12 w-11/12 text-center p-4 mb-4 border border-blue-200">
            <h1 className="text-xl font-bold text-blue-500 ">Deily Todo</h1>
          </div>
          <div className="w-full lg:w-8/12 flex justify-between p-4">
            <input
              onChange={HANDLECHANGEADDTODO}
              className="w-9/12 mr-1 p-3 border-2 outline-blue-200"
              type="text"
              id="inpuTodo"
              placeholder="Typing..."
            />
            <button
              onClick={handleClick}
              className="w-3/12 bg-blue-200 text-lg font-bold text-blue-400  rounded"
            >
              ADD
            </button>
          </div>
        </div>

        
        <div className= "mt-4 bg-gray-100 lg:w-10/12 w-full p-3 flex-col justify-center h-auto" >
          {displayDefaultList()}
        </div>
      </div>
    </>
  );
}
