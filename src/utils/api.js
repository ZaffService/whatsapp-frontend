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

  // Toutes vos méthodes API
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
}

export default new ApiService()
