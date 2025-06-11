import { createNotification, getNotifications } from './api.js'

let notificationPermission = 'default'

// Demander la permission pour les notifications
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    notificationPermission = await Notification.requestPermission()
    return notificationPermission === 'granted'
  }
  return false
}

// Afficher une notification système
export const showSystemNotification = (title, options = {}) => {
  if (notificationPermission === 'granted') {
    const notification = new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      ...options
    })
    
    // Auto-fermer après 5 secondes
    setTimeout(() => notification.close(), 5000)
    
    return notification
  }
}

// Afficher un toast dans l'interface
export const showToast = (message, type = 'info', duration = 3000) => {
  // Créer l'élément toast
  const toast = document.createElement('div')
  toast.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white font-medium transform transition-all duration-300 translate-x-full`
  
  // Couleurs selon le type
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }
  
  toast.classList.add(colors[type] || colors.info)
  toast.textContent = message
  
  // Ajouter au DOM
  document.body.appendChild(toast)
  
  // Animation d'entrée
  setTimeout(() => {
    toast.classList.remove('translate-x-full')
  }, 100)
  
  // Animation de sortie et suppression
  setTimeout(() => {
    toast.classList.add('translate-x-full')
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, duration)
}

// Jouer un son de notification simple
export const playNotificationSound = () => {
  try {
    // Créer un son simple avec Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  } catch (error) {
    console.log('Son de notification non disponible')
  }
}

// Sauvegarder une notification dans la base
export const saveNotification = async (notification) => {
  try {
    return await createNotification(notification)
  } catch (error) {
    console.error('Erreur sauvegarde notification:', error)
  }
}

// Récupérer toutes les notifications
export const getAllNotifications = async () => {
  try {
    return await getNotifications()
  } catch (error) {
    console.error('Erreur récupération notifications:', error)
    return []
  }
}

// Initialiser les notifications au chargement
export const initNotifications = async () => {
  await requestNotificationPermission()
}