<template>
  <div class="projects">
    <div class="container">
      <div class="projects-hero">
        <h1 class="page-title">Mis Proyectos</h1>
        <p class="page-subtitle">Una selección de trabajos que demuestran mis habilidades</p>
      </div>

      <div class="filter-buttons">
        <button 
          v-for="filter in filters" 
          :key="filter"
          class="filter-btn"
          :class="{ active: activeFilter === filter }"
          @click="setFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>

      <div class="projects-grid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="project-card"
          @click="openProject(project)"
        >
          <div class="project-image">
            <div class="project-placeholder">
              <span class="project-icon">{{ project.icon }}</span>
            </div>
            <div class="project-overlay">
              <div class="project-buttons">
                <button class="btn btn-small btn-primary">Ver Detalles</button>
                <a v-if="project.demo" :href="project.demo" class="btn btn-small btn-secondary" target="_blank">Demo</a>
                <a v-if="project.github" :href="project.github" class="btn btn-small btn-secondary" target="_blank">GitHub</a>
              </div>
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech">
              <span 
                v-for="tech in project.technologies" 
                :key="tech" 
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para detalles del proyecto -->
      <div v-if="selectedProject" class="modal-overlay" @click="closeProject">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeProject">&times;</button>
          <div class="modal-header">
            <h2>{{ selectedProject.title }}</h2>
            <div class="modal-links">
              <a v-if="selectedProject.demo" :href="selectedProject.demo" class="btn btn-primary" target="_blank">Ver Demo</a>
              <a v-if="selectedProject.github" :href="selectedProject.github" class="btn btn-secondary" target="_blank">Ver Código</a>
            </div>
          </div>
          <div class="modal-body">
            <div class="project-details">
              <div class="project-image-large">
                <div class="project-placeholder-large">
                  <span class="project-icon-large">{{ selectedProject.icon }}</span>
                </div>
              </div>
              <div class="project-info-detailed">
                <p class="project-description-full">{{ selectedProject.fullDescription }}</p>
                <div class="project-features">
                  <h4>Características principales:</h4>
                  <ul>
                    <li v-for="feature in selectedProject.features" :key="feature">{{ feature }}</li>
                  </ul>
                </div>
                <div class="project-tech-detailed">
                  <h4>Tecnologías utilizadas:</h4>
                  <div class="tech-grid">
                    <span 
                      v-for="tech in selectedProject.technologies" 
                      :key="tech" 
                      class="tech-tag-large"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      selectedProject: null,
      activeFilter: 'Todos',
      filters: ['Todos', 'Vue.js', 'JavaScript', 'CSS', 'Responsive'],
      projects: [
        {
          id: 1,
          title: 'Portfolio Personal',
          description: 'Mi página web personal creada con Vue.js',
          fullDescription: 'Una página web personal responsive desarrollada con Vue.js que muestra mis habilidades, proyectos y experiencia. Incluye navegación dinámica, componentes reutilizables y un diseño moderno.',
          icon: '🌟',
          technologies: ['Vue.js', 'JavaScript', 'CSS3', 'Responsive'],
          category: 'Vue.js',
          features: [
            'Diseño responsive para todos los dispositivos',
            'Navegación dinámica con Vue Router',
            'Componentes reutilizables',
            'Animaciones CSS suaves',
            'Optimización de rendimiento'
          ],
          demo: '#',
          github: '#'
        },
        {
          id: 2,
          title: 'Lista de Tareas',
          description: 'Aplicación de gestión de tareas con Vue.js',
          fullDescription: 'Una aplicación completa para gestionar tareas diarias con funcionalidades como agregar, editar, completar y eliminar tareas. Incluye filtros y almacenamiento local.',
          icon: '📝',
          technologies: ['Vue.js', 'JavaScript', 'LocalStorage'],
          category: 'Vue.js',
          features: [
            'Agregar y eliminar tareas',
            'Marcar tareas como completadas',
            'Filtros por estado',
            'Almacenamiento local persistente',
            'Interfaz intuitiva'
          ],
          demo: '#',
          github: '#'
        },
        {
          id: 3,
          title: 'Landing Page Responsive',
          description: 'Página de aterrizaje moderna y responsive',
          fullDescription: 'Una landing page moderna desarrollada con HTML5, CSS3 y JavaScript vanilla. Diseño completamente responsive con animaciones suaves y optimizada para conversión.',
          icon: '🚀',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
          category: 'CSS',
          features: [
            'Diseño mobile-first',
            'Animaciones CSS avanzadas',
            'Optimización SEO',
            'Formulario de contacto funcional',
            'Carga rápida'
          ],
          demo: '#',
          github: '#'
        },
        {
          id: 4,
          title: 'Calculadora Interactiva',
          description: 'Calculadora web con JavaScript vanilla',
          fullDescription: 'Una calculadora web completamente funcional desarrollada con JavaScript vanilla. Incluye operaciones básicas y avanzadas con una interfaz limpia y responsive.',
          icon: '🔢',
          technologies: ['JavaScript', 'CSS3', 'HTML5'],
          category: 'JavaScript',
          features: [
            'Operaciones matemáticas básicas',
            'Historial de cálculos',
            'Teclado numérico funcional',
            'Diseño responsive',
            'Manejo de errores'
          ],
          demo: '#',
          github: '#'
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.activeFilter === 'Todos') {
        return this.projects
      }
      return this.projects.filter(project => 
        project.technologies.includes(this.activeFilter)
      )
    }
  },
  methods: {
    setFilter(filter) {
      this.activeFilter = filter
    },
    openProject(project) {
      this.selectedProject = project
      document.body.style.overflow = 'hidden'
    },
    closeProject() {
      this.selectedProject = null
      document.body.style.overflow = 'auto'
    }
  }
}
</script>

<style scoped>
.projects {
  margin-top: 70px;
  padding: 2rem 0;
  min-height: 100vh;
}

.projects-hero {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #333;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #666;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  color: #495057;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover,
.filter-btn.active {
  background: #007bff;
  border-color: #007bff;
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-placeholder {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-icon {
  font-size: 4rem;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-small {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 1px solid white;
}

.project-info {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.project-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
}

.modal-header {
  padding: 2rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-links {
  display: flex;
  gap: 1rem;
}

.modal-body {
  padding: 2rem;
}

.project-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.project-placeholder-large {
  height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-icon-large {
  font-size: 6rem;
}

.project-description-full {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #555;
}

.project-features ul {
  list-style: none;
  padding-left: 0;
}

.project-features li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.project-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #007bff;
  font-weight: bold;
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tech-tag-large {
  background: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-details {
    grid-template-columns: 1fr;
  }

  .modal-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .modal-links {
    align-self: stretch;
  }
}
</style>
