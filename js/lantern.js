// ===== Đèn kéo quân: 6 mặt, tự quay; rê chuột vào 1 ảnh thì dừng, rê ra thì quay tiếp =====
(function () {
  var lantern = document.getElementById('lantern');
  var faces = Array.prototype.slice.call(lantern.querySelectorAll('.face'));
  var status = document.getElementById('status');
  var speedInput = document.getElementById('speed');
  var N = faces.length;           // 6 mặt
  var STEP = 360 / N;             // 60 độ
  var RADIUS = 165;               // bán kính = (190/2) / tan(30°)

  // Đặt 6 mặt thành hình lục giác
  faces.forEach(function (f, i) {
    f.style.transform = 'rotateY(' + (i * STEP) + 'deg) translateZ(' + RADIUS + 'px)';
  });

  var angle = 0;
  var paused = false;
  var last = null;

  function setPaused(value, idx) {
    paused = value;
    status.textContent = value
      ? 'Đèn đang dừng - ảnh ' + (idx + 1) + '. Rê chuột ra để quay tiếp.'
      : 'Đèn đang quay...';
  }

  faces.forEach(function (f, i) {
    f.addEventListener('mouseenter', function () { setPaused(true, i); });
    f.addEventListener('mouseleave', function () { setPaused(false); });
    // Cảm ứng trên điện thoại: chạm giữ để dừng, thả tay để quay tiếp
    f.addEventListener('touchstart', function () { setPaused(true, i); }, { passive: true });
    f.addEventListener('touchend', function () { setPaused(false); });
    f.addEventListener('touchcancel', function () { setPaused(false); });
  });

  function tick(t) {
    if (last === null) last = t;
    var dt = t - last;
    last = t;

    if (!paused) {
      var speed = parseFloat(speedInput.value);        // độ mỗi khung hình (60fps)
      angle = (angle + speed * dt / 16.67) % 360;
    }
    lantern.style.transform = 'rotateX(-8deg) rotateY(' + angle + 'deg)';

    // Mặt nào quay về phía người xem thì sáng hơn
    faces.forEach(function (f, i) {
      var a = (i * STEP + angle) * Math.PI / 180;
      var facing = Math.max(Math.cos(a), 0);
      f.style.filter = 'brightness(' + (0.45 + 0.55 * facing).toFixed(2) + ')';
    });

    requestAnimationFrame(tick);
  }

  setPaused(false);
  requestAnimationFrame(tick);
})();
