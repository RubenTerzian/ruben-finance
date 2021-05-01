import firebase from 'firebase/app';

const initialState = {
    
    users: [],
    currentUser: {
        id: '',
        name: '',
        wallet: {
            accounts: [
                {
                    id: '',
                    name: 'Рубен Приват',
                    type: 'Карта', //наличные или карта
                    amount: 1000,
                    currency: 'Гривна',
                    currencyIcon: ''
                }
            ],
            totalAmount: 1000,
            debts: {
                debit: [{
                    id: '',
                    name: 'Вася',
                    amount: 200,
                }],
                credit: [{
                    id: '',
                    name: 'Петя',
                    amount: 100,
                }]
            }
        },
        categories: [
            {
                id: '5b78cb55bda',
                name: 'Зарплата',
                subCategorys: [{
                    id: 'b78cb55bda3',
                    name: 'Моя',
                    budgetLimit: 0,
                    budgetCurrentAmount: 0,
                }],
                isIncome: true, // доход или расход
                budgetLimit: 0,
                budgetCurrentAmount: 0,
            },
                {
                id: '78cb55bda38',
                name: 'Квартира',
                subCategorys: [],
                isIncome: false, // доход или расход
                budgetLimit: 0,
                budgetCurrentAmount: 0,
            }
        ],
        transactions: [{
            date: '',
            allTransactions: [{
                id: '',
                amount: 0,
                accounts: '',
                category: '',
                comment: '',

            }]
        }]
    },
    isAuth: false,
    token: '',
    data: null,
}

const storeChangers = {
    GET_CURRENT_USER: (state, payload) => {
        return {
            ...state,
            isAuth: true,
            token: payload.token,
            data: payload.user,
        }
    },
    LOGGOUT: (state, payload) => {
    firebase.auth().signOut();
        return {
            ...state,
            token: '',
            isAuth: false,
            data: null,
        }
    },
    ADD_CATEGORY: (state, payload) => {
        const {id, name, isSubCategory, category, isIncome} = payload;
        const newCaterorys = [...state.currentUser.categories];
        const mainCategory = newCaterorys.find(categ => categ.id === category);
        console.log(id)
        const newCategory = {
            id,
            name,
            subCategorys: [],
            isIncome,
            budgetLimit: 0,
            budgetCurrentAmount: 0,
        }
        const newSubCategory = {
            id,
            name,
            budgetLimit: 0,
            budgetCurrentAmount: 0
        }
        isSubCategory ? mainCategory.subCategorys.push(newSubCategory) : newCaterorys.push(newCategory)
        return {
            ...state,
            currentUser: {...state.currentUser, categories: newCaterorys},
        }
    },
    CHANGE_CATEGORY_TYPE: (state, payload) => {
        const {id, isIncome} = payload;
        const newCaterorys = [...state.currentUser.categories];
        const mainCategory = newCaterorys.find(categ => categ.id === id);
        console.log(mainCategory)
        mainCategory.isIncome = isIncome;
        console.log(mainCategory)
        return {
            ...state,
            currentUser: {...state.currentUser, categories: newCaterorys},
        }
    },
}

const reducer = (state=initialState, action) => {
    const {payload, type} = action;
    if (!(type in storeChangers)) {
        return state;
    }
    const changer = storeChangers[type];
    return changer(state, payload);
}

export default reducer;