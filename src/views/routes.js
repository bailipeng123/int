import React, { Component } from 'react'
import {
  Route, Switch
} from "react-router-dom";
import  navData  from '../router/config'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
        {
          navData.map((item) => {
            return <Route
              exact
              key={item.path}
              path={item.path}
              component={item.component}
            ></Route>
          })
        }
        </Switch>
      </div>
    )
  }
}
