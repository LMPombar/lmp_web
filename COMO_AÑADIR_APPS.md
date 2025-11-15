# 📱 Cómo Añadir Nuevas Apps al Portfolio OS

## 🎯 Sistema de Auto-Registro

Cada app se auto-registra automáticamente cuando se monta. No necesitas editar listas en PortfolioOS.

---

## ✨ Pasos para Crear una Nueva App

### 1️⃣ Crea tu componente en `/src/components/GUI/`

```vue
<!-- MiNuevaApp.vue -->
<template>
  <div class="status-widget">
    <h3 class="widget-title">🚀 Mi Nueva App</h3>
    <div class="app-content">
      <!-- Tu contenido aquí -->
      <p>¡Hola desde mi nueva app!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiNuevaApp',
  
  // 🔥 IMPORTANTE: Inyectar las funciones de registro
  inject: {
    registerApp: { default: null },
    unregisterApp: { default: null }
  },
  
  data() {
    return {
      // 🔥 IMPORTANTE: Define la metadata de tu app
      appInfo: {
        id: 'mi-app',              // ID único
        name: 'Mi Nueva App',      // Nombre visible
        icon: '🚀',                // Emoji o ícono
        component: 'MiNuevaApp',   // Nombre del componente (mismo que export default name)
        props: {}                  // Props opcionales si los necesitas
      },
      
      // Tus datos aquí
      misDatos: []
    }
  },
  
  mounted() {
    // 🔥 IMPORTANTE: Auto-registrar al montar
    if (this.registerApp) {
      this.registerApp(this.appInfo);
    }
    
    // Tu lógica de inicialización
    this.inicializarApp();
  },
  
  beforeUnmount() {
    // 🔥 IMPORTANTE: Des-registrar al desmontar
    if (this.unregisterApp) {
      this.unregisterApp(this.appInfo.id);
    }
    
    // Tu lógica de limpieza
  },
  
  methods: {
    inicializarApp() {
      // Tu código aquí
    }
  }
}
</script>

<style scoped>
/* Usa las CSS Variables heredadas del padre */
.status-widget {
  background: var(--widget-background);
  border: var(--widget-border);
  border-radius: var(--widget-border-radius);
  padding: var(--widget-padding);
  margin-bottom: 0;
  box-shadow: var(--widget-shadow);
}

.widget-title {
  color: var(--title-color);
  font-size: var(--title-size);
  margin-bottom: var(--title-margin);
  padding-bottom: 8px;
  border-bottom: var(--title-border);
}

.app-content {
  /* Tu CSS aquí */
}
</style>
```

---

### 2️⃣ Importa tu componente en `PortfolioOS.vue`

```javascript
// En la sección de imports
import MiNuevaApp from './GUI/MiNuevaApp.vue'

// En components
export default {
  components: { 
    // ...componentes existentes
    MiNuevaApp  // ← Añade aquí
  },
}
```

---

### 3️⃣ Añade tu componente al App Registry

En el template de `PortfolioOS.vue`, busca la sección "App Registry":

```vue
<!-- App Registry - Componentes ocultos para auto-registro -->
<div style="display: none;">
  <TimeCounter />
  <SystemStatus />
  <MiNuevaApp />  <!-- ← Añade tu app aquí -->
</div>
```

---

## 🎉 ¡Listo!

Tu app ahora:
- ✅ Se auto-registra cuando PortfolioOS se monta
- ✅ Aparece automáticamente abierta en el escritorio
- ✅ Aparece en la taskbar
- ✅ Se puede minimizar/restaurar/cerrar
- ✅ Se puede arrastrar por el escritorio

---

## 📋 Ejemplo Completo: App de Proyectos

