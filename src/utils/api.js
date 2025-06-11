// Configuration de l'API
const API_BASE_URL = 'https://config-json-server.onrender.com'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // Toutes vos méthodes API existantes
  async getChats() {
    return this.request('/chats')
  }

  async updateChat(id, data) {
    return this.request(`/chats/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async getUsers() {
    return this.request('/users')
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    })
  }

  async getNotifications() {
    return this.request('/notifications')
  }

  async createNotification(notification) {
    return this.request('/notifications', {
      method: 'POST',
      body: JSON.stringify(notification),
    })
  }

  async getCalls() {
    return this.request('/calls')
  }

  async getStatus() {
    return this.request('/status')
  }

  // FONCTION MANQUANTE - Ajoutez ceci
  async updateUserStatus(userId, status) {
    return this.request(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ lastSeen: status }),
    })
  }
}

const apiService = new ApiService()

// Exportez toutes les fonctions nécessaires
export const getChats = () => apiService.getChats()
export const updateChat = (id, data) => apiService.updateChat(id, data)
export const getUsers = () => apiService.getUsers()
export const createUser = (userData) => apiService.createUser(userData)
export const deleteUser = (id) => apiService.deleteUser(id)
export const getNotifications = () => apiService.getNotifications()
export const createNotification = (notification) => apiService.createNotification(notification)
export const getCalls = () => apiService.getCalls()
export const getStatus = () => apiService.getStatus()
export const updateUserStatus = (userId, status) => apiService.updateUserStatus(userId, status)

export default apiService
