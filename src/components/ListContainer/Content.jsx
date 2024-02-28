import React, { useState } from 'react';

const Content = ({ list, onCheckItem, onAddPrice, isListOpen, prices }) => {
	const [priceInputs, setPriceInputs] = useState({});

	const handlePriceInputChange = (itemId, value) => {
		setPriceInputs((prevInputs) => ({
			...prevInputs,
			[itemId]: value,
		}));
	};

	const handleAddPrice = (itemId) => {
		onAddPrice(itemId, priceInputs[itemId] || 0);
		setPriceInputs((prevInputs) => ({
			...prevInputs,
			[itemId]: '',
		}));
	};

	return (
		<div className='mainForm__content'>
			{isListOpen && (
				<ul>
					{list.map((item) => (
						<li key={item.id}>
							<div>
								<input type='checkbox' id={item.name} checked={item.checked} onChange={() => onCheckItem(item.id)} />
								<label htmlFor={item.name}>
									{item.name}
									{prices[item.id] && <span className='price-span'>{prices[item.id]}</span>}
								</label>
							</div>

							{item.checked && (
								<>
									<input
										className='mainForm__content-input'
										type='text'
										placeholder='Wpisz cenę'
										value={priceInputs[item.id] || ''}
										onChange={(e) => handlePriceInputChange(item.id, e.target.value)}
									/>
									<button onClick={() => handleAddPrice(item.id)}>Dodaj cenę</button>
								</>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Content;
