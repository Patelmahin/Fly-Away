import { useState } from "react"
import Item from "./Item"
export default function PackingList({ Items, onDeleteItem, onToggleItems, onListDelete }) {
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