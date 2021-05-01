import React from 'react';
import { Redirect } from 'react-router-dom';
import Categories from './Categories';

const RouteMap = {
    dashboard: {
        path: '/',
        exact: true,
        component: <h1>Dashboard</h1>,
    },
    categories: {
        path: '/categories',
        exact: true,
        component: <Categories/>,
        roles: ['ADMIN', 'MANAGER']
    },
    createUser: {
        path: '/users/create',
        component: <h1>Create users</h1>,
        roles: ['ADMIN']
    },
    films: {
        path: '/films',
        component: <h1>Films</h1>,
    },
    default: {
        path: '*',
        component: <Redirect to="/categories"/>
    }
}

export default RouteMap;