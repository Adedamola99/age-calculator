import Button from '../components/Button';
import Header from '../components/Header';
import InputField from '../components/InputField';
import { useEffect, useState } from 'react';

const YearOfBirth = () => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string | number>('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState<string>('');
    const [editAge, setEditAge] = useState<string | number>('');
    const [calculatedList, setCalculatedList] = useState<{ id: number, name: string; age: string | number, yearBorn: number }[]>(() => {
        const savedList = localStorage.getItem('calculatedList');
        return savedList ? JSON.parse(savedList) : [];
    });

    useEffect(() => {
        localStorage.setItem('calculatedList', JSON.stringify(calculatedList));
    }, [calculatedList]);

    const year = new Date().getFullYear();

    const handleAddToList = () => {
        if (!name || !age ) return;
        const yearBorn = year - Number(age);
        setCalculatedList([...calculatedList, { id: Date.now(), name, age, yearBorn }]);
        setName('');
        setAge('');
    };

    const handleDelete = (id: number) => {
        setCalculatedList(prevList => prevList.filter(list => list.id !== id));
    };

    const handleEdit = (id: number, name: string, age: string | number) => {
        setEditingId(id);
        setEditName(name);
        setEditAge(age);
    };

    const handleSaveEdit = (id: number) => {
        setCalculatedList(prevList =>
            prevList.map(item => item.id === id ? { ...item, name: editName, age: editAge, yearBorn: year - Number(editAge) } : item)
        );
        setEditingId(null);
        setEditName('');
        setEditAge('');
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditName('');
        setEditAge('');
    };

    const handleSort = (pickedSort: string) => {
        const sortedList = [...calculatedList].sort((a, b) => {
            switch (pickedSort) {
                case 'name': return a.name.localeCompare(b.name);
                case 'age': return Number(a.age) - Number(b.age);
                case 'yearBorn': return a.yearBorn - b.yearBorn;
                default: return 0;
            }
        });
        setCalculatedList(sortedList);
    };

    return (
        <div className="app-container">
            <Header title="Age Calculator" />
            <InputField
                name={name}
                age={age}
                onNameChange={setName}
                onAgeChange={setAge}
            />
            <div className="controls">
                <div className='sort-container'>
                    <label htmlFor="sortSelection">Sort By:</label>
                    <select name="sortSelection" id="sort" onChange={(e) => handleSort(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="age">Age</option>
                        <option value="yearBorn">Year Born</option>
                    </select>
                </div>
                <Button onclick={handleAddToList} disabled={false} label="Add to List"  />
            </div>
            <div className="list-container">
                {calculatedList.length > 0 ? (
                    <ul>
                        {calculatedList.map(list => (
                            <li key={list.id} className="list-item">
                                {editingId === list.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="edit-input"
                                        />
                                        <input
                                            type="number"
                                            value={editAge}
                                            onChange={(e) => setEditAge(e.target.value)}
                                            className="edit-input"
                                        />
                                        <div className='action-btn-container'>
                                            <button onClick={() => handleSaveEdit(list.id)} className="save-btn">Save</button>
                                            <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span className="list-info">{list.name} is {list.age} years old, born in {list.yearBorn}</span>
                                        <div className='action-btn-container'>
                                            <button onClick={() => handleEdit(list.id, list.name, list.age)} className="edit-btn">Edit</button>
                                            <button onClick={() => handleDelete(list.id)} className="delete-btn">Delete</button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No age calculations yet.</p>
                )}
            </div>
        </div>
    );
};

export default YearOfBirth;
