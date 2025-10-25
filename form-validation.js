/**
 * Contact Form Validation with Phone Number
 */
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.php-email-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // 阻止預設提交
      
      // 取得表單欄位
      const nameInput = this.querySelector('input[name="name"]');
      const emailInput = this.querySelector('input[name="email"]');
      const subjectInput = this.querySelector('input[name="subject"]');
      const phoneInput = this.querySelector('input[name="phone"]');
      const messageInput = this.querySelector('textarea[name="message"]');
      
      // 清空之前的訊息
      const errorDiv = this.querySelector('.error-message');
      const successDiv = this.querySelector('.sent-message');
      const loadingDiv = this.querySelector('.loading');
      
      errorDiv.style.display = 'none';
      successDiv.style.display = 'none';
      loadingDiv.style.display = 'none';
      errorDiv.innerHTML = '';
      
      // 驗證欄位
      let errors = [];
      
      // 檢查名字
      if (!nameInput.value.trim()) {
        errors.push('❌ 請輸入你的名字');
      } else if (nameInput.value.trim().length < 2) {
        errors.push('❌ 名字至少要 2 個字元');
      }
      
      // 檢查 Email
      if (!emailInput.value.trim()) {
        errors.push('❌ 請輸入你的 Email');
      } else if (!isValidEmail(emailInput.value)) {
        errors.push('❌ Email 格式不正確');
      }
      
      // 檢查主旨
      if (!subjectInput.value.trim()) {
        errors.push('❌ 主旨不能為空白');
      } else if (subjectInput.value.trim().length < 3) {
        errors.push('❌ 主旨至少要 3 個字元');
      }
      
      // 檢查手機號碼
      if (!phoneInput.value.trim()) {
        errors.push('❌ 請輸入手機號碼');
      } else if (!isValidPhone(phoneInput.value)) {
        errors.push('❌ 手機號碼格式錯誤，應為 09xx-xxx-xxx');
      }
      
      // 檢查訊息
      if (!messageInput.value.trim()) {
        errors.push('❌ 訊息不能為空白');
      } else if (messageInput.value.trim().length < 10) {
        errors.push('❌ 訊息至少要 10 個字元');
      }
      
      // 如果有錯誤，顯示錯誤訊息
      if (errors.length > 0) {
        errorDiv.innerHTML = errors.join('<br>');
        errorDiv.style.display = 'block';
        return false;
      }
      
      // 驗證通過，顯示成功訊息
      loadingDiv.style.display = 'block';
      setTimeout(() => {
        loadingDiv.style.display = 'none';
        successDiv.style.display = 'block';
        contactForm.reset(); // 清空表單
      }, 1000);
    });
  }
});

/**
 * Email 驗證函式
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 手機號碼驗證函式 (格式: 09xx-xxx-xxx)
 */
function isValidPhone(phone) {
  const phoneRegex = /^09\d{2}-\d{3}-\d{3}$/;
  return phoneRegex.test(phone);
}