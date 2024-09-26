export const filterCategories = (expenses, selectedMonths, selectedYears) => {
    const categories = [...new Set(expenses.map((expense) => expense.Category).filter(Boolean))];
    return categories.filter((category) =>
        expenses.some((expense) => {
            const expenseDate = new Date(expense.Date);
            const expenseMonth = expenseDate.toLocaleString('en-US', { month: 'long' });
            const expenseYear = expenseDate.getFullYear().toString();
            return (
                expense.Category === category &&
                (selectedMonths.length === 0 || selectedMonths.includes(expenseMonth)) &&
                (selectedYears.length === 0 || selectedYears.includes(expenseYear))
            );
        })
    );
};

export const filterMonths = (expenses, selectedCategories, selectedYears, allMonths) => {
    // Filter months based on selected categories and years
    const filteredMonths = allMonths.filter((month) =>
      expenses.some((expense) => {
        const expenseDate = new Date(expense.Date);
        const expenseMonth = expenseDate.toLocaleString('en-US', { month: 'long' });
        const expenseYear = expenseDate.getFullYear().toString();
        return (
          (!selectedCategories.length || selectedCategories.includes(expense.Category)) &&
          (!selectedYears.length || selectedYears.includes(expenseYear)) &&
          expenseMonth === month
        );
      })
    );
    return filteredMonths;
  };
  

export const filterYears = (expenses, selectedCategories, selectedMonths) => {
    return [...new Set(expenses.map((expense) => new Date(expense.Date).getFullYear().toString()))].filter((year) =>
        expenses.some((expense) => {
            const expenseDate = new Date(expense.Date);
            const expenseMonth = expenseDate.toLocaleString('en-US', { month: 'long' });
            return (
                expenseDate.getFullYear().toString() === year &&
                (selectedCategories.length === 0 || selectedCategories.includes(expense.Category)) &&
                (selectedMonths.length === 0 || selectedMonths.includes(expenseMonth))
            );
        })
    );
};

export const filterExpenses = (expenses, selectedCategories, selectedMonths, selectedYears) => {
    return expenses.filter((expense) => {
        const expenseDate = new Date(expense.Date);
        const expenseMonth = expenseDate.toLocaleString('en-US', { month: 'long' }).trim();
        const expenseYear = expenseDate.getFullYear().toString().trim();
        const expenseCategory = expense.Category ? expense.Category.trim() : '';

        const isCategorySelected = selectedCategories.length
            ? selectedCategories.includes(expenseCategory)
            : true;

        const isMonthSelected = selectedMonths.length
            ? selectedMonths.includes(expenseMonth)
            : true;

        const isYearSelected = selectedYears.length
            ? selectedYears.includes(expenseYear)
            : true;

        return isCategorySelected && isMonthSelected && isYearSelected;
    });
};

export const createNewReport = (reportName, selectedCategories, selectedMonths, selectedYears, filteredExpenses) => {
    return {
        name: reportName,
        categories: selectedCategories,
        months: selectedMonths,
        years: selectedYears,
        reportData: filteredExpenses,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
};

