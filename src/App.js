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

  const testObject = new ListItemClass("And thats it!");
  const testObject2 = new ListItemClass("The ref prop gives us the element as a parameter which allows us to assign the element however we want. In the example, we push that element into the itemsEls.current array so it can be used further down the line.");
  const testObject3 = new ListItemClass("We can now store an array of refs");

  //State array of objects
  const [toDoListItems, setToDoListItems] = useState([testObject, testObject2, testObject3]);
  
  //Refers to input box element
  const inputBoxRef = useRef();

  const listItemContainerRefArray = useRef([]);

  //Takes user input and creates a list item from it
  const takeUserInput = () => {
    //If user has entered text
    if (inputBoxRef.current.value) {
      const newListItemObject = new ListItemClass(inputBoxRef.current.value); //Create new list item object
      let tempArray = [...toDoListItems]; //Create temporary array so we can alter state array
      tempArray.push(newListItemObject); //Push new list item object to temp array
      setToDoListItems(tempArray); //Update state array with updated array
    }

  }

  const checkListItemDone = (itemIndex) => {
    let tempArray = [...toDoListItems];
    tempArray[itemIndex].isDone = !tempArray[itemIndex].isDone;
    setToDoListItems(tempArray);

    //Check if item done === true, apply correct background colour if so
    if (tempArray[itemIndex].isDone) { 
      listItemContainerRefArray.current.style.backgroundColor = "green";
    } else {
      listItemContainerRefArray.current.style.backgroundColor = "red";
    }
    

    console.log(tempArray[itemIndex].isDone);
  }

  const editListItem = (itemIndex) => {
    let tempArray = [...toDoListItems];
    tempArray[itemIndex].listItemText = inputBoxRef.current.value;
    setToDoListItems(tempArray);
  }

  const removeListItem = (itemIndex) => {
    let tempArray = [...toDoListItems];
    tempArray.splice(itemIndex, 1);
    setToDoListItems(tempArray);
  }

  return (
    <div className="App">

      <div id='itemEntryBarContainer'>
        <div>        
          <input type='text' ref={inputBoxRef} placeholder="Add or edit a list item"></input>
          <button id='addListItemButton' onClick={takeUserInput}>Add Item</button>
        </div>

      </div>

      <div id='listContainer'>
        {toDoListItems.map((listItemObject, index) => {
          return (
            <ListItem listItemContainerArrayRef={listItemContainerRefArray} listItemObject={listItemObject} key={index} removeItemFunc={() => removeListItem(index)} checkItemDone={() => checkListItemDone(index)} editListItem={() => editListItem(index)}></ListItem>
          )
        })}
      </div>

    </div>
  );
}

//Need to add list item container refs to refs array
//Also breaks when pressing done after removing an item

// ref={(element) => props.listItemContainerArrayRef.current.push(element)}

const ListItem = (props) => {
  return (
    <div className='listItemContainer' ref={props.listItemContainerArrayRef}>
      
      <p className='listItemText'>{props.listItemObject.listItemText}</p>

      <div className='listItemButtonContainer'>
        <button className='checkItemAsDoneButton' onClick={props.checkItemDone}>Done</button>
        <button className='editItemButton' onClick={props.editListItem}>Edit</button>
        <button className='deleteItemButton' onClick={props.removeItemFunc}>Delete</button>
      </div>

    </div>
  );
    
}

export default App;
