// compare two strings to see if one contains the other
const containsStr = (data, searchStr) => {
	if (data === undefined) {
		return;
	}

	searchStr = searchStr.toLowerCase();

	// check if provided student data is a tag list (array)
	if (Array.isArray(data)) {
		let matchResults = false;
		for (let value of data) {
			if (value.toLowerCase().includes(searchStr)) {
				matchResults = true;
			}
		}
		return matchResults;
	} else {
		return data.toLowerCase().includes(searchStr);
	}
};

// set filter by name, tag, or both
export const setFilterConditions = (
	nameInputValue,
	tagInputValue,
	studentObj
) => {
	const nameQuery = nameInputValue.length > 0 ? true : false;
	const tagQuery = tagInputValue.length > 0 ? true : false;
	const studentFullName = `${studentObj.firstName} ${studentObj.lastName}`;

	console.log(studentFullName);
	if (nameQuery && tagQuery) {
		return (
			containsStr(studentFullName, nameInputValue) &&
			containsStr(studentObj.tags, tagInputValue)
		);
	} else if (nameQuery && !tagQuery) {
		return containsStr(studentFullName, nameInputValue);
	} else if (!nameQuery && tagQuery) {
		return containsStr(studentObj.tags, tagInputValue);
	}
};
