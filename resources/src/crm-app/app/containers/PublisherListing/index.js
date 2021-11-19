import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Link } from 'react-router-dom';
import { makeSelectSearchPublishers, makeSelectUserRole, makeSelectUser, makeSelectLoading } from './selectors';
import { reducer, searchPublishers, deletePublisher, loadUserInfoSuccess, loadUsers, } from './slice';
import saga from './saga';
import './style.scss';

const stateSelector = createStructuredSelector({
  searchpublisherslist: makeSelectSearchPublishers(),
  userrole: makeSelectUserRole(),
  user: makeSelectUser(),
  loading: makeSelectLoading(),
});

function PublisherListing() {
  const dispatch = useDispatch();
  useInjectReducer({ key: 'publisherListing', reducer });
  useInjectSaga({ key: 'publisherListing', saga });
  const {
    searchpublisherslist,
    userrole,
    user,
    loading,
  } = useSelector(stateSelector);
  const getCookie = payload => {
    payload = payload.split('; ');
    const result = {};
    for (const i in payload) {
      const cur = payload[i].split('=');
      result[cur[0]] = cur[1];
    }
    return result;
  };

  useEffect(() => {
    const data = getCookie(document.cookie);
    dispatch(loadUsers());
    dispatch(loadUserInfoSuccess(data));
    dispatch(searchPublishers()); // load all publishers
  }, []);

  const removePublisher = id => {
    dispatch(deletePublisher(id));
    setTimeout(()=>{
      dispatch(searchPublishers());
    },500);
  };

  return (
    <div className="section">
      {loading ? (
        <span className="loading">Loading!!!</span>
      ) : (
        (searchpublisherslist.length===0 ?<span className="loading">No Data Found</span>:
        <table>
          <thead className="thead">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Assigned_to</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {searchpublisherslist.map(item => (
              <tr>
                <Link
                  to={{
                    pathname: `/crm/details/${item.id}`,
                  }}
                  className="name"
                >
                  <td>{item.name}</td>
                </Link>
                <td className="email">{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.website}</td>
                <td>{item.assigned_to}</td>
                <Link
                  to={{
                    pathname: `/crm/edit/${item.id}`,
                  }}
                >
                  <td>
                    <button
                      className="edit"
                      disabled={
                        userrole === 'salesrep' && !(item.assigned_to === user)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </Link>
                <td>
                  <button
                    onClick={() => removePublisher(item.id)}
                    disabled={!(userrole === 'admin')}
                    className="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
export default PublisherListing;
