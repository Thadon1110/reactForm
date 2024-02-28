import React, { useState, useEffect } from 'react';

const Header = ({ onCheckAll, onToggleList, selectedCategory }) => {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		setIsChecked(false); // Resetujemy checkbox przy zmianie kategorii
	}, [selectedCategory]);

	const handleCheckAll = () => {
		setIsChecked(!isChecked);
		onCheckAll(!isChecked);
	};

	const handleToggleList = () => {
		onToggleList();
	};

	return (
		<div className='mainForm__header'>
			<input type='checkbox' id='headerValue' checked={isChecked} onChange={handleCheckAll} />
			<label htmlFor='headerValue'>{selectedCategory === 'fruits' ? 'Owoce' : 'Warzywa'}</label>
			<i className='fa-solid fa-chevron-down mainForm__header-arrow' onClick={handleToggleList}></i>
		</div>
	);
};

export default Header;
