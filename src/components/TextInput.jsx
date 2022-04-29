export const TextInput = ({
	id,
	cname,
	handleStateChange,
	state,
	placeholder,
	type,
}) => {
	return (
		<input
			id={id}
			type={type}
			className={cname}
			onChange={handleStateChange}
			placeholder={placeholder}
			value={state}
		/>
	);
};
