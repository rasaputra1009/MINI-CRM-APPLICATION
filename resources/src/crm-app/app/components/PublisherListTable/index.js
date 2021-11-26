/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/**
 *
 * PublisherListTable
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../commons/app/components/Button';
import './style.scss';

function PublisherListTable({
  searchPublishersList,
  user,
  role,
  removePublisher,
}) {
  const ADMIN = 'admin';
  const ACCOUNTMANAGER = 'account';
  const SALESREPRESENTATIVE = 'salesrep';

  const checkAccess = assigned => {
    switch (role) {
      case SALESREPRESENTATIVE:
        return !(assigned === user);
      case ADMIN:
        return false;
      case ACCOUNTMANAGER:
        return false;
      default:
        return false;
    }
  };
  const TABLEHEADER = [
    'Name',
    'Email',
    'Phone',
    'Website',
    'Assigned_to',
    'Edit',
    'Delete',
  ];

  return (
    <div>
      <table className="publisherListTable">
        <thead className="publisherListColumn">
          <tr>
            {TABLEHEADER.map(col => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="publisherListRows">
          {searchPublishersList.map(item => (
            <tr key={item.id}>
              <Link
                to={{
                  pathname: `/crm/details/${item.id}`,
                }}
                className="name"
              >
                <td>{item.name}</td>
              </Link>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.website}</td>
              <td>{item.assignedTo}</td>
              <Link
                to={{
                  pathname: `/crm/edit/${item.id}`,
                }}
                className="editLink"
              >
                <td>
                  <Button
                    value="Edit"
                    disabled={checkAccess(item.assignedTo)}
                    className="edit"
                  />
                </td>
              </Link>
              <td>
                <Button
                  value="Delete"
                  onClick={() => removePublisher(item.id)}
                  disabled={checkAccess(item.assignedTo)}
                  className="delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

PublisherListTable.propTypes = {};

export default PublisherListTable;
