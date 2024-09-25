# Guía de Commits

Este proyecto sigue el estándar **Conventional Commits** para mantener un historial de commits claro y estructurado. A continuación, se describen las reglas y cómo hacer commits correctamente.

## Estructura del Mensaje de Commit

Un mensaje de commit debe seguir la siguiente estructura:

<tipo>[alcance opcional]: <descripción>

[cuerpo opcional]

[pie opcional]

### Ejemplo

```bash
feat(auth): add login functionality

Added login feature to the authentication module.
```

```bash
BREAKING CHANGE: removed old login API endpoints
```

## Tipos de Commit

Los tipos permitidos para el commit son los siguientes:

- **build**: Cambios que afectan el sistema de construcción o dependencias externas (ej. webpack, npm).
- **chore**: Cambios en el proceso de desarrollo que no afectan el código de producción (ej. configuración de herramientas).
- **ci**: Cambios en los archivos de configuración y scripts de CI (ej. GitHub Actions, CircleCI).
- **docs**: Cambios en la documentación (ej. README, wiki).
- **feat**: Nueva característica para el usuario final.
- **fix**: Corrección de un error.
- **perf**: Cambios que mejoran el rendimiento.
- **refactor**: Cambios en el código que no corrigen errores ni agregan características (ej. renombrar variables).
- **style**: Cambios que no afectan el significado del código, solo la forma en que está escrito (ej. formateo).
- **test**: Agregar pruebas o corregir pruebas existentes.
- **revert**: Revertir un commit anterior.

## Reglas de Commit

- **Tipo no vacío**: El tipo del commit no debe estar vacío.
- **Asunto no vacío**: El asunto del commit no debe estar vacío.
- **Longitud del encabezado**: El encabezado del commit debe tener una longitud máxima de 72 caracteres.
- **Tipo válido**: El tipo del commit debe estar en la lista de tipos permitidos.
- **Formato del cuerpo**: El cuerpo del commit, si se incluye, debe comenzar con una línea en blanco después de la descripción y puede contener múltiples párrafos.

## Mensajes de Commit

Aquí hay algunos ejemplos de cómo estructurar tus mensajes de commit:
t

- **Agregar una nueva característica**:
  feat(auth): add login functionalityty

- **Corregir un error**:
  fix(parser): handle empty input

- **Cambiar la API**:
  feat(api)!: remove deprecated endpoints

- **Actualizar la documentación**:
  docs: update README with installation instructions

- **Revertir un cambio**:
  revert: let us never again speak of the noodle incident

Reverts commit 676104e.

## Configuración del Hook de Commit

Para garantizar que los mensajes de commit cumplan con estas reglas, utilizamos el hook de `commit-msg` proporcionado por Husky. Asegúrate de que el archivo de configuración esté presente y correctamente configurado en `.husky/commit-msg`.

### Archivo de Configuración de Commitlint

El archivo de configuración para `commitlint` en el proyecto está ubicado en `.commitlintrc.js` y contiene las siguientes reglas:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'style',
        'test',
        'revert',
      ],
    ],
    'subject-empty': [2, 'never'],
    'subject-case': [0],
  },
};
```

## Cómo Instalar y Configurar Husky

Para instalar y configurar Husky en tu proyecto, sigue estos pasos:

#### Instalar Husky:

```bash
npm install husky --save-dev
```

#### Habilitar hooks de Git:

```bash
npx husky install
```

#### Agregar el hook commit-msg:

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

## Por Qué Usar Conventional Commits

- **Generación automática de CHANGELOGs:** Facilita la creación de registros de cambios.
- **Determinación automática del aumento de versión:** Basado en los tipos de commits realizados.
- **Comunicación clara de los cambios:** Facilita la comprensión de los cambios para los miembros del equipo y otros interesados.
- **Activación de procesos de construcción y publicación:** Permite automatizar la integración y entrega continua.
- **Facilita las contribuciones:** Hace que el historial de commits sea más accesible para nuevos colaboradores.

## Preguntas Frecuentes (FAQ)

- ¿Cómo debo tratar los mensajes de commit en la fase inicial de desarrollo?

Procede como si ya hubieras lanzado el producto. Esto ayudará a mantener un historial claro y útil desde el principio.

- ¿Los tipos en el título del commit deben estar en mayúsculas o minúsculas?

Cualquier formato de mayúsculas o minúsculas es válido, pero es mejor ser consistente.

- ¿Qué hacer si el commit se ajusta a más de un tipo de commit?

Si es posible, realiza múltiples commits para cubrir todos los tipos. Esto ayuda a mantener un historial de commits organizado.

- ¿Esto desalienta el desarrollo rápido y la iteración?

No, ayuda a mover rápido de manera organizada y sostenida.

- ¿Cómo se relaciona esto con SemVer?

fix se traduce en una versión PATCH.
feat se traduce en una versión MINOR.
Los commits con un BREAKING CHANGE se traducen en una versión MAJOR.

- ¿Qué hacer si uso el tipo de commit incorrecto?

Antes de fusionar o lanzar, utiliza git rebase -i para editar el historial de commits. Después del lanzamiento, el proceso de limpieza puede variar según las herramientas y procesos utilizados.

Para más información sobre Conventional Commits, consulta la especificación completa.

¡Gracias por seguir estas pautas y contribuir a mantener un historial de commits claro y útil!

Claro, te ayudaré con la documentación de la funcionalidad de registro y con la invitación por correo electrónico para administradores e instructores. Aquí te dejo una estructura que podrías agregar en el archivo `README.md` de tu proyecto.
