import React,{useEffect, useState} from 'react' 
import './style.css'

const getLocalData=()=>{
  const lists=localStorage.getItem("myTodoList");
  if(lists){
    return JSON.parse(lists);
  }else{
  return []}
}
const Todo = () => {
  const[inputdata,setInputData]=useState('')
  const[items,setItems]=useState(getLocalData);
  const [isEdit,setIsEdit]=useState("");
  const [toggleButton,setToggleButton]=useState(false)

  const addItem =()=>{
    if(!inputdata){
      alert('plz fill data')
    }else if(inputdata && toggleButton){
      setItems(
        items.map((curElem)=>{
          if(curElem.id === isEdit){
            return {...curElem,name:inputdata};
          }
          return curElem;
        })
      )
      setInputData("")
    setIsEdit("")
    setToggleButton(false);
    }
    else{
      const myNewInputData ={
        id: new Date().getTime().toString(),
        name:inputdata
      }
      setItems([...items, myNewInputData])
      setInputData("");
    }
  }
  //edit button functioning
  const edit=(index)=>{
    const item_todo_edited=items.find((curElem)=>{
return curElem.id===index
    })
    setInputData(item_todo_edited.name)
    setIsEdit(index)
    setToggleButton(true);
  }


  //delete button functioning
  const deleteItem =(index)=>{
    const updatedItem =items.filter((curElem)=>{
      return curElem.id !==index
    })
    setItems(updatedItem)
  }
  const removeAll =()=>{
    setItems([]);
  }
  useEffect(()=>{
    localStorage.setItem("myTodoList",JSON.stringify(items))
  })
  return (
    <>
<div className="main-div">
  <div className="child-div">
<figure>
  <img src="./images/todo.png" alt="todologo" />
  <figcaption>Add Your List Here </figcaption>
</figure>
<div className="addItems">
  <input type="text" placeholder='✍ ADD YOUR ITEMS HERE' className='form-control' value={inputdata} onChange={(event)=>{setInputData(event.target.value)

  }} />
  
     {toggleButton ? (<i className='far fa-edit add-btn' onClick={addItem}></i> ) :(<i className='fa fa-plus add-btn' onClick={addItem}></i>)
      }
</div>
<div className="showItems">
  {items.map((curElem)=>{
    return(
    <div className="eachItem" key={curElem.id}>
    <h3>{curElem.name}</h3>
    <div className="todo-btn">
  <i className='far fa-edit add-btn' onClick={()=>edit(curElem.id)}></i>
  <i className='far fa-trash-alt add-btn' onClick={()=>{deleteItem(curElem.id)}}></i>

    </div>
    </div>
  )
  })}
  

</div>



<div className="showItems"><button className="btn effect04" data-sm-link-text='REMOVE ALL' onClick={removeAll}><span>CHECK LIST</span></button></div>
  </div>
</div>

    </>
  )
}

export default Todo;
