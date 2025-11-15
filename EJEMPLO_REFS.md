# Acceder a Métodos de Componentes Hijos en Vue.js

## 1. Usando Template Refs (Acceso Directo)

```vue
<!-- PortfolioOS.vue -->
<template>
  <div>
    <!-- Asignar ref al componente -->
    <TimeCounter ref="timeCounterComponent" />
    <SystemStatus ref="systemStatusComponent" />
  </div>
</template>

<script>
export default {
  methods: {
    getAppFromTimeCounter() {
      // Acceder al método del hijo a través de $refs
      if (this.$refs.timeCounterComponent) {
        return this.$refs.timeCounterComponent.getApp();
      }
    },
    
    getAllAppsFromComponents() {
      // Obtener info de todos los componentes
      const apps = [];
      
      if (this.$refs.timeCounterComponent) {
        apps.push(this.$refs.timeCounterComponent.getApp());
      }
      
      if (this.$refs.systemStatusComponent) {
        apps.push(this.$refs.systemStatusComponent.getApp());
      }
      
      return apps;
    }
  },
  
  mounted() {
    // Puedes llamar a los métodos después de que el componente esté montado
    console.log(this.getAppFromTimeCounter());
  }
}
</script>
```

**⚠️ Importante:** Los `$refs` solo están disponibles después de `mounted()`.

---

## 2. Patrón de Auto-Registro (Más Elegante)

Cada componente hijo se registra automáticamente con el padre:

```vue
<!-- TimeCounter.vue -->
<script>
export default {
  name: 'TimeCounter',
  inject: ['registerApp'], // Inyectar función del padre
  
  data() {
    return {
      appInfo: {
        id: 'timer',
        name: 'Experiencia Profesional',
        icon: '👩‍💻',
        component: 'TimeCounter',
        props: {}
      }
    }
  },
  
  mounted() {
    // Auto-registrarse al montar
    this.registerApp(this.appInfo);
  },
  
  beforeUnmount() {
    // Opcional: des-registrarse al desmontar
    this.unregisterApp(this.appInfo.id);
  }
}
</script>
```

```vue
<!-- PortfolioOS.vue -->
<script>
export default {
  data() {
    return {
      registeredApps: []
    }
  },
  
  provide() {
    return {
      registerApp: this.registerApp,
      unregisterApp: this.unregisterApp
    }
  },
  
  methods: {
    registerApp(appInfo) {
      if (!this.registeredApps.find(app => app.id === appInfo.id)) {
        this.registeredApps.push(appInfo);
        console.log('App registrada:', appInfo.name);
      }
    },
    
    unregisterApp(appId) {
      this.registeredApps = this.registeredApps.filter(app => app.id !== appId);
    }
  }
}
</script>
```

---

## 3. Emitir Eventos (Comunicación Hijo → Padre)

El hijo emite su información al padre:

```vue
<!-- TimeCounter.vue -->
<script>
export default {
  mounted() {
    // Emitir información al padre
    this.$emit('app-ready', {
      id: 'timer',
      name: 'Experiencia Profesional',
      icon: '👩‍💻',
      component: 'TimeCounter',
      props: {}
    });
  }
}
</script>
```

```vue
<!-- PortfolioOS.vue -->
<template>
  <TimeCounter @app-ready="handleAppReady" />
</template>

<script>
export default {
  data() {
    return {
      availableApps: []
    }
  },
  
  methods: {
    handleAppReady(appInfo) {
      this.availableApps.push(appInfo);
      console.log('App lista:', appInfo.name);
    }
  }
}
</script>
```

---

## 4. Solución Centralizada (Recomendada para tu caso)

En lugar de tener `getApp()` en cada componente, centraliza todo en el padre:

```javascript
// PortfolioOS.vue - data()
availableApps: [
  {
    id: 'timer',
    name: 'Experiencia Profesional',
    icon: '👩‍💻',
    component: 'TimeCounter',
    props: {}
  },
  {
    id: 'status',
    name: 'Sistema',
    icon: '⚡',
    component: 'SystemStatus',
    props: {}
  }
]
```

**Ventajas:**
- ✅ Más simple y directo
- ✅ Única fuente de verdad
- ✅ Fácil de mantener
- ✅ No depende del ciclo de vida de los componentes

---

## 5. Usando Dynamic Refs (Para listas dinámicas)

Si renderizas componentes en un `v-for`:

```vue
<template>
  <OSWindow
    v-for="(app, index) in openApps"
    :key="app.id"
    :ref="el => setAppRef(el, app.id)"
  >
    <component :is="app.component" />
  </OSWindow>
</template>

<script>
export default {
  data() {
    return {
      appRefs: {}
    }
  },
  
  methods: {
    setAppRef(el, appId) {
      if (el) {
        this.appRefs[appId] = el;
      }
    },
    
    getAppComponent(appId) {
      return this.appRefs[appId];
    }
  }
}
</script>
```

---

## ⭐ Recomendación para PortfolioOS

Para tu caso específico, **mantén `availableApps` centralizado** en PortfolioOS.vue.

Elimina el método `getApp()` de TimeCounter.vue y otros componentes, ya que:

1. Ya tienes la información en `availableApps`
2. Es más simple mantener
3. Evita duplicación de datos
4. Mejor separación de responsabilidades:
   - **PortfolioOS**: Gestiona qué apps existen y su estado
   - **TimeCounter/SystemStatus**: Solo renderizan su contenido

Si necesitas metadata específica de cada componente (ej: configuración dinámica), usa **props** para pasarla del padre al hijo.
