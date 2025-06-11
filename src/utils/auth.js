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

// Charger l'utilisateur au démarrage
loadUserFromStorage()
