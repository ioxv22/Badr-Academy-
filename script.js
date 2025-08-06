// تفعيل القائمة المتجاوبة
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // إغلاق القائمة عند النقر على أي رابط
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  });

  // تفعيل أزرار خيارات الدفع
  const bankDetailsBtn = document.getElementById('show-bank-details');
  const bankDetails = document.getElementById('bank-details');
  const confirmTransferBtn = document.getElementById('confirm-transfer');
  const paymentConfirmation = document.getElementById('payment-confirmation');
  const paymentForm = document.getElementById('payment-form');

  // إظهار تفاصيل الحساب البنكي عند النقر على زر "تفاصيل الحساب"
  if (bankDetailsBtn && bankDetails) {
    bankDetailsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      bankDetails.classList.add('active');
      bankDetails.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // إظهار نموذج تأكيد الدفع عند النقر على زر "تأكيد التحويل"
  if (confirmTransferBtn && paymentConfirmation) {
    confirmTransferBtn.addEventListener('click', function(e) {
      e.preventDefault();
      paymentConfirmation.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // التحقق من نموذج الدفع قبل الإرسال
  if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const requiredFields = paymentForm.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      const fileInput = document.getElementById('payment-proof');
      if (fileInput && fileInput.files.length > 0) {
        const fileSize = fileInput.files[0].size / 1024 / 1024;
        if (fileSize > 5) {
          alert('حجم الملف كبير جداً. الحد الأقصى هو 5 ميجابايت.');
          isValid = false;
        }
      }

      if (isValid) {
        const notificationMethod = document.querySelector('input[name="notification-method"]:checked').value;
        const studentPhone = document.getElementById('student-phone').value.trim();
        const studentName = document.getElementById('student-name').value.trim();
        const amount = document.getElementById('payment-amount')?.value.trim() || 'غير محدد';
        const notes = document.getElementById('payment-notes')?.value.trim() || 'لا توجد ملاحظات';

        const formattedPhone = studentPhone.replace(/[^0-9]/g, '');
        const orderNumber = Math.floor(100000 + Math.random() * 900000);
        const now = new Date();
        const formattedDate = now.toLocaleDateString('ar-EG', {
          year: 'numeric', month: 'long', day: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });

        if (notificationMethod === 'whatsapp') {
          const yourWhatsAppNumber = formattedPhone.startsWith("971") ? "971558034801" : "201002507441";

          const message = `
🧾 تم استلام عملية دفع جديدة

👤 الاسم: ${studentName}
📱 رقم الطالب: ${formattedPhone}
💵 المبلغ: ${amount}
📝 الملاحظات: ${notes}
📄 رقم الطلب: ${orderNumber}
🕒 التاريخ: ${formattedDate}
          `;

          const waUrl = `https://wa.me/${yourWhatsAppNumber}?text=${encodeURIComponent(message)}`;

          if (confirm("تم استلام معلومات الدفع بنجاح!\n\nهل ترغب في فتح واتساب الآن؟")) {
            window.open(waUrl, '_blank');
          } else {
            alert("تم حفظ بيانات الدفع وسيتم إرسال الإيصال لاحقًا.");
          }
        } else {
          alert('تم استلام معلومات الدفع بنجاح! سيتم مراجعتها قريباً.');
        }

        paymentForm.reset();
        if (bankDetails) bankDetails.classList.remove('active');
      } else {
        alert('يرجى ملء جميع الحقول المطلوبة بشكل صحيح.');
      }
    });
  }

  // تأثيرات عند التمرير
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.features .box, .payment-option, .video-iframes iframe');
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      if (elementPosition < screenPosition) {
        element.classList.add('animate');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // عند تحميل الصفحة
});

// إضافة CSS ديناميكي للتأثيرات
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    .features .box, .payment-option, .video-iframes iframe {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .features .box.animate, .payment-option.animate, .video-iframes iframe.animate {
      opacity: 1;
      transform: translateY(0);
    }
    .menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    .menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    .menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
    .form-group input.error, .form-group select.error, .form-group textarea.error {
      border-color: #ff3860;
      box-shadow: 0 0 0 2px rgba(255, 56, 96, 0.2);
    }
  `;
  document.head.appendChild(style);
});
