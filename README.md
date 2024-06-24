### SYNGY 7 BINAR CHALLENGE 07 FRONTEND BERDI GUMANTARA
This is the frontend of my database in challenge 06 repositories. using React Vite Typescript, React Router, Bootstrap, and react context for state management

### INSTRUCTION
1. Clone this project into your local
2. Change directory to this project folder and run command `npm install` in terminal
3. Clone Challenge 06 project into your local for database 
    `https://github.com/beardigumantara/24001160-synrgy7-ber-bcr-ch6`
4. follow the tutorial for installation challenge 06
5. Run the Backend (challenge 06) and Frontend (Challenge 07) in the terminal using command `npm run dev`
7. Have Fun and Enjoy ~

### PAGE LIST

        `http://localhost:5173/`

1. Dashboard user '/'
2. Cars User '/cars'
3. Login '/login'
4. Register '/register'
5. Admin Dashboard '/admin'
6. Admin List Cars '/admin/cars'
7. Create Car '/admin/cars/create'
8. Edit Car '/admin/cars/edit/:id'

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
