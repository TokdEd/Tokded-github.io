const postsContainer = document.getElementById('postsContainer');
const submissionInput = document.getElementById('submissionInput');
let postCount = 0;

// 在這裡追蹤每個投稿的按箭頭次數
const arrowCounts = {};

function submitPost() {
  const submissionText = submissionInput.value.trim();
  if (submissionText !== '') {
    postCount++;

    // 新增用戶投稿的內容
    const postElement = document.createElement('div');
    postElement.classList.add('post-container');
    postElement.style.backgroundColor = `rgba(0, 0, 0, ${Math.round(postCount * 0.5) / 10})`; // 修正這裡
    postElement.innerHTML = `
        <div class="post-content-container">
            <img src="${avatarPreview.src}" alt="Avatar" class="post-avatar">
            <div class="post-content">#covert/${postCount} ${submissionText}</div>
            <button class="arrow-button" onclick="handleArrowClick(event, ${postCount})">↑</button>
            <span class="arrow-count">0</span>
        </div>
    `;
    postsContainer.appendChild(postElement);
    // 取得所有投稿元素
    const allPosts = document.querySelectorAll('.post-container');

    // 找到要插入的位置，按箭頭次數降序排列
    let insertIndex = 0;
    for (let i = 0; i < allPosts.length; i++) {
      const currentCount = arrowCounts[parseInt(allPosts[i].querySelector('.arrow-button').getAttribute('onclick').match(/\d+/)[0])] || 0;
      const newCount = arrowCounts[postCount] || 0;

      if (newCount > currentCount) {
        break;
      }
      insertIndex++;
    }

    // 插入到指定位置
    if (insertIndex < allPosts.length) {
      postsContainer.insertBefore(postElement, allPosts[insertIndex]);
    } else {
      postsContainer.appendChild(postElement);
    }

    // 清空輸入框
    submissionInput.value = '';
  }
}

function toggleDarkMode() {
  const body = document.body;
  const button = document.getElementById('toggleButton');

  body.classList.toggle('dark-mode');
  button.innerText = body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

function handleArrowClick(event, postId) {
  const arrowButton = event.target;
  const postContainer = arrowButton.closest('.post-container');

  // 檢查是否已經按過箭頭
  if (!postContainer.classList.contains('arrow-clicked')) {
    // 更新按箭頭次數
    arrowCounts[postId] = (arrowCounts[postId] || 0) + 1;
    // 更新按箭頭次數顯示
    postContainer.querySelector('.arrow-count').textContent = arrowCounts[postId];
    // 標記為已按過箭頭
    postContainer.classList.add('arrow-clicked');
    // 添加 clicked class，變紅色
    arrowButton.classList.add('clicked');
  }
}

function generatePostId() {
  // 這裡可以使用更複雜的邏輯生成唯一的投稿 ID
  return Date.now().toString();
}
