const containsStr = (data, searchStr) => {
	if (data === undefined) {
		return;
	}

	searchStr = searchStr.toLowerCase();

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

export const setFilterConditions = (
	nameInputValue,
	tagInputValue,
	studentObj
) => {
	const nameQuery = nameInputValue.length > 0 ? true : false;
	const tagQuery = tagInputValue.length > 0 ? true : false;

	if (nameQuery && tagQuery) {
		return (
			(containsStr(studentObj.firstName, nameInputValue) ||
				containsStr(studentObj.lastName, nameInputValue)) &&
			containsStr(studentObj.tags, tagInputValue)
		);
	} else if (nameQuery && !tagQuery) {
		return containsStr(studentObj.firstName, nameInputValue);
	} else if (!nameQuery && tagQuery) {
		return containsStr(studentObj.tags, tagInputValue);
	}
};