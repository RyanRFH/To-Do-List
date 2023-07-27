import { useRef, useState } from 'react';
import './App.css';

function App() {

  //Create class to create list item objects
  class ListItemClass {
    constructor(listItemText) {
      this.listItemText = listItemText;
      this.isDone = false;
    }
  }

  const testObject = new ListItemClass("CLASS TEST");
  const testObject2 = new ListItemClass("CLASS TEST");
  const testObject3 = new ListItemClass("CLASS TEST");

  //State array of objects
  const [toDoListItems, setToDoListItems] = useState([testObject, testObject2, testObject3]);
  
  //Refers to input box element
  const inputBoxRef = useRef();

  const listItemContainerRefArray = useRef(new Array());

  //Takes user input and creates a list item from it
  const takeUserInput = () => {
    const newListItemObject = new ListItemClass(inputBoxRef.current.value); //Create new list item object
    let tempArray = [...toDoListItems]; //Create temporary array so we can alter state array
    tempArray.push(newListItemObject); //Push new list item object to temp array
    setToDoListItems(tempArray); //Update state array with updated array
  }

  const checkListItemDone = (itemIndex) => {
    let tempArray = [...toDoListItems];
    tempArray[itemIndex].isDone = !tempArray[itemIndex].isDone;
    setToDoListItems(tempArray);

    //Check if item done === true, apply correct background colour if so
    if (tempArray[itemIndex].isDone) { 
      
    } else {

    }
    listItemContainerRefArray.current.style.backgroundColor = "blue";

    console.log(tempArray[itemIndex].isDone);
  }

  const removeListItem = (itemIndex) => {
    let tempArray = [...toDoListItems];
    tempArray.splice(itemIndex, 1);
    setToDoListItems(tempArray);
  }

  return (
    <div className="App">

      <div id='itemEntryBarContainer'>
        <input type='text' ref={inputBoxRef}></input>
        <button id='addListItemButton' onClick={takeUserInput}>Add Item</button>
      </div>

      <div id='listContainer'>
        {toDoListItems.map((listItemObject, index) => {
          return (
            <ListItem listItemContainerArrayRef={listItemContainerRefArray} listItemObject={listItemObject} key={index} removeItemFunc={() => removeListItem(index)} checkItemDone={() => checkListItemDone(index)}></ListItem>
          )
        })}
      </div>

    </div>
  );
}

// ref={(element) => props.listItemContainerArrayRef.current.push(element)}

const ListItem = (props) => {
  return (
    <div className='listItemContainer' ref={props.listItemContainerArrayRef}>
      <p className='listItemText'>{props.listItemObject.listItemText}</p>
      <div className='listItemButtonContainer'>
        <button className='checkItemAsDoneButton' onClick={props.checkItemDone}>Done</button>
        <button className='deleteItemButton' onClick={props.removeItemFunc}>Delete</button>
      </div>

    </div>
  );
    
}

export default App;
