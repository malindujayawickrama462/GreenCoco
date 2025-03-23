import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5002/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income)
            if(response.data) {
                getIncomes()
                return response.data
            }
        } catch (err) {
            console.error("Error adding income:", err.response?.data || err.message)
            setError(err.response?.data?.message || "Failed to add income. Please check your inputs.")
        }
    }

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`)
            if(response.data) {
                setIncomes(response.data)
            }
        } catch (err) {
            console.error("Error fetching incomes:", err)
            setError("Failed to fetch incomes")
        }
    }

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`)
            getIncomes()
        } catch (err) {
            console.error("Error deleting income:", err)
            setError("Failed to delete income")
        }
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + parseFloat(income.amount)
        })
        return totalIncome;
    }

    //calculate expenses
    const addExpense = async (expense) => {
        try {
            const response = await axios.post(`${BASE_URL}add-expense`, expense)
            if(response.data) {
                getExpenses()
                return response.data
            }
        } catch (err) {
            console.error("Error adding expense:", err.response?.data || err.message)
            setError(err.response?.data?.message || "Failed to add expense. Please check your inputs.")
        }
    }

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`)
            if(response.data) {
                setExpenses(response.data)
            }
        } catch (err) {
            console.error("Error fetching expenses:", err)
            setError("Failed to fetch expenses")
        }
    }

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`)
            getExpenses()
        } catch (err) {
            console.error("Error deleting expense:", err)
            setError("Failed to delete expense")
        }
    }

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) => {
            totalExpense = totalExpense + parseFloat(expense.amount)
        })
        return totalExpense;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0, 3)
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}