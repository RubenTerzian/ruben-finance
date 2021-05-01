import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {uid} from 'uid';



const Form = styled.form`
    width: 250px;
    height: fit-content;
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    padding: 1px  20px 20px 20px;
    #empty{
        width: 200px;
        border: 1px solid red;
        ::placeholder{
            color: red;
        }
    }
    #categoryName{
        width: 200px;
        border: 1px solid #000000;

    }
    .subCateg{
        display: flex;
        align-items: center;
        *{
            margin-right:5px;
        }
    }
    .categories-select{
        width: 200px;
        select{
            width: 100%;
            margin: 10px 0px 20px 0px;
        }
    }
    .category-type-wraper{
        display: flex;
        margin-bottom: 15px;
    }
    .category-type{
        display: flex;
        align-items: center;
        height: 30px;
        margin-right: 40px;
        p{
            margin-right: 20px;
        }
    }
    .final-buttons-wraper{
        display: flex;
        justify-content: space-between;
    }
    button{
        width: 100px;
        height: 30px;
        color: #ffffff
    }
    .save{
        background-color: #00b118
    }
    .cancel{
        background-color: #d10303;
    }
    .error{
        color: red;
        font-size: 14px;
        margin-top: 0px;
    }
    #errorItem{
        color: red;
        margin: 0;
    }
`;

