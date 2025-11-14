<template>
  <div class="contact">
    <div class="container">
      <div class="contact-hero">
        <h1 class="page-title">Contáctame</h1>
        <p class="page-subtitle">¿Tienes un proyecto en mente? ¡Hablemos!</p>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <h2>Información de Contacto</h2>
          <div class="contact-methods">
            <div class="contact-method">
              <div class="contact-icon">📧</div>
              <div class="contact-details">
                <h3>Email</h3>
                <p>laura@example.com</p>
              </div>
            </div>
            <div class="contact-method">
              <div class="contact-icon">📍</div>
              <div class="contact-details">
                <h3>Ubicación</h3>
                <p>España</p>
              </div>
            </div>
            <div class="contact-method">
              <div class="contact-icon">🕒</div>
              <div class="contact-details">
                <h3>Horario</h3>
                <p>Lun - Vie, 9:00 - 18:00</p>
              </div>
            </div>
          </div>

          <div class="social-section">
            <h3>Encuéntrame en</h3>
            <div class="social-links">
              <a href="#" class="social-link">
                <span class="social-icon">💼</span>
                <span>LinkedIn</span>
              </a>
              <a href="#" class="social-link">
                <span class="social-icon">💻</span>
                <span>GitHub</span>
              </a>
              <a href="#" class="social-link">
                <span class="social-icon">🐦</span>
                <span>Twitter</span>
              </a>
            </div>
          </div>

          <div class="availability">
            <h3>Disponibilidad</h3>
            <div class="status">
              <span class="status-indicator"></span>
              <span>Disponible para proyectos freelance</span>
            </div>
            <p>Siempre estoy interesada en nuevos proyectos y oportunidades de colaboración.</p>
          </div>
        </div>

        <div class="contact-form-section">
          <form @submit.prevent="submitForm" class="contact-form">
            <h2>Envíame un Mensaje</h2>
            
            <div class="form-group">
              <label for="name">Nombre *</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required
                :class="{ error: errors.name }"
              >
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required
                :class="{ error: errors.email }"
              >
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <div class="form-group">
              <label for="company">Empresa</label>
              <input 
                type="text" 
                id="company" 
                v-model="form.company"
              >
            </div>

            <div class="form-group">
              <label for="subject">Asunto *</label>
              <select 
                id="subject" 
                v-model="form.subject" 
                required
                :class="{ error: errors.subject }"
              >
                <option value="">Selecciona un asunto</option>
                <option value="freelance">Proyecto Freelance</option>
                <option value="collaboration">Colaboración</option>
                <option value="job">Oportunidad Laboral</option>
                <option value="other">Otro</option>
              </select>
              <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
            </div>

            <div class="form-group">
              <label for="message">Mensaje *</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="6" 
                required
                :class="{ error: errors.message }"
                placeholder="Cuéntame sobre tu proyecto..."
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>

            <button 
              type="submit" 
              class="submit-btn"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
            </button>
          </form>

          <div v-if="submitStatus === 'success'" class="success-message">
            <div class="success-icon">✅</div>
            <h3>¡Mensaje enviado!</h3>
            <p>Gracias por contactarme. Te responderé lo antes posible.</p>
          </div>

          <div v-if="submitStatus === 'error'" class="error-alert">
            <div class="error-icon">❌</div>
            <h3>Error al enviar</h3>
            <p>Ha ocurrido un error. Por favor, intenta de nuevo más tarde.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      },
      errors: {},
      isSubmitting: false,
      submitStatus: null
    }
  },
  methods: {
    validateForm() {
      this.errors = {}
      
      if (!this.form.name.trim()) {
        this.errors.name = 'El nombre es requerido'
      }
      
      if (!this.form.email.trim()) {
        this.errors.email = 'El email es requerido'
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Email inválido'
      }
      
      if (!this.form.subject) {
        this.errors.subject = 'El asunto es requerido'
      }
      
      if (!this.form.message.trim()) {
        this.errors.message = 'El mensaje es requerido'
      } else if (this.form.message.trim().length < 10) {
        this.errors.message = 'El mensaje debe tener al menos 10 caracteres'
      }
      
      return Object.keys(this.errors).length === 0
    },
    
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    async submitForm() {
      if (!this.validateForm()) {
        return
      }
      
      this.isSubmitting = true
      this.submitStatus = null
      
      try {
        // Simular envío del formulario
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Aquí normalmente enviarías los datos a tu backend
        console.log('Datos del formulario:', this.form)
        
        this.submitStatus = 'success'
        this.resetForm()
      } catch (error) {
        this.submitStatus = 'error'
      } finally {
        this.isSubmitting = false
      }
    },
    
    resetForm() {
      this.form = {
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      }
      this.errors = {}
    }
  }
}
</script>

<style scoped>
.contact {
  margin-top: 70px;
  padding: 2rem 0;
  min-height: 100vh;
}

.contact-hero {
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-info h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.contact-methods {
  margin-bottom: 3rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.contact-icon {
  font-size: 2rem;
  width: 60px;
  text-align: center;
}

.contact-details h3 {
  margin-bottom: 0.25rem;
  color: #333;
}

.contact-details p {
  color: #666;
  margin: 0;
}

.social-section {
  margin-bottom: 3rem;
}

.social-section h3 {
  margin-bottom: 1rem;
  color: #333;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  transition: all 0.3s;
}

.social-link:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

.social-icon {
  font-size: 1.2rem;
}

.availability {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 15px;
}

.availability h3 {
  margin-bottom: 1rem;
}

.status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  background: #4CAF50;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.submit-btn {
  background: #007bff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
}

.submit-btn:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.success-message,
.error-alert {
  text-align: center;
  padding: 2rem;
  border-radius: 15px;
  margin-top: 2rem;
}

.success-message {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error-alert {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.success-icon,
.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.success-message h3,
.error-alert h3 {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .social-links {
    flex-direction: column;
  }

  .contact-form {
    padding: 1.5rem;
  }
}
</style>
