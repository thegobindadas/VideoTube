

export const handleError = (error) => {
    if (error.response && error.response.data) {
        const html = error.response.data;
        const match = html.match(/Error:\s(.+?)<br>/);
        return match ? match[1] : 'An unexpected error occurred.';
    }

    
    return error.message || 'Something went wrong while creating the playlist.';
};