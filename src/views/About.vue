<template>
  <div class="about">
    <div class="container">
      <div class="about-hero">
        <h1 class="page-title">Sobre Mí</h1>
        <p class="page-subtitle">Conoce mi historia y pasión por el desarrollo web</p>
      </div>

      <div class="about-content">
        <div class="about-text">
          <div class="story-section">
            <h2>Mi Historia</h2>
            <p>
              ¡Hola! Soy Laura, una desarrolladora web frontend apasionada por crear 
              experiencias digitales que realmente conecten con las personas. Mi viaje 
              en el mundo del desarrollo comenzó por curiosidad y se convirtió en una 
              verdadera pasión.
            </p>
            <p>
              Actualmente estoy enfocada en Vue.js y las tecnologías modernas de 
              frontend, siempre buscando aprender y mejorar mis habilidades. Me encanta 
              el desafío de convertir ideas complejas en interfaces simples e intuitivas.
            </p>
          </div>

          <div class="values-section">
            <h2>Mis Valores</h2>
            <div class="values-grid">
              <div class="value-card">
                <div class="value-icon">🎯</div>
                <h3>Precisión</h3>
                <p>Atención al detalle en cada línea de código</p>
              </div>
              <div class="value-card">
                <div class="value-icon">🌱</div>
                <h3>Crecimiento</h3>
                <p>Aprendizaje continuo y adaptación a nuevas tecnologías</p>
              </div>
              <div class="value-card">
                <div class="value-icon">🤝</div>
                <h3>Colaboración</h3>
                <p>Trabajo en equipo y comunicación efectiva</p>
              </div>
            </div>
          </div>

          <div class="journey-section">
            <h2>Mi Experiencia</h2>
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>2024 - Presente</h4>
                  <p>Desarrollando proyectos personales con Vue.js y aprendiendo las mejores prácticas del desarrollo frontend moderno.</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>2023</h4>
                  <p>Comenzé mi aventura en el desarrollo web, aprendiendo HTML, CSS y JavaScript desde los fundamentos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="about-sidebar">
          <div class="profile-card">
            <div class="profile-image">
              <div class="profile-placeholder">👩‍💻</div>
            </div>
            <h3>Laura</h3>
            <p class="role">Frontend Developer</p>
            
            <div class="quick-facts">
              <h4>Datos Rápidos</h4>
              <ul>
                <li><strong>Ubicación:</strong> España</li>
                <li><strong>Idiomas:</strong> Español, Inglés</li>
                <li><strong>Disponibilidad:</strong> Proyectos freelance</li>
                <li><strong>Especialidad:</strong> Vue.js, JavaScript</li>
              </ul>
            </div>

            <div class="interests">
              <h4>Intereses</h4>
              <div class="interests-tags">
                <span class="tag">🎨 UI/UX Design</span>
                <span class="tag">📱 Responsive Design</span>
                <span class="tag">⚡ Performance</span>
                <span class="tag">♿ Accesibilidad</span>
                <span class="tag">🔧 Herramientas Dev</span>
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
  name: 'About'
}
</script>

<style scoped>
.about {
  margin-top: 70px;
  padding: 2rem 0;
  min-height: 100vh;
}

.about-hero {
  text-align: center;
  margin-bottom: 4rem;
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

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.story-section,
.values-section,
.journey-section {
  margin-bottom: 3rem;
}

.story-section h2,
.values-section h2,
.journey-section h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.story-section p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #555;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.value-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.value-card h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0.75rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #007bff;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-dot {
  position: absolute;
  left: -1.75rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  background: #007bff;
  border-radius: 50%;
}

.timeline-content h4 {
  color: #007bff;
  margin-bottom: 0.5rem;
}

.profile-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: sticky;
  top: 100px;
}

.profile-image {
  margin-bottom: 1.5rem;
}

.profile-placeholder {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  margin: 0 auto;
}

.profile-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.role {
  color: #007bff;
  font-weight: 500;
  margin-bottom: 2rem;
}

.quick-facts,
.interests {
  text-align: left;
  margin-bottom: 2rem;
}

.quick-facts h4,
.interests h4 {
  margin-bottom: 1rem;
  color: #333;
}

.quick-facts ul {
  list-style: none;
}

.quick-facts li {
  margin-bottom: 0.5rem;
  color: #555;
}

.interests-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #007bff;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 2rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .profile-card {
    position: static;
  }
}
</style>
