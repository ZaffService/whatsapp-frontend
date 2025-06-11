import { showToast } from "./notifications.js"
import { getUsers, updateUserStatus, createUser } from "./api.js"

let currentUser = null

export const getCurrentUser = () => currentUser

export const setCurrentUser = (user) => {
  currentUser = user
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
    updateUserStatus(user.id, 'en ligne').catch(console.error)
  } else {
    localStorage.removeItem('currentUser')
  }
}

export const loadUserFromStorage = () => {
  const stored = localStorage.getItem('currentUser')
  if (stored) {
    currentUser = JSON.parse(stored)
    updateUserStatus(currentUser.id, 'en ligne').catch(console.error)
  }
  return currentUser
}

export const login = async (phone, name) => {
  try {
    const users = await getUsers()
    let user = users.find(u => u.phone === phone)
    
    if (!user) {
      // Créer un nouveau utilisateur
      const newUser = {
        name: name || 'Utilisateur',
        phone: phone,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50) + 1}`,
        lastSeen: 'en ligne'
      }
      user = await createUser(newUser)
      showToast('Compte créé avec succès !', 'success')
    } else if (name && user.name !== name) {
      // Mettre à jour le nom si fourni
      user.name = name
      await updateUser(user.id, { name })
    }
    
    setCurrentUser(user)
    showToast(`Bienvenue ${user.name} !`, 'success')
    return user
  } catch (error) {
    console.error('Erreur de connexion:', error)
    showToast('Erreur de connexion', 'error')
    throw error
  }
}

export const logout = async () => {
  if (currentUser) {
    try {
      await updateUserStatus(currentUser.id, new Date().toISOString())
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }
  setCurrentUser(null)
  showToast('Déconnecté avec succès', 'info')
}

export const isAuthenticated = () => {
  return currentUser !== null
}

// Fonction pour créer le formulaire de connexion
export const createLoginForm = () => {
  const loginContainer = document.createElement('div')
  loginContainer.className = 'min-h-screen bg-whatsapp-bg flex items-center justify-center p-4'
  loginContainer.innerHTML = `
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">WhatsApp Web</h1>
        <p class="text-gray-600">Connectez-vous pour continuer</p>
      </div>
      
      <form id="loginForm" class="space-y-6">
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
            Numéro de téléphone
          </label>
          <input 
            type="tel" 
            id="phone" 
            name="phone"
            placeholder="777123456"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-whatsapp-light focus:border-transparent"
            required
          >
        </div>
        
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Nom (optionnel)
          </label>
          <input 
            type="text" 
            id="name" 
            name="name"
            placeholder="Votre nom"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-whatsapp-light focus:border-transparent"
          >
        </div>
        
        <button 
          type="submit"
          class="w-full bg-whatsapp-light hover:bg-whatsapp-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Se connecter
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500">
          Comptes de test disponibles :
        </p>
        <div class="mt-2 text-xs text-gray-400 space-y-1">
          <div>Zafe - 777867740</div>
          <div>Abdallah - 778123456</div>
          <div>Ousmane - 776543210</div>
        </div>
      </div>
    </div>
  `
  
  // Gérer la soumission du formulaire
  const form = loginContainer.querySelector('#loginForm')
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const phone = form.phone.value.trim()
    const name = form.name.value.trim()
    
    if (!phone) {
      showToast('Veuillez entrer un numéro de téléphone', 'error')
      return
    }
    
    try {
      const submitButton = form.querySelector('button[type="submit"]')
      submitButton.textContent = 'Connexion...'
      submitButton.disabled = true
      
      await login(phone, name)
      
      // Supprimer le formulaire de connexion
      loginContainer.remove()
      
      // Recharger la page ou initialiser l'app
      window.location.reload()
      
    } catch (error) {
      console.error('Erreur de connexion:', error)
      showToast('Erreur de connexion', 'error')
      
      const submitButton = form.querySelector('button[type="submit"]')
      submitButton.textContent = 'Se connecter'
      submitButton.disabled = false
    }
  })
  
  return loginContainer
}

// Charger l'utilisateur au démarrage
loadUserFromStorage()
