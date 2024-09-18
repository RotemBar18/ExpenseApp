 
 
 
 export const filterAndSortExpenses = (expenses, filterOptions, sortOption) => {
    const filteredExpenses = applyFilter(expenses, filterOptions);


    const sortedExpenses = filteredExpenses.sort((a, b) => {
        switch (sortOption) {
            case 'date-asc':
                return new Date(a.Date) - new Date(b.Date);
            case 'date-desc':
                return new Date(b.Date) - new Date(a.Date);
            case 'amount-asc':
                return a.Amount - b.Amount;
            case 'amount-desc':
                return b.Amount - a.Amount;
            case 'category-asc':
                return a.Category.localeCompare(b.Category);
            case 'category-desc':
                return b.Category.localeCompare(a.Category);
            default:
                return 0;
        }
    });

    return sortedExpenses;
};

export const applyFilter = (expenses, filter) => {
    const { category, dateRange, minAmount, maxAmount } = filter;
        
    return expenses.filter(expense => {
        let isMatch = true;

        if (category && expense.Category !== category) {
            isMatch = false;
        }
        if (dateRange.start && new Date(expense.Date) < new Date(dateRange.start)) {
            isMatch = false;
        }
        if (dateRange.end && new Date(expense.Date) > new Date(dateRange.end)) {
            isMatch = false;
        }
        if (minAmount !== undefined && !isNaN(minAmount) && expense.Amount < minAmount) {
            isMatch = false;
        }
        if (maxAmount !== undefined && !isNaN(maxAmount) && expense.Amount > maxAmount) {
            isMatch = false;
        }

        return isMatch;
    });
};
