import { DataObjectType } from "../Types/Types";
import { useAppContext } from "./useAppContext"
import { useSharedHook } from "./useSharedHook";

export const useHomeHook = () => {

  // ==================================================
  // Declarations ==================================================
  
  const {SelectedItems, setSelectModeOn, setSelectedItems, AllNotes, SelectModeOn, setClickedId, ShowingNotes, setActiveScreen, setNoteStatus, setTitle, setNote, setShowingNotes} = useAppContext();

  const {DeleteData} = useSharedHook();

  // ==================================================
  // ==================================================
  
  
  // ==================================================
  // ==================================================
  
  const CheckSelected = (id: number) => {
    
    const result = SelectedItems.includes(id)
  
    return result
  
  }

  // ==================================================
  // ==================================================
  
  const AddToSelectedItems = (id: number) => {
  
    if(SelectedItems.length <= 0)
    {
      setSelectModeOn(true)
    }
  
    const newArray = [...SelectedItems, id]
  
    setSelectedItems(newArray)
  
  }

  // ==================================================
  // ==================================================

  const RemoveFromSelectedItems = (id: number) => {

    const newArray = SelectedItems.filter((item:number) => {
  
      if(item != id)
      {
        return item
      }
  
    })
  
    setSelectedItems(newArray)
  
    if(newArray.length <= 0)
    {
      setSelectModeOn(false)
    }
  
  }

  // ==================================================
  // ==================================================

  const onDeletePress = async () => {

    const removeArray = AllNotes.filter(item => SelectedItems.includes(item.id))
    const keepArray = AllNotes.filter(item => !SelectedItems.includes(item.id))

    await DeleteData(removeArray, keepArray)

    setSelectedItems([])
    setSelectModeOn(false)

  }

  // ==================================================
  // ==================================================

  const onNotePress = (id:number) => {
      
    if(SelectModeOn)
    {

      if(CheckSelected(id))
      {
        RemoveFromSelectedItems(id)
      }
      else
      {
        AddToSelectedItems(id)
      }

    }
    else
    {
  
      setClickedId(id);
      const ClickedItem = ShowingNotes.find((item: DataObjectType)=>item.id==id)
    
      setActiveScreen("note")
      setNoteStatus("update")
    
      if(ClickedItem)
      {
        setTitle(ClickedItem.title)
        setNote(ClickedItem.note)
      }
    }
  
  }

  // ==================================================
  // ==================================================

  const onNoteLongPress = (id: number) => {

    if(CheckSelected(id))
    {
      RemoveFromSelectedItems(id)
    }
    else
    {
      AddToSelectedItems(id)
    }
  }

  // ==================================================
  // ==================================================

  const onPlusPress = () => {

    setActiveScreen("note")
    setNoteStatus("insert")
    
  }

  // ==================================================
  // ==================================================

  const onSearchTextChange = (filteredArray: DataObjectType[]) => {

    setShowingNotes(filteredArray)

  }

  // ==================================================
  // ==================================================

  return{
    CheckSelected,
    AddToSelectedItems,
    RemoveFromSelectedItems,
    onDeletePress,
    onNotePress,
    onPlusPress,
    onNoteLongPress,
    onSearchTextChange,
  }
}