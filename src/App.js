import { useRef, useState } from 'react';
import './App.css';

function App() {

  //Create class to create list item objects
  class ListItemClass {
    constructor(listItemText) {
      this.listItemText = listItemText;
      this.isDone = false;
      this.isArchived = false;
    }
  }

  const testObject = new ListItemClass("Example Task");

  //State array of objects for main list
  const [toDoListItems, setToDoListItems] = useState([testObject]);

  //State array of objects for archive list
  const [toDoListItemsArchive, setToDoListItemsArchive] = useState([]);
  
  //Refers to input box element
  const inputBoxRef = useRef();

  //Error message state string
  const [errorMessage, setErrorMessage] = useState("");

  //Takes user input and creates a list item from it
  const takeUserInput = () => {
    //If user has entered text
    if (inputBoxRef.current.value) {
      const newListItemObject = new ListItemClass(inputBoxRef.current.value); //Create new list item object
      let tempArray = [...toDoListItems]; //Create temporary array so we can alter state array
      tempArray.push(newListItemObject); //Push new list item object to temp array
      setToDoListItems(tempArray); //Update state array with updated array
    } else {
      updateErrorMessage("Please enter text");
    }

  }

  //Sets a list item to done or not done
  const checkListItemDone = (itemIndex) => {
    let tempArray = [...toDoListItems];
    tempArray[itemIndex].isDone = !tempArray[itemIndex].isDone;
    setToDoListItems(tempArray);
  }

  //Updates a list item with input text
  const editListItem = (itemIndex) => {
    //Checks if there is text in input box
    if (inputBoxRef.current.value) {
      let tempArray = [...toDoListItems];
      tempArray[itemIndex].listItemText = inputBoxRef.current.value;
      setToDoListItems(tempArray);
    } else {
      updateErrorMessage("Please enter text");
    }

  }

  //Deletes archive list item completely
  const removeArchiveListItem = (itemIndex) => {
    let tempArray = [...toDoListItemsArchive];
    tempArray.splice(itemIndex, 1);
    setToDoListItemsArchive(tempArray);
  }

  //Moves item from archived list back to main list
  const unarchiveListItem = (itemIndex) => {
    let tempArray = [...toDoListItems];
    let tempArray2 = [...toDoListItemsArchive];

    tempArray2[itemIndex].isArchived = false;

    tempArray.push(tempArray2[itemIndex]);
    setToDoListItems(tempArray);

    tempArray2.splice(itemIndex, 1);
    setToDoListItemsArchive(tempArray2);

  }

  //Removes an item from main list and adds it to the archive list
  const removeListItem = (itemIndex) => {
    let tempArray = [...toDoListItems];
    let tempArray2 = [...toDoListItemsArchive];

    //Update bool so show item is archived
    tempArray[itemIndex].isArchived = true;

    //Add item to archive list before deleting it
    tempArray2.push(tempArray[itemIndex]);
    setToDoListItemsArchive(tempArray2);

    //Remove item from main list
    tempArray.splice(itemIndex, 1);
    setToDoListItems(tempArray);
  }

  //Handles error messages
  const updateErrorMessage = (errorMessageText) => {
    setErrorMessage(errorMessageText);
  }

  return (
    <div className="App">
      <h1 id="title">To Do List</h1>

      <p>{errorMessage}</p>

      <div id='itemEntryBarContainer'>
        <div>
          <input type='text' ref={inputBoxRef} placeholder="Add or edit a list item"></input>
          <button id='addListItemButton' onClick={takeUserInput}>Add Item</button>
        </div>
      </div>

      <div className='listContainer'>
        {toDoListItems.map((listItemObject, index) => {
          return (
            <ListItem listItemObject={listItemObject} key={index} removeItemFunc={() => removeListItem(index)} checkItemDone={() => checkListItemDone(index)} editListItem={() => editListItem(index)}></ListItem>
          )
        })}
      </div>

      <h1 id="title">Archived Tasks</h1>

      <div className='listContainer'>
        {toDoListItemsArchive.map((listItemObject, index) => {
          return (
            <ListItem listItemObject={listItemObject} key={index} removeItemFunc={() => removeArchiveListItem(index)} unarchiveItemFunc={() => unarchiveListItem(index)}></ListItem>
          )
        })}
      </div>
    </div>
  );
}

//List item react component
const ListItem = (props) => {
  return (
    //Sets colour of task to green or red based on done status, using classname to style with css
    <div className={props.listItemObject.isDone ? 'listItemContainer completedTask' : 'listItemContainer'}>
      
      <p className='listItemText'>{props.listItemObject.listItemText}</p>

      <div className='listItemButtonContainer'>
        <button className={props.listItemObject.isArchived ? 'unarchiveButton' : 'unarchiveButton buttonArchived'} onClick={props.unarchiveItemFunc}>Unarchive</button>
        <button className={props.listItemObject.isArchived ? 'checkItemAsDoneButton buttonArchived' : 'checkItemAsDoneButton'} onClick={props.checkItemDone}>Done</button>
        <button className={props.listItemObject.isArchived ? 'editItemButton buttonArchived' : 'editItemButton'} onClick={props.editListItem}>Edit</button>
        <button className='deleteItemButton' onClick={props.removeItemFunc}>Delete</button>
      </div>

    </div>
  );
    
}

export default App;
