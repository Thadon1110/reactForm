import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
	category: yup.string().required('Wybierz kategorię'),
});

const MyForm = ({ onSubmit }) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='mainForm__form'>
			<label>Jedzenie</label>
			<Controller
				name='category'
				control={control}
				render={({ field }) => (
					<select {...field}>
						<option value=''></option>
						<option value='vegetables'>Warzywa</option>
						<option value='fruits'>Owoce</option>
					</select>
				)}
			/>
			<p>{errors.category?.message}</p>

			<button type='submit'>Wyślij</button>
		</form>
	);
};

export default MyForm;
