import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addTodo, deleteTodo, removeTodo } from "../actions/index"
function Todo() {
    const [inputData, setInputData] = useState('')
    const [hasError, setError] = useState(false)
    const list = useSelector((state) => state.todoReducer.list)
    const dispatch = useDispatch();
    return (
        <div className="inbox">
            <div className="item">
                <input type="text" placeholder="Type here ..." autoCorrect="off" spellCheck="false" value={inputData} onChange={(e) => {
                    setInputData(e.target.value)
                }} />
                <button className="btn" onClick={() => {
                    if (inputData.trim() === "") {
                        setError(true)
                        setInputData('')
                        return
                    }
                    else {
                        setError(false)
                        dispatch(addTodo(inputData))
                        setInputData('')
                    }
                }}>Add</button>
            </div>
            <div >
                {hasError ? <div className="item error">
                    <p >Please enter something</p>
                </div > : null}
                {
                    list.map((elem) => {
                        return (
                            <div className="item hover" key={elem.id}>
                                <p>{elem.data}</p>
                                <button className="btn delete" onClick={() => {
                                    dispatch(deleteTodo(elem.id))
                                }}>delete</button>
                            </div >
                        );
                    })
                }
                {list.length ? <div className="item">
                    <button className="btn delete" onClick={() => {
                        dispatch(removeTodo())
                    }}>delete all items</button>
                </div > : null}
            </div >

        </div >

    )
}

export default Todo
