import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Navbar, Input, NavbarBrand, NavbarContent, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Avatar} from "@nextui-org/react";
//import logo_unibac from '../assets/logo_unibac.png';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export const SearchIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    const menuItems = [
      "Bibliografie",
      'Articole',
      "MinaAi",
      "Compiler",
    ];

    const [isHovered, setIsHovered] = useState([]);

const handleMouseEnter = (index) => {
  setIsHovered(prevState => {
    const newState = [...prevState];
    newState[index] = true;
    return newState;
  });
};

const handleMouseLeave = (index) => {
  setIsHovered(prevState => {
    const newState = [...prevState];
    newState[index] = false;
    return newState;
  });
};

const {logout} = useLogout();

const handleLogoutClick = () =>{
  logout();
}

const {user} = useAuthContext();

  return (
    <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen} className="dark text-foreground bg-background" isBordered
    classNames={{
      item: [
        "flex",
        "relative",
        "h-full",
        "items-center",
        "data-[active=true]:after:content-['']",
        "data-[active=true]:after:absolute",
        "data-[active=true]:after:bottom-0",
        "data-[active=true]:after:left-0",
        "data-[active=true]:after:right-0",
        "data-[active=true]:after:h-[2px]",
        "data-[active=true]:after:rounded-[2px]",
        "data-[active=true]:after:bg-primary",
      ],
    }}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand style={{cursor:'pointer'}} onClick={() => navigate('/home')}>
          {/* <img src={logo_unibac} alt="logo" className="h-10 w-10" /> */}
          <p className="font-bold text-inherit">UNIBAC</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem style={{cursor:'pointer'}} isActive={isHovered[0]} onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={() => handleMouseLeave(0)}>
          <Link color="foreground" onClick={() => navigate('/bibliografie')} >
            Bibliografie
          </Link>
        </NavbarItem>
        <Dropdown>
        <NavbarItem style={{cursor:'pointer'}} isActive={isHovered[1]} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)}>
          <DropdownTrigger>
            <Link color="foreground">
              Articole
            </Link>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu variant="faded"
        itemClasses={{
          base: "gap-4",
        }}>
        <DropdownItem
          key="Informatica"
        >
          Informatica
        </DropdownItem>
        <DropdownItem
          key="Matematica"
        >
          Matematica
        </DropdownItem>
        <DropdownItem
          key="Fizica"
        >
          Fizica
        </DropdownItem>
        <DropdownItem
          key="Chimie"
        >
          Chimie
        </DropdownItem>
        <DropdownItem
          key="Psihologie"
        >
        <DropdownItem
          key="Istorie"
        >
          Romana
        <DropdownItem
          key="Chimie"
        >
          Biologie
        </DropdownItem>
        </DropdownItem>
          Psihologie
        </DropdownItem>
        <DropdownItem
          key="Istorie"
        >
          Istorie
        </DropdownItem>
        <DropdownItem
          key="Istorie"
        >
          Geografie
        </DropdownItem>
      </DropdownMenu>
        </Dropdown>
        <Dropdown>
        <NavbarItem style={{cursor:'pointer'}} isActive={isHovered[2]} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)}>
          <DropdownTrigger>
            <Link color="foreground">
              Features
            </Link>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu variant="faded"
        itemClasses={{
          base: "gap-4",
        }}>
        <DropdownItem onClick={() => navigate('/minaAi')}
          key="MinaAi"
        >
          MinaAi
        </DropdownItem>
        <DropdownItem onClick={() => navigate('/minaAi')}
          key="MinaAi"
        >
          Compiler
        </DropdownItem>
      </DropdownMenu>
      </Dropdown>
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Input className='search-input'
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        {user &&
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                color = "primary"
                showFallback
                name = {user.username}
                as="button"
                className="transition-transform"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="settings">
                Profil
              </DropdownItem>
              <DropdownItem key="settings">
                Setari
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogoutClick}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        }
        {!user &&
        <NavbarItem>
          <Button as={Link} color="primary" variant="flat" onClick={() => navigate('/sign-up')}>
            Sign Up
          </Button>
        </NavbarItem>
        }
      </NavbarContent>
      <NavbarMenu>
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            {index !== 1 &&
            <Link
              color={
                "foreground"
              }
              style={{cursor:'pointer'}}
              className="w-full"
              size="lg"
            >
              {item}
            </Link>
            }
            {index === 1 &&
              <Dropdown>
              <DropdownTrigger>
                <Link
                  color={
                    "foreground"
                  }
                  style={{cursor:'pointer'}}
                  className="w-full"
                  size="lg"
                >
                  Articole
                </Link>
              </DropdownTrigger>
              <DropdownMenu variant="faded"
              itemClasses={{
                base: "gap-4",
              }}>
              <DropdownItem
                key="Informatica"
              >
                Informatica
              </DropdownItem>
              <DropdownItem
                key="Matematica"
              >
                Matematica
              </DropdownItem>
              <DropdownItem
                key="Fizica"
              >
                Fizica
              </DropdownItem>
              <DropdownItem
                key="Chimie"
              >
                Chimie
              </DropdownItem>
              <DropdownItem
                key="Psihologie"
              >
              <DropdownItem
                key="Istorie"
              >
                Romana
              <DropdownItem
                key="Chimie"
              >
                Biologie
              </DropdownItem>
              </DropdownItem>
                Psihologie
              </DropdownItem>
              <DropdownItem
                key="Istorie"
              >
                Istorie
              </DropdownItem>
              <DropdownItem
                key="Istorie"
              >
                Geografie
              </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            }
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    );
};

export default NavBar;