export const getTextColorBasedOnBackground = (bgColor) => {
    const color = bgColor.replace(/^#/, '');

    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    return brightness < 0.5 ? 'white' : 'black';
};
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

export const isHexColor=(str)=> {
    const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
    return hexColorRegex.test(str);
}


export const processString = (str) => {
    if (typeof(str)=='object'){
        return "object"
    }
    if (isHexColor(str)) {
        return 'color'
    } else {
        return 'category'
    }
}
