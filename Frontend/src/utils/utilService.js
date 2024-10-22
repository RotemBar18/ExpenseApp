
export const formatDateForMySQL = (date) => {
        const formattedDate = new Date(date);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const day = String(formattedDate.getDate()).padStart(2, '0');
        const hours = String(formattedDate.getHours()).padStart(2, '0');
        const minutes = String(formattedDate.getMinutes()).padStart(2, '0');
        const seconds = String(formattedDate.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };

export const formatToLocalDate = (utcDateString) => {
    const localDate = new Date(utcDateString);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(localDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; 
};
export const formatToLocalDatePresent = (utcDateString) => {
    const localDate = new Date(utcDateString);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(localDate.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`; 
};

export const alterCategoriesToArray = (data) => {
    const newData = data
    newData.DefaultCategories = data.DefaultCategories.split(',');
    return newData
};

export const getSuffix = (day) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = day % 100;
    return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
  };
  

