import React,{useState} from "react";
import './edit.css'
const Edit = ({ name, description, price, image,handleEdit }) => {
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedPrice, setEditedPrice] = useState(price);
  
    const handleEdit = () => {
      setEditing(true);
    };
  
    const handleCancel = () => {
      setEditing(false);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setEditing(false);
    };
  
    return (
      <div className="product">
        <img src={image} alt={name} />
        <h2>{editing ? <input value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : name}</h2>
        <p>{editing ? <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} /> : description}</p>
        <span>{editing ? <input type="number" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} /> : price}</span>
        <button onClick={handleEdit}>{editing ? 'Save' : 'Edit'}</button>
        {editing && <button onClick={handleCancel}>Cancel</button>}
        {editing && <button onClick={handleSubmit}>Submit</button>}
      </div>
    );
  };


  export default Edit