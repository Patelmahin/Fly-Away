/* eslint-disable no-self-compare */
import { useState } from "react"
const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: true },
    { id: 2, description: "Socks", quantity: 12, packed: false },
];
export default function App() {
    const [Items, setItems] = useState(initialItems);


    function handleAddItems(item) {
        setItems((Items) => [...Items, item])
    }

    function handleDeleteItems(id) {
        setItems((Items) => Items.filter((item) => item.id !== id))
    }

    function handleToggleItems(id) {
        setItems((Items) => Items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item))
    }
    function handlelistDelete() {
        const confirm = window.confirm("Do you really want to delete all the items!");
        if (confirm) {

            setItems([])
        }
    }
    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList Items={Items}

                onDeleteItem={handleDeleteItems}
                onToggleItems={handleToggleItems}
                onListDelete={handlelistDelete} />
            <Stats Items={Items} />

        </div>
    )


}
function Logo() {
    return <h1> 🌴 Far away 🎒</h1>
}
function Form({ onAddItems }) {
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
function PackingList({ Items, onDeleteItem, onToggleItems, onListDelete }) {
    const [sortBy, setSortby] = useState("input")

    let sortItems;
    if (sortBy === "input")
        sortItems = Items;

    if (sortBy === "description")
        sortItems = Items.slice().sort((a, b) => a.description.localeCompare(b.description));

    if (sortBy === 'packed')
        sortItems = Items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))
    return (
        <div className="list">
            <ul>
                {sortItems.map((items) =>
                    <Item item={items}
                        onDeleteItem={onDeleteItem}
                        onToggleItems={onToggleItems}
                        key={items.id}
                    />)}
            </ul>
            <div className="action">
                <select value={sortBy} onChange={e => setSortby(e.target.value)}>
                    <option value="input">
                        sort by the input
                    </option>
                    <option value="description">
                        sort by the description
                    </option>
                    <option value="packed">
                        sort by the packed status
                    </option>
                </select>
                <button onClick={onListDelete}>
                    clear list
                </button>
            </div>
        </div >
    );
}
function Item({ item, onDeleteItem, onToggleItems }) {
    return <li>
        <input type="checkbox"
            value={item.packed}
            onChange={() => onToggleItems(item.id)}
        />

        <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
}
function Stats({ Items }) {
    if (!Items.length) return (<p className="stats">
        Start adding the items for trip ✈
    </p>)
    const numItems = Items.length;
    const numPacked = Items.filter((item) => item.packed).length;
    const numPercent = Math.round((numPacked / numItems) * 100);
    return (
        < footer className="stats">🎒
            <em>
                {numPercent === 100 ? 'You got everything to go ✈' :
                    ` You have ${numItems} items on your list, and you have already packed ${numPacked} (${numPercent}%)`
                }
            </em>


        </footer>
    );

}

