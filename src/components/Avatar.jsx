// avatar component
export const Avatar = ({ avatarURL, cname }) => {
	return (
		<div className={cname}>
			<img src={avatarURL} alt='User avatar' />
		</div>
	);
};
