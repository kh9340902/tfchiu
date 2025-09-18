document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const heroButtons = document.querySelectorAll('.hero-section .btn-secondary');
    const pages = document.querySelectorAll('.main-content .page');

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');

        // 更新導航列的 active 狀態
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page + '-page' === pageId) {
                link.classList.add('active');
            }
        });
    }

    // 導航列點擊事件
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.dataset.page;
            showPage(targetPage + '-page');
        });
    });

    // 英雄區塊按鈕點擊事件
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = button.dataset.page;
            showPage(targetPage + '-page');
        });
    });

    // 處理陳情頁面提交 (可在此添加實際提交邏輯)
    const submitPetitionBtn = document.getElementById('submitPetition');
    if (submitPetitionBtn) {
        submitPetitionBtn.addEventListener('click', () => {
            const content = document.getElementById('petitionContent').value;
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const phone = document.getElementById('contactPhone').value;
            const consent = document.getElementById('privacyConsent').checked;

            if (content && name && email && phone && consent) {
                alert('陳情已送出！感謝您的寶貴意見。');
                // 在這裡可以加入 AJAX 請求將資料發送到後端
                // 例如:
                // fetch('/api/submit-petition', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ content, name, email, phone })
                // }).then(response => response.json())
                // .then(data => {
                //     alert('陳情已送出，案件編號：' + data.caseId);
                //     showPage('query-page'); // 跳轉到查詢頁面
                // })
                // .catch(error => console.error('Error:', error));
            } else {
                alert('請填寫所有必填欄位並同意個資使用授權。');
            }
        });
    }

    // 處理案件查詢按鈕 (可在此添加實際查詢邏輯)
    const searchPetitionBtn = document.getElementById('searchPetitionBtn');
    if (searchPetitionBtn) {
        searchPetitionBtn.addEventListener('click', () => {
            const query = document.getElementById('queryInput').value;
            if (query) {
                alert(`正在查詢案件：${query}`);
                // 在這裡可以加入 AJAX 請求來獲取查詢結果
                // 並更新 petitionList 的內容
            } else {
                alert('請輸入案件編號或關鍵字。');
            }
        });
    }

    // 聊天機器人開關 (如果需要的話，可以讓它預設隱藏或只在特定頁面顯示)
    // 這裡只是簡單的關閉功能
    const closeChatbotBtn = document.querySelector('.close-chatbot');
    const aiChatbotSidebar = document.querySelector('.ai-chatbot-sidebar');
    if (closeChatbotBtn && aiChatbotSidebar) {
        closeChatbotBtn.addEventListener('click', () => {
            aiChatbotSidebar.style.display = 'none'; // 隱藏聊天機器人
            // 或者切換一個 class 來實現更平滑的動畫
            // aiChatbotSidebar.classList.remove('active');
        });
    }

    // 處理聊天機器人訊息發送
    const chatbotMessageInput = document.getElementById('chatbotMessageInput');
    const chatbotSendBtn = document.querySelector('.chatbot-input button');
    const chatbotBody = document.querySelector('.chatbot-body');

    if (chatbotMessageInput && chatbotSendBtn && chatbotBody) {
        const sendMessageToChatbot = () => {
            const messageText = chatbotMessageInput.value.trim();
            if (messageText) {
                const userMessageDiv = document.createElement('div');
                userMessageDiv.classList.add('chatbot-message', 'user');
                userMessageDiv.textContent = messageText;
                chatbotBody.appendChild(userMessageDiv);
                chatbotMessageInput.value = '';
                chatbotBody.scrollTop = chatbotBody.scrollHeight; // 滾動到底部

                // 模擬 AI 回覆
                setTimeout(() => {
                    const botMessageDiv = document.createElement('div');
                    botMessageDiv.classList.add('chatbot-message', 'bot');
                    botMessageDiv.textContent = `您提問：「${messageText}」。我們的AI正在處理中，請稍候...`;
                    chatbotBody.appendChild(botMessageDiv);
                    chatbotBody.scrollTop = chatbotBody.scrollHeight;
                }, 1000);
            }
        };

        chatbotSendBtn.addEventListener('click', sendMessageToChatbot);
        chatbotMessageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessageToChatbot();
            }
        });
    }

    // 初始化顯示首頁
    showPage('home-page');
});