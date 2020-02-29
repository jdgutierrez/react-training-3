import React, { useEffect, useState } from 'react';
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import cx from 'classnames';

import styles from './contact.module.scss';
import editContactStyles from './editContact.module.scss';

function ContactInfo () {
    const { contactId, otroParam, otraCosa, otroMas } = useParams(); 

    useEffect(() => {
        fetch('http://localhost:3001/contacts').then(response => {
            return response.json();
        }).then(console.log);
    });

    return <div className="info">
        otro Param = {otroParam}
        <div className={styles.contact}>
            otro Param = {otroParam}
            <div className={styles.id}>
                This is Contact {contactId}
            </div>
        </div>
    </div>;
  }

function EditContact () {
    const { contactId } = useParams();
    const [name, setName] = useState('');

    const active = contactId === "1";
    return <div className={cx("editInfo", editContactStyles.new, {[editContactStyles.active]: active })}>
        <input value={name} name="name" onChange={(evt) => {
            const newValue = evt.currentTarget.value;
            setName(newValue);
        }}/>
        <button onClick={() => {
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            // headers.set('Authorization', 'bearer token');
            fetch('http://localhost:3001/contacts', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    name,
                })
            }).catch(console.log);
        }}>Submit</button>
    </div>;
}

function ContactRouter () {
    const { path } = useRouteMatch();
    return <Switch>
        <Route exact path={`${path}/:contactId`}>
            <ContactInfo />
        </Route>
        <Route path={`${path}/:contactId/edit`}>
            <EditContact />
        </Route>
        <Route path={`${path}/:contactId/add`}>
            Add Contact 
        </Route>
    </Switch>;
};

export default ContactRouter;