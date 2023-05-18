import Nav from 'react-bootstrap/Nav';
import Auth from '../../utils/auth';

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link className="nav-title" href="/">Trove</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      {/* if user is logged in display the following */}
      {Auth.loggedIn() ? (
        <>
        <Nav.Item>
          <Nav.Link href="/me">Profile</Nav.Link>
        </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/new-post">Create Post</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link>
          </Nav.Item>
        </>
      ) : (
        // if user is not logged in, display the following
        <>
        <Nav.Item>
          <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav.Item>
          </>
      )}
    </Nav>
  )
}

export default Navbar;