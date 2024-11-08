

export const handleError = (error) => {
    if (error.response?.data) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(error.response.data, 'text/html');
        const preElement = doc.querySelector('pre');
        return preElement 
            ? preElement.textContent.split('\n')[0].replace("Error: ", "") 
            : 'An error occurred';
    } else {
        return error.message || 'An error occurred';
    }
};
