export default function Stats({ Items }) {
    if (!Items.length) return (<p className="stats">
        Start adding the items for trip ✈
    </p>);
    const numItems = Items.length;
    const numPacked = Items.filter((item) => item.packed).length;
    const numPercent = Math.round((numPacked / numItems) * 100);
    return (
        <footer className="stats">🎒
            <em>
                {numPercent === 100 ? 'You got everything to go ✈' :
                    ` You have ${numItems} items on your list, and you have already packed ${numPacked} (${numPercent}%)`}
            </em>


        </footer>
    );

}
