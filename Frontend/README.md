# Web Login/Register - Frontend

This is the frontend for a web application focused on user authentication, registration, and management, built with **React** using a modular architecture, REST API integration, and modern styling.

---

## ✨ **Main Features**

- **User authentication** (login, logout, registration)
- **User listing, search, and pagination**
- **Profile editing**
- **User settings**
- **Automatic token validation**
- **Reusable components and custom styling**
- **URL-synced filters and search**
- **Visual feedback for loading and errors**

---

## 🚀 **Getting Started**

1. **Clone the repository:**
  ```bash
  git clone https://github.com/DJerowd/web-login-register.git
  ```
2. **Install dependencies:**
  ```bash
  npm install
  ```
3. **Enter directory:**
  ```bash
  cd web-login-register
  ```
4. **Start the development server:**
  ```bash
  npm run dev
  ```
5. **Access the app at:**  
  [http://localhost:5173](http://localhost:5173)

> **Note:** Make sure the backend is running at `http://localhost:8800` (or adjust the URL in `src/services/api.js`).

---

## 🗂️ **Folder Structure**

```
src/
  components/
    Buttons/         # Reusable buttons
    Dropdown/        # User navigation menu
    ErrorPage/       # Error page
    Footer/          # Footer
    Header/          # Header
    Inputs/          # Custom inputs (SearchInput, etc)
    LoadingPage/     # Loading screen
    Modals/          # Confirmation modals
    Pagination/      # Custom pagination
    Socials/         # Social media links
  hooks/
    Auth/            # Auth hooks (login, register)
    Users/           # User hooks (search, edit, delete, etc)
  pages/
    Dashboard/       # User dashboard
    Home/            # Home page
    Profile/         # Profile view
    ProfileEdit/     # Profile editing
    Settings/        # User settings
    Signin/          # Login
    Signup/          # Registration
    UsersList/       # User listing and search
  services/
    api.js           # Axios API config
  Styles/
    components/      # Component-level CSS
    global.css       # Global styles
    ...              # Other page styles
  utils/
    auth.js          # Auth utilities and token validation
  routes.jsx         # App routes
  main.jsx           # React entry point
```

---

## 🧩 **Key Components**

- **SearchInput:** Search field with button and Enter key support
- **Pagination:** Custom pagination
- **Dropdown:** User navigation menu
- **Modals:** Confirmation for sensitive actions
- **LoadingPage/ErrorPage:** Visual feedback for states

---

## 🛠️ **Custom Hooks**

- **Auth:**  
  - `useLogin`  
  - `useRegister`
- **Users:**  
  - `useUsers`  
  - `useSearchUsers`  
  - `useUserById`  
  - `useEditUser`  
  - `useDeleteUser`

---

## 🎨 **Styling**

- CSS modularized by component and page
- CSS variables for colors, fonts, spacing, and shadows
- Light/dark theme support via `color-scheme`
- Inputs, selects, buttons, and suggestions with consistent look

---

## 🔒 **Authentication & Security**

- JWT tokens stored in localStorage
- Automatic token validation on app load
- Auto logout if token is invalid or expired

---

## 🔗 **Backend Integration**

- All requests via `axios` (see `services/api.js`)
- Protected endpoints use JWT token in the `Authorization` header

---

## 📌 **Notes**

- The project follows best practices for organization, reusability, and code standards.
- To customize themes, edit variables in `Styles/global.css`.
- To add new inputs or components, follow the folder pattern and use PropTypes.


## **Developed by Djerowd Alexsander Ruiz Moreschi Faria**

<!-- 
1. Validar login ativo constantemente
2. Salvar imagem de perfil
3. Parametros de pesquisa na URL
 -->