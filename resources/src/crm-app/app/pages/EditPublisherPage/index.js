/* eslint-disable react/button-has-type */
import React from 'react';

function index() {
  return (
    <div>
      <div className="EditHeader">
        <h1>Display Name</h1>
        <button>Edit</button>
        <button>Back</button>
        <hr />
      </div>
      <div className="EditSection">
        <table>
          <thead>
            <tr>
              <th>Display Name</th>
              <th>First Name</th>
              <th>Account Type</th>
              <th>CM Approval Date</th>
              <th>Admin Customer Id</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>First Name</td>
              <td>Account Type</td>
              <td>CM Approval Date</td>
              <td>Admin Customer Id</td>
              <td>Email</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default index;
