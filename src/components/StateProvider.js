import { Component } from 'react'

const StateProvider = (
  WrappedComponent,
  initialState,
  lifeCycleHooks
) =>
  class StateProvider extends Component {
    static get name() {
      return WrappedComponent.name
    }
    constructor(props) {
      super(props)
      this.state = initialState
      Object.keys(lifeCycleHooks).forEach(functionName => {
        this[functionName] = lifeCycleHooks[functionName]
      })
      if (lifeCycleHooks._constructor) {
        lifeCycleHooks._constructor(props)
      }
    }
    render() {
      return WrappedComponent({
        ...this.props,
        state: this.state,
        setState: this.setState.bind(this),
      })
    }
  }

export default StateProvider
