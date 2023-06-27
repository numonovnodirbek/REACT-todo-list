import React, {useState , useEffect} from 'react'
import "./style.css"

//get local data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodoList")

    if(lists){
        return JSON.parse(lists);
    }
    else{
        return[];
    }
 };
const Todo = () => {
    const [inputdata, setinputdata] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditItems, setIsEditItems] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    // add the items 
    const addItem = () => {
        if (!inputdata){
            alert("please fill the data")
        }else if(inputdata && toggleButton){
            setItems(
                items.map((curElem) => {
                    if(curElem.id === isEditItems){
                        return{...curElem, name:inputdata}
                    }
                    return curElem;
                })
            )
        setinputdata([]);
        setIsEditItems(null)
        setToggleButton(false);
        }
        else{
            const myNewInputData = {
                id:new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items,myNewInputData])
            setinputdata("")
        }
        
    }
//edit items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        })
        setinputdata(item_todo_edited.name);
        setIsEditItems(index)
        setToggleButton(true);
    }
    //how to delete

    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        })
        setItems(updatedItems)
    }
//remove all 
    const removeAll = () => {
        setItems([])
    }
// adding local storage 
    useEffect(() => {
        localStorage.setItem("mytodoList", JSON.stringify(items))
    }, [items])

    return (
        <>
            <h2>My To-Do List</h2>
           <div className='main-div'>
               
                <div className='child-div'>
                
                    <figure>
                        <img src="./todo.svg" alt="todoLOGO" />
                        <figcaption>Add Your List Here✌</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text"
                         placeholder='✍️add items'
                         className='form-control'
                         value={inputdata}
                         onChange={(event) => setinputdata(event.target.value)}
                         />
                         {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>)
                         : (<i className="fa fa-thin fa-calendar-plus add-btn" onClick={addItem}></i>
                         )}
                         
                    </div>
                        {/* show our items */}
                        <div className='showItems'>
                            {items.map((curElem) => {
                                return (
                                    <div className='eachItem' key={curElem.id}>
                                        <h3>{curElem.name}</h3>
                                        <div className='todo-btn'>
                                        <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                        {/* remobe all button */}
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>NODIRBEK LIST</span>
                        </button>
                    </div>
                
                </div>
            </div> 
        </>
    )
}

export default Todo