```vue
<!-- ProjectsList.vue -->
<template>
  <div class="status-widget">
    <h3 class="widget-title">💼 Mis Proyectos</h3>
    <div class="projects-list">
      <div v-for="project in projects" :key="project.id" class="project-item">
        <span class="project-icon">{{ project.icon }}</span>
        <span class="project-name">{{ project.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsList',
  inject: {
    registerApp: { default: null },
    unregisterApp: { default: null }
  },
  data() {
    return {
      appInfo: {
        id: 'projects',
        name: 'Proyectos',
        icon: '💼',
        component: 'ProjectsList',
        props: {}
      },
      projects: [
        { id: 1, name: 'Portfolio Vue', icon: '🎨' },
        { id: 2, name: 'API REST', icon: '🔌' },
        { id: 3, name: 'AI Chatbot', icon: '🤖' }
      ]
    }
  },
  mounted() {
    if (this.registerApp) {
      this.registerApp(this.appInfo);
    }
  },
  beforeUnmount() {
    if (this.unregisterApp) {
      this.unregisterApp(this.appInfo.id);
    }
  }
}
</script>

<style scoped>
.status-widget {
  background: var(--widget-background);
  border: var(--widget-border);
  border-radius: var(--widget-border-radius);
  padding: var(--widget-padding);
  margin-bottom: 0;
  box-shadow: var(--widget-shadow);
}

.widget-title {
  color: var(--title-color);
  font-size: var(--title-size);
  margin-bottom: var(--title-margin);
  padding-bottom: 8px;
  border-bottom: var(--title-border);
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.project-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 6px;
}

.project-icon {
  font-size: 20px;
}

.project-name {
  color: var(--text-color);
}
</style>
```

---

## 🎨 CSS Variables Disponibles

Todas las apps heredan estas variables CSS del PortfolioOS:

```css
--primary-color: #00ff88;      /* Verde brillante */
--secondary-color: #007bff;    /* Azul */
--accent-color: #ffbd2e;       /* Amarillo/Dorado */
--background-dark: #1a1a1a;    /* Fondo oscuro */
--background-darker: #0a0a0a;  /* Fondo más oscuro */
--border-color: #333;          /* Color de bordes */
--text-color: #ccc;            /* Texto normal */
--text-muted: #888;            /* Texto atenuado */
--text-bright: #fff;           /* Texto brillante */

/* Widget styles */
--widget-background: var(--background-dark);
--widget-border: 1px solid var(--border-color);
--widget-border-radius: 8px;
--widget-padding: 20px;
--widget-margin: 20px;
--widget-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

/* Title styles */
--title-color: var(--primary-color);
--title-size: 16px;
--title-margin: 15px;
--title-border: 1px solid var(--border-color);
```

---

## 🔧 Configuración Avanzada

### Cambiar comportamiento inicial

Por defecto, las apps se abren automáticamente al registrarse. Para cambiar esto:

```javascript
// En PortfolioOS.vue, método registerApp()
registerApp(appInfo) {
  if (!this.availableApps.find(app => app.id === appInfo.id)) {
    this.availableApps.push(appInfo);
    
    // Comentar esta línea para que NO se abran automáticamente
    // this.openApps.push(appInfo);
  }
}
```

### Props dinámicos

Si tu app necesita recibir props:

```javascript
appInfo: {
  id: 'mi-app',
  name: 'Mi App',
  icon: '🚀',
  component: 'MiNuevaApp',
  props: {
    userId: 123,
    theme: 'dark'
  }
}
```

Luego usa las props normalmente en tu componente:

```javascript
props: {
  userId: Number,
  theme: String
}
```

---

## ✅ Checklist para Nueva App

- [ ] Crear archivo en `/src/components/GUI/NombreApp.vue`
- [ ] Añadir `inject: { registerApp, unregisterApp }`
- [ ] Definir `appInfo` en data()
- [ ] Llamar `this.registerApp(this.appInfo)` en mounted()
- [ ] Llamar `this.unregisterApp(this.appInfo.id)` en beforeUnmount()
- [ ] Importar en PortfolioOS.vue
- [ ] Añadir a components en PortfolioOS.vue
- [ ] Añadir al App Registry (div oculto) en template de PortfolioOS.vue

---

## 🎯 Ventajas de este Sistema

✅ **Desacoplado**: Cada app es independiente
✅ **Escalable**: Añadir apps es muy fácil
✅ **Limpio**: No hay listas hardcodeadas
✅ **Automático**: Auto-registro sin configuración extra
✅ **Flexible**: Cada app define su propia metadata
✅ **Mantenible**: Cambios en una app no afectan a otras

¡Ahora puedes crear tantas apps como quieras! 🚀
