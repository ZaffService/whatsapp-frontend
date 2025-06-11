// Import Tailwind CSS
import './style.css'

// Application WhatsApp Clone
class WhatsAppClone {
  constructor() {
    this.currentUser = null
    this.chats = []
    this.currentChat = null
    this.init()
  }

  init() {
    this.createApp()
    this.loadMockData()
    this.render()
  }

  createApp() {
    const app = document.getElementById('app')
    app.innerHTML = `
      <div class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <div class="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          <!-- Header -->
          <div class="bg-gray-50 p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  W
                </div>
                <span class="font-medium text-gray-900">WhatsApp Web</span>
              </div>
            </div>
          </div>

          <!-- Search -->
          <div class="p-3 border-b border-gray-200">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Rechercher une discussion"
                class="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
              <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>

          <!-- Chat List -->
          <div id="chatList" class="flex-1 overflow-y-auto">
            <!-- Les chats seront ajoutés ici -->
          </div>
        </div>

        <!-- Chat Area -->
        <div class="flex-1 flex flex-col">
          <!-- Welcome Screen -->
          <div id="welcomeScreen" class="flex-1 flex items-center justify-center bg-gray-50">
            <div class="text-center text-gray-500">
              <div class="w-32 h-32 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-xl font-medium text-gray-900 mb-2">WhatsApp Web</h3>
              <p class="text-gray-500 max-w-md">Sélectionnez une discussion pour commencer à envoyer des messages</p>
            </div>
          </div>

          <!-- Chat Interface (Hidden by default) -->
          <div id="chatInterface" class="flex-1 flex-col hidden">
            <!-- Chat Header -->
            <div id="chatHeader" class="bg-gray-50 p-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div id="chatAvatar" class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    C
                  </div>
                  <div>
                    <h3 id="chatName" class="font-medium text-gray-900">Contact</h3>
                    <p class="text-sm text-gray-500">En ligne</p>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </button>
                  <button class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Messages Area -->
            <div id="messagesArea" class="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
              <!-- Messages will be added here -->
            </div>

            <!-- Message Input -->
            <div class="p-4 bg-gray-50 border-t border-gray-200">
              <div class="flex items-center space-x-3">
                <button class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  </svg>
                </button>
                <div class="flex-1 relative">
                  <input 
                    id="messageInput"
                    type="text" 
                    placeholder="Tapez un message"
                    class="w-full px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                </div>
                <button id="sendButton" class="p-2 text-green-600 hover:text-green-700 rounded-full hover:bg-green-100">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  loadMockData() {
    this.chats = [
      {
        id: 1,
        name: "Abdallah",
        lastMessage: "Salut ! Comment ça va ?",
        time: "14:30",
        unread: 2,
        avatar: "A",
        messages: [
          { id: 1, text: "Salut ! Comment ça va ?", time: "14:30", sent: false },
          { id: 2, text: "Ça va bien merci ! Et toi ?", time: "14:32", sent: true }
        ]
      },
      {
        id: 2,
        name: "Ousmane Marra",
        lastMessage: "On se voit demain ?",
        time: "13:45",
        unread: 0,
        avatar: "O",
        messages: [
          { id: 1, text: "On se voit demain ?", time: "13:45", sent: false },
          { id: 2, text: "Oui, à quelle heure ?", time: "13:47", sent: true }
        ]
      },
      {
        id: 3,
        name: "Zeynabe Ba",
        lastMessage: "Merci pour l'info !",
        time: "12:20",
        unread: 1,
        avatar: "Z",
        messages: [
          { id: 1, text: "Tu as les documents ?", time: "12:15", sent: true },
          { id: 2, text: "Merci pour l'info !", time: "12:20", sent: false }
        ]
      }
    ]
  }

  render() {
    this.renderChatList()
    this.setupEventListeners()
  }

  renderChatList() {
    const chatList = document.getElementById('chatList')
    chatList.innerHTML = this.chats.map(chat => `
      <div class="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100" data-chat-id="${chat.id}">
        <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
          ${chat.avatar}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <h3 class="font-medium text-gray-900 truncate">${chat.name}</h3>
            <span class="text-xs text-gray-500">${chat.time}</span>
          </div>
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500 truncate">${chat.lastMessage}</p>
            ${chat.unread > 0 ? `<span class="bg-green-500 text-white text-xs rounded-full px-2 py-1 ml-2">${chat.unread}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('')
  }

  setupEventListeners() {
    // Chat selection
    document.getElementById('chatList').addEventListener('click', (e) => {
      const chatItem = e.target.closest('[data-chat-id]')
      if (chatItem) {
        const chatId = parseInt(chatItem.dataset.chatId)
        this.openChat(chatId)
      }
    })

    // Send message
    document.getElementById('sendButton').addEventListener('click', () => {
      this.sendMessage()
    })

    document.getElementById('messageInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage()
      }
    })
  }

  openChat(chatId) {
    this.currentChat = this.chats.find(chat => chat.id === chatId)
    
    // Hide welcome screen
    document.getElementById('welcomeScreen').classList.add('hidden')
    
    // Show chat interface
    document.getElementById('chatInterface').classList.remove('hidden')
    document.getElementById('chatInterface').classList.add('flex')
    
    // Update chat header
    document.getElementById('chatName').textContent = this.currentChat.name
    document.getElementById('chatAvatar').textContent = this.currentChat.avatar
    
    // Render messages
    this.renderMessages()
  }

  renderMessages() {
    const messagesArea = document.getElementById('messagesArea')
    messagesArea.innerHTML = this.currentChat.messages.map(message => `
      <div class="flex ${message.sent ? 'justify-end' : 'justify-start'}">
        <div class="${message.sent ? 'bg-green-500 text-white' : 'bg-white text-gray-800'} p-3 rounded-lg shadow-sm max-w-xs">
          <p>${message.text}</p>
          <span class="text-xs ${message.sent ? 'text-green-100' : 'text-gray-500'} mt-1 block">${message.time}</span>
        </div>
      </div>
    `).join('')
    
    // Scroll to bottom
    messagesArea.scrollTop = messagesArea.scrollHeight
  }

  sendMessage() {
    const input = document.getElementById('messageInput')
    const text = input.value.trim()
    
    if (text && this.currentChat) {
      const newMessage = {
        id: Date.now(),
        text: text,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        sent: true
      }
      
      this.currentChat.messages.push(newMessage)
      this.currentChat.lastMessage = text
      this.currentChat.time = newMessage.time
      
      input.value = ''
      this.renderMessages()
      this.renderChatList()
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new WhatsAppClone()
})
