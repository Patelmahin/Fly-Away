/* eslint-disable no-self-compare */
import { useState } from "react"
import Logo from "./Logo"
import Form from "./Form"
import PackingList from "./PackingList";
import Stats from "./Stats";
const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: true },
    { id: 2, description: "Socks", quantity: 12, packed: false },
];
export default function App() {
    const [Items, setItems] = useState(initialItems);


    function handleAddItems(item) {
        setItems((items) => [...items, item])
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



