/*!
 * Color mode toggler for Bootstrap
 * Adapted from Bootstrap's docs.
 */
(() => {
    'use strict'

    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = theme => {
        if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    const showActiveTheme = (theme, focus = false) => {
        const themeSwitcher = document.querySelector('#bd-theme')
        const themeSwitcherText = document.querySelector('#bd-theme-text')

        if (!themeSwitcher) {
            return
        }

        if (themeSwitcherText) {
        }

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active')
            element.setAttribute('aria-pressed', 'false')
        })

        const activeButton = document.querySelector(`[data-bs-theme-value="${theme}"]`)
        if (activeButton) {
            activeButton.classList.add('active')
            activeButton.setAttribute('aria-pressed', 'true')
        }

        if (focus) {
            themeSwitcher.focus()
        }
    }
    // --- End of existing theme toggling functions ---


    /**
     * Creates and inserts the theme toggler HTML into the navbar.
     */
    function addThemeTogglerToNavbar() {
        // Corrected selector for BS3-style navbar HTML:
        const navbarRightUl = document.querySelector('#navbar ul.nav.navbar-nav.navbar-right');

        if (!navbarRightUl) {
            // Updated warning message to reflect the new selector:
            console.warn('Could not find the navbar list (#navbar ul.nav.navbar-nav.navbar-right) to add theme toggler.');
            return;
        }

        const togglerHTML = `
            <li class="nav-item dropdown"> <button class="nav-link dropdown-toggle" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
                <i class="fas fa-adjust"></i>
                <span id="bd-theme-text" class="d-lg-none ms-2">Toggle theme</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="bd-theme">
                <li>
                    <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
                        <i class="fas fa-sun me-2"></i>Light
                    </button>
                </li>
                <li>
                    <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
                        <i class="fas fa-moon me-2"></i>Dark
                    </button>
                </li>
                <li>
                    <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="auto" aria-pressed="false">
                        <i class="fas fa-adjust me-2"></i>Auto
                    </button>
                </li>
            </ul>
            </li>
        `;

        navbarRightUl.insertAdjacentHTML('beforeend', togglerHTML);

        document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
            toggle.addEventListener('click', (event) => {
                const theme = event.currentTarget.getAttribute('data-bs-theme-value')
                setStoredTheme(theme)
                setTheme(theme)
                showActiveTheme(theme, true)
            })
        });
    }

    // Set the theme on initial load
    setTheme(getPreferredTheme());

    // When the DOM is fully loaded
    window.addEventListener('DOMContentLoaded', () => {
        addThemeTogglerToNavbar(); // Add the toggler to the navbar

        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        showActiveTheme(currentTheme);
    });

    // Listener for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (!storedTheme || storedTheme === 'auto') {
            const preferredTheme = getPreferredTheme();
            setTheme(preferredTheme);
            // Update the active theme display if the toggler UI is present
            showActiveTheme(preferredTheme);
        }
    });

})()