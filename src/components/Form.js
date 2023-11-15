import { useState } from "react"
export default function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [Num, setNum] = useState(1);




    function handleFormSubmit(e) {
        e.preventDefault()
        if (!description) return
        const newItem = {
            description, quantity: Num, packed: false, id: Date.now()
        }
        onAddItems(newItem);
        setDescription("");
        setNum(1);
    }

    return (
        <form className="add-form" onSubmit={handleFormSubmit}>
            <h3>What do you need for a trip 😍</h3>
            <input type="text"
                placeholder="text...."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select
                value={Num}
                onChange={(e) => setNum(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
            </select>
            <button>Add</button>
        </form>
    );
}