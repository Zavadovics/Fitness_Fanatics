import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import './sidebar.scss';

const Sidebar = ({ loggedInUser }) => {
  return (
    <div className='sidebar-nav-cont'>
      <CDBSidebar
        className='nav-sidebar'
        textColor='#f09753'
        backgroundColor='#f5f3f3'
      >
        <CDBSidebarHeader prefix={<i className='fa fa-bars fa-large'></i>}>
          Navigáció
        </CDBSidebarHeader>

        <CDBSidebarContent className='sidebar-content'>
          <CDBSidebarMenu>
            <NavLink
              className='sidebar-nav-link'
              exact
              to='/activities'
              activeClassName='activeClicked'
            >
              <CDBSidebarMenuItem icon='running'>
                Tevékenységek
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className='sidebar-nav-link'
              exact
              to='/activities/new'
              activeClassName='activeClicked'
            >
              <CDBSidebarMenuItem icon='plus-square'>
                Új hozzáadása
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className='sidebar-nav-link'
              exact
              to='/profile'
              activeClassName='activeClicked'
            >
              <CDBSidebarMenuItem icon='user'>Saját profil</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className='sidebar-nav-link'
              exact
              // to='/profile/edit/:id'
              to={`/profile/edit/${loggedInUser.id}`}
              activeClassName='activeClicked'
            >
              <CDBSidebarMenuItem icon='user-edit'>
                Profil szerkesztése
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className='sidebar-nav-link'
              exact
              to='/training-plans'
              activeClassName='activeClicked'
            >
              <CDBSidebarMenuItem icon='dumbbell'>
                Edzés tervek
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
