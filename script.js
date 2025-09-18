// 模擬一個簡單的LLM回應
function getLLMResponse(input) {
    const keywords = ['紅綠燈', '交通', '路燈', '道路', '設施'];
    const hasKeyword = keywords.some(keyword => input.includes(keyword));

    if (hasKeyword && input.includes('新北')) {
        const extractedInfo = {
            '地點': '新北市',
            '事由': '紅綠燈故障',
            '問題': '交通混亂',
            '發生時間': '已持續數天'
        };
        const summary = `【案件摘要】\n地點：${extractedInfo['地點']}\n事由：${extractedInfo['事由']}\n問題：${extractedInfo['問題']}\n發生時間：${extractedInfo['發生時間']}\n\n根據分析，此案件已自動分發至「新北市交通局」。`;
        
        return {
            message: `好的，感謝您提供資訊。此案件應歸類為「交通設施維護」類別。請問您是否需要立即向相關單位提交陳情？`,
            caseSummary: summary
        };
    } else {
        return {
            message: `不好意思，我未能從您的描述中提取具體資訊。請提供更詳細的陳情內容。`
        };
    }
}

// 動態新增訊息到聊天視窗
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    if (sender === 'user') {
        messageDiv.classList.add('user-message');
    } else {
        messageDiv.classList.add('system-message');
    }
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 提交按鈕點擊事件
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const userText = userInput.value.trim();
    if (userText === '') return;

    // 1. 顯示使用者輸入的訊息
    addMessage(userText, 'user');
    userInput.value = '';

    // 2. 模擬LLM處理並產生回應
    setTimeout(() => {
        const response = getLLMResponse(userText);
        addMessage(response.message, 'system');

        // 3. 如果有案件摘要，則顯示在右側區塊
        if (response.caseSummary) {
            document.getElementById('caseDetails').textContent = response.caseSummary;
        }
    }, 1000); // 延遲1秒模擬後台處理
}

// 綁定Enter鍵提交訊息
document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});