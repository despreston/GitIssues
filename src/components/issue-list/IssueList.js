/**
 * List of git issues
 * Responsible for fetching list of git issues
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import IssueListItem from '../issue-list-item/IssueListItem';
import './IssueList.css';

export default class IssueList extends Component {
  
  static propTypes = {
    params: React.PropTypes.object
  };

  constructor (props) {
    super();
    this.state = { issues: [] };
    this.setIssues(props.params.page);
  }

  setIssues (page = 1) {
    return fetch(`https://api.github.com/repos/${window.CONFIG.owner}/${window.CONFIG.repo}/issues?page=${page}&per_page=25`)
      .then(response => response.json())
      .then(json => this.setState({ issues: json }))
      .catch(err => console.log("Error retreiving issues: ", err));
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params && nextProps.params.page) {
      this.setIssues(nextProps.params.page);
    }
  }

  render () {
    return (
      <div className="IssueList">
        <div className="navigation">
          <Link to="/issues/1">First</Link>
          {this.props.params.page > 1 ? <Link to={`/issues/${this.props.params.page-1}`}>Previous</Link> : null}
          <Link to={`/issues/${parseInt(this.props.params.page,10) ? parseInt(this.props.params.page,10)+1 : 2}`}>Next</Link>
        </div>
        <ul>
          {
            this.state.issues.map(issue => {
              return (
                <li key={issue.id}>
                  <IssueListItem issue={issue}/>
                </li>
              );
            })
          }
        </ul>
        <div className="navigation">
          <Link to="/issues/1">First</Link>
          {this.props.params.page > 1 ? <Link to={`/issues/${this.props.params.page-1}`}>Previous</Link> : null}
          <Link to={`/issues/${parseInt(this.props.params.page,10) ? parseInt(this.props.params.page,10)+1 : 2}`}>Next</Link>
        </div>
      </div>
    );
  }
}
