import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';

interface CalculatedItem {
    id: number;
    name: string;
    age: number;
    daysSpent: number;
    dob: string;
}

const AgeCalculator = () => {
    const [name, setName] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [calculatedList, setCalculatedList] = useState<CalculatedItem[]>(() => {
        const savedList = localStorage.getItem('calculatedDobList');
        return savedList ? JSON.parse(savedList) : [];
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editDob, setEditDob] = useState<{ day: string; month: string; year: string }>({ day: '', month: '', year: '' });

    useEffect(() => {
        localStorage.setItem('calculatedDobList', JSON.stringify(calculatedList));
    }, [calculatedList]);

    const calculateAgeAndDays = (day: string, month: string, year: string) => {
        const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const today = new Date();

        const age = today.getFullYear() - birthDate.getFullYear() - (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
        const daysSpent = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
        
        return { age, daysSpent };
    };

    const handleAddToList = () => {
        if (!name || !day || !month || !year) return;

        const { age, daysSpent } = calculateAgeAndDays(day, month, year);
        setCalculatedList([...calculatedList, { id: Date.now(), name, age, daysSpent, dob: `${day}-${month}-${year}` }]);
        setName('');
        setDay('');
        setMonth('');
        setYear('');
    };

    const handleDelete = (id: number) => {
        setCalculatedList(prevList => prevList.filter(item => item.id !== id));
    };

    const handleEdit = (id: number, name: string, dob: string) => {
        const [editDay, editMonth, editYear] = dob.split('-');
        setEditingId(id);
        setEditName(name);
        setEditDob({ day: editDay, month: editMonth, year: editYear });
    };

    const handleSaveEdit = (id: number) => {
        const { age, daysSpent } = calculateAgeAndDays(editDob.day, editDob.month, editDob.year);
        setCalculatedList(prevList =>
            prevList.map(item => item.id === id ? { ...item, name: editName, age, daysSpent, dob: `${editDob.day}-${editDob.month}-${editDob.year}` } : item)
        );
        setEditingId(null);
        setEditName('');
        setEditDob({ day: '', month: '', year: '' });
    };

    const handleSort = (criteria: string) => {
        const sortedList = [...calculatedList].sort((a, b) => {
            if (criteria === 'name') return a.name.localeCompare(b.name);
            if (criteria === 'age') return a.age - b.age;
            if (criteria === 'daysSpent') return a.daysSpent - b.daysSpent;
            return 0;
        });
        setCalculatedList(sortedList);
    };

    return (
        <div className="app-container">
            <Header title="Age & Days Calculator" />
            <div className='input-box'>
                <input type="text" className='input-field' placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="number" className='input-field' placeholder="Day" value={day} onChange={(e) => setDay(e.target.value)} />
                <input type="number" className='input-field' placeholder="Month" value={month} onChange={(e) => setMonth(e.target.value)} />
                <input type="number" className='input-field' placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
            </div>

            <div className="controls">
                <div className="sort-container">
                    <label>Sort By:</label>
                    <select onChange={(e) => handleSort(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="age">Age</option>
                        <option value="daysSpent">Days Spent</option>
                    </select>
                </div>

                <Button onclick={handleAddToList} disabled={false} label="Add to List"  />
            </div>

            <div className="list-container">
                {calculatedList.map(item => (
                    <ul>
                        <li key={item.id} className="list-item">
                            {editingId === item.id ? (
                                <>
                                    <input type="text" className="edit-input" value={editName} onChange={(e) => setEditName(e.target.value)} />
                                    <input type="number" className="edit-input" value={editDob.day} onChange={(e) => setEditDob(prev => ({ ...prev, day: e.target.value }))} />
                                    <input type="number" className="edit-input"  value={editDob.month} onChange={(e) => setEditDob(prev => ({ ...prev, month: e.target.value }))} />
                                    <input type="number" className="edit-input" value={editDob.year} onChange={(e) => setEditDob(prev => ({ ...prev, year: e.target.value }))} />
                                    <div className='action-btn-container'>
                                        <button onClick={() => handleSaveEdit(item.id)} className="save-btn">Save</button>
                                        <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className="list-info">{item.name} is {item.age} years old and has spent <span className='days-spent'>{item.daysSpent}</span> days on Earth 🌎, born on {item.dob}</span>
                                    <div className='action-btn-container'>
                                        <button onClick={() => handleEdit(item.id, item.name, item.dob)} className='edit-btn'>Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className='delete-btn'>Delete</button>
                                    </div>
                                </>
                            )}
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default AgeCalculator;
