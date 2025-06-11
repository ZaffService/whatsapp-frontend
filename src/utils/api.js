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

  // === CHATS ===
  async getChats() {
    return this.request('/chats')
  }

  async getChatById(id) {
    return this.request(`/chats/${id}`)
  }

  async createChat(chatData) {
    return this.request('/chats', {
      method: 'POST',
      body: JSON.stringify(chatData),
    })
  }

  async updateChat(id, data) {
    return this.request(`/chats/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteChat(id) {
    return this.request(`/chats/${id}`, {
      method: 'DELETE',
    })
  }

  // === USERS ===
  async getUsers() {
    return this.request('/users')
  }

  async getUserById(id) {
    return this.request(`/users/${id}`)
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async updateUser(id, data) {
    return this.request(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async updateUserStatus(userId, status) {
    return this.request(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ lastSeen: status }),
    })
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    })
  }

  // === MESSAGES ===
  async addMessage(chatId, message) {
    const chat = await this.getChatById(chatId)
    if (!chat.messages) chat.messages = []
    
    const newMessage = {
      id: Date.now(),
      ...message,
      timestamp: new Date().toISOString()
    }
    
    chat.messages.push(newMessage)
    
    return this.request(`/chats/${chatId}`, {
      method: 'PUT',
      body: JSON.stringify(chat),
    })
  }

  async deleteMessage(chatId, messageId) {
    const chat = await this.getChatById(chatId)
    if (chat.messages) {
      chat.messages = chat.messages.filter(msg => msg.id !== messageId)
      return this.request(`/chats/${chatId}`, {
        method: 'PUT',
        body: JSON.stringify(chat),
      })
    }
    return chat
  }

  async updateMessage(chatId, messageId, updates) {
    const chat = await this.getChatById(chatId)
    if (chat.messages) {
      const messageIndex = chat.messages.findIndex(msg => msg.id === messageId)
      if (messageIndex !== -1) {
        chat.messages[messageIndex] = { ...chat.messages[messageIndex], ...updates }
        return this.request(`/chats/${chatId}`, {
          method: 'PUT',
          body: JSON.stringify(chat),
        })
      }
    }
    return chat
  }

  async getMessages(chatId) {
    const chat = await this.getChatById(chatId)
    return chat.messages || []
  }

  // === NOTIFICATIONS ===
  async getNotifications() {
    return this.request('/notifications')
  }

  async createNotification(notification) {
    return this.request('/notifications', {
      method: 'POST',
      body: JSON.stringify({
        id: Date.now(),
        ...notification,
        timestamp: new Date().toISOString()
      }),
    })
  }

  async deleteNotification(id) {
    return this.request(`/notifications/${id}`, {
      method: 'DELETE',
    })
  }

  // === CALLS ===
  async getCalls() {
    return this.request('/calls')
  }

  async createCall(callData) {
    return this.request('/calls', {
      method: 'POST',
      body: JSON.stringify({
        id: Date.now(),
        ...callData,
        timestamp: new Date().toISOString()
      }),
    })
  }

  async updateCall(id, data) {
    return this.request(`/calls/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  // === STATUS ===
  async getStatus() {
    return this.request('/status')
  }

  async createStatus(statusData) {
    return this.request('/status', {
      method: 'POST',
      body: JSON.stringify({
        id: Date.now(),
        ...statusData,
        timestamp: new Date().toISOString()
      }),
    })
  }

  async deleteStatus(id) {
    return this.request(`/status/${id}`, {
      method: 'DELETE',
    })
  }

  // === GROUPS ===
  async getGroups() {
    return this.request('/groups')
  }

  async createGroup(groupData) {
    return this.request('/groups', {
      method: 'POST',
      body: JSON.stringify({
        id: Date.now(),
        ...groupData,
        createdAt: new Date().toISOString()
      }),
    })
  }

  async updateGroup(id, data) {
    return this.request(`/groups/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteGroup(id) {
    return this.request(`/groups/${id}`, {
      method: 'DELETE',
    })
  }
}

const apiService = new ApiService()

// === EXPORTS INDIVIDUELS ===
// Chats
export const getChats = () => apiService.getChats()
export const getChatById = (id) => apiService.getChatById(id)
export const createChat = (chatData) => apiService.createChat(chatData)
export const updateChat = (id, data) => apiService.updateChat(id, data)
export const deleteChat = (id) => apiService.deleteChat(id)

// Users
export const getUsers = () => apiService.getUsers()
export const getUserById = (id) => apiService.getUserById(id)
export const createUser = (userData) => apiService.createUser(userData)
export const updateUser = (id, data) => apiService.updateUser(id, data)
export const updateUserStatus = (userId, status) => apiService.updateUserStatus(userId, status)
export const deleteUser = (id) => apiService.deleteUser(id)

// Messages
export const addMessage = (chatId, message) => apiService.addMessage(chatId, message)
export const deleteMessage = (chatId, messageId) => apiService.deleteMessage(chatId, messageId)
export const updateMessage = (chatId, messageId, updates) => apiService.updateMessage(chatId, messageId, updates)

// Notifications
export const getNotifications = () => apiService.getNotifications()
export const createNotification = (notification) => apiService.createNotification(notification)
export const deleteNotification = (id) => apiService.deleteNotification(id)

// Calls
export const getCalls = () => apiService.getCalls()
export const createCall = (callData) => apiService.createCall(callData)
export const updateCall = (id, data) => apiService.updateCall(id, data)

// Status
export const getStatus = () => apiService.getStatus()
export const createStatus = (statusData) => apiService.createStatus(statusData)
export const deleteStatus = (id) => apiService.deleteStatus(id)

// Groups
export const getGroups = () => apiService.getGroups()
export const createGroup = (groupData) => apiService.createGroup(groupData)
export const updateGroup = (id, data) => apiService.updateGroup(id, data)
export const deleteGroup = (id) => apiService.deleteGroup(id)

export default apiService
