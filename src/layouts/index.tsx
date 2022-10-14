import React from 'react';
import withRouter from 'umi/withRouter'
import RouteGuard from '../utils/RouteGuard'
import { RouteComponentProps } from 'react-router';

class BasicLayout extends React.Component<RouteComponentProps> {
  constructor(props:RouteComponentProps) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.history.listen((route: any) => {
      this.setState({
        current: route.pathname
      })
    })
  }

  render() {
    return (
      <div className={'flex-full'}>
        <RouteGuard currentKey={this.state} children={this.props.children} />
      </div>
    );
  }
}

export default withRouter(BasicLayout)