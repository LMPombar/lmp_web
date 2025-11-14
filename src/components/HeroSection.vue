<template>
  <section class="hero">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">
          ¡Hola! Soy <span class="highlight">Laura</span>
        </h1>
        <h2 class="hero-subtitle">Desarrolladora Web Frontend</h2>
        <p class="hero-description">
          Apasionada por crear experiencias web modernas y funcionales. 
          Especializada en Vue.js, JavaScript y diseño responsive.
        </p>
        <div class="hero-buttons">
          <router-link to="/projects" class="btn btn-primary">Ver Proyectos</router-link>
          <router-link to="/contact" class="btn btn-secondary">Contactar</router-link>
        </div>
      </div>
      <div class="hero-image">
        <div class="profile-placeholder">
          <div class="profile-icon">👩‍💻</div>
        </div>
      </div>
    </div>
    <div class="scroll-indicator">
      <div class="scroll-arrow">↓</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem 0;
  position: relative;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.highlight {
  color: #ffd700;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.hero-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary {
  background: #ffd700;
  color: #333;
}

.btn-primary:hover {
  background: #ffed4e;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #333;
  transform: translateY(-2px);
}

.hero-image {
  display: flex;
  justify-content: center;
}

.profile-placeholder {
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.profile-icon {
  font-size: 8rem;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  animation: bounce 2s infinite;
}

.scroll-arrow {
  font-size: 2rem;
  opacity: 0.7;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .profile-placeholder {
    width: 200px;
    height: 200px;
  }

  .profile-icon {
    font-size: 5rem;
  }
}
</style>
