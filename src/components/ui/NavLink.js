import React from 'react';
import {
  Link,
} from '@chakra-ui/react';

const NavLink = ({ children, }) => {
  return <>
    <Link variant="nav"
      href={'#'}>
      {children}
    </Link>
  </>;
};

export default NavLink;