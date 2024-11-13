interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode
}

const List =<T,> ({items, renderItem}: ListProps<T>) => {
    return (
        <ul>
            {items.map((item, index) => {
                return (
                    <li key={index}>{renderItem(item)}</li>
                )
            })}
        </ul>
    )
}

export default List