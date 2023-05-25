import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import { ReactComponent as Logo } from '@/assets/logo.svg'
// import { ReactComponent as IconMenu } from '@/assets/icon-menu.svg'
// import { ReactComponent as IconClose } from '@/assets/icon-close.svg'
// import css from '@/layouts/app/header-mob/header-mob.module.scss'

const routes = [
    { path: '', label: 'Accueil' },
    { path: 'profil', label: 'Profil' },
    { path: 'reglage', label: 'Réglage' },
    { path: 'communaute', label: 'Communauté' },
    { path: 'course', label: 'Course' },
    { path: 'natation', label: 'Natation' },
    { path: 'cyclisme', label: 'Cyclisme' },
    { path: 'musculation', label: 'Musuclation' }
]

/**
 * Component that renders the application header for mobile devices.
 * @function AppHeaderMob
 * @returns {JSX.Element} Returns a React element for the application header for mobile devices.
 */

const AppHeaderMob = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownReference = useRef(null)
    const navigate = useNavigate()

    const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
    const handleEscape = event => event.key === 'Escape' && setIsDropdownOpen(false)
    const handleLogout = () => localStorage.removeItem('userId') || navigate('/')

    useEffect(() => {
        dropdownReference.current.style.maxHeight = isDropdownOpen ? `${dropdownReference.current.scrollHeight}px` : '0'

        document.addEventListener('keydown', handleEscape)

        return () => document.removeEventListener('keydown', handleEscape)
    }, [isDropdownOpen])

    return (
        <header className='{css.header}'>
            {/* <Logo className={css.logo} /> */}
            {/* <button className='{css.menu}' onClick={handleToggleDropdown}>
                {isDropdownOpen ? <IconClose className={css.menuIcon} /> : <IconMenu className={css.menuIcon} />}
                <span className={css.menuLabel}>{isDropdownOpen ? 'Fermer' : 'Menu'}</span>
            </button> */}
            <div className='{css.dropdown}' open={isDropdownOpen} ref={dropdownReference}>
                <nav className='{css.nav}'>
                    {routes.map(({ path, label }) => (
                        <NavLink className='{css.navLink}' key={path} to={path} end onClick={handleToggleDropdown}>
                            {label}
                        </NavLink>
                    ))}
                    <button className='{css.logout}' onClick={handleLogout}>
                        Déconnexion
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default AppHeaderMob