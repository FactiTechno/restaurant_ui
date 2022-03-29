import React, { useState, useEffect } from 'react'
import './style.css'

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);
    }else{
        return [];
    }
}

function Todo() {
    const [inputdata,setinputdata] = useState("");
    const [items,setitems] = useState(getLocalData());
    const [EditItem, setEditItem] = useState("")
    const [toggleButton, settoggleButton] = useState(false);

    // add items in todo list 
    const addItems = () => {
        if (!inputdata) {
            alert("plz fill the data")
        } else if(inputdata && toggleButton) {
            setitems(
                items.map((curElm)=>{
                    if (curElm.id === EditItem){
                        return {...curElm,name:inputdata};
                    }
                    return curElm;
                })
            );
                setinputdata("");
                setEditItem(null);
                settoggleButton(false);
            
        }
        else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata
            }
            setitems([...items,myNewInputData])
            setinputdata("")
        }
    }

    // edit Items in todo list
    const editItem = (index) => {
        const item_todo_edited = items.find((curElm)=>{
            return curElm.id === index;
        });
        setinputdata(item_todo_edited.name);
        setEditItem(index);
        settoggleButton(true);
    }

    // delete item from todo list 
    const deleteItem = (index)=>{
        const updatedItems = items.filter((curElm) => {
            return curElm.id !== index;
        })
        setitems(updatedItems)
    }

    // remove all todo list
    const removeAll = () => {
        return setitems([]);
    }

    // use local storage
    useEffect(() =>{
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here</figcaption>
                    </figure>
                    <div className="addItems">
                        <input 
                        type="text" 
                        placeholder="✍ Add Item"
                        className="form-control"
                        value={inputdata}
                        onChange={(event)=> setinputdata(event.target.value)} />
                        {
                            toggleButton ? 
                                ( <i 
                                    className="fa fa-edit add-btn"
                                    onClick={addItems}></i>)
                                :
                                ( <i 
                                    className="fa fa-plus add-btn"
                                    onClick={addItems}></i>)
                        }                        
                    </div>
                    {/* show our items  */}
                    <div className="showItems">
                        {items.map((curElm,index) => {
                            return(
                                <div className="eachItem" key={curElm.id}>
                                    <h3>{curElm.name}</h3>
                                    <div className="todo-btn">
                                        <i 
                                        className="far fa-edit add-btn"
                                        onClick = {() => editItem(curElm.id)} ></i>
                                        <i 
                                        className="far fa-trash-alt add-btn"
                                        onClick={()=>deleteItem(curElm.id)}></i>
                                    </div>

                                </div>
                            )
                        })}
                        
                    </div>
                    {/* remove all button */}
                    <div className="showItems">
                        <button 
                        className="btn effect04" 
                        data-sm-link-text='Remove All'
                        onClick={removeAll}>
                           <span>Check List</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
