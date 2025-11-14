# Mi Portfolio Web - Vue.js

Una página web personal/portfolio desarrollada con Vue.js 3 para mostrar habilidades, proyectos y experiencia profesional.

## 🚀 Características

- **Responsive Design**: Se adapta a todos los dispositivos
- **Single Page Application (SPA)**: Navegación fluida sin recargas de página
- **Componentes Reutilizables**: Arquitectura modular con Vue.js
- **Router**: Navegación entre páginas con Vue Router
- **Animaciones CSS**: Transiciones suaves y efectos visuales
- **Formulario de Contacto**: Funcional con validaciones

## 🛠️ Tecnologías Utilizadas

- **Vue.js 3** - Framework progresivo de JavaScript
- **Vue Router 4** - Manejo de rutas
- **Vite** - Herramienta de construcción rápida
- **CSS3** - Estilos modernos con Flexbox y Grid
- **JavaScript ES6+** - Funcionalidades modernas

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.vue       # Navegación principal
│   ├── Footer.vue       # Pie de página
│   ├── HeroSection.vue  # Sección hero de inicio
│   ├── SkillsSection.vue # Sección de habilidades
│   └── ContactPreview.vue # Preview de contacto
├── views/               # Páginas principales
│   ├── Home.vue         # Página de inicio
│   ├── About.vue        # Sobre mí
│   ├── Projects.vue     # Portfolio de proyectos
│   └── Contact.vue      # Formulario de contacto
├── App.vue              # Componente raíz
└── main.js              # Punto de entrada
```

## 🎯 Conceptos Vue.js Aprendidos

### 1. Componentes
Los componentes son la base de Vue.js. Cada archivo `.vue` contiene:
- **Template**: HTML con sintaxis de Vue
- **Script**: Lógica de JavaScript
- **Style**: CSS con scoped opcional

```vue
<template>
  <div class="mi-componente">
    <h1>{{ titulo }}</h1>
  </div>
</template>

<script>
export default {
  name: 'MiComponente',
  data() {
    return {
      titulo: 'Hola Vue!'
    }
  }
}
</script>

<style scoped>
.mi-componente {
  color: blue;
}
</style>
```

### 2. Data y Reactive Properties
```javascript
data() {
  return {
    mensaje: 'Hola mundo',
    contador: 0,
    items: []
  }
}
```

### 3. Methods (Métodos)
```javascript
methods: {
  incrementar() {
    this.contador++
  },
  saludar(nombre) {
    return `Hola, ${nombre}!`
  }
}
```

### 4. Computed Properties
```javascript
computed: {
  mensajeCompleto() {
    return `${this.mensaje} - Contador: ${this.contador}`
  }
}
```

### 5. Directivas Importantes

- **v-if / v-else**: Renderizado condicional
```html
<div v-if="mostrar">Se muestra si 'mostrar' es true</div>
```

- **v-for**: Bucles
```html
<li v-for="item in items" :key="item.id">{{ item.nombre }}</li>
```

- **v-model**: Binding bidireccional en formularios
```html
<input v-model="nombre" type="text">
```

- **@click / @submit**: Eventos
```html
<button @click="miFuncion">Hacer clic</button>
```

### 6. Props (Comunicación entre componentes)
```javascript
// Componente hijo
props: {
  titulo: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    default: 0
  }
}
```

```html
<!-- Componente padre -->
<MiComponente :titulo="miTitulo" :edad="25" />
```

### 7. Vue Router
```javascript
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]
```

```html
<router-link to="/">Inicio</router-link>
<router-view />
```

## 🚀 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de la build de producción
npm run preview
```

## 📝 Cómo Personalizar

### 1. Cambiar Información Personal
Edita los componentes para cambiar:
- Nombre en `Header.vue` y `HeroSection.vue`
- Información de contacto en `ContactPreview.vue` y `Contact.vue`
- Biografía en `About.vue`

### 2. Agregar Nuevos Proyectos
En `Projects.vue`, edita el array `projects` en la sección `data()`:

```javascript
projects: [
  {
    id: 5,
    title: 'Mi Nuevo Proyecto',
    description: 'Descripción corta',
    fullDescription: 'Descripción completa...',
    icon: '🎨',
    technologies: ['Vue.js', 'CSS3'],
    category: 'Vue.js',
    features: ['Característica 1', 'Característica 2'],
    demo: 'https://mi-demo.com',
    github: 'https://github.com/usuario/proyecto'
  }
]
```

### 3. Modificar Habilidades
En `SkillsSection.vue`, edita el array `skills`:

```javascript
skills: [
  {
    id: 7,
    name: 'React',
    icon: '⚛️',
    description: 'Biblioteca para interfaces de usuario',
    level: 70
  }
]
```

### 4. Cambiar Colores y Estilos
Los estilos principales están en `App.vue`. Puedes crear variables CSS para colores:

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🔧 Próximos Pasos para Aprender

1. **Estado Global**: Aprende Pinia para manejo de estado
2. **Composición API**: Sintaxis más moderna de Vue 3
3. **TypeScript**: Añadir tipado estático
4. **Testing**: Unit tests con Vitest
5. **PWA**: Convertir en Progressive Web App
6. **Backend**: Conectar con API REST o GraphQL

## 📚 Recursos Útiles

- [Documentación oficial de Vue.js](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue School](https://vueschool.io/)
- [Vue Mastery](https://vuemastery.com/)

## 🤝 Contribuir

Si quieres mejorar este proyecto:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
