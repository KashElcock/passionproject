import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBrewCard } from 'app/shared/model/brew-card.model';
import { getEntities } from './brew-card-user.reducer';

export const BrewCardUser = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const brewCardUserList = useAppSelector(state => state.brewCardUser.entities);
  const loading = useAppSelector(state => state.brewCardUser.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };
  return (
    <div>
      <h2 id="brew-card-heading" data-cy="BrewCardHeading">
        Brew Cards
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/brew-card/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Brew Card
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {brewCardUserList && brewCardUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brew Method</th>
                <th>Coffee Type</th>
                <th>Coffee Region</th>
                <th>Coffee Subregion</th>
                <th>Roast Level</th>
                <th>Processing Method</th>
                <th>Flavor Profile</th>
                <th>Coffee Weight</th>
                <th>Water Weight</th>
                <th>Water Temp</th>
                <th>Brew Time</th>
                <th>Brew Date</th>
                <th>Equipment</th>
                <th>Notes</th>
                <th>Attachment</th>
                <th>User</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {brewCardUserList.map((brewCardUser, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/brew-card-user/${brewCardUser.id}`} color="link" size="sm">
                      {brewCardUser.id}
                    </Button>
                  </td>
                  <td>{brewCardUser.name}</td>
                  <td>{brewCardUser.brewMethod}</td>
                  <td>{brewCardUser.coffeeType}</td>
                  <td>{brewCardUser.coffeeRegion}</td>
                  <td>{brewCardUser.coffeeSubregion}</td>
                  <td>{brewCardUser.roastLevel}</td>
                  <td>{brewCardUser.processingMethod}</td>
                  <td>{brewCardUser.flavorProfile}</td>
                  <td>{brewCardUser.coffeeWeight}</td>
                  <td>{brewCardUser.waterWeight}</td>
                  <td>{brewCardUser.waterTemp}</td>
                  <td>{brewCardUser.brewTime}</td>
                  <td>
                    {brewCardUser.brewDate ? <TextFormat type="date" value={brewCardUser.brewDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{brewCardUser.equipment}</td>
                  <td>{brewCardUser.notes}</td>
                  <td>
                    {brewCardUser.attachment ? (
                      <div>
                        {brewCardUser.attachmentContentType ? (
                          <a onClick={openFile(brewCardUser.attachmentContentType, brewCardUser.attachment)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {brewCardUser.attachmentContentType}, {byteSize(brewCardUser.attachment)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{brewCardUser.user ? brewCardUser.user.login : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/brew-card-user/${brewCardUser.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/brew-card-user/${brewCardUser.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/brew-card-user/${brewCardUser.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Brew Cards found</div>
        )}
      </div>
    </div>
  );
};

export default BrewCardUser;
