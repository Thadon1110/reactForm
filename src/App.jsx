import React, { useState } from 'react';
import MyForm from './components/MyForm';
import Header from './components/ListContainer/Header';
import Content from './components/ListContainer/Content';
import axios from 'axios';

const App = () => {
	const [list, setList] = useState([
		{ id: 1, name: 'Jabłka', category: 'fruits', checked: false },
		{ id: 2, name: 'Banany', category: 'fruits', checked: false },
		{ id: 3, name: 'Pomarańcze', category: 'fruits', checked: false },
		{ id: 4, name: 'Wiśnie', category: 'fruits', checked: false },
		{ id: 5, name: 'Winogrono', category: 'fruits', checked: false },
		{ id: 6, name: 'Marchewki', category: 'vegetables', checked: false },
		{ id: 7, name: 'Ziemniaki', category: 'vegetables', checked: false },
		{ id: 8, name: 'Papryki', category: 'vegetables', checked: false },
		{ id: 9, name: 'Cebule', category: 'vegetables', checked: false },
		{ id: 10, name: 'Ogórki', category: 'vegetables', checked: false },
	]);

	const [selectedCategory, setSelectedCategory] = useState('');
	const [isListOpen, setIsListOpen] = useState(true);
	const [isCategorySelected, setIsCategorySelected] = useState(false);
	const [prices, setPrices] = useState({});

	const handleCheckAll = (isChecked) => {
		const updatedList = list.map((item) => ({ ...item, checked: isChecked }));
		setList(updatedList);
	};

	const handleCheckItem = (itemId) => {
		const updatedList = list.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item));
		setList(updatedList);
	};

	const handleAddPrice = (itemId, priceValue) => {
		const updatedPrices = { ...prices, [itemId]: priceValue || 0 };
		setPrices(updatedPrices);

		const updatedList = list.map((item) => (item.id === itemId ? { ...item, price: priceValue || 0 } : item));
		setList(updatedList);
	};

	const handleToggleList = () => {
		setIsListOpen(!isListOpen);
	};

	const onSubmitForm = (data) => {
		setSelectedCategory(data.category);
		setIsCategorySelected(true);
	};

	const handleSendRequest = async () => {
		try {
			const response = await axios.post('https://localhost:3001/api/set-cookie', { list });
			console.log(response.data);
		} catch (error) {
			console.error('Błąd podczas wysyłania requestu:', error);
		}
	};

	return (
		<div className='mainForm__all'>
			<MyForm onSubmit={onSubmitForm} />
			{isCategorySelected && (
				<>
					<div className='mainForm__list'>
						<Header onCheckAll={handleCheckAll} onToggleList={handleToggleList} selectedCategory={selectedCategory} />
						<Content
							list={list.filter((item) => item.category === selectedCategory)}
							onCheckItem={handleCheckItem}
							onAddPrice={handleAddPrice}
							isListOpen={isListOpen}
							prices={prices}
						/>
					</div>
					<button className='mainForm__all-requestButton' onClick={handleSendRequest}>
						Wyślij request
					</button>
				</>
			)}
		</div>
	);
};

export default App;
