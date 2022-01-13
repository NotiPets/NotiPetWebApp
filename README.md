# NotiPet Web App

## Sobre el Proyecto 🐾

NotiPet es un proyecto cuyo propósito es el de conectar a los dueños de mascotas con las veterinarias con los cuales contratan servicios para sus mascotas permitiéndoles a estos estar al tanto de los servicios que le están siendo realizados a sus mascotas para de esta forma estar al tanto de éstos en todo momento.

Puedes ver el proyecto desplegado [aquí](http://localhost:3000).

## Tecnologías Usadas

- JavaScript (duh)
- React.js 17.0.2+
- TailwindCSS 3.0.13+

### Tooling

- ESLint
- Prettier
- Github Actions
- Netlify 

## Corriendo el Proyecto

### Prerrequisitos

Para correr el proyecto debes tener instalado:

- Node.js 16.x +
- npm 8.1.2

### Instalación

1. Clonar el repo:

```
git clone https://github.com/NotiPets/NotiPetWebApp.git
```

2. Instalar dependencias de NPM:

```
npm install
```

3. Correr el proyecto:

```
npm start
```

### Scripts Disponibles

En el directorio del proyecto se pueden correr los siguientes comandos:

#### `npm start`

Corre el proyecto en modo desarrollo en [http://localhost:3000](http://localhost:3000).

#### `npm test`

Lanza el corredor de pruebas de npm de guardia interactivo.

#### `npm run format`

Aplica el formato recomendado de Prettier a todo el proyecto.

#### `npm run format:check`

Verifica que el proyecto corresponda con el formato recomendado de Prettier.

#### `npm run lint`

Verifica que el proyecto corresponda con las reglas de ESLint.

#### `npm run lint:fix`

Aplica la mayor cantidad de reglas de ESLint que sea posible al proyecto y notifica las reglas que no se pudieron aplicar.

## Estrategía de Branches

1. Crear un feature branch a partir del branch main (un branch debe tener un solo objetivo). Usar la siguiente convención:
   `feature/{nombre del feature}`
2. Hacer push de tus cambios directamente al feature branch, **NUNCA DIRECTAMENTE A `main`**.
3. Crear un Pull Request a `main`.
4. Esperar a que el Pipeline de Github Actions se ejecute exitosamente y a que otra persona más apruebe tus cambios antes de realizar un merge a la rama `main`.
5. Eliminar el feature branch una vez se haya realizado merge exitosamente.

## Licencia

Ver `LICENSE`
