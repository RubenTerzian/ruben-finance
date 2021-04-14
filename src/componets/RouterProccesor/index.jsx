import React from 'react';
import { Route, Switch } from 'react-router-dom';

const RouterProccesor = (props) => {
    return (
        <Switch>
            {
                Object.values(props.routeMap)
                    .map(({component, childs, ...props}) => {
                        return (
                            <Route key={props.path} {...props}>
                                {
                                    !!childs ? 
                                    <RouterProccesor routeMap={childs}/> : 
                                    component
                                }
                            </Route>
                        )
                    })
            }
        </Switch>
    )
}

export default RouterProccesor;