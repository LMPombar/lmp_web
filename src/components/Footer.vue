<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Laura</h3>
          <p>Desarrolladora web apasionada por crear experiencias digitales increíbles.</p>
        </div>
        <div class="footer-section">
          <h4>Enlaces rápidos</h4>
          <ul>
            <li><router-link to="/">Inicio</router-link></li>
            <li><router-link to="/about">Sobre mí</router-link></li>
            <li><router-link to="/projects">Proyectos</router-link></li>
            <li><router-link to="/contact">Contacto</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Sígueme</h4>
          <div class="social-links">
            <a href="#" class="social-link">LinkedIn</a>
            <a href="#" class="social-link">GitHub</a>
            <a href="#" class="social-link">Twitter</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Laura. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background: #333;
  color: white;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1rem;
  color: #007bff;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #007bff;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  padding: 0.5rem;
  background: #007bff;
  border-radius: 5px;
  transition: background 0.3s;
}

.social-link:hover {
  background: #0056b3;
}

.footer-bottom {
  border-top: 1px solid #555;
  padding: 1rem 0;
  text-align: center;
  color: #ccc;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }
}
</style>
