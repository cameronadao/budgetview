function AppContent() {
    const { theme } = useTheme();
    const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  
    return (
      <StyledThemeProvider theme={currentTheme}>
        <GlobalStyles />
        <div className="container">
          <header>
            <h1>BudgetView</h1>
            <ThemeToggle />
          </header>
          <Balance />
          <IncomeExpense />
          <ExpenseChart />
          <TransactionList />
          <AddTransaction />
        </div>
      </StyledThemeProvider>
    );
  }