const CategorySettings = (props) =>{

    const {isCreateCategory, setIsCreateCategory, create, setIsModalActive, modalName, subCategory, modalCategory} = props;

    const dispatch = useDispatch();
    const [isSubCategory, setIsSubCategory] = useState(subCategory || false);
    const [isIncome, setIsIncome] = useState(modalCategory?.isIncome || null);
    const [incomeError, setIncomeError] = useState(false);
    const categories = useSelector(store => store.user.currentUser.categories);

    const handlesubCategCheck = ()=>{
        setIsSubCategory(!isSubCategory)
        setIsIncome(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {name, category} = e.target.elements;
        const id = uid();
        if(name.value && (isSubCategory || isIncome !== null)){
            if(create){
                setIsCreateCategory(!isCreateCategory);
                dispatch({type: 'ADD_CATEGORY', payload:{id, name: name.value, isSubCategory, category: (category ? category.value : null), isIncome}})
            }else{
                setIsModalActive(false);
            }
        }else{
            if(!name.value){
                name.placeholder = 'Заполните поле';
                name.id = 'empty';
            };
            if(isIncome === null) setIncomeError(true);
        }
    };

    const handleCancel = (e) => {
        if(create){
            setIsCreateCategory(!isCreateCategory);
        }else{
            setIsModalActive(false);
        }       
    };

    return(
        <Form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="categoryName">
                    <p>Имя {!isSubCategory ? 'категории' : 'подкатегории'}</p>
                </label>
                <input type="text" name="name" id="categoryName" defaultValue={modalName || ''}/>
            </div>
            {!!categories?.length && <div className="subCateg">
                <label htmlFor="subCategCheck">
                    <p>Разместить подкатегорией</p>
                </label>
                <input type="checkbox" name="subCategCheck" id="subCategCheck" defaultChecked={isSubCategory} onChange={handlesubCategCheck}/>
            </div>}
            {
                isSubCategory  &&   
                    <div className='categories-select'>
                        <select name="category" id="category" defaultValue={modalCategory?.id}>
                            {categories.map(category => {
                                const {id, name} = category;
                                return <option value={id} key={'category_'+id}>{name}</option>
                            })}
                        </select>
                    </div>
            }
            {
                !isSubCategory && 
                <div>
                    <p>Показывать в списке категорий</p>
                    <div className="category-type-wraper">
                        <div className="category-type">
                            {incomeError && <p id='errorItem'>*</p>}
                            <p>Доход</p>
                            <input type="radio" name="categoryType" defaultChecked={isIncome} onChange={()=>{
                                setIsIncome(true);
                                setIncomeError(false)
                                }}/>
                        </div>
                        <div className="category-type">
                        {incomeError && <p id='errorItem'>*</p>}
                            <p>Расход</p>
                            <input type="radio" name="categoryType" onChange={()=>{
                                setIsIncome(false);
                                setIncomeError(false)
                                }}/>
                        </div>
                    </div>
                    {
                        incomeError && <p className='error'>*Выберите тип категории</p>
                    }
                </div>
            }
            <div className="final-buttons-wraper">
                <button type="submit" className="save">Сохранить</button>
                <button type="button" className='cancel'  onClick={handleCancel} >Отменить</button>
            </div>
        </Form>
    )
}

const CategoriesList = styled.div`

    display: flex;
    flex-direction: column;

    .category{
        display: flex;
        max-width: 600px;
        margin: 10px 0px;
        max-height: 60px;
        min-height: 30px;
        input{
            margin-left:10px;
        }
    }
    .subcategory{
        padding-left: 25px;
        max-width: 600px;
        max-height: 60px;
        min-height: 30px;
    }
    .category:hover, .subcategory:hover{
            cursor: pointer;
            background-color: #f0eeee;
    }
    .name-holder{
        width: 150px;
    }
    .input-wreper{
        height: fit-content;
        margin-left: 30%;
    }
    .category-name{
        margin: 0 40px 0 0 ;
    }
`

const TitleWraper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 600px;
    button{
        width: 150px;
        height: 20px;
        margin-right: 70px;
    }
    p{
        font-weight: 700;
    }
`

const MainWraper = styled.div`
    margin: 20px;
`

const Categories = () => {
    const [isCreateCategory, setIsCreateCategory] = useState(false);
    const [modalId, setModalId] = useState('');
    const [isModalActive, setIsModalActive] = useState(false)
    const categories = useSelector(store => store.user.currentUser.categories);
    const dispatch = useDispatch();

    const handleAddCategory = () =>{
        !isCreateCategory && setIsCreateCategory(!isCreateCategory);
    }

    const handleChangeCategoryType = (id, isIncome) =>{
        dispatch({type: 'CHANGE_CATEGORY_TYPE', payload: {id, isIncome}})
    }
    
    const handleShowModal = (id) => {
        setModalId(id);
        setIsModalActive(!isModalActive)
    }
return (
    <MainWraper>
        <TitleWraper>
            <button onClick={handleAddCategory}>Добавить категорию</button>
            <p>Показывать в списке категорий</p>
        </TitleWraper>
        {
            isCreateCategory && 
            <CategorySettings isCreateCategory={isCreateCategory} setIsCreateCategory={setIsCreateCategory} create/>
        }
            <CategoriesList>
        {
            categories.map(category => {
                const {name, subCategorys, isIncome, id} = category;
                return (
                        <div className='category-wraper' key={'key_categ_'+id}>
                            <div  className='category' >
                                <div className='name-holder'>
                                    <p className='category-name'  
                                        onClick={()=>handleShowModal(id)}>{name}</p> 
                                </div>
                                <div className="input-wreper">
                                    <input type="radio" 
                                        name={id} 
                                        id={'income '+id}  
                                        defaultChecked={isIncome} 
                                        onChange={()=>handleChangeCategoryType(id, true)}/>
                                    <label htmlFor={'income '+id}> Доход</label>
                                    <input type="radio" 
                                        name={id} 
                                        id={'outcome '+id} 
                                        defaultChecked={!isIncome} 
                                        onChange={()=>handleChangeCategoryType(id, false)}/>
                                    <label htmlFor={'outcome '+id}>Расход</label>
                                </div>
                            </div>    
                            {isModalActive && modalId === id && <CategorySettings 
                                modalName={name}
                                modalCategory={category} 
                                setIsModalActive={setIsModalActive}
                                />}
                            {
                                subCategorys && subCategorys.map(subCategory => {
                                    return (
                                        <>
                                            <div key={'key_'+subCategory.name}
                                            className='subcategory' 
                                            onClick ={()=>{
                                                handleShowModal(subCategory.id)
                                                }      
                                            }>{subCategory.name}</div>
                                            {isModalActive && modalId === subCategory.id && <CategorySettings 
                                                modalName={subCategory.name}
                                                modalCategory={category}
                                                subCategory 
                                                setIsModalActive={setIsModalActive}
                                                />}
                                        </>
                                    )
                                })
                            }                            
                            
                        </div>
                )
            })
        }
            </CategoriesList>

    </MainWraper>


)
};

export default Categories;