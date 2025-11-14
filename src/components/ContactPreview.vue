<template>
  <section class="contact-preview">
    <div class="container">
      <div class="contact-content">
        <div class="contact-text">
          <h2 class="section-title">¿Trabajamos juntos?</h2>
          <p class="section-description">
            Estoy siempre abierta a nuevas oportunidades y proyectos interesantes. 
            Si tienes una idea o necesitas ayuda con tu proyecto web, ¡hablemos!
          </p>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <span>l.mpombar94@gmail.com</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <span>España</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">💼</span>
              <span>Disponible para proyectos</span>
            </div>
          </div>
        </div>
        <div class="contact-action">
          <router-link to="/contact" class="btn btn-large">
            Enviar Mensaje
          </router-link>
          <div class="social-links">
            <a href="#" class="social-link">
              <span>📱</span>
              LinkedIn
            </a>
            <a href="#" class="social-link">
              <span>💻</span>
              GitHub
            </a>
            <a href="#" class="social-link">
              <span>🐦</span>
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactPreview'
}
</script>

<style scoped>
.contact-preview {
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.section-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
}

.contact-icon {
  font-size: 1.5rem;
}

.contact-action {
  text-align: center;
}

.btn-large {
  background: #ffd700;
  color: #333;
  padding: 15px 30px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  display: inline-block;
  margin-bottom: 2rem;
  transition: all 0.3s;
}

.btn-large:hover {
  background: #ffed4e;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-link {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.social-link span {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .section-title {
    font-size: 2rem;
  }

  .contact-info {
    align-items: center;
  }

  .social-links {
    flex-wrap: wrap;
  }
}
</style>
