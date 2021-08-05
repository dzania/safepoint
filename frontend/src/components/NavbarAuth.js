import Container from "react-bootstrap/Container";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from "../services/auth-service.js";

export default function NavbarAuth() {
  const [currentUser, setCurrentUser] = useState(false);
  const [username, setUsername] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setUsername(localStorage.getItem("username"));
      console.log(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(false);
  };

  return (
    <Navbar expand="lg" variant="dark" bg="none">
      <Container>
        <Navbar.Brand
          as={Link}
          to={"/"}
          style={{
            fontSize: "4rem",
            color: "#fff",
            position: "sticky",
            fontWeight: 500,
          }}
        >
          Safe<span style={{ color: "#00FF48" }}>Point.</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to={"/dashboard"}>
              {username}
            </Nav.Link>
            <Nav.Link as={Link} to={"/"} onClick={logOut}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
