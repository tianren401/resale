import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';

import { isMobileDevice } from '_helpers';
import myTickets from '_images/myTickets.svg';
import settings from '_images/settings.svg';
import signOut from '_images/signOut.svg';
import { LoginModal } from '_pages';
import { logout } from '_store/auth';
import { setLoginType } from '_store/ui';
import { useModal } from '_hooks/useModal';
import { ContentImage } from '_components/styledTags';
import mobileNavigationIcon from '_images/mobileNavigationIcon.png';
import { SearchBar } from '_components/searchBar';
import {
  StyledNavigation,
  Logo,
  MenuContainer,
  UserItems,
  ModalItems,
  UserItemsMobile,
  StyledDropdown,
  EventInfo,
  Event,
  Subtitle,
  GridContent,
} from './styledComponents';

export const Navigation = ({ page }) => {
  const authState = useSelector(({ authReducer }) => authReducer);
  const { openModal, closeModal, isOpenModal } = useModal();
  const dispatch = useDispatch();

  const handleModalOpen = (loginType) => {
    dispatch(setLoginType(loginType));
    openModal();
  };

  const handleLogout = () => {
    closeModal();
    dispatch(logout());
  };

  const isAuthorized = !!authState.user;

  const firstInitial = authState?.user?.firstName[0];
  const lastInitial = authState?.user?.lastName[0];

  const options = [
    { key: 'initials', label: `${firstInitial}${lastInitial}` },
    { key: 'myTickets', label: 'My Tickets', image: myTickets },
    { key: 'settings', label: 'Settings', image: settings },
    {
      key: 'signOut',
      label: 'Sign Out',
      image: signOut,
    },
  ];

  const getUserItemClicked = (menuOption) => {
    if (menuOption.key === 'signOut') {
      handleLogout();
    }
  };

  const checkoutTicketReducer = (state) => state.checkoutTicketReducer;
  const { event } = useSelector(checkoutTicketReducer);
  const eventDate = new Date(event.date);

  const renderPage = (page, isAuthorized) => {
    switch (page) {
      case 'home':
      case 'user':
        return (
          <>
            <UserItems to="/">Support</UserItems>
            <UserItems to="/" tab="myTickets">
              My Tickets
            </UserItems>

            {isAuthorized ? (
              <>
                <UserItems to="#" tab="noHover">
                  <StyledDropdown
                    showNavigation={page && true}
                    options={options}
                    defaultOption="initials"
                    handleChange={getUserItemClicked}
                  />
                </UserItems>
              </>
            ) : (
              <>
                <ModalItems
                  onClick={() => handleModalOpen('Sign Up')}
                  tab="signUp"
                >
                  Sign Up
                </ModalItems>
                <ModalItems onClick={() => handleModalOpen('Sign In')}>
                  Sign In
                </ModalItems>
                <UserItemsMobile
                  to="/"
                  onClick={() => handleModalOpen('Sign In')}
                >
                  Sign In
                </UserItemsMobile>
                <UserItemsMobile>
                  <ContentImage src={mobileNavigationIcon} />
                </UserItemsMobile>
              </>
            )}
          </>
        );

      case 'event':
        return (
          <>
            <UserItems tab="noHover" to="#">
              <SearchBar placeholder="Search" navbarSearch={true} />
            </UserItems>
            <UserItems to="/">Support</UserItems>
            {isAuthorized ? (
              <>
                <UserItems to="#" tab="noHover">
                  <StyledDropdown
                    showNavigation={page && true}
                    options={options}
                    defaultOption="initials"
                    handleChange={getUserItemClicked}
                  />
                </UserItems>
              </>
            ) : (
              <>
                <ModalItems
                  onClick={() => handleModalOpen('Sign Up')}
                  tab="signUp"
                >
                  Sign Up
                </ModalItems>
                <ModalItems onClick={() => handleModalOpen('Sign In')}>
                  Sign In
                </ModalItems>
                <UserItemsMobile
                  to="/"
                  onClick={() => handleModalOpen('Sign In')}
                >
                  Sign In
                </UserItemsMobile>
                <UserItemsMobile>
                  <ContentImage src={mobileNavigationIcon} />
                </UserItemsMobile>
              </>
            )}
          </>
        );

      case 'checkout':
        return (
          <>
            <UserItems to="/">Support</UserItems>
            {isMobileDevice &&
              (isAuthorized ? (
                <>
                  <UserItems to="#" tab="noHover">
                    <StyledDropdown
                      showNavigation={page && true}
                      options={options}
                      defaultOption="initials"
                      handleChange={getUserItemClicked}
                    />
                  </UserItems>
                </>
              ) : (
                <>
                  <ModalItems
                    onClick={() => handleModalOpen('Sign Up')}
                    tab="signUp"
                  >
                    Sign Up
                  </ModalItems>
                  <ModalItems onClick={() => handleModalOpen('Sign In')}>
                    Sign In
                  </ModalItems>
                  <UserItemsMobile
                    to="/"
                    onClick={() => handleModalOpen('Sign In')}
                  >
                    Sign In
                  </UserItemsMobile>
                  <UserItemsMobile>
                    <ContentImage src={mobileNavigationIcon} />
                  </UserItemsMobile>
                </>
              ))}
          </>
        );

      default:
        return (
          <>
            <UserItems to="/">Support</UserItems>
            <UserItems to="/" tab="myTickets">
              My Tickets
            </UserItems>

            {isAuthorized ? (
              <>
                <UserItems to="#" tab="noHover">
                  <StyledDropdown
                    showNavigation={page && true}
                    options={options}
                    defaultOption="initials"
                    handleChange={getUserItemClicked}
                  />
                </UserItems>
              </>
            ) : (
              <>
                <ModalItems
                  onClick={() => handleModalOpen('Sign Up')}
                  tab="signUp"
                >
                  Sign Up
                </ModalItems>
                <ModalItems onClick={() => handleModalOpen('Sign In')}>
                  Sign In
                </ModalItems>
                <UserItemsMobile
                  to="/"
                  onClick={() => handleModalOpen('Sign In')}
                >
                  Sign In
                </UserItemsMobile>
                <UserItemsMobile>
                  <ContentImage src={mobileNavigationIcon} />
                </UserItemsMobile>
              </>
            )}
          </>
        );
    }
  };

  return (
    <StyledNavigation
      isAuthorized={isAuthorized}
      hidden={isOpenModal}
      page={page}
    >
      <GridContent page={page}>
        <Logo to="/" page={page}>
          SelectSeats
        </Logo>

        {!isMobileDevice && page === 'event' && (
          <EventInfo>
            <Event>{event?.name}</Event>
            <Subtitle>
              {`${eventDate.toDateString()} • ${event?.city},`}
              {` ${event?.stateProvince} • ${event?.venue}`}
            </Subtitle>
          </EventInfo>
        )}

        <MenuContainer>
          {renderPage(page, isAuthorized)}
          {isAuthorized && isMobileDevice && (
            <>
              <UserItemsMobile tab="noHover" to="#">
                <StyledDropdown
                  showNavigation={true}
                  options={options}
                  defaultOption="myTickets"
                  handleChange={getUserItemClicked}
                />
              </UserItemsMobile>
            </>
          )}
        </MenuContainer>
      </GridContent>
      <LoginModal />
    </StyledNavigation>
  );
};

Navigation.propTypes = {
  page: PropTypes.string,
};